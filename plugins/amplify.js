import { Amplify, Analytics } from 'aws-amplify';
import awsConfig from '~/aws-exports';

// Overwrite Oauth(socialAuth) for current domain
let domain = window.location.origin;

const newConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: `${domain}/`,
    redirectSignOut: `${domain}/`,
  },
};

Amplify.configure(newConfig);
// const amazonPinpointAnalytics = process.env.AMAZON_PINPOINT_ANALYTICS;
// if (amazonPinpointAnalytics === true || amazonPinpointAnalytics === 'true') {
//   Analytics.record({ name: 'VisitApp' });
// }

// import Vue from 'vue';
// import Amplify, * as AmplifyModules from 'aws-amplify';
// import { AmplifyPlugin } from 'aws-amplify-vue';
// import awsConfig from '~/aws-exports';

// Amplify.configure(awsConfig);
// Vue.use(AmplifyPlugin, AmplifyModules);
