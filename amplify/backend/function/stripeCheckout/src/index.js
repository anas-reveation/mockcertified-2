/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	STRIPE_PUBLISHABLE_KEY
	STRIPE_SECRET_KEY
	DOMAIN_ORIGIN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require('axios');
const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getTestDetailQuery = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      created_by {
        id
        stripe_seller_id
      }
      title
      price
    }
  }
`;

exports.handler = async (event) => {
  const testId = event.arguments.test_id;
  const jwtToken = event.arguments.token;
  let statusCode = 200;
  let body;
  try {
    const getTestDetail = async (id) => {
      const paramsObj = {
        query: getTestDetailQuery,
        variables: {
          id,
        },
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
      const testRes = response.data.data.getTestManager;
      const detail = {
        title: testRes.title,
        price: testRes.price,
        sellerId: testRes.created_by.stripe_seller_id,
      };
      return detail;
    };

    // Start STRIPE
    const stripePayment = async (title, basePrice, sellerId) => {
      const quantity = 1;
      const calculateApplicationFeeAmount = 0.1 * (basePrice * 100) * quantity;
      const domainURL = process.env.DOMAIN_ORIGIN;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            name: title,
            quantity,
            currency: 'USD',
            amount: basePrice * 100, // Keep the amount on the server to prevent customers from manipulating on client
          },
        ],

        payment_intent_data: {
          application_fee_amount: calculateApplicationFeeAmount,
          // The account receiving the funds, as passed from the client.
          transfer_data: {
            destination: sellerId,
          },
        },
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${domainURL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/payment-canceled`,
      });

      return session;
    };
    // End STRIPE

    const testDetail = await getTestDetail(testId);
    const sessionData = await stripePayment(
      testDetail.title,
      testDetail.price,
      testDetail.sellerId,
    );

    statusCode = 200;
    body = { message: 'success', url: sessionData.url, session_id: sessionData.id };
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
