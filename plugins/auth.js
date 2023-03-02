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
    const protectedRoute = route.path.match(/\/protected\/*/g) ? true : false;
    const authRoute = route.path.match(/\/auth\/*/g) ? true : false;
    const adminRoute = route.path.match(/\/admin\/*/g) ? true : false;

    if (store.state.platform !== 'web' && homeRoute && !isAuthenticated) {
      app.router.push('/auth/login');
    }

    if (store.state.platform !== 'web' && homeRoute && isAuthenticated) {
      app.router.push('/protected/purchased-test');
    }

    if (isAuthenticated && authRoute) {
      app.router.push('/');
    }

    if (!isAuthenticated && (protectedRoute || adminRoute)) {
      app.router.push('/');
    }

    if (isAuthenticated && adminRoute && userGroup !== 'admins') {
      app.router.push('/');
    }

    // if (store.state.platform !== 'web' && homeRoute && !isAuthenticated) {
    //   app.router.push('/auth/login');
    // }

    // if (store.state.platform !== 'web' && homeRoute && isAuthenticated) {
    //   app.router.push('/protected/purchased-test');
    // }

    // if (!isAuthenticated && protectedRoute) {
    //   app.router.push('/');
    // }

    // if (isAuthenticated && (homeRoute || authRoute)) {
    //   app.router.push('/');
    // }

    // if ((userGroup !== 'admins' && adminRoute) || (!isAuthenticated && homeRoute)) {
    //   app.router.push('/');
    // }
  });
};
