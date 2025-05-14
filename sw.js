const CACHE_NAME = 'testcode-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/RxPad_2025.pdf',
  '/src/style.css',
  '/src/script.js',
  '/images/icons/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});