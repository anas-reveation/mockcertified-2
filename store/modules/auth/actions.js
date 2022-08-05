import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';

import { getUser } from '~/graphql/queries';
import { createUser } from '~/graphql/mutations';

export default {
  async load({ commit, dispatch }, req) {
    try {
      const user = await Auth.currentAuthenticatedUser();
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
      return user;
    } catch (error) {
      console.error('error', error);
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
      alert(err.message);    
    }
  },

  async confirmRegistration({ commit }, { email, code }) {
    commit('SET_LOADER', true, { root: true });

    try {
      commit('SET_LOADER', false, { root: true });
      await Auth.confirmSignUp(email, code);
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      alert(err.message);
      return false;
    }
  },

  async login({ commit }, { email, password }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const user = await Auth.signIn(email, password);

      const userRole = user.signInUserSession.accessToken.payload['cognito:groups'];
      if (userRole) {
        commit('setUserGroup', userRole[0]);
      }

      const userGraphql = await API.graphql({
        query: getUser,
        variables: { id: user.username },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const userData = userGraphql.data.getUser;
      commit('setUser', userData);
      commit('SET_LOADER', false, { root: true });
      return user;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      alert(err.message);
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
      commit('setUserGroup', null);
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
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
      console.error('ERR', err);
      return null;
    }
  },
};
