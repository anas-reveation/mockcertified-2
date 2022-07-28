import auth from './modules/auth';
import buyer from './modules/buyer';
import seller from './modules/seller';
import admin from './modules/admin';
import testManagement from './modules/testManagement';

const state = () => {
  return {
    isLoading: false,
    selectedTest: null,
    allPurchasedTests: [],
    allAttemptedTests: [],
    allCreatedTests: [],
  };
};

const modules = {
  auth,
  buyer,
  seller,
  admin,
  testManagement,
};

const getters = {};

const mutations = {
  SET_LOADER(state, isLoading) {
    state.isLoading = isLoading;
  },

  setAllPurchasedTests(state, allPurchasedTests) {
    state.allPurchasedTests = allPurchasedTests;
  },

  setAllAttemptedTests(state, allAttemptedTests) {
    state.allAttemptedTests = allAttemptedTests;
  },

  setAllCreatedTests(state, allCreatedTests) {
    state.allCreatedTests = allCreatedTests;
  },

  selectTest(state, test) {
    state.selectedTest = test;
  },
};

const actions = {
  // async nuxtServerInit(ctx, etx) {},
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules,
};
