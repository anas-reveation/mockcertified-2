import { App as CapacitorApp } from '@capacitor/app';

export default async function ({ app }, inject) {
  // Deep links
  window.onNuxtReady(() => {
    CapacitorApp.addListener('appUrlOpen', function (event) {
      const domain = process.env.DOMAIN;
      const slug = event.url.split(domain).pop();
      if (slug) {
        app.router.push(slug);
      }
    });

    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  });
}
