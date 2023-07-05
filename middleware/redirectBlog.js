export default function ({ route, redirect }) {
  if (process.client) {
    if (route.path === '/blogs') {
      // return redirect(process.env.BLOG_URL);
    }
  }
}
