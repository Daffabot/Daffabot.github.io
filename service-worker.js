self.addEventListener('install', e => {
 e.waitUntil(
    caches.open('airhorner').then(cache => {
        return cache.addAll([
            '/',
            '/?utm_source=homescreen',
            '/index.html',
            '/css/stylefooter.css',
            '/css/style1.css',
            '/css/index.css',
            '/manifest.json',
            '/js/register.js',
            '/js/service-worker.js',
            '/image/favicon.ico'
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
