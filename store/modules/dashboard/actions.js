import { API } from 'aws-amplify';

import { getUser, listUsers } from '~/graphql/queries';
import { listAllTests, userTests } from '~/ManualGraphql/queries';

export default {
  async getTestData({ commit, dispatch }, payload) {
    const userId = payload;

    console.log(userId, 'user-id');

    commit('SET_LOADER', true, { root: true });

    try {
      const userTestData = await API.graphql({
        query: userTests, // Use the getUser query to fetch the user's data
        variables: { id: userId },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      console.log(userTestData.data.getUser);
      // const testCollection = userTestData.data.listUsers.items;
      // console.log(testCollection);

      commit('setuserData', userTestData.data.getUser);

      commit('SET_LOADER', false, { root: true });
      return userTestData;
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
