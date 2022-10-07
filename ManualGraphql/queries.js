export const userTests = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      purchased_tests {
        items {
          id
          createdAt
          test {
            title
            time_limit
            id
            category_id
            price
            description
            credit
            questions {
              items {
                id
                marks
                options
                question
                createdAt
              }
            }
            created_by {
              first_name
              last_name
              id
            }
          }
        }
      }
      attempted_tests {
        items {
          id
          status
          test_id
          remaining_time
          createdAt
          test {
            id
            price
            title
            time_limit
            description
            credit
            questions {
              items {
                id
                marks
                options
                question
                answer
              }
            }
            created_by {
              first_name
              id
              last_name
            }
          }
          result {
            items {
              question_id
              result_status
              user_input
              question {
                options
                question
                marks
                answer
                explainantion
              }
            }
          }
        }
      }
      created_tests {
        items {
          title
          category_id
          description
          reject_description
          credit
          id
          price
          time_limit
          status
          createdAt
          questions {
            items {
              answer
              explainantion
              id
              marks
              options
              question
            }
          }
        }
      }
    }
  }
`;

export const getTestDetail = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
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
      credit
      price
      time_limit
      createdAt
      updatedAt
      questions {
        items {
          marks
        }
      }
    }
  }
`;

export const listAllTests = /* GraphQL */ `
  query ListTestManagers($filter: ModelTestManagerFilterInput, $limit: Int, $nextToken: String) {
    listTestManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        category_id
        title
        description
        credit
        price
        status
        time_limit
        reject_description
        createdAt
        updatedAt
        questions {
          items {
            answer
            explainantion
            id
            marks
            options
            question
          }
        }
        created_by {
          id
          first_name
          last_name
          email
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const listTestsByStatus = /* GraphQL */ `
  query ListTestsByStatus(
    $status: TestManagerStatus!
    $sortDirection: ModelSortDirection
    $filter: ModelTestManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestsByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        category_id
        title
        description
        price
        status
        time_limit
        reject_description
        createdAt
        updatedAt
        questions {
          items {
            answer
            explainantion
            id
            marks
            options
            question
          }
        }
        created_by {
          id
          first_name
          last_name
          email
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const getCategoryDetail = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      sub_category {
        items {
          id
          name
          image
          category_id
        }
      }
    }
  }
`;

export const listCategoriesDetail = /* GraphQL */ `
  query ListCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        sub_category {
          items {
            id
            name
            image
          }
        }
      }
    }
  }
`;
