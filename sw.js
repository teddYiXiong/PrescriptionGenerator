const CacheName = 'beta-v0.5';
const Assets = [
  './',
  'index.html',
  'src/style.css',
  'src/script.js',
  'RxPad_2025.pdf',
  'lib/pdf-lib.min.js',
  'lib/pdf.mjs',
  'lib/pdf.worker.mjs',
  'lib/download.min.js',
  'icons/icon-192.png'
];

const addToCache = async (resources) => {
  const cache = await caches.open(CacheName);
  await cache.addAll(resources);
}

const retrieveFromCache = async (request) => {
  const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  return fetch(request);
}

self.addEventListener('install', (event) => {
  event.waitUntil(addToCache(Assets));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(retrieveFromCache(event.request));
});