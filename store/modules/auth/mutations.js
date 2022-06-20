export default {
  setUser(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },
};
