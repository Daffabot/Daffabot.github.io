const CACHE_NAME = "v1";
const CACHE_ASSETS = [
  "./", "./index.html", "./about/index.html", "./contact/index.html",
  "./assets/favicon/favicon.ico", "./assets/css/style.css", "./assets/img/article1.jpg",
  "./assets/img/article2.jpg", "./assets/img/profil-github.png", "./assets/img/profil.jpg",
  "./assets/js/main.js", "./service-worker.js", "./assets/js/feature/sw-register.js",
  "./assets/js/feature/theme.js", "./assets/js/feature/ui.js", "./assets/js/config/api.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(
        CACHE_ASSETS.map((url) =>
          fetch(url)
            .then((res) => res.ok ? cache.put(url, res) : Promise.reject(`Failed ${url}`))
            .catch((err) => console.error(err))
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});