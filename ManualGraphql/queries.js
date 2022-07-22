export const userTests = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      purchased_tests {
        items {
          id
          test {
            title
            time_limit
            id
            category_id
            price
            description
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
          test {
            id
            price
            title
            time_limit
            description
            questions {
              items {
                id
                marks
                options
                question
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
                marks
              }
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
