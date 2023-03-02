export default async function ({ store, route, redirect, req }) {
  if (process.client) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const userGroup = store.state.auth.userGroup;

    const homeRoute = route.path === '/' ? true : false;
    const protectedRoute = route.path.match(/\/protected\/*/g) ? true : false;
    const authRoute = route.path.match(/\/auth\/*/g) ? true : false;
    const adminRoute = route.path.match(/\/admin\/*/g) ? true : false;

    if (store.state.platform !== 'web' && homeRoute && !isAuthenticated) {
      redirect('/auth/login');
    }

    if (store.state.platform !== 'web' && homeRoute && isAuthenticated) {
      redirect('/protected/purchased-test');
    }

    if (isAuthenticated && authRoute) {
      redirect('/');
    }

    if (!isAuthenticated && (protectedRoute || adminRoute)) {
      redirect('/');
    }

    if (isAuthenticated && adminRoute && userGroup !== 'admins') {
      redirect('/');
    }

    // if (store.state.platform !== 'web' && homeRoute && !isAuthenticated) {
    //   redirect('/auth/login');
    // }

    // if (store.state.platform !== 'web' && homeRoute && isAuthenticated) {
    //   redirect('/protected/purchased-test');
    // }

    // if (protectedRoute && !isAuthenticated) {
    //   redirect('/');
    // }

    // if (isAuthenticated && (homeRoute || authRoute)) {
    //   redirect('/');
    // }

    // if ((userGroup !== 'admins' && adminRoute) || (!isAuthenticated && homeRoute)) {
    //   redirect('/');
    // }
  }
}
