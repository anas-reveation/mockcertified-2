import { API } from 'aws-amplify';
import { checkoutStripeUrl, verifyTestPayment } from '~/graphql/mutations';

export default {
  async checkout({ commit, rootState, dispatch }, payload) {
    const jwtToken = rootState.auth.jwtToken;
    const cartItems = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      let urlArr = [];
      const success_redirect_url = window.location.origin + '/payment-success';
      const cancel_redirect_url = window.location.origin + '/payment-cancel';
      cartItems.forEach(async (test) => {
        const checkoutStripeUrlData = await API.graphql({
          query: checkoutStripeUrl,
          variables: {
            test_id: test.id,
            token: jwtToken,
            success_redirect_url,
            cancel_redirect_url,
          },
        });
        const parsedData = JSON.parse(checkoutStripeUrlData.data.checkoutStripeUrl);
        urlArr.push(parsedData.body.url);
        window.open(parsedData.body.url);
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

  async verifyCheckout({ commit }, payload) {
    try {
      const sessionId = payload.sessionId;
      const jwtToken = payload.jwtToken;

      commit('SET_LOADER', true, { root: true });

      const verifyCheckoutData = await API.graphql({
        query: verifyTestPayment,
        variables: {
          session_id: sessionId,
          token: jwtToken,
        },
      });
      const parsedData = JSON.parse(verifyCheckoutData.data.verifyTestPayment);

      if (parsedData.statusCode === '200' || parsedData.statusCode === 200) {
        commit('SET_LOADER', false, { root: true });
        return true;
      }
      alert(parsedData.body.message);
      commit('SET_LOADER', false, { root: true });
      return false;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
      return false;
    }
  },
};
