export default {
  setUser(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },

  setUserGroup(state, groupName) {
    state.userGroup = groupName;
  },
};
