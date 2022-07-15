// Currently file not in use

import Vue from 'vue';

class AuthService {
  constructor(store) {
    this.$store = store;
  }

  get isAuthenticated() {
    return this.$store.state.auth.isAuthenticated;
  }

  get user() {
    return this.$store.state.auth.user;
  }

  get email() {
    if (!this.user) return;
    return this.user.attributes.email;
  }
}

export default async ({ app, route, store }) => {
  const authService = new AuthService(store);
  Vue.prototype.$auth = authService;
  Vue.$auth = authService;
  await store.dispatch('auth/load');

  // Run when app loads
  window.onNuxtReady(() => {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const homeRoute = route.path === '/' ? true : false;
    const dashboardRoute = route.path.match(/\/dashboard\/*/g) ? true : false;
    const categoryRoute = route.path.match(/\/category\/*/g) ? true : false;
    const testRoute = route.path.match(/\/test\/*/g) ? true : false;
    const cartRoute = route.path.match(/\/cart\/*/g) ? true : false;

    const loginSignUpRoute = route.path.match(/\/auth\/*/g) ? true : false;
    if (!isAuthenticated && (dashboardRoute || categoryRoute || testRoute || cartRoute)) {
      app.router.push('/');
    }
    if (isAuthenticated && (homeRoute || loginSignUpRoute)) {
      app.router.push('/dashboard');
    }
  });
};
