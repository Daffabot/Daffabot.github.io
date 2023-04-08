 self.addEventListener('install', e => {
 e.waitUntil(
    caches.open('airhorner').then(cache => {
        return cache.addAll([
            '/',
            '/?utm_source=homescreen',
            '/index.html',
            '/main/happy-new-year-2023.html'
        ])
            .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate', event => {
 event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
        return response || fetch(event.request);
    })
  );
});
