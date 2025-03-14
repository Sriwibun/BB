// SELF => service worker itself
// waitUntil => wait until the promise is resolved (fancy async await)
// contentToCache => array of files to cache ex. API, index.html, app.mjs, style.css, icons, etc.
// cacheID => name of the list of cache elements to be stored
const cacheID = "WerkCache-v1";
const contentToCache = [
    "/index.html",
    "/app.mjs",
    "/router.mjs",
    // "/icons/dragon.png",
    // "/icons/dragonLarge.png",
    "/css/style.css",
    // "/API/knowledgeGraph"
];

// Install event - cache important files
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheID);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

// Activate event - clean up old caches
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
    e.waitUntil((async () => {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName !== cacheID) {
                    console.log('[Service Worker] Deleting old cache:', cacheName);
                    return caches.delete(cacheName);
                }
            })
        );
    })());
    self.clients.claim();
});

// Fetch event - update API responses dynamically
self.addEventListener('fetch', (e) => {
    if (!e.request.url.startsWith('http:') && !e.request.url.startsWith('https:')) {
        return;
    }

    e.respondWith((async () => {
        const cache = await caches.open(cacheID);

        // If request is for workouts API, fetch fresh data
        if (e.request.url.includes("/api/workouts")) {
            try {
                const networkResponse = await fetch(e.request);
                console.log(`[Service Worker] Updating cache for: ${e.request.url}`);
                cache.put(e.request, networkResponse.clone()); // Update cache
                return networkResponse;
            } catch (error) {
                console.error(`[Service Worker] Fetch failed; serving cached API response.`, error);
                return await cache.match(e.request) || new Response("Offline", { status: 503 });
            }
        }

        // Serve cached files first for static content
        const cachedResponse = await cache.match(e.request);
        return cachedResponse || fetch(e.request).then((networkResponse) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
        });
    })());
});