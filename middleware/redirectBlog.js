export default function ({ route, redirect }) {
  if (route.path === '/blogs') {
    return redirect(process.env.BLOG_URL);
  }
}
