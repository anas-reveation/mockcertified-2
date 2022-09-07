import { API } from 'aws-amplify';
import { checkoutStripeUrl, verifyTestPayment } from '~/graphql/mutations';

export default {
  async buyNow({ commit, rootState }, payload) {
    const jwtToken = rootState.auth.jwtToken;
    const testId = payload.testId;
    commit('SET_LOADER', true, { root: true });

    try {
      const success_redirect_url = window.location.origin + '/payment-success';
      const cancel_redirect_url = window.location.origin + '/payment-cancel';
      const checkoutStripeUrlData = await API.graphql({
        query: checkoutStripeUrl,
        variables: {
          test_id: testId,
          token: jwtToken,
          success_redirect_url,
          cancel_redirect_url,
        },
      });
      const parsedData = JSON.parse(checkoutStripeUrlData.data.checkoutStripeUrl);
      commit('SET_LOADER', false, { root: true });
      if (parsedData.body.url) {
        return parsedData.body.url;
      }
      return false;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
  },

  // async checkout({ commit, rootState, dispatch }, payload) {
  //   const jwtToken = rootState.auth.jwtToken;
  //   const cartItems = payload;
  //   commit('SET_LOADER', true, { root: true });

  //   try {
  //     let urlArr = [];
  //     const success_redirect_url = window.location.origin + '/payment-success';
  //     const cancel_redirect_url = window.location.origin + '/payment-cancel';
  //     cartItems.forEach(async (test) => {
  //       const checkoutStripeUrlData = await API.graphql({
  //         query: checkoutStripeUrl,
  //         variables: {
  //           test_id: test.id,
  //           token: jwtToken,
  //           success_redirect_url,
  //           cancel_redirect_url,
  //         },
  //       });
  //       const parsedData = JSON.parse(checkoutStripeUrlData.data.checkoutStripeUrl);
  //       urlArr.push(parsedData.body.url);
  //       newWindowsOpen(parsedData.body.url);
  //     });
  //     commit('buyer/clearCart', false, { root: true });
  //     await dispatch('testManagement/getUserTests', false, { root: true });
  //     commit('SET_LOADER', false, { root: true });
  //     return true;
  //   } catch (err) {
  //     commit('SET_LOADER', false, { root: true });
  //     console.error('ERR', err);
  //     return false;
  //   }
  // },
};
