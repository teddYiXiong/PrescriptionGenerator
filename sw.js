const CacheName = 'beta-v0.65';
const Assets = [
  './',
  'index.html',
  'src/style.css',
  'src/script.js',
  'src/index.js',
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
};

const retrieveFromCache = async (request) => {
  const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  return fetch(request);
};

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const keepCache = [CacheName];
  const keyList = await caches.keys();
  const deleteList = keyList.filter((key) => !keepCache.includes(key));
  console.log("Caches deleted: " + deleteList);
  await Promise.all(deleteList.map(deleteCache));
}

self.addEventListener('install', (event) => {
  event.waitUntil(addToCache(Assets));
  console.log('Assets have been added');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(retrieveFromCache(event.request));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches());
});