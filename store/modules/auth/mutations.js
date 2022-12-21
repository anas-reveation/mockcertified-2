export default {
  setUser(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },

  setJwtToken(state, jwtToken) {
    state.jwtToken = jwtToken;
  },

  setUserGroup(state, groupName) {
    state.userGroup = groupName;
  },

  setUnconfirmedUserEmail(state, unconfirmedUserEmail) {
    state.unconfirmedUserEmail = unconfirmedUserEmail;
  },

  setStripeSeller(state, stripeSellerId) {
    state.user = {
      ...state.user,
      stripe_seller_id: stripeSellerId,
    };
  },
};
