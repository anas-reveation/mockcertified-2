import { v4 as uuidv4 } from 'uuid';
import { API } from 'aws-amplify';
import {
  onboardingStripe,
  getBalance,
  redirectPayoutDashboard,
  getStripeIdStatus,
} from '~/graphql/queries';
import { createTestManager, createQuestion, updateUser } from '~/graphql/mutations';

export default {
  async createTest({ commit, rootState, dispatch }, payload) {
    const user_id = rootState.auth.user.id;
    const testDetail = payload.testDetail;
    const questionList = payload.questionList;
    commit('SET_LOADER', true, { root: true });

    let testSlug = testDetail.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    let isSlugAvailable = false;
    do {
      isSlugAvailable = await dispatch('testManagement/getTestIdBySlug', testSlug, { root: true });
      // Keep loader on in loop
      commit('SET_LOADER', true, { root: true });
      if (isSlugAvailable) {
        testSlug = testSlug + '-' + uuidv4();
      }
    } while (isSlugAvailable);
    try {
      const input = {
        user_id,
        title: testDetail.title,
        category_id: testDetail.categoryId,
        description: testDetail.description,
        price: testDetail.price,
        time_limit: testDetail.timeLimit,
        category_id: testDetail.categoryId,
        sub_category_id: testDetail.subCategoryId,
        credit: testDetail.credit,
        slug: testSlug,
      };
      const createdtest = await API.graphql({
        query: createTestManager,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const testId = createdtest.data.createTestManager.id;

      let isValid;
      for (let i = 0; i < questionList.length; i++) {
        isValid = await dispatch('createQuestion', {
          testId,
          questionDetail: questionList[i],
        });
        if (!isValid) {
          break;
        }
      }
      if (!isValid) {
        commit('SET_LOADER', false, { root: true });
        return isValid;
      }

      await dispatch('testManagement/getUserTests', false, { root: true });
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
        timer: 3000,
      });
      return false;
    }
  },

  async createQuestion({ commit, rootState, dispatch }, payload) {
    const test_id = payload.testId;
    const questionDetail = payload.questionDetail;
    try {
      const input = {
        test_id,
        question: questionDetail.question,
        answer: questionDetail.answer,
        explainantion: questionDetail.explanation,
        options: questionDetail.options,
        is_showcase: questionDetail.is_showcase,
        marks: 1,
      };

      await API.graphql({
        query: createQuestion,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      return true;
    } catch (err) {
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

  async stripeOnboarding({ commit, rootState }) {
    commit('SET_LOADER', true, { root: true });
    try {
      const stripeURLData = await API.graphql({
        query: onboardingStripe,
      });
      const parsedData = JSON.parse(stripeURLData.data.onboardingStripe);
      const user_id = rootState.auth.user.id;
      const url = parsedData.body.account_link;
      const stripe_seller_id = parsedData.body.account_id;
      const input = {
        id: user_id,
        stripe_seller_id,
      };
      await API.graphql({
        query: updateUser,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      commit('auth/setStripeSeller', stripe_seller_id, { root: true });
      commit('SET_LOADER', false, { root: true });
      return url;
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

  async getBalanceDetail({ commit, rootState }) {
    const seller_id = rootState.auth.user.stripe_seller_id;
    commit('SET_LOADER', true, { root: true });
    try {
      const getBanalceData = await API.graphql({
        query: getBalance,
        variables: {
          seller_id,
        },
      });
      const parsedData = JSON.parse(getBanalceData.data.getBalance);
      const balanceDetail = parsedData.body.balance_detail[0];
      commit('SET_LOADER', false, { root: true });
      return balanceDetail;
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

  async redirectExpressDashboard({ commit, rootState }) {
    const seller_id = rootState.auth.user.stripe_seller_id;
    commit('SET_LOADER', true, { root: true });
    try {
      const getLink = await API.graphql({
        query: redirectPayoutDashboard,
        variables: {
          seller_id,
        },
      });
      const parsedData = JSON.parse(getLink.data.redirectPayoutDashboard);
      commit('SET_LOADER', false, { root: true });
      if (parsedData.statusCode !== 200) {
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
      return parsedData.body.link.url;
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

  async getStripeIdStatus({ commit, rootState }) {
    const seller_id = rootState.auth.user.stripe_seller_id;
    commit('SET_LOADER', true, { root: true });
    try {
      const getStatus = await API.graphql({
        query: getStripeIdStatus,
        variables: {
          seller_id,
        },
      });
      const parsedData = JSON.parse(getStatus.data.getStripeIdStatus);
      commit('SET_LOADER', false, { root: true });
      return parsedData.body.status;

      // return balanceDetail;
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
};
