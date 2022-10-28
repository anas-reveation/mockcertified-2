export default async function ({ store, route, redirect, req }) {
  if (process.client) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const userGroup = store.state.auth.userGroup;

    const homeRoute = route.path === '/' ? true : false;
    const dashboardRoute = route.path.match(/\/dashboard\/*/g) ? true : false;
    const protectedRoute = route.path.match(/\/protected\/*/g) ? true : false;
    const authRoute = route.path.match(/\/auth\/*/g) ? true : false;
    const adminRoute = route.path.match(/\/admin\/*/g) ? true : false;

    if (store.state.platform !== 'web' && dashboardRoute && !isAuthenticated) {
      redirect('/auth/login');
    }

    if (store.state.platform !== 'web' && dashboardRoute && isAuthenticated) {
      redirect('/protected/purchased-test');
    }

    if (!isAuthenticated && protectedRoute) {
      redirect('/');
    }

    if (isAuthenticated && (homeRoute || authRoute)) {
      redirect('/dashboard');
    }

    if ((userGroup !== 'admins' && adminRoute) || (!isAuthenticated && homeRoute)) {
      redirect('/dashboard');
    }
  }
}
