import { API } from 'aws-amplify';

import { listTestsByStatus } from '~/ManualGraphql/queries';
import { listStaticContents } from '~/graphql/queries';

import {
  createAttemptedTest,
  createResult,
  updateAttemptedTest,
  addResultStatus,
} from '~/graphql/mutations';

import {
  userTests,
  getTestDetail,
  getCategoryDetail,
  listCategoriesDetail,
  listAllTests,
} from '~/ManualGraphql/queries';

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
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  },

  async getRecentlyAddedTests({ commit }) {
    commit('SET_LOADER', true, { root: true });
    try {
      const allRecentlyAddedTestData = await API.graphql({
        query: listTestsByStatus,
        variables: { status: 'APPROVED', sortDirection: 'DESC', limit: 3 },
      });

      const allRecentlyAddedTest = allRecentlyAddedTestData.data.listTestsByStatus.items;
      commit('setRecentlyAddedTests', allRecentlyAddedTest);
      commit('SET_LOADER', false, { root: true });
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
    }
  },

  async getAllFeaturedTest({ commit }) {
    commit('SET_LOADER', true, { root: true });

    const filter = {
      tags: { contains: 'FEATURED' },
    };

    try {
      const allFeaturedTestData = await API.graphql({
        query: listTestsByStatus,
        variables: { status: 'APPROVED', filter: filter, limit: 3 },
      });

      const allFeaturedTest = allFeaturedTestData.data.listTestsByStatus.items;
      commit('setFeaturedTests', allFeaturedTest);
      commit('SET_LOADER', false, { root: true });
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
    }
  },

  async getAllCategories({ commit, dispatch }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const allCategoriesData = await API.graphql({
        query: listCategoriesDetail,
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allCategories = allCategoriesData.data.listCategories.items;
      const sortedAllCreatedTests = await dispatch('sortBycreatedAt', allCategories);
      commit('setCategories', sortedAllCreatedTests.reverse());
      commit('SET_LOADER', false, { root: true });
      return allCategories;
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
    }
  },

  async getAllSubCategories({ commit }, payload) {
    const categoryId = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const allSubCategoriesData = await API.graphql({
        query: getCategoryDetail,
        variables: { id: categoryId },
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allSubCategories = allSubCategoriesData.data.getCategory.sub_category.items;

      // get category name
      const categoryName = allSubCategoriesData.data.getCategory.name;
      commit('setCategoryName', categoryName);

      commit('SET_LOADER', false, { root: true });

      return allSubCategories;
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
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allTests = allTestsData.data.listTestManagers.items;
      commit('SET_LOADER', false, { root: true });

      return allTests;
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
    }
  },

  async getTestDetail({ commit }, payload) {
    const testId = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const testQueryData = await API.graphql({
        query: getTestDetail,
        variables: { id: testId },
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const testData = testQueryData.data.getTestManager;
      commit('SET_LOADER', false, { root: true });
      return testData;
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

  async getTestByQuery({ commit }, payload) {
    try {
      const query = payload.toLowerCase().replace(/\s+/g, ' ').trim();
      commit('SET_LOADER', true, { root: true });

      const filter = {
        title: { contains: query },
        and: { status: { eq: 'APPROVED' } },
      };

      const allTestData = await API.graphql({
        query: listAllTests,
        variables: { filter: filter },
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      commit('SET_LOADER', false, { root: true });
      const testList = allTestData.data.listTestManagers.items;
      if (testList && !testList.length) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'No test found',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      }
      return testList;
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

  async getTestInstruction({ commit }) {
    try {
      commit('SET_LOADER', true, { root: true });
      const staticData = await API.graphql({
        query: listStaticContents,
      });
      const staticDataArray = staticData.data.listStaticContents.items;
      const testInstruction = staticDataArray.find((obj) => obj.name === 'TestInstruction');
      if (testInstruction) {
        return testInstruction.body;
      }
      commit('SET_LOADER', false, { root: true });
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

  // Local function
  sortBycreatedAt(_none, payload) {
    return payload.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },
};
