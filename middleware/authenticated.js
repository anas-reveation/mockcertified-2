export default async function ({ store, route, redirect, req }) {
  if (process.server) {
    const isAuthenticated = store.state.auth.isAuthenticated;
    const homeRoute = route.path === '/' ? true : false;
  }
}
