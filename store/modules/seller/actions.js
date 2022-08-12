import { API } from 'aws-amplify';
import { onboardingStripe } from '~/graphql/queries';
import { createTestManager, createQuestion, updateUser } from '~/graphql/mutations';

export default {
  async createTest({ commit, rootState, dispatch }, payload) {
    const user_id = rootState.auth.user.id;
    const testDetail = payload.testDetail;
    const questionList = payload.questionList;
    commit('SET_LOADER', true, { root: true });
    try {
      const input = {
        user_id,
        title: testDetail.title,
        category_id: testDetail.categoryId,
        description: testDetail.description,
        price: testDetail.price,
        time_limit: testDetail.timeLimit,
      };
      const createdtest = await API.graphql({
        query: createTestManager,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const testId = createdtest.data.createTestManager.id;

      questionList.forEach(async (question) => {
        await dispatch('createQuestion', { testId, questionDetail: question });
      });

      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
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
        marks: 1,
      };

      await API.graphql({
        query: createQuestion,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      return true;
    } catch (err) {
      console.error('ERR', err);
      return false;
    }
  },

  async stripeOnboarding({ commit, rootState }) {
    commit('SET_LOADER', true, { root: true });
    try {
      const stripeURLData = await API.graphql({
        query: onboardingStripe,
      });
      const parsedData = stripeURLData.data.onboardingStripe;
      const arr = parsedData.split(',');
      const arr2 = arr[1].split('=');
      const arr3 = arr2[1];
      const url = arr3.slice(0, -1);
      console.log('url', url);
      const id = url.split('/');
      const user_id = rootState.auth.user.id;
      const stripe_seller_id = id[5];
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
      console.error('ERR', err);
      return false;
    }
  },
};
