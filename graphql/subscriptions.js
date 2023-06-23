/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateTestManager = /* GraphQL */ `
  subscription OnCreateTestManager(
    $filter: ModelSubscriptionTestManagerFilterInput
    $user_id: String
  ) {
    onCreateTestManager(filter: $filter, user_id: $user_id) {
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
        slug
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
      slug
      feedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTestManager = /* GraphQL */ `
  subscription OnUpdateTestManager(
    $filter: ModelSubscriptionTestManagerFilterInput
    $user_id: String
  ) {
    onUpdateTestManager(filter: $filter, user_id: $user_id) {
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
        slug
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
      slug
      feedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTestManager = /* GraphQL */ `
  subscription OnDeleteTestManager(
    $filter: ModelSubscriptionTestManagerFilterInput
    $user_id: String
  ) {
    onDeleteTestManager(filter: $filter, user_id: $user_id) {
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
        slug
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
      slug
      feedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
        slug
        createdAt
        updatedAt
      }
      question
      answer
      explainantion
      options
      is_showcase
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
        slug
        createdAt
        updatedAt
      }
      question
      answer
      explainantion
      options
      is_showcase
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
        slug
        createdAt
        updatedAt
      }
      question
      answer
      explainantion
      options
      is_showcase
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
      id
      name
      image
      slug
      sub_category {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
      id
      name
      image
      slug
      sub_category {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
      id
      name
      image
      slug
      sub_category {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubCategory = /* GraphQL */ `
  subscription OnCreateSubCategory(
    $filter: ModelSubscriptionSubCategoryFilterInput
  ) {
    onCreateSubCategory(filter: $filter) {
      id
      name
      category_id
      image
      slug
      category {
        id
        name
        image
        slug
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubCategory = /* GraphQL */ `
  subscription OnUpdateSubCategory(
    $filter: ModelSubscriptionSubCategoryFilterInput
  ) {
    onUpdateSubCategory(filter: $filter) {
      id
      name
      category_id
      image
      slug
      category {
        id
        name
        image
        slug
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubCategory = /* GraphQL */ `
  subscription OnDeleteSubCategory(
    $filter: ModelSubscriptionSubCategoryFilterInput
  ) {
    onDeleteSubCategory(filter: $filter) {
      id
      name
      category_id
      image
      slug
      category {
        id
        name
        image
        slug
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePurchasedTest = /* GraphQL */ `
  subscription OnCreatePurchasedTest(
    $filter: ModelSubscriptionPurchasedTestFilterInput
  ) {
    onCreatePurchasedTest(filter: $filter) {
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
        slug
        createdAt
        updatedAt
      }
      promocode_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePurchasedTest = /* GraphQL */ `
  subscription OnUpdatePurchasedTest(
    $filter: ModelSubscriptionPurchasedTestFilterInput
  ) {
    onUpdatePurchasedTest(filter: $filter) {
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
        slug
        createdAt
        updatedAt
      }
      promocode_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePurchasedTest = /* GraphQL */ `
  subscription OnDeletePurchasedTest(
    $filter: ModelSubscriptionPurchasedTestFilterInput
  ) {
    onDeletePurchasedTest(filter: $filter) {
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
        slug
        createdAt
        updatedAt
      }
      promocode_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onCreateFeedback(filter: $filter) {
      id
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
        slug
        createdAt
        updatedAt
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        promocode_id
        createdAt
        updatedAt
      }
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onUpdateFeedback(filter: $filter) {
      id
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
        slug
        createdAt
        updatedAt
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        promocode_id
        createdAt
        updatedAt
      }
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onDeleteFeedback(filter: $filter) {
      id
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
        slug
        createdAt
        updatedAt
      }
      purchased_id
      purchased_test {
        id
        user_id
        test_id
        promocode_id
        createdAt
        updatedAt
      }
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAttemptedTest = /* GraphQL */ `
  subscription OnCreateAttemptedTest(
    $filter: ModelSubscriptionAttemptedTestFilterInput
  ) {
    onCreateAttemptedTest(filter: $filter) {
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
        slug
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
export const onUpdateAttemptedTest = /* GraphQL */ `
  subscription OnUpdateAttemptedTest(
    $filter: ModelSubscriptionAttemptedTestFilterInput
  ) {
    onUpdateAttemptedTest(filter: $filter) {
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
        slug
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
export const onDeleteAttemptedTest = /* GraphQL */ `
  subscription OnDeleteAttemptedTest(
    $filter: ModelSubscriptionAttemptedTestFilterInput
  ) {
    onDeleteAttemptedTest(filter: $filter) {
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
        slug
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
export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult($filter: ModelSubscriptionResultFilterInput) {
    onCreateResult(filter: $filter) {
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
        is_showcase
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
  subscription OnUpdateResult($filter: ModelSubscriptionResultFilterInput) {
    onUpdateResult(filter: $filter) {
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
        is_showcase
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
  subscription OnDeleteResult($filter: ModelSubscriptionResultFilterInput) {
    onDeleteResult(filter: $filter) {
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
        is_showcase
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
export const onCreatePromotion = /* GraphQL */ `
  subscription OnCreatePromotion(
    $filter: ModelSubscriptionPromotionFilterInput
  ) {
    onCreatePromotion(filter: $filter) {
      id
      promotion_code
      discount_percentage
      expiry_date
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePromotion = /* GraphQL */ `
  subscription OnUpdatePromotion(
    $filter: ModelSubscriptionPromotionFilterInput
  ) {
    onUpdatePromotion(filter: $filter) {
      id
      promotion_code
      discount_percentage
      expiry_date
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePromotion = /* GraphQL */ `
  subscription OnDeletePromotion(
    $filter: ModelSubscriptionPromotionFilterInput
  ) {
    onDeletePromotion(filter: $filter) {
      id
      promotion_code
      discount_percentage
      expiry_date
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStaticContent = /* GraphQL */ `
  subscription OnCreateStaticContent(
    $filter: ModelSubscriptionStaticContentFilterInput
  ) {
    onCreateStaticContent(filter: $filter) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStaticContent = /* GraphQL */ `
  subscription OnUpdateStaticContent(
    $filter: ModelSubscriptionStaticContentFilterInput
  ) {
    onUpdateStaticContent(filter: $filter) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStaticContent = /* GraphQL */ `
  subscription OnDeleteStaticContent(
    $filter: ModelSubscriptionStaticContentFilterInput
  ) {
    onDeleteStaticContent(filter: $filter) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSearchFeedback = /* GraphQL */ `
  subscription OnCreateSearchFeedback(
    $filter: ModelSubscriptionSearchFeedbackFilterInput
  ) {
    onCreateSearchFeedback(filter: $filter) {
      id
      user_email
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSearchFeedback = /* GraphQL */ `
  subscription OnUpdateSearchFeedback(
    $filter: ModelSubscriptionSearchFeedbackFilterInput
  ) {
    onUpdateSearchFeedback(filter: $filter) {
      id
      user_email
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSearchFeedback = /* GraphQL */ `
  subscription OnDeleteSearchFeedback(
    $filter: ModelSubscriptionSearchFeedbackFilterInput
  ) {
    onDeleteSearchFeedback(filter: $filter) {
      id
      user_email
      description
      status
      createdAt
      updatedAt
    }
  }
`;
