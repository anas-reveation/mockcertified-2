import auth from './modules/auth';
import buyer from './modules/buyer';
import seller from './modules/seller';
import admin from './modules/admin';
import testManagement from './modules/testManagement';

import { Capacitor } from '@capacitor/core';

const state = () => {
  return {
    isLoading: false,
    selectedTest: null,
    allPurchasedTests: [],
    allAttemptedTests: [],
    allCreatedTests: [],
    isNavbarVisible: false,
    redirectUrl: '',
    platform: '',
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

  setRedirectUrl(state, params) {
    state.redirectUrl = params;
  },

  clearRedirectUrl(state, params) {
    state.redirectUrl = '';
  },

  setIsNavbarVisible(state, params) {
    state.isNavbarVisible = params;
  },

  setPlatform(state) {
    state.platform = Capacitor.getPlatform();
  },
};

const actions = {
  // async nuxtServerInit(ctx, etx) {},

  setIsNavbarVisible({ commit }, payload) {
    commit('setIsNavbarVisible', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules,
};
