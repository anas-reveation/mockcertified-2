import auth from './modules/auth';
import buyer from './modules/buyer';
import testManagement from './modules/testManagement';

const state = () => {
  return {
    isLoading: false,
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
