const CACHE_NAME = 'hepps-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

// Install stage: cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate stage
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch stage: serve from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
