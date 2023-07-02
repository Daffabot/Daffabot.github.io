// service-worker.js

const CACHE_NAME = 'my-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/service-worker.js',
  '/manifest.json',
  '/compposer.json',
  '/favicon.ico',
  '/atom.xml',
  '/ads.txt',
  '/_config.yml',
  '/js/disqusloader.js',
  '/js/picturefill.js',
  '/js/register.js',
  '/js/script.js',
  '/js/serviceWorker.js',
  '/css/index.css',
  '/css/style1.css',
  '/css/stylefooter.css',
  '/font/VT323-Regular.ttf',
  '/image/profil.webp',
  '/image/logo.jpg',
  '/image/pesawat.png',
  '/image/dpsformula.png',
  '/image/favico.ico',
  '/image/pesawat.webp',
  '/image/roulette.png',
  '/image/roulette.webp',
  '/image/saweria.png',
  '/image/saweria.webp',
  '/image/tank.png',
  '/image/tank.webp',
  '/image/top.png',
  '/image/top.webp',
  '/image/ular.png',
  '/image/ular.webp',
  '/main/android-icon-144x144.png',
  '/main/android-icon-192x192.png',
  '/main/android-icon-36x36.png',
  '/main/android-icon-48x48.png',
  '/main/android-icon-512x512.png',
  '/main/android-icon-72x72.png',
  '/main/android-icon-96x96.png',
  '/main/apple-icon-114x114.png',
  '/main/apple-icon-120x120.png',
  '/main/apple-icon-144x144.png',
  '/main/apple-icon-152x152.png',
  '/main/apple-icon-180x180.png',
  '/main/apple-icon-57x57.png',
  '/main/apple-icon-60x60.png',
  '/main/apple-icon-72x72.png',
  '/main/apple-icon-76x76.png',
  '/main/apple-icon-precomposed.png',
  '/main/apple-icon.png',
  '/main/favicon-16x16.png',
  '/main/favicon-32x32.png',
  '/main/favicon.ico',
  '/main/ms-icon-144x144.png',
  '/main/ms-icon-150x150.png',
  '/main/ms-icon-310x310.png',
  '/main/ms-icon-70x70.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
