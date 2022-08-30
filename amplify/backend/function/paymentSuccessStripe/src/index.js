/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	STRIPE_SECRET_KEY
	STRIPE_PUBLISHABLE_KEY
  SIGNING_SECRET_WEBHOOK
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const GRAPHQLAPI_KEY_OUTPUT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT;
const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;

const createPurchasedTest = /* GraphQL */ `
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

exports.handler = async (eventLambda) => {
  const endpointSecret = process.env.SIGNING_SECRET_WEBHOOK;
  const sig = eventLambda.headers['stripe-signature'];

  let status = 200;
  let message;

  let event;

  try {
    event = stripe.webhooks.constructEvent(eventLambda.body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook Error: ', err.message);
    return JSON.stringify({
      status: 400,
      message: 'failed',
      error: `'Webhook Error: ${err.message}'`,
    });
  }

  // Start Function
  const purchaseTest = async (testId, customerId) => {
    const input = { test_id: testId, user_id: customerId };
    const paramsObj = {
      query: createPurchasedTest,
      variables: {
        input,
      },
    };

    const headers = {
      headers: {
        'x-api-key': GRAPHQLAPI_KEY_OUTPUT,
      },
    };

    const res = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
    console.log('Response: ', res);
  };
  // End Function

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { customer_id, test_id } = session.metadata;
    const { payment_status } = session;

    if (payment_status === 'paid') {
      try {
        await purchaseTest(test_id, customer_id);
        message = 'success';
      } catch (err) {
        console.log('ERROR: ', err);
        status = 500;
        message = 'Something went wrong';
      }
    } else if (payment_status === 'unpaid') {
      status = 424;
      message = "failed: you haven't completed payment";
    }
  }

  return JSON.stringify({
    status,
    message,
  });
};
