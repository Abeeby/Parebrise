// Service Worker - PareBrise Genève Pro PWA
const CACHE_NAME = 'pgp-v1-2024-01';
const RUNTIME_CACHE = 'pgp-runtime';
const IMAGE_CACHE = 'pgp-images';

// Assets critiques à précacher
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles-composants-ui.css',
  '/widgets-dynamiques.js',
  '/manifest.json',
  '/offline.html',
  // Pages principales
  '/services/remplacement-pare-brise-geneve',
  '/services/reparation-impact-pare-brise',
  '/devis-gratuit-en-ligne',
  '/urgence-pare-brise-24h',
  // Polices
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap'
];

// Installation et précache
self.addEventListener('install', event => {
  console.log('[SW] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Précache des assets');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activation...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('pgp-') && cacheName !== CACHE_NAME;
            })
            .map(cacheName => {
              console.log('[SW] Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Stratégies de cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip les requêtes non-GET
  if (request.method !== 'GET') return;

  // Analytics et tracking - Network Only
  if (url.href.includes('google-analytics') || 
      url.href.includes('googletagmanager') ||
      url.href.includes('hotjar')) {
    return;
  }

  // Images - Cache First avec expiration 30 jours
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(cachedResponse => {
          if (cachedResponse) {
            // Vérifier l'âge du cache
            const cachedDate = new Date(cachedResponse.headers.get('date'));
            const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 jours
            if (Date.now() - cachedDate.getTime() < maxAge) {
              return cachedResponse;
            }
          }
          
          return fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Pages HTML - Network First avec fallback
  if (request.mode === 'navigate' || 
      request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone la réponse pour le cache
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Page offline si aucun cache
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // CSS/JS - Stale While Revalidate
  if (request.destination === 'style' || 
      request.destination === 'script' ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Polices - Cache First longue durée
  if (request.destination === 'font' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // Par défaut - Network First
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Synchronisation en arrière-plan
self.addEventListener('sync', event => {
  console.log('[SW] Sync event:', event.tag);
  if (event.tag === 'sync-bookings') {
    event.waitUntil(syncBookings());
  }
});

// Push notifications
self.addEventListener('push', event => {
  console.log('[SW] Push reçu');
  const options = {
    body: event.data ? event.data.text() : 'Nouveau message de PareBrise Genève Pro',
    icon: '/images/icon-192.png',
    badge: '/images/badge-72.png',
    vibrate: [200, 100, 200],
    tag: 'pgp-notification',
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'Voir' },
      { action: 'close', title: 'Fermer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PareBrise Genève Pro', options)
  );
});

// Gestion des clics sur notifications
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click:', event.action);
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow('https://parebrise-geneve-pro.ch/devis-gratuit-en-ligne')
    );
  }
});

// Message handler pour skip waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fonction de synchronisation des réservations
async function syncBookings() {
  // Récupérer les réservations en attente depuis IndexedDB
  // et les envoyer au serveur
  console.log('[SW] Synchronisation des réservations...');
} 