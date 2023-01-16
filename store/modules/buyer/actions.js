import { API } from 'aws-amplify';
import { checkPromoCode } from '~/graphql/queries';
import {
  createPurchasedTest,
  checkoutStripeUrl,
  createFeedback,
  updateFeedback,
} from '~/graphql/mutations';

export default {
  async buyNow({ commit, rootState }, payload) {
    const jwtToken = rootState.auth.jwtToken;
    const testId = payload.testId;
    const promocode = payload.promocode ? payload.promocode : false;
    commit('SET_LOADER', true, { root: true });

    try {
      const success_redirect_url = window.location.origin + '/payment-success';
      const cancel_redirect_url = window.location.origin + '/payment-cancel';
      let variables = {
        test_id: testId,
        token: jwtToken,
        success_redirect_url,
        cancel_redirect_url,
      };

      if (promocode) {
        variables = {
          ...variables,
          promocode,
        };
      }
      const checkoutStripeUrlData = await API.graphql({
        query: checkoutStripeUrl,
        variables,
      });
      const parsedData = JSON.parse(checkoutStripeUrlData.data.checkoutStripeUrl);
      commit('SET_LOADER', false, { root: true });
      if (parsedData.statusCode !== 200) {
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
      return parsedData.body.url;
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

  async checkPromoCode({ commit, rootState }, payload) {
    const promocode = payload;
    const jwt_token = rootState.auth.jwtToken;

    commit('SET_LOADER', true, { root: true });
    try {
      const promocodeData = await API.graphql({
        query: checkPromoCode,
        variables: {
          promocode,
          jwt_token,
        },
      });

      const parsedData = JSON.parse(promocodeData.data.checkPromoCode);
      commit('SET_LOADER', false, { root: true });
      if (parsedData.status === 404) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Promocode is not valid',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      } else if (parsedData.status === 400) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Promocode is expired',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      } else if (parsedData.status === 409) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Promocode has already been used.',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      } else if (parsedData.status === 500) {
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

      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Promocode applied',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });

      return parsedData.discount_percentage;
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

  async buyTestFree({ commit, rootState }, payload) {
    const user_id = rootState.auth.user.id;
    const input = { test_id: payload.testId, user_id };
    commit('SET_LOADER', true, { root: true });

    try {
      const createPurchasedTestData = await API.graphql({
        query: createPurchasedTest,
        variables: {
          input,
        },
      });
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Successfully purchased',
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

  async giveFeedback({ commit }, payload) {
    const purchasedTestId = payload.purchasedTestId;
    const testId = payload.testId;
    const description = payload.description;

    // Feedback ID and Purchased will be same (because purchased and feedback id will be unique)
    const input = {
      id: purchasedTestId,
      purchased_id: purchasedTestId,
      test_id: testId,
      description,
    };
    commit('SET_LOADER', true, { root: true });

    try {
      await API.graphql({
        query: createFeedback,
        variables: {
          input,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Feedback submitted',
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

  async editFeedback({ commit }, payload) {
    const purchasedTestId = payload.purchasedTestId;
    const description = payload.description;

    // Feedback ID and Purchased will be same (because purchased and feedback id will be unique)
    const input = {
      id: purchasedTestId,
      description,
    };
    commit('SET_LOADER', true, { root: true });

    try {
      await API.graphql({
        query: updateFeedback,
        variables: {
          input,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Feedback submitted',
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
};
