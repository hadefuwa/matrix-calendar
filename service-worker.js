// Service Worker for Matrix Calendar PWA
// This handles caching and offline functionality

// Cache name and version
const CACHE_NAME = 'matrix-calendar-v1';
const CACHE_VERSION = '1.0.0';

// Files to cache for offline use
const CACHE_FILES = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './icon-72.png',
    './icon-96.png',
    './icon-128.png',
    './icon-144.png',
    './icon-152.png',
    './icon-192.png',
    './icon-384.png',
    './icon-512.png'
];

// Install event - cache files
self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching files');
                return cache.addAll(CACHE_FILES);
            })
            .then(function() {
                console.log('Service Worker: All files cached');
                return self.skipWaiting();
            })
            .catch(function(error) {
                console.log('Service Worker: Error caching files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Delete old caches
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('Service Worker: Activated successfully');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached files when offline
self.addEventListener('fetch', function(event) {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip non-HTTP requests
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(function(cachedResponse) {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return cachedResponse;
                }
                
                // Otherwise, fetch from network
                console.log('Service Worker: Fetching from network', event.request.url);
                return fetch(event.request)
                    .then(function(response) {
                        // Check if response is valid
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Add to cache for future use
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(function(error) {
                        console.log('Service Worker: Fetch failed', error);
                        
                        // Return offline page or cached version if available
                        return caches.match('./index.html');
                    });
            })
    );
});

// Handle messages from main app
self.addEventListener('message', function(event) {
    console.log('Service Worker: Received message', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            type: 'VERSION',
            version: CACHE_VERSION
        });
    }
});

// Background sync for when connection is restored
self.addEventListener('sync', function(event) {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'calendar-sync') {
        event.waitUntil(
            // You could add logic here to sync calendar data
            Promise.resolve()
        );
    }
});

// Push notification handling (for future use)
self.addEventListener('push', function(event) {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: 'Your calendars have been updated',
        icon: './icon-192.png',
        badge: './icon-72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Calendars',
                icon: './icon-96.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: './icon-96.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Matrix Calendar', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

console.log('Service Worker: Script loaded successfully');
