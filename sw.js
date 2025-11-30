const CACHE = 'orbicxs-v3';
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png']))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));

self.addEventListener('push', e => {
  const data = e.data?.json() || {title:'OrbicXs', body:'Yangi xabar!'};
  e.waitUntil(self.registration.showNotification(data.title, {body:data.body, icon:'/icon-192.png', badge:'/icon-192.png', vibrate:[200,100,200]}));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
