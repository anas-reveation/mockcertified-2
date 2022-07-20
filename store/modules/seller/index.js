import sellerAction from './actions';
import sellerMutations from './mutations';

const state = () => ({});

const getters = {};

const actions = {
  ...sellerAction,
};

const mutations = {
  ...sellerMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
