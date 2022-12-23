import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';

import { getUser } from '~/graphql/queries';
import { createUser } from '~/graphql/mutations';

export default {
  async load({ commit, dispatch }, req) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const jwtToken = user.signInUserSession.accessToken.jwtToken;
      const userRole = user.signInUserSession.accessToken.payload['cognito:groups'];
      if (userRole) {
        commit('setUserGroup', userRole[0]);
      }

      const userGraphql = await API.graphql({
        query: getUser,
        variables: { id: user.attributes.sub },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      let userData = userGraphql.data.getUser;

      // If user signedIn with social account and dont have user in DB
      if (user && !userData) {
        const obj = {
          userId: user.attributes.sub,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          email: user.attributes.email,
        };
        userData = await dispatch('createUser', obj);
      }

      commit('setUser', userData);
      commit('setJwtToken', jwtToken);
      return user;
    } catch (error) {
      commit('setUser', null);
    }
  },

  async register({ commit }, payload) {
    const username = payload.email;
    const password = payload.password;
    const given_name = payload.first_name;
    const family_name = payload.last_name;
    commit('SET_LOADER', true, { root: true });
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          given_name,
          family_name,
        },
      });
      commit('SET_LOADER', false, { root: true });
      return user;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
    }
  },

  async confirmRegistration({ commit }, { email, code }) {
    commit('SET_LOADER', true, { root: true });

    try {
      await Auth.confirmSignUp(email, code);
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async resendConfirmationCode({ commit }, payload) {
    // It's an email
    const username = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      await Auth.resendSignUp(username);
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Check your email for the verification code',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async login({ commit, dispatch }, { email, password }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const user = await Auth.signIn(email, password);
      const jwtToken = user.signInUserSession.accessToken.jwtToken;

      const userRole = user.signInUserSession.accessToken.payload['cognito:groups'];
      if (userRole) {
        commit('setUserGroup', userRole[0]);
      }

      const userGraphql = await API.graphql({
        query: getUser,
        variables: { id: user.username },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      let userData = userGraphql.data.getUser;

      // If user signedIn dont have user in DB (This situation comes when user didn't verified and after they tried to login)
      // We dont need this code if we reload page because this code is present in function "load()"
      if (user && !userData) {
        const obj = {
          userId: user.attributes.sub,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          email: user.attributes.email,
        };
        userData = await dispatch('createUser', obj);
      }

      commit('setUser', userData);
      commit('setJwtToken', jwtToken);
      commit('SET_LOADER', false, { root: true });
      return user;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });

      if (err.name === 'UserNotConfirmedException') {
        const res = await dispatch('resendConfirmationCode', email);
        if (res) {
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'User is not confirmed, We have sent a verification code to your email',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 10000,
          });

          commit('setUnconfirmedUserEmail', email);
          this.$router.push('/auth/resend-code');
        }
        return false;
      }

      let errMsg = err.message;

      if (err.name === 'QuotaExceededError') {
        window.localStorage.clear();
        errMsg = 'Please try again later';
      }
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: errMsg,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async logout({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      await Auth.signOut();
      commit('setUser', null);
      commit('buyer/clearCart', false, { root: true });
      commit('setAllPurchasedTests', [], { root: true });
      commit('setAllAttemptedTests', [], { root: true });
      commit('setAllCreatedTests', [], { root: true });
      commit('testManagement/setRecentlyAddedTests', [], { root: true });
      commit('testManagement/setFeaturedTests', [], { root: true });
      commit('setUserGroup', null);
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async createUser({ commit }, payload) {
    const newUser = {
      id: payload.userId,
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
    };

    commit('SET_LOADER', true, { root: true });
    try {
      const userGraphql = await API.graphql({
        query: createUser,
        variables: { input: newUser },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const userData = userGraphql.data.createUser;
      commit('SET_LOADER', false, { root: true });
      return userData;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return null;
    }
  },
};
