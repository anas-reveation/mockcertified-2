import testManagementAction from './actions';
import testManagementMutations from './mutations';

const state = () => ({});

const getters = {};

const actions = {
  ...testManagementAction,
};

const mutations = {
  ...testManagementMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
