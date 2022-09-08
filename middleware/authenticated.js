export default async function ({ store, route, redirect, req }) {
  if (process.client) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const userGroup = store.state.auth.userGroup;

    const homeRoute = route.path === '/' ? true : false;
    const protectedRoute = route.path.match(/\/protected\/*/g) ? true : false;
    const authRoute = route.path.match(/\/auth\/*/g) ? true : false;
    const adminRoute = route.path.match(/\/admin\/*/g) ? true : false;

    if (!isAuthenticated && protectedRoute) {
      redirect('/');
    }

    if (isAuthenticated && (homeRoute || authRoute)) {
      redirect('/protected/dashboard');
    }

    if (userGroup !== 'admins' && adminRoute) {
      redirect('/protected/dashboard');
    }
  }
}
