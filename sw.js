const CACHE_NAME = 'linda-handmade-v1';

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 啟動 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 攔截請求 (提供基本網路通道以符合 PWA 安裝規範)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
