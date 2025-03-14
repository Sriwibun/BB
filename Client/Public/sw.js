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
});

// Fetch event - serve cached files and update cache with new versions
self.addEventListener('fetch', (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(
        e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return;
    }

    e.respondWith((async () => {
        const cache = await caches.open(cacheID);
        const cachedResponse = await caches.match(e.request);
        if (cachedResponse) {
            console.log(`[Service Worker] Serving cached resource: ${e.request.url}`);
            return cachedResponse;
        }

        try {
            const networkResponse = await fetch(e.request);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
        } catch (error) {
            console.error(`[Service Worker] Fetch failed; returning offline page instead.`, error);
            const offlinePage = await caches.match('/index.html');
            return offlinePage;
        }
    })());
});