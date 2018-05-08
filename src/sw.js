/* global workbox importScripts */
/* eslint no-undef: "error"*/
/* global event */
/* eslint no-restricted-globals: ["error", "event"] */

// importScripts('workbox-v3.2.0/workbox-sw.js');
// importScripts("/workbox-sw.js");
// workbox.setConfig({modulePathPrefix: ""});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  new RegExp('/(.*)'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://pixabay.com/(.*)'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
