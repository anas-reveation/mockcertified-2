import { API } from 'aws-amplify';
import { listAllTests } from '~/ManualGraphql/queries';
import { updateTestManager } from '~/graphql/mutations';

export default {
  async getAllTests({ commit, rootState, dispatch }, payload) {
    commit('SET_LOADER', true, { root: true });

    try {
      const allTestsData = await API.graphql({
        query: listAllTests,
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
      console.error('ERR', err);
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
      console.error(err);
      commit('SET_LOADER', false, { root: true });
      return false;
    }
  },
};
