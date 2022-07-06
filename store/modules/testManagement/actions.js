import { API } from 'aws-amplify';
import {
  getUser,
  listCategories,
  listQuestions,
  listTestManagers,
  getTestManager,
} from '~/graphql/queries';
import { purchasedTests, getTestDetail } from '~/ManualGraphql/queries';

export default {
  async getAllPurchasedTests({ commit, rootState }) {
    const user_id = rootState.auth.user.id;
    try {
      const allPurchasedTestsData = await API.graphql({
        query: purchasedTests,
        variables: { id: user_id },
      });
      const allPurchasedTests = allPurchasedTestsData.data.getUser.purchased_tests.items
        ? allPurchasedTestsData.data.getUser.purchased_tests.items
        : [];
      commit('SET_LOADER', false, { root: true });
      commit('setAllPurchasedTests', allPurchasedTests, { root: true });

      return allPurchasedTests;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getAllCategories({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const allCategoriesData = await API.graphql({
        query: listCategories,
      });
      const allCategories = allCategoriesData.data.listCategories.items;
      commit('SET_LOADER', false, { root: true });

      return allCategories;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getTestsByCategory({ commit }, payload) {
    const category_id = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const filter = {
        category_id: { eq: category_id },
      };

      const allTestByCategoryData = await API.graphql({
        query: listTestManagers,
        variables: { filter: filter },
      });
      const allTestByCategory = allTestByCategoryData.data.listTestManagers.items;
      commit('SET_LOADER', false, { root: true });

      return allTestByCategory;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getTestDetail({ commit }, payload) {
    const testId = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const testQueryData = await API.graphql({
        query: getTestDetail,
        variables: { id: testId },
      });
      let testData = testQueryData.data.getTestManager;
      const userId = testData.user_id;

      const userGraphql = await API.graphql({
        query: getUser,
        variables: { id: userId },
      });

      testData = {
        ...testData,
        userFirstName: userGraphql.data.getUser.first_name,
        userLastName: userGraphql.data.getUser.last_name,
      };
      commit('SET_LOADER', false, { root: true });

      return testData;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getQuestionList({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const questionListQueryData = await API.graphql({
        query: listQuestions,
      });
      const questionList = questionListQueryData.data.listQuestions.items;
      commit('SET_LOADER', false, { root: true });

      return questionList;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },
};
