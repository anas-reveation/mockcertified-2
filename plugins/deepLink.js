import { App as CapacitorApp } from '@capacitor/app';

export default async function ({ app }, inject) {
  // Deep links
  await window.onNuxtReady(() => {
    CapacitorApp.addListener('appUrlOpen', function (event) {
      const domain = process.env.DOMAIN;
      const slug = event.url.split(domain).pop();
      if (slug) {
        app.router.push(slug);
      }
    });
  });
}
