import testManagementAction from './actions';
import testManagementMutations from './mutations';

const state = () => ({
  categoryName: null,
  categories: [],
  featuredTests: [],
  recentlyAddedTests: [],
});

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
