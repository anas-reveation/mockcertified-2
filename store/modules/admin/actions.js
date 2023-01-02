import { API } from 'aws-amplify';
import { listAllTests, subCategoryUpdate } from '~/ManualGraphql/queries';
import { listCategories, getSubCategory } from '~/graphql/queries';
import {
  updateTestManager,
  createCategory,
  createSubCategory,
  updateSubCategory,
  updateCategory,
} from '~/graphql/mutations';

export default {
  async getAllTests({ commit, rootState, dispatch }, payload) {
    commit('SET_LOADER', true, { root: true });

    try {
      const allTestsData = await API.graphql({
        query: listAllTests,
        variables: { limit: 10000 },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      const allTests = allTestsData.data.listTestManagers.items;
      const sortedAllTests = await dispatch('testManagement/sortBycreatedAt', allTests, {
        root: true,
      });
      commit('setAllTests', sortedAllTests);
      commit('SET_LOADER', false, { root: true });

      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async approveRejectTest({ commit, dispatch }, payload) {
    const test_id = payload.testId;
    const statusName = payload.status;
    const rejectDescription = payload.rejectDescription ? payload.rejectDescription : null;

    commit('SET_LOADER', true, { root: true });

    let status;
    if (statusName === 'approve') {
      status = 'APPROVED';
    } else if (statusName === 'reject') {
      status = 'REJECTED';
    } else {
      return false;
    }

    try {
      let input = {
        id: test_id,
        status,
      };
      if (rejectDescription) {
        input = {
          ...input,
          reject_description: rejectDescription,
        };
      }
      await API.graphql({
        query: updateTestManager,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      await dispatch('getAllTests');
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async createNewCategory({ commit, dispatch }, payload) {
    try {
      const categoryDetail = payload;
      commit('SET_LOADER', true, { root: true });

      let categorySlug = categoryDetail.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

      let isSlugAvailable = false;
      isSlugAvailable = await dispatch('getCategoryBySlug', categorySlug);
      if (isSlugAvailable) {
        commit('SET_LOADER', false, { root: true });
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: `${categoryDetail.name} category is already exist`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }

      const input = {
        name: categoryDetail.name,
        image: categoryDetail.imageUrl,
        slug: categorySlug,
      };

      const createdCat = await API.graphql({
        query: createCategory,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      const categoryId = createdCat.data.createCategory.id;

      let isValid;
      for (let i = 0; i < categoryDetail.subCat.length; i++) {
        isValid = await dispatch('createNewSubCategory', {
          categoryId: categoryId,
          subCatDetail: categoryDetail.subCat[i],
        });

        if (!isValid) {
          break;
        }
      }

      if (!isValid) {
        commit('SET_LOADER', false, { root: true });
        return isValid;
      }

      await dispatch('testManagement/getAllCategories', false, {
        root: true,
      });

      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async createNewSubCategory(_, payload) {
    try {
      const category_id = payload.categoryId;
      const subCatDetail = payload.subCatDetail;
      let subCatSlug = subCatDetail.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

      const input = {
        name: subCatDetail.name,
        slug: subCatSlug,
        image: subCatDetail.imageUrl,
        category_id,
      };

      await API.graphql({
        query: createSubCategory,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      return true;
    } catch (err) {
      return false;
    }
  },

  async updateCategory({ commit, dispatch }, payload) {
    commit('SET_LOADER', true, { root: true });
    const categoryDetail = payload;
    try {
      let categorySlug = categoryDetail.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

      let isSlugAvailable = false;
      isSlugAvailable = await dispatch('getCategoryBySlug', categorySlug);
      if (isSlugAvailable && categoryDetail.imageUrl === isSlugAvailable.image) {
        commit('SET_LOADER', false, { root: true });
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: `${categoryDetail.name} category is already exist`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 7000,
        });
        return false;
      }

      const input = {
        id: categoryDetail.categoryId,
        name: categoryDetail.name,
        image: categoryDetail.imageUrl,
        slug: categorySlug,
      };
      await API.graphql({
        query: updateCategory,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      await dispatch('testManagement/getAllCategories', false, {
        root: true,
      });

      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async updateSubCategory({ commit, dispatch }, payload) {
    commit('SET_LOADER', true, { root: true });
    const subCatName = payload.name;
    const subCatImageUrl = payload.imageUrl;
    const subCatId = payload.subCategoryId;

    let subCategorySlug = subCatName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    let isSlugAvailable = false;
    isSlugAvailable = await dispatch('getSubCategoryBySlug', {
      subCategoryId: subCatId,
      slug: subCategorySlug,
    });

    if (isSlugAvailable) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: `"${subCatName}" is already exist in "${isSlugAvailable.category.name}" category`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }

    try {
      const input = {
        id: subCatId,
        name: subCatName,
        image: subCatImageUrl,
        slug: subCategorySlug,
      };

      await API.graphql({
        query: updateSubCategory,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  async addSubCategoriesInCategory({ commit, dispatch }, payload) {
    try {
      const categoryId = payload.categoryId;
      const subCatArr = payload.subCat;
      commit('SET_LOADER', true, { root: true });

      let isValid;
      for (let i = 0; i < subCatArr.length; i++) {
        isValid = await dispatch('createNewSubCategory', {
          categoryId,
          subCatDetail: subCatArr[i],
        });

        if (!isValid) {
          break;
        }
      }

      if (!isValid) {
        commit('SET_LOADER', false, { root: true });
        return isValid;
      }

      commit('SET_LOADER', false, { root: true });
      return true;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      this.$swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 7000,
      });
      return false;
    }
  },

  //
  async getCategoryBySlug({ commit }, payload) {
    const slug = payload;
    try {
      const filter = {
        slug: { eq: slug },
      };
      const testQueryData = await API.graphql({
        query: listCategories,
        variables: { filter },
      });
      const categoryArray = testQueryData.data.listCategories.items;
      if (categoryArray.length && categoryArray[0].id) {
        // Slug is available
        return categoryArray[0];
      }
      // Slug is not available
      return false;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },

  async getSubCategoryBySlug({ commit }, payload) {
    const subCategoryId = payload.subCategoryId;
    const slug = payload.slug;
    try {
      const testQueryData = await API.graphql({
        query: subCategoryUpdate,
        variables: { id: subCategoryId, slug },
      });
      const subCategoryArray = testQueryData.data.getSubCategory.category.sub_category.items;
      if (subCategoryArray.length && subCategoryArray[0].id) {
        // Slug is available
        return subCategoryArray[0];
      }
      // Slug is not available
      return false;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },
};
