/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      first_name
      last_name
      email
      created_tests {
        nextToken
      }
      purchased_tests {
        nextToken
      }
      attempted_tests {
        nextToken
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
      created_tests {
        nextToken
      }
      purchased_tests {
        nextToken
      }
      attempted_tests {
        nextToken
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
      created_tests {
        nextToken
      }
      purchased_tests {
        nextToken
      }
      attempted_tests {
        nextToken
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
      created_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      category_id
      category {
        id
        name
        createdAt
        updatedAt
      }
      title
      description
      price
      time_limit
      questions {
        nextToken
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
      created_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      category_id
      category {
        id
        name
        createdAt
        updatedAt
      }
      title
      description
      price
      time_limit
      questions {
        nextToken
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
      created_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      category_id
      category {
        id
        name
        createdAt
        updatedAt
      }
      title
      description
      price
      time_limit
      questions {
        nextToken
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
      marks
      test_id
      test {
        id
        user_id
        category_id
        title
        description
        price
        time_limit
        createdAt
        updatedAt
      }
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
      marks
      test_id
      test {
        id
        user_id
        category_id
        title
        description
        price
        time_limit
        createdAt
        updatedAt
      }
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
      marks
      test_id
      test {
        id
        user_id
        category_id
        title
        description
        price
        time_limit
        createdAt
        updatedAt
      }
      question
      answer
      explainantion
      options
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePurchasedTest = /* GraphQL */ `
  subscription OnCreatePurchasedTest {
    onCreatePurchasedTest {
      id
      user_id
      test_id
      purchased_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      test {
        id
        user_id
        category_id
        title
        description
        price
        time_limit
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePurchasedTest = /* GraphQL */ `
  subscription OnUpdatePurchasedTest {
    onUpdatePurchasedTest {
      id
      user_id
      test_id
      purchased_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      test {
        id
        user_id
        category_id
        title
        description
        price
        time_limit
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePurchasedTest = /* GraphQL */ `
  subscription OnDeletePurchasedTest {
    onDeletePurchasedTest {
      id
      user_id
      test_id
      purchased_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      test {
        id
        user_id
        category_id
        title
        description
        price
        time_limit
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAttemptedTest = /* GraphQL */ `
  subscription OnCreateAttemptedTest {
    onCreateAttemptedTest {
      id
      user_id
      attempted_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        createdAt
        updatedAt
      }
      result {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAttemptedTest = /* GraphQL */ `
  subscription OnUpdateAttemptedTest {
    onUpdateAttemptedTest {
      id
      user_id
      attempted_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        createdAt
        updatedAt
      }
      result {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAttemptedTest = /* GraphQL */ `
  subscription OnDeleteAttemptedTest {
    onDeleteAttemptedTest {
      id
      user_id
      attempted_by {
        id
        first_name
        last_name
        email
        createdAt
        updatedAt
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        createdAt
        updatedAt
      }
      result {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult {
    onCreateResult {
      id
      attempted_id
      question_id
      question {
        id
        marks
        test_id
        question
        answer
        explainantion
        options
        createdAt
        updatedAt
      }
      user_input
      result_status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult {
    onUpdateResult {
      id
      attempted_id
      question_id
      question {
        id
        marks
        test_id
        question
        answer
        explainantion
        options
        createdAt
        updatedAt
      }
      user_input
      result_status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult {
    onDeleteResult {
      id
      attempted_id
      question_id
      question {
        id
        marks
        test_id
        question
        answer
        explainantion
        options
        createdAt
        updatedAt
      }
      user_input
      result_status
      createdAt
      updatedAt
    }
  }
`;
