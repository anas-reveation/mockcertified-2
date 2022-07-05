export default async function ({ store, route, redirect, req }) {
  if (process.client) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    // TODO: homeRoute can be sepcific home page of buyer and seller
    // const homeRoute = route.path === '/' ? true : false;
    const dashboardRoute = route.path.match(/\/dashboard\/*/g) ? true : false;
    const categoryRoute = route.path.match(/\/category\/*/g) ? true : false;
    const testRoute = route.path.match(/\/test\/*/g) ? true : false;
    const cartRoute = route.path.match(/\/cart\/*/g) ? true : false;

    const loginSignUpRoute = route.path.match(/\/auth\/*/g) ? true : false;

    console.log('isAuthenticated', isAuthenticated);
    console.log('isAuthenticated', loginSignUpRoute);
    if (!isAuthenticated && (dashboardRoute || categoryRoute || testRoute || cartRoute)) {
      redirect('/');
    }
    if (isAuthenticated && loginSignUpRoute) {
      redirect('/dashboard');
    }
  }
}
