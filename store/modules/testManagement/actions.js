import { API, graphqlOperation } from 'aws-amplify';
import {
  userTests,
  getTestDetail,
  getCategoryDetail,
  listCategoriesDetail,
  listAllTests,
} from '~/ManualGraphql/queries';

import {
  createAttemptedTest,
  createResult,
  updateAttemptedTest,
  addResultStatus,
} from '~/graphql/mutations';

export default {
  async getUserTests({ commit, dispatch, rootState }) {
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
      const sortedAllPurchasedTests = await dispatch('sortBycreatedAt', allPurchasedTests);
      commit('setAllPurchasedTests', sortedAllPurchasedTests, { root: true });

      // Get attempted tests
      const allAttemptedTests = userTestsData.data.getUser.attempted_tests.items
        ? userTestsData.data.getUser.attempted_tests.items
        : [];
      const sortedAllAttemptedTests = await dispatch('sortBycreatedAt', allAttemptedTests);

      commit('setAllAttemptedTests', sortedAllAttemptedTests, { root: true });

      // Get created tests
      const allCreatedTests = userTestsData.data.getUser.created_tests.items
        ? userTestsData.data.getUser.created_tests.items
        : [];
      const sortedAllCreatedTests = await dispatch('sortBycreatedAt', allCreatedTests);
      commit('setAllCreatedTests', sortedAllCreatedTests, { root: true });

      commit('SET_LOADER', false, { root: true });
      return allPurchasedTests;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getRecentlyAddedTests({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const filter = {
        status: { eq: 'APPROVED' },
      };

      // "graphqlOperation" using this because we have to limit after filter
      const allRecentlyAddedTestData = await API.graphql({
        ...graphqlOperation(listAllTests, {
          filter,
          limit: 10,
        }),
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      const allRecentlyAddedTest = allRecentlyAddedTestData.data.listTestManagers.items;
      commit('setRecentlyAddedTests', allRecentlyAddedTest);
      commit('SET_LOADER', false, { root: true });
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getAllFeaturedTest({ commit }) {
    commit('SET_LOADER', true, { root: true });

    const filter = {
      tags: { contains: 'FEATURED' },
      and: { status: { eq: 'APPROVED' } },
    };

    try {
      const allFeaturedTestData = await API.graphql({
        query: listAllTests,
        variables: { filter: filter, limit: 5 },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allFeaturedTest = allFeaturedTestData.data.listTestManagers.items;
      commit('setFeaturedTests', allFeaturedTest);
      commit('SET_LOADER', false, { root: true });
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getAllCategories({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const allCategoriesData = await API.graphql({
        query: listCategoriesDetail,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allCategories = allCategoriesData.data.listCategories.items;
      commit('setCategories', allCategories);
      commit('SET_LOADER', false, { root: true });
      return allCategories;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getAllSubCategories({ commit }, payload) {
    const categoryId = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const allSubCategoriesData = await API.graphql({
        query: getCategoryDetail,
        variables: { id: categoryId },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allSubCategories = allSubCategoriesData.data.getCategory.sub_category.items;

      // get category name
      const categoryName = allSubCategoriesData.data.getCategory.name;
      commit('setCategoryName', categoryName);

      commit('SET_LOADER', false, { root: true });

      return allSubCategories;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getTestsBySubCategory({ commit }, payload) {
    const subCategoryId = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const filter = {
        sub_category_id: { eq: subCategoryId },
        and: { status: { eq: 'APPROVED' } },
      };

      const allTestsData = await API.graphql({
        query: listAllTests,
        variables: { filter: filter },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allTests = allTestsData.data.listTestManagers.items;
      commit('SET_LOADER', false, { root: true });

      return allTests;
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
      const addResultStatusData = await API.graphql({
        query: addResultStatus,
        variables: {
          result_id,
        },
      });

      const parsedData = JSON.parse(addResultStatusData.data.addResultStatus);
      if (parsedData.statusCode === '200' || parsedData.statusCode === 200) {
        commit('SET_LOADER', false, { root: true });
        return true;
      }

      commit('SET_LOADER', false, { root: true });
      return false;
    } catch (err) {
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async compeletedTest({ commit, dispatch }, payload) {
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
      await dispatch('getUserTests');
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

  // Local function
  sortBycreatedAt(_none, payload) {
    return payload.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },
};
