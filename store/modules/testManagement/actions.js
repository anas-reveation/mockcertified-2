import { API } from 'aws-amplify';
import { getUser, listQuestions, listTestManagers, getTestManager } from '../../../graphql/queries';

export default {
  async getTests({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const allTestData = await API.graphql({
        query: listTestManagers,
      });
      const allTest = allTestData.data.listTestManagers.items;
      commit('SET_LOADER', false, { root: true });

      return allTest;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getTestsByCategory({ commit }, payload) {
    const category = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const filter = {
        category: { eq: category },
      };

      const allTestByCategoryData = await API.graphql({
        query: listTestManagers,
        variables: { filter: filter },
      });
      const allTestByCategory = allTestByCategoryData.data.listTestManagers.items;
      commit('SET_LOADER', false, { root: true });

      return allTestByCategory;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getTestDetail({ commit }, payload) {
    const testId = payload;
    commit('SET_LOADER', true, { root: true });

    try {
      const testQueryData = await API.graphql({
        query: getTestManager,
        variables: { id: testId },
      });
      let testData = testQueryData.data.getTestManager;
      const userId = testData.user_id;

      const userGraphql = await API.graphql({
        query: getUser,
        variables: { id: userId },
      });

      testData = {
        ...testData,
        userFirstName: userGraphql.data.getUser.first_name,
        userLastName: userGraphql.data.getUser.last_name,
      };
      commit('SET_LOADER', false, { root: true });

      return testData;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },

  async getQuestionList({ commit }) {
    commit('SET_LOADER', true, { root: true });

    try {
      const questionListQueryData = await API.graphql({
        query: listQuestions,
      });
      const questionList = questionListQueryData.data.listQuestions.items;
      commit('SET_LOADER', false, { root: true });

      return questionList;
    } catch (err) {
      commit('SET_LOADER', false, { root: true });
      console.error('ERR', err);
    }
  },
};
