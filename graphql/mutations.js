/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      createdAt
      updatedAt
    }
  }
`;
export const createTestManager = /* GraphQL */ `
  mutation CreateTestManager(
    $input: CreateTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    createTestManager(input: $input, condition: $condition) {
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
export const updateTestManager = /* GraphQL */ `
  mutation UpdateTestManager(
    $input: UpdateTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    updateTestManager(input: $input, condition: $condition) {
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
export const deleteTestManager = /* GraphQL */ `
  mutation DeleteTestManager(
    $input: DeleteTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    deleteTestManager(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
