import { API } from 'aws-amplify';
import { createTestManager, createQuestion } from '~/graphql/mutations';

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
};
