/* global workbox */
/* eslint no-undef: "error"*/
/* global event */
/* eslint no-restricted-globals: ["error", "event"] */

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  new RegExp('/(.*)'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://pixabay.com/(.*)'),
  workbox.strategies.cacheFirst({
    plugins: [new workbox.backgroundSync.Plugin('myQueueName')]
  })
);

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
