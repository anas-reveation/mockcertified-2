/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateBoughtHistory = /* GraphQL */ `
  subscription OnCreateBoughtHistory {
    onCreateBoughtHistory {
      id
      user_id
      test_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBoughtHistory = /* GraphQL */ `
  subscription OnUpdateBoughtHistory {
    onUpdateBoughtHistory {
      id
      user_id
      test_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBoughtHistory = /* GraphQL */ `
  subscription OnDeleteBoughtHistory {
    onDeleteBoughtHistory {
      id
      user_id
      test_id
      createdAt
      updatedAt
    }
  }
`;
