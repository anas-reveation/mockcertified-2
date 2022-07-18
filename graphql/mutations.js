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
export const createTestManager = /* GraphQL */ `
  mutation CreateTestManager(
    $input: CreateTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    createTestManager(input: $input, condition: $condition) {
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
export const updateTestManager = /* GraphQL */ `
  mutation UpdateTestManager(
    $input: UpdateTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    updateTestManager(input: $input, condition: $condition) {
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
export const deleteTestManager = /* GraphQL */ `
  mutation DeleteTestManager(
    $input: DeleteTestManagerInput!
    $condition: ModelTestManagerConditionInput
  ) {
    deleteTestManager(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createPurchasedTest = /* GraphQL */ `
  mutation CreatePurchasedTest(
    $input: CreatePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    createPurchasedTest(input: $input, condition: $condition) {
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
export const updatePurchasedTest = /* GraphQL */ `
  mutation UpdatePurchasedTest(
    $input: UpdatePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    updatePurchasedTest(input: $input, condition: $condition) {
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
export const deletePurchasedTest = /* GraphQL */ `
  mutation DeletePurchasedTest(
    $input: DeletePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    deletePurchasedTest(input: $input, condition: $condition) {
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
export const createAttemptedTest = /* GraphQL */ `
  mutation CreateAttemptedTest(
    $input: CreateAttemptedTestInput!
    $condition: ModelAttemptedTestConditionInput
  ) {
    createAttemptedTest(input: $input, condition: $condition) {
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
      status
      remaining_time
      result {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAttemptedTest = /* GraphQL */ `
  mutation UpdateAttemptedTest(
    $input: UpdateAttemptedTestInput!
    $condition: ModelAttemptedTestConditionInput
  ) {
    updateAttemptedTest(input: $input, condition: $condition) {
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
      status
      remaining_time
      result {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAttemptedTest = /* GraphQL */ `
  mutation DeleteAttemptedTest(
    $input: DeleteAttemptedTestInput!
    $condition: ModelAttemptedTestConditionInput
  ) {
    deleteAttemptedTest(input: $input, condition: $condition) {
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
      status
      remaining_time
      result {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createResult = /* GraphQL */ `
  mutation CreateResult(
    $input: CreateResultInput!
    $condition: ModelResultConditionInput
  ) {
    createResult(input: $input, condition: $condition) {
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
export const updateResult = /* GraphQL */ `
  mutation UpdateResult(
    $input: UpdateResultInput!
    $condition: ModelResultConditionInput
  ) {
    updateResult(input: $input, condition: $condition) {
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
export const deleteResult = /* GraphQL */ `
  mutation DeleteResult(
    $input: DeleteResultInput!
    $condition: ModelResultConditionInput
  ) {
    deleteResult(input: $input, condition: $condition) {
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
