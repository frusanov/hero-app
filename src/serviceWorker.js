import { version } from '../package.json';

const staticAssets = ['./'];

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();

          caches.open(version).then(function (cache) {
            if (!/^https?:$/i.test(new URL(event.request.url).protocol)) return;

            cache.put(event.request, responseClone);
          });
          return response;
        });
      }
    })
  );
});
