/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onboardingStripe = /* GraphQL */ `
  query OnboardingStripe {
    onboardingStripe
  }
`;
export const getBalance = /* GraphQL */ `
  query GetBalance($seller_id: String!) {
    getBalance(seller_id: $seller_id)
  }
`;
export const redirectPayoutDashboard = /* GraphQL */ `
  query RedirectPayoutDashboard($seller_id: String!) {
    redirectPayoutDashboard(seller_id: $seller_id)
  }
`;
export const getStripeIdStatus = /* GraphQL */ `
  query GetStripeIdStatus($seller_id: String!) {
    getStripeIdStatus(seller_id: $seller_id)
  }
`;
export const checkPromoCode = /* GraphQL */ `
  query CheckPromoCode($promocode: String!) {
    checkPromoCode(promocode: $promocode)
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      user_agreement
      stripe_seller_id
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
        user_agreement
        stripe_seller_id
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
      created_by {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
      }
      category_id
      sub_category_id
      category {
        id
        name
        image
        createdAt
        updatedAt
      }
      title
      description
      reject_description
      credit
      price
      status
      tags
      time_limit
      questions {
        nextToken
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
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        price
        status
        tags
        time_limit
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listTestsByStatus = /* GraphQL */ `
  query ListTestsByStatus(
    $status: TestManagerStatus!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTestManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestsByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        price
        status
        tags
        time_limit
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
      marks
      test_id
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        price
        status
        tags
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      sub_category {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubCategory = /* GraphQL */ `
  query GetSubCategory($id: ID!) {
    getSubCategory(id: $id) {
      id
      name
      category_id
      image
      category {
        id
        name
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSubCategories = /* GraphQL */ `
  query ListSubCategories(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category_id
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPurchasedTest = /* GraphQL */ `
  query GetPurchasedTest($id: ID!) {
    getPurchasedTest(id: $id) {
      id
      user_id
      test_id
      purchased_by {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
      }
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        price
        status
        tags
        time_limit
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPurchasedTests = /* GraphQL */ `
  query ListPurchasedTests(
    $filter: ModelPurchasedTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPurchasedTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getAttemptedTest = /* GraphQL */ `
  query GetAttemptedTest($id: ID!) {
    getAttemptedTest(id: $id) {
      id
      user_id
      attempted_by {
        id
        first_name
        last_name
        email
        user_agreement
        stripe_seller_id
        createdAt
        updatedAt
      }
      test_id
      test {
        id
        user_id
        category_id
        sub_category_id
        title
        description
        reject_description
        credit
        price
        status
        tags
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
export const listAttemptedTests = /* GraphQL */ `
  query ListAttemptedTests(
    $filter: ModelAttemptedTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttemptedTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        test_id
        status
        remaining_time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
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
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        attempted_id
        question_id
        user_input
        result_status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPromotion = /* GraphQL */ `
  query GetPromotion($id: ID!) {
    getPromotion(id: $id) {
      id
      promotion_code
      discount_percentage
      expiry_date
      createdAt
      updatedAt
    }
  }
`;
export const listPromotions = /* GraphQL */ `
  query ListPromotions(
    $filter: ModelPromotionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPromotions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        promotion_code
        discount_percentage
        expiry_date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
