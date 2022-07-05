import buyerAction from './actions';
import buyerMutations from './mutations';

const state = () => ({
  cartItems: [],
});

const getters = {};

const actions = {
  ...buyerAction,
};

const mutations = {
  ...buyerMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
