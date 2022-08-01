import Amplify from 'aws-amplify';
import awsConfig from '~/aws-exports';

// Overwrite Oauth(socialAuth) for current domain
const domain = window.location.origin;
const newConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: `${domain}/`,
    redirectSignOut: `${domain}/auth/login/`,
  },
};

Amplify.configure(newConfig);

// import Vue from 'vue';
// import Amplify, * as AmplifyModules from 'aws-amplify';
// import { AmplifyPlugin } from 'aws-amplify-vue';
// import awsConfig from '~/aws-exports';

// Amplify.configure(awsConfig);
// Vue.use(AmplifyPlugin, AmplifyModules);
