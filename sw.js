const CACHE_NAME = 'dkv-grafika-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/main.css',
  './assets/css/components.css',
  './assets/css/animations.css',
  './assets/js/core.js',
  './assets/js/navigation.js',
  './assets/js/accessibility.js',
  './README.md'
];

// Install Event - Caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Cache First Strategy for static assets, Network First for data
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname.endsWith('.json')) {
    // Network First for JSON data
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First for other files
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((netResponse) => {
          const resClone = netResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
          return netResponse;
        });
      })
    );
  }
});
