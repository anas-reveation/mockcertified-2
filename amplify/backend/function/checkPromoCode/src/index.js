/* Amplify Params - DO NOT EDIT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const axios = require('axios');
const GRAPHQLAPI_KEY_OUTPUT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT;
const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const gotPromoCode = event.arguments.promocode;

  var filter = { promotion_code: { eq: gotPromoCode } };
  const getAllPromoCodes = /* GraphQL */ `
    query ListPromotions($filter: ModelPromotionFilterInput) {
      listPromotions(filter: $filter) {
        items {
          id
          promotion_code
          discount_percentage
        }
      }
    }
  `;

  let statusCode = 200;
  let body;

  const headers = {
    'x-api-key': GRAPHQLAPI_KEY_OUTPUT,
  };
  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query: getAllPromoCodes,
        variables: { filter: filter },
      },
      {
        headers,
      },
    );
    console.log(filter);
    console.log(response.data.data.listPromotions.items[0]);
    let result = response.data.data.listPromotions.items[0];
    if (result) {
      statusCode = 200;
      body = {
        message: 'success',
        discountPercentage: result,
        status: 200,
      };
    } else {
      statusCode = 404;
      body = {
        message: 'not found',
        status: 404,
      };
    }
  } catch (error) {
    statusCode = 500;
    body = {
      message: 'something went wrong',
      status: 500,
    };
    console.log('error', error);
  }
  return JSON.stringify(body);
};
