export default {
  async setAllTests(state, allTests) {
    state.allTests = allTests;
  },

  setEditCatSubCat(state, editCatSubCat) {
    const { id, name, imageUrl } = editCatSubCat;
    state.editCatSubCat.id = id;
    state.editCatSubCat.name = name;
    state.editCatSubCat.imageUrl = imageUrl;
  },

  resetEditCatSubCat(state) {
    state.editCatSubCat.id = null;
    state.editCatSubCat.name = null;
    state.editCatSubCat.imageUrl = null;
  },
};
