import adminAction from './actions';
import adminMutations from './mutations';

const state = () => ({
  allTests: [],
  editCatSubCat: {
    id: null,
    name: null,
    imageUrl: null,
  },
});

const getters = {};

const actions = {
  ...adminAction,
};

const mutations = {
  ...adminMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
