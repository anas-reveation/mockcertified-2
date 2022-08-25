/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	STRIPE_SECRET_KEY
	STRIPE_PUBLISHABLE_KEY
	DOMAIN_ORIGIN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;
const axios = require('axios');

const purchasedTestMutation = /* GraphQL */ `
  mutation CreatePurchasedTest(
    $input: CreatePurchasedTestInput!
    $condition: ModelPurchasedTestConditionInput
  ) {
    createPurchasedTest(input: $input, condition: $condition) {
      user_id
      test_id
    }
  }
`;

const getUserPurchasedTestQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      purchased_tests {
        items {
          test_id
        }
      }
    }
  }
`;

exports.handler = async (event) => {
  let statusCode = 200;
  let body;
  try {
    const sessionId = event.arguments.session_id;
    const jwtToken = event.arguments.token;
    const paymentData = await stripe.checkout.sessions.retrieve(sessionId);

    const { customer_id, test_id } = paymentData.metadata;

    const alreadyPurchased = async () => {
      const paramsObj = {
        query: getUserPurchasedTestQuery,
        variables: {
          id: customer_id,
        },
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
      const purchasedTests = response.data.data.getUser.purchased_tests.items;
      let isPurchased = false;
      purchasedTests.forEach((testId) => {
        if (testId.test_id === test_id) {
          isPurchased = true;
          return;
        }
      });
      return isPurchased;
    };

    const purchaseTest = async () => {
      const input = { test_id, user_id: customer_id };
      const paramsObj = {
        query: purchasedTestMutation,
        variables: {
          input,
        },
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
    };

    const isPurchased = await alreadyPurchased();
    if (!isPurchased) {
      if (paymentData.payment_status === 'unpaid') {
        statusCode = 424;
        body = { message: "failed: you haven't completed payment" };
      } else if (paymentData.payment_status === 'paid') {
        await purchaseTest();
        statusCode = 200;
        body = { message: 'success' };
      }
    } else {
      statusCode = 409;
      body = { message: 'already exist' };
    }
  } catch (err) {
    console.log('ERROR ->', err);
    statusCode = 500;
    body = {
      message: err,
    };
  }
  const returnValue = {
    statusCode,
    body,
  };

  return JSON.stringify(returnValue);
};
