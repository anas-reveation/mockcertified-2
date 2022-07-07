import auth from './modules/auth';
import buyer from './modules/buyer';
import testManagement from './modules/testManagement';

const state = () => {
  return {
    isLoading: false,
    selectedTest: null,
    allPurchasedTests: [],
    allAttemptedTests: [],
  };
};

const modules = {
  auth,
  buyer,
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
