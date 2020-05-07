/**
 * @see https://developers.google.com/web/tools/workbox/guides/get-started
 */
// import { precacheAndRoute } from 'workbox-precaching';
// import { setCacheNameDetails } from 'workbox-core';
// import { registerRoute } from 'workbox-routing';

// setCacheNameDetails({ prefix: 'pwa-cache-v1' });
// precacheAndRoute(['/index.html']);
// registerRoute('/index.html');

// self.addEventListener('message', (event) => {
//     if (!event.data) return;
//     switch (event.data) {
//         case 'skipWaiting':
//             self.skipWaiting();
//             break;
//         default:
//             break;
//     }
// });

// ====

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.core.setCacheNameDetails({ prefix: 'pwa-cache-v1' });

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([]);
workbox.routing.registerNavigationRoute('/index.html');

//   self.addEventListener('message', event => {
//     if (!event.data) return
//     switch (event.data) {
//       case 'skipWaiting':
//         self.skipWaiting()
//         break
//       default:
//         break
//     }
//   })
