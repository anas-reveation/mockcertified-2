/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      bought_history {
        id
        user_id
        test_id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTestManager = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      id
      user_id
      category
      title
      description
      price
      time_limit
      weightage
      test_data {
        id
        test_id
        question
        answer
        explainantion
        options
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTestManagers = /* GraphQL */ `
  query ListTestManagers(
    $filter: ModelTestManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        category
        title
        description
        price
        time_limit
        weightage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      test_id
      question
      answer
      explainantion
      options
      createdAt
      updatedAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        test_id
        question
        answer
        explainantion
        options
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBoughtHistory = /* GraphQL */ `
  query GetBoughtHistory($id: ID!) {
    getBoughtHistory(id: $id) {
      id
      user_id
      test_id
      createdAt
      updatedAt
    }
  }
`;
export const listBoughtHistories = /* GraphQL */ `
  query ListBoughtHistories(
    $filter: ModelBoughtHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoughtHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        test_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
