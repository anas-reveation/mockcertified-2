import Amplify from 'aws-amplify';
import awsConfig from '~/aws-exports';
import { Capacitor } from '@capacitor/core';

// Overwrite Oauth(socialAuth) for current domain
let domain = window.location.origin;
let redirectSignIn;
let redirectSignOut;
const capacitorPlatform = Capacitor.getPlatform();
if (capacitorPlatform === 'ios' || capacitorPlatform === 'android') {
  // get from -> android:scheme="myapp"
  domain = 'myapp://';
  redirectSignIn = domain;
  redirectSignOut = domain;
} else {
  redirectSignIn = `${domain}/`;
  redirectSignOut = `${domain}/auth/login/`;
}

const newConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn,
    redirectSignOut,
  },
};

Amplify.configure(newConfig);

// import Vue from 'vue';
// import Amplify, * as AmplifyModules from 'aws-amplify';
// import { AmplifyPlugin } from 'aws-amplify-vue';
// import awsConfig from '~/aws-exports';

// Amplify.configure(awsConfig);
// Vue.use(AmplifyPlugin, AmplifyModules);
