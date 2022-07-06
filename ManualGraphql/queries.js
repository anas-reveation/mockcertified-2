export const purchasedTests = /* GraphQL */ `
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
                answer
                explainantion
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
