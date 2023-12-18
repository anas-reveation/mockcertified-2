import userTestAction from './actions';
import userTestMutations from './mutations';

const state = () => ({
  allTest: [],
});

const getters = {};

const actions = {
  ...userTestAction,
};

const mutations = {
  ...userTestMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
