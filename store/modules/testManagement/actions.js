import { API } from 'aws-amplify';
import { getUser, listCategories, listTestManagers } from '~/graphql/queries';
import { purchasedTests, getTestDetail } from '~/ManualGraphql/queries';
import { createAttemptedTest, createResult, updateAttemptedTest } from '~/graphql/mutations';

export default {
  async getUserTests({ commit, rootState }) {
    const user_id = rootState.auth.user.id;
    commit('SET_LOADER', true, { root: true });

    try {
      const allPurchasedTestsData = await API.graphql({
        query: purchasedTests,
        variables: { id: user_id },
      });

      // Get purchased tests
      const allPurchasedTests = allPurchasedTestsData.data.getUser.purchased_tests.items
        ? allPurchasedTestsData.data.getUser.purchased_tests.items
        : [];
      commit('setAllPurchasedTests', allPurchasedTests, { root: true });

      // Get attempted tests
      const allAttemptedTests = allPurchasedTestsData.data.getUser.attempted_tests.items
        ? allPurchasedTestsData.data.getUser.attempted_tests.items
        : [];
      commit('setAllAttemptedTests', allAttemptedTests, { root: true });

      commit('SET_LOADER', false, { root: true });

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

  async startAttemptingTest({ commit, rootState }, payload) {
    const user_id = rootState.auth.user.id;
    const test_id = payload;
    const input = {
      status: 'IN_PROGRESS',
      test_id,
      user_id,
    };
    commit('SET_LOADER', true, { root: true });
    try {
      const attemptTestCreateDetail = await API.graphql({
        query: createAttemptedTest,
        variables: { input },
      });
      commit('SET_LOADER', false, { root: true });
      return attemptTestCreateDetail.data.createAttemptedTest;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async answerSubmit({ commit }, payload) {
    const question_id = payload.questionId;
    const attempted_id = payload.attemptedId;
    const user_input = payload.userInput;
    commit('SET_LOADER', true, { root: true });

    try {
      const input = {
        question_id,
        attempted_id,
        user_input,
      };
      await API.graphql({
        query: createResult,
        variables: { input },
      });
      commit('SET_LOADER', false, { root: true });

      return true;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async compeletedTest({ commit }, payload) {
    const attempted_id = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const input = {
        id: attempted_id,
        status: 'ATTEMPTED',
      };
      await API.graphql({
        query: updateAttemptedTest,
        variables: { input },
      });
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async abandonedAttemptedTest({ commit }, payload) {
    const attempted_id = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const input = {
        id: attempted_id,
        status: 'ABANDONED',
      };
      await API.graphql({
        query: updateAttemptedTest,
        variables: { input },
      });
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },
};
