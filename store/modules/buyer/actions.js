import { API } from 'aws-amplify';
import { createPurchasedTest } from '~/graphql/mutations';

export default {
  async checkout({ commit, rootState, dispatch }, payload) {
    const user_id = rootState.auth.user.id;
    const cartItems = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      cartItems.forEach(async (test) => {
        const input = {
          test_id: test.id,
          user_id,
        };

        await API.graphql({
          query: createPurchasedTest,
          variables: { input },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
      });
      commit('buyer/clearCart', false, { root: true });
      await dispatch('testManagement/getUserTests', false, { root: true });
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
      return false;
    }
  },
};
