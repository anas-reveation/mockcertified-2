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
  store.commit('setPlatform');

  const authService = new AuthService(store);
  Vue.prototype.$auth = authService;
  Vue.$auth = authService;
  await store.dispatch('auth/load');

  // Run when app loads
  window.onNuxtReady(() => {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const userGroup = store.state.auth.userGroup;

    const homeRoute = route.path === '/' ? true : false;
    const dashboardRoute = route.path.match(/\/dashboard\/*/g) ? true : false;
    const protectedRoute = route.path.match(/\/protected\/*/g) ? true : false;
    const authRoute = route.path.match(/\/auth\/*/g) ? true : false;
    const adminRoute = route.path.match(/\/admin\/*/g) ? true : false;

    if (store.state.platform !== 'web' && dashboardRoute) {
      app.router.push('/protected/purchased-test');
    }

    if (!isAuthenticated && protectedRoute) {
      app.router.push('/');
    }

    if (isAuthenticated && (homeRoute || authRoute)) {
      app.router.push('/dashboard');
    }

    if (userGroup !== 'admins' && adminRoute) {
      app.router.push('/dashboard');
    }
  });
};
