export default async function ({ store, route, redirect, req }) {
  if (process.client) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const userGroup = store.state.auth.userGroup;

    const homeRoute = route.path === '/' ? true : false;
    const dashboardRoute = route.path.match(/\/dashboard\/*/g) ? true : false;
    const categoryRoute = route.path.match(/\/category\/*/g) ? true : false;
    const testRoute = route.path.match(/\/test\/*/g) ? true : false;
    const cartRoute = route.path.match(/\/cart\/*/g) ? true : false;
    const createTestRoute = route.path.match(/\/create-test\/*/g) ? true : false;
    const createdTestRoute = route.path.match(/\/created-test\/*/g) ? true : false;
    const adminRoute = route.path.match(/\/admin\/*/g) ? true : false;
    const loginSignUpRoute = route.path.match(/\/auth\/*/g) ? true : false;

    if (
      !isAuthenticated &&
      (dashboardRoute ||
        categoryRoute ||
        testRoute ||
        cartRoute ||
        createTestRoute ||
        createdTestRoute ||
        adminRoute)
    ) {
      redirect('/');
    }

    if (isAuthenticated && (homeRoute || loginSignUpRoute)) {
      redirect('/dashboard');
    }

    if (userGroup !== 'admins' && adminRoute) {
      redirect('/dashboard');
    }
  }
}
