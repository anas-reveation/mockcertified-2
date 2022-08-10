/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STRIPE_PUBLISHABLE_KEY
	STRIPE_SECRET_KEY
	STRIPE_WEBHOOK_SECRET
	DOMAIN_ORIGIN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async (event) => {
  function generateAccountLink(accountID, origin) {
    return stripe.accountLinks
      .create({
        type: 'account_onboarding',
        account: accountID,
        refresh_url: `${origin}`,
        return_url: `${origin}`,
      })
      .then((link) => link.url);
  }
  try {
    const account = await stripe.accounts.create({ type: 'express' });
    const origin = process.env.DOMAIN_ORIGIN + '/';
    const accountLinkURL = await generateAccountLink(account.id, origin);
    return { statusCode: 200, body: accountLinkURL };
  } catch (err) {
    return { statusCode: 500, body: err };
  }
};
