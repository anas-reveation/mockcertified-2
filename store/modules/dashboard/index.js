import dashboardAction from './actions';
import dashboardMutations from './mutations';

const state = () => ({
  testCollection: {},
});

const getters = {};

const actions = {
  ...dashboardAction,
};

const mutations = {
  ...dashboardMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
