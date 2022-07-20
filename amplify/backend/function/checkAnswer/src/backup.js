/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MOBILEAPPMARKETPLACEE1E8CC85_USERPOOLID
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILEAPPMARKETPLACE_GRAPHQLAPIKEYOUTPUT
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const aws4Interceptor2 = require('aws4-axios');
const { aws4Interceptor } = aws4Interceptor2;

const crypto = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');

const { Sha256 } = crypto;

const GRAPHQL_ENDPOINT = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILEAPPMARKETPLACE_GRAPHQLAPIIDOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  const result_id = JSON.stringify(event.result_id);
  const question_id = JSON.stringify(event.question_id);
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const getQuestion = /* GraphQL */ `
    query GetQuestion($id: ID!) {
      getQuestion(id: $id) {
        id
      }
    }
  `;

  const getResult = /* GraphQL */ `
    query GetResult($id: ID!) {
      getResult(id: $id) {
        id
      }
    }
  `;

  /** @type {import('node-fetch').RequestInit} */

  let statusCode = 200;
  let body;
  let response;

  const client = axios.create();

  const interceptor = aws4Interceptor(
    {
      region: AWS_REGION,
      service: 'appsync',
    },
    {
      secretAccessKey: 'Ef8k7iuf88UlBvO1FZ7EOSXUxqUOt/6E3/z6jzkW',
      accessKeyId: 'AKIAS6LQVSVPA66LN7FF',
    },
  );

  client.interceptors.request.use(interceptor);

  const token2 =
    'eyJraWQiOiJTNlNVWnlMaHZ0SjUyRkNsM1VlVlNnY0UxRUFpOTFFcFY5TE04QVVLVEg4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNTQzMjk4My1kZTU2LTQ3NjQtOTkyYi0wZDMzMzFlYWY2OWMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbnMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZTUG41NlBrbCIsImNvZ25pdG86dXNlcm5hbWUiOiJhNTQzMjk4My1kZTU2LTQ3NjQtOTkyYi0wZDMzMzFlYWY2OWMiLCJvcmlnaW5fanRpIjoiNzRjZTU4ZGMtMGJlNS00YmZmLTkwMWQtNTc0OWRmNjdjYjAxIiwiYXVkIjoiNmkxYXE4bWxiZXAwNHYwdXZxZmZnc3BqM2EiLCJldmVudF9pZCI6IjQ4ZjhmNjBmLTdhZjYtNDg0Zi1hYTY3LWVmODA5MjBmNmZmOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU4MTI4MDIwLCJleHAiOjE2NTgzMTg0NTUsImlhdCI6MTY1ODIzMjA1NSwianRpIjoiMjUwMzM3MTEtN2Q4OC00MTAwLWFjMDEtNDk2NGQ4NGVjNjVkIiwiZW1haWwiOiJqZXdlbGxzLnJldmVhdGlvbkBnbWFpbC5jb20ifQ.4WGDxS3o9rS_5m1-cKnLRT3H30jodskZxkmWnstDb1nm5qmOoRYOeWNP2FV2yUd3b2ae71euZdyIk1onWCuSnXmx-32es4XGvaK8bHQZ-d2cwf9hqLUakNdwXScf--9JPc4YGFnfwglA6QeP1ZcRiV9G5S6xjaUHbnTtZXBx6FU0YzdtAXHFHCPJotAS2GxgnXBBGjeaDlzZ_7_lyYh2tZqiMRhXOFlMKhv2Mav0mvJVsr2d1pxedgX3m80EE-jQSdXJ3m2gpr4rZDd_gk-CB4GOeUMx1G2m0NGDtprict5YJe72VLRDromqiAXIEwUEVicrUOBrUQ8ZCIcuiC4nfg';

  try {
    console.log('question_id1', question_id);
    console.log('question_id2', '98644bdd-4041-4dd1-9c07-5703d098fe7a');
    console.log('question_id', question_id === '98644bdd-4041-4dd1-9c07-5703d098fe7a');
    response = await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query: getResult,
        variables: {
          id: 'f9e8eb1e-f328-41bd-a6a8-789db61d2f1b',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      },
    );

    body = response;
    console.log('body', body.data);

    const endpoint = new URL(GRAPHQL_ENDPOINT);

    const signer = new SignatureV4({
      credentials: defaultProvider(),
      region: AWS_REGION,
      service: 'appsync',
      sha256: Sha256,
    });

    const requestToBeSigned = new HttpRequest({
      headers: {
        'Content-Type': 'application/json',
        host: endpoint.host,
      },
      hostname: endpoint.host,
      data: JSON.stringify({ getResult }),
      path: endpoint.pathname,
    });

    const signed = await signer.sign(requestToBeSigned);
    // console.log('signed', signed.headers);

    const response2 = await client.post(
      GRAPHQL_ENDPOINT,
      {
        query: getResult,
        variables: {
          id: 'f9e8eb1e-f328-41bd-a6a8-789db61d2f1b',
        },
      },
      {
        headers: signed.headers,
      },
    );
    console.log('response2', response2.data);
  } catch (error) {
    statusCode = 400;
    // console.log('error', error);
    console.log('error', error.response.data);
    // body = {
    //   errors: [
    //     {
    //       status: response.status,
    //       message: error.message,
    //       stack: error.stack,
    //     },
    //   ],
    // };
  }

  return {
    statusCode,
    // body: body,
  };
};
