export default async ({ route }) => {
  // Run when app loads
  window.onNuxtReady(() => {
    if (route.path === '/blogs') {
      window.location.href = 'https://blog.mockcertified.com';
    }
  });
};
