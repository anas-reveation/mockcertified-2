import { API } from 'aws-amplify';
import { listCategories, listTestManagers } from '~/graphql/queries';
import { userTests, getTestDetail } from '~/ManualGraphql/queries';
import {
  createAttemptedTest,
  createResult,
  updateAttemptedTest,
  addResultStatus,
} from '~/graphql/mutations';

export default {
  async getUserTests({ commit, rootState }) {
    const user_id = rootState.auth.user.id;
    commit('SET_LOADER', true, { root: true });

    try {
      const userTestsData = await API.graphql({
        query: userTests,
        variables: { id: user_id },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      // Get purchased tests
      const allPurchasedTests = userTestsData.data.getUser.purchased_tests.items
        ? userTestsData.data.getUser.purchased_tests.items
        : [];
      commit('setAllPurchasedTests', allPurchasedTests, { root: true });

      // Get attempted tests
      const allAttemptedTests = userTestsData.data.getUser.attempted_tests.items
        ? userTestsData.data.getUser.attempted_tests.items
        : [];
      commit('setAllAttemptedTests', allAttemptedTests, { root: true });

      // Get created tests
      const allCreatedTests = userTestsData.data.getUser.created_tests.items
        ? userTestsData.data.getUser.created_tests.items
        : [];
      commit('setAllCreatedTests', allCreatedTests, { root: true });

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
        authMode: 'AMAZON_COGNITO_USER_POOLS',
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
        authMode: 'AMAZON_COGNITO_USER_POOLS',
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
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const testData = testQueryData.data.getTestManager;
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
        authMode: 'AMAZON_COGNITO_USER_POOLS',
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

      const resultData = await API.graphql({
        query: createResult,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      const result_id = resultData.data.createResult.id;
      await API.graphql({
        query: addResultStatus,
        variables: {
          result_id,
        },
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
        status: 'COMPLETED',
      };
      await API.graphql({
        query: updateAttemptedTest,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async abortedAttemptedTest({ commit }, payload) {
    const attempted_id = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const input = {
        id: attempted_id,
        status: 'ABORTED',
      };
      await API.graphql({
        query: updateAttemptedTest,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async setTestRemainingTime({ commit }, payload) {
    const attempted_id = payload.attemptedId;
    const remaining_time = payload.remainingTime;
    commit('SET_LOADER', true, { root: true });

    try {
      const input = {
        id: attempted_id,
        remaining_time,
      };
      await API.graphql({
        query: updateAttemptedTest,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
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
