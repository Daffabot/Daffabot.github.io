// membuat fitur pwa
const cacheName = "v1";
// buat variable untuk asset yg ingin di cache
const cacheAssets = [
  "./",
  "./index.html",
  "./service-worker.js",
  "./manifest.json",
  "./favicon.ico",
  "./atom.xml",
  "./ads.txt",
  "./js/disqusloader.js",
  "./js/picturefill.js",
  "./js/register.js",
  "./js/script.js",
  "./css/index.css",
  "./css/style1.css",
  "./css/stylefooter.css",
  "./font/VT323-Regular.ttf",
  "./font/Bungee-Regular.ttf",
  "./image/profil.png",
  "./image/logo.jpg",
  "./image/pesawat.png",
  "./image/dpsformula.png",
  "./image/dpsformula.webp",
  "./image/pesawat.webp",
  "./image/roulette.png",
  "./image/roulette.webp",
  "./image/saweria.png",
  "./image/saweria.webp",
  "./image/tank.png",
  "./image/tank.webp",
  "./image/top.png",
  "./image/top.webp",
  "./image/ular.png",
  "./image/ular.webp",
  "./image/game-pipe-vhs.png",
  "./image/game-pipe-vhs.webp",
  "./image/handrathej.png",
  "./image/handrathej.webp",
  "./image/chatbot.png",
  "./image/chatbot.webp",
  "./main/android-icon-144x144.png",
  "./main/android-icon-192x192.png",
  "./main/android-icon-36x36.png",
  "./main/android-icon-48x48.png",
  "./main/android-icon-512x512.png",
  "./main/android-icon-72x72.png",
  "./main/android-icon-96x96.png",
  "./main/apple-icon-114x114.png",
  "./main/apple-icon-120x120.png",
  "./main/apple-icon-144x144.png",
  "./main/apple-icon-152x152.png",
  "./main/apple-icon-180x180.png",
  "./main/apple-icon-57x57.png",
  "./main/apple-icon-60x60.png",
  "./main/apple-icon-72x72.png",
  "./main/apple-icon-76x76.png",
  "./main/apple-icon-precomposed.png",
  "./main/apple-icon.png",
  "./main/favicon-16x16.png",
  "./main/favicon-32x32.png",
  "./main/favicon.ico",
  "./main/ms-icon-144x144.png",
  "./main/ms-icon-150x150.png",
  "./main/ms-icon-310x310.png",
  "./main/ms-icon-70x70.png",
];

// memanggil event install
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        return Promise.all(
          cacheAssets.map((url) => {
            return fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Request failed for ${url}`);
                }
                return cache.put(url, response);
              })
              .catch((error) => {
                console.error("Failed to cache", url, error);
              });
          }),
        );
      })
      .then(() => {
        console.log("Service Worker: Caching Files Completed");
        return self.skipWaiting();
      }),
  );
});

// memanggil event activate untuk aktivasi
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // menghapus cache jika nama sama
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
