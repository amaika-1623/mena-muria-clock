const CACHE_NAME = "mena-muria-cache-v1";

const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "clock.js",
  "clock-face.png",
  "clockface.jpg",
  "intro.jpg",
  "tifa-intro.mp3",
  "gong.mp3",
  "icon-192.png",
  "icon-512.png",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
