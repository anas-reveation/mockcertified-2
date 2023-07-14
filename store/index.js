import auth from './modules/auth';
import buyer from './modules/buyer';
import seller from './modules/seller';
import admin from './modules/admin';
import testManagement from './modules/testManagement';

import { API } from 'aws-amplify';
import { listStaticContents } from '~/graphql/queries';

import { Capacitor } from '@capacitor/core';

const state = () => {
  return {
    isLoading: false,
    isLoaderHidden: false,
    selectedTest: null,
    allPurchasedTests: [],
    allAttemptedTests: [],
    allCreatedTests: [],
    isNavbarVisible: false,
    isSideNavbarVisible: false,
    redirectUrl: '',
    platform: '',
    selectBySlug: null,
    termsConditions: null,
    privacyPolicy: null,
    FAQ: null,
    homeScrollerBannerContent: null,
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

  setIsLoaderHidden(state, isLoaderHidden) {
    state.isLoaderHidden = isLoaderHidden;
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

  setIsSideNavbarVisible(state, params) {
    state.isSideNavbarVisible = params;
  },

  setPlatform(state) {
    state.platform = Capacitor.getPlatform();
  },

  setTC_and_PP(state, payload) {
    state.termsConditions = payload.termsConditions;
    state.privacyPolicy = payload.privacyPolicy;
    state.FAQ = payload.FAQ;
    state.homeScrollerBannerContent = payload.homeScrollerBannerContent;
  },

  setSelectBySlug(state, slug) {
    state.selectBySlug = slug;
  },

  updateTestDescription(state, testDetail) {
    const { id, description } = testDetail;
    state.allCreatedTests = state.allCreatedTests.map((test) => {
      if (test.id === id) {
        return {
          ...test,
          description,
        };
      }
      return test;
    });
  },
};

const actions = {
  // async nuxtServerInit(ctx, etx) {},

  setIsNavbarVisible({ commit }, payload) {
    commit('setIsNavbarVisible', payload);
  },

  async getTC_and_PP({ commit }) {
    try {
      commit('SET_LOADER', true, { root: true });
      const staticData = await API.graphql({
        query: listStaticContents,
      });
      const staticDataArray = staticData.data.listStaticContents.items;
      const termsConditions = staticDataArray.find((obj) => obj.name === 'TermsConditions');
      const privacyPolicy = staticDataArray.find((obj) => obj.name === 'PrivacyPolicy');
      const FAQ = staticDataArray.find((obj) => obj.name === 'FAQ');
      const homeScrollerBannerContent = staticDataArray.find(
        (obj) => obj.name === 'HomeScrollerBanner',
      );
      if (termsConditions && privacyPolicy && FAQ) {
        commit('setTC_and_PP', {
          termsConditions: termsConditions.body,
          privacyPolicy: privacyPolicy.body,
          FAQ: FAQ.body,
          homeScrollerBannerContent: homeScrollerBannerContent.body,
        });
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
        timer: 7000,
      });
      return false;
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules,
};
