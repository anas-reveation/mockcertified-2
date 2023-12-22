export default {
  setCategoryName(state, categoryName) {
    state.categoryName = categoryName;
  },

  setRecentlyAddedTests(state, recentlyAddedTests) {
    state.recentlyAddedTests = recentlyAddedTests;
  },

  setFeaturedTests(state, featuredTests) {
    state.featuredTests = featuredTests;
  },

  setCategories(state, categories) {
    state.categories = categories;
  },
  setAllApprovedTests(state, allApprovedTests) {
    state.allApprovedTests = allApprovedTests;
  },
};
