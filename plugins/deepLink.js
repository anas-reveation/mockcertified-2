import { App as CapacitorApp } from '@capacitor/app';

export default async function () {
  // Deep links
  CapacitorApp.addListener('appUrlOpen', function (event) {
    const domain = process.env.DOMAIN;
    const slug = event.url.split(domain).pop();
    if (slug) {
      this.$router.push(slug);
    }
  });
}
