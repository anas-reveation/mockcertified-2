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
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAS6LQVSVPI3ABYAAT',
  secretAccessKey: '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',
});

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

const getTestDetailQuery = /* GraphQL */ `
  query GetTestManager($id: ID!) {
    getTestManager(id: $id) {
      created_by {
        id
        stripe_seller_id
        email
      }
      title
      price
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

  const getTestDetail = async (testId) => {
    const paramsObj = {
      query: getTestDetailQuery,
      variables: {
        id: testId,
      },
    };
    const headers = {
      headers: {
        'x-api-key': GRAPHQLAPI_KEY_OUTPUT,
      },
    };
    const testResult = await axios.post(GRAPHQL_ENDPOINT, paramsObj, headers);
    let testdetail = {};
    testdetail.title = testResult.data.data.getTestManager.title;
    testdetail.email = testResult.data.data.getTestManager.created_by.email;

    return testdetail;
  };
  // End Function

  //Email Function
  async function sendMail(toEmail, name) {
    var params = {
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: 'UTF-8',
            Data: '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 20px"> <div style="border-bottom:1px solid #eee"> <img src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"></img> </div> <p style="font-size:1.1em">Hi,</p> <p>Thank you for creating a test in MockCertified. The test is now available in the app for purchase. Share the test as much as possilbe to earn and spread knowledge</p><p style="font-size:0.9em;">Regards,<br />MockCertified Team</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <img src="https://amplify-mobileappmarketplace-dev-123858-deployment.s3.amazonaws.com/logo_with_name.svg"></img> </div> </div> </div>',
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'TEXT_FORMAT_BODY',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          // Data: `Your Test ${name} is approved and availble to users for purchase`,
          Data: `Your Test ${name} is been purchased by a User of MockCertified`,
        },
      },
      Source: 'support@mockcertified.com',
    };
    var sendPromise = new AWS.SES().sendEmail(params).promise();
    await sendPromise;
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { customer_id, test_id } = session.metadata;
    const { payment_status } = session;

    if (payment_status === 'paid') {
      try {
        await purchaseTest(test_id, customer_id);
        let testdetail = await getTestDetail(test_id);
        sendMail(testdetail.email, testdetail.title);
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
