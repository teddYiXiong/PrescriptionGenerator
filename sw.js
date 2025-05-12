const CACHE_NAME = 'testcode-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/js/pdf-lib.min.js',
  '/js/download.min.js',
  '/js/pdf.min.mjs',
  '/js/pdf.worker.min.mjs',
  '/images/rxpad/RxPad_2025.pdf',
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