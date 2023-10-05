import { API } from 'aws-amplify';

import { listTestManagers } from '~/graphql/queries';
import { listAllTests } from '~/ManualGraphql/queries';

export default {
  async getAllTest({ commit, dispatch }, payload) {
    const userId = payload;

    commit('SET_LOADER', true, { root: true });

    try {
      const filter = {
        user_id: { eq: userId },
        and: { status: { eq: 'APPROVED' } },
      };

      const allTestData = await API.graphql({
        query: listAllTests,
        variables: { filter: filter, limit: 10000 },
        // authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const allTest = allTestData.data.listTestManagers.items;
      commit('setAllTest', allTest);

      commit('SET_LOADER', false, { root: true });
      return allTest;
    } catch (err) {
      console.log('error in the line 20', err);
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
    }
  },
};
