import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';

import { getUser } from '../../../graphql/queries';

export default {
  async load({ commit }, req) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userRole = user.signInUserSession.accessToken.payload['cognito:groups'];
      if (userRole) {
        commit('setUserGroup', userRole[0]);
      }

      // const userData = user ? user.attributes : user;
      const userGraphql = await API.graphql({
        query: getUser,
        variables: { id: user.username },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const userData = userGraphql.data.getUser;
      commit('setUser', userData);
      return user;
    } catch (error) {
      console.error('error', error);
      commit('setUser', null);
    }
  },

  async register({ commit }, { email, password }) {
    commit('SET_LOADER', true, { root: true });
    try {
      const user = await Auth.signUp({
        username: email,
        password,
      });
      commit('SET_LOADER', false, { root: true });
      return user;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async confirmRegistration({ commit }, { email, code }) {
    commit('SET_LOADER', true, { root: true });

    try {
      commit('SET_LOADER', false, { root: true });
      await Auth.confirmSignUp(email, code);
      return;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
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
      console.error('ERR', err);
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
};
