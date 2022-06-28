/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      first_name
      last_name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      first_name
      last_name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      first_name
      last_name
      email
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTestManager = /* GraphQL */ `
  subscription OnCreateTestManager {
    onCreateTestManager {
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
export const onUpdateTestManager = /* GraphQL */ `
  subscription OnUpdateTestManager {
    onUpdateTestManager {
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
export const onDeleteTestManager = /* GraphQL */ `
  subscription OnDeleteTestManager {
    onDeleteTestManager {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
