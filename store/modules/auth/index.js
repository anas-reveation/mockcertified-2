import authAction from './actions';
import authMutations from './mutations';

const state = () => ({
  isAuthenticated: false,
  user: null,
});

const getters = {};

const actions = {
  ...authAction,
};

const mutations = {
  ...authMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
