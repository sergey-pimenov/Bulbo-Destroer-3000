var cacheName = 'app_serviceworker_v_4';

var cacheUrls = [
  '/',
  '/manifest.json',
  '/builded_assets/scripts/index.js',
  '/builded_assets/styles/index.css',
  '/static/about.svg',
  '/static/downArrow.svg',
  '/static/github.svg',
  '/static/install.svg',
  '/static/iosActions.svg',
  '/static/love.svg',
  '/static/offline.svg',
  '/static/addToHome.svg',
  '/static/robotomono-regular.woff2',
  '/static/icons/icon-512x512.png',
  '/static/icons/icon-128x128.png',
  '/static/icons/icon-144x144.png',
  '/static/icons/icon-152x152.png',
  '/static/icons/icon-192x192.png',
  '/static/icons/icon-384x384.png',
  '/static/icons/icon-72x72.png',
  '/static/icons/icon-96x96.png',
  '/static/splash/launch-1125x2436.png',
  '/static/splash/launch-1242x2148.png',
  '/static/splash/launch-1536x2048.png',
  '/static/splash/launch-1668x2224.png',
  '/static/splash/launch-2048x2732.png',
  '/static/splash/launch-640x1136.png',
  '/static/splash/launch-750x1294.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheUrls);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});