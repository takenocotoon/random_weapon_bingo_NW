const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

const urlsToCache = [
    'css/style.css',
    'js/main.js',
    'font/s2font.ttf',
    'remixicon/remixicon.css',
    'remixicon/remixicon.eot',
    'remixicon/remixicon.svg',
    'remixicon/remixicon.woff',
    'remixicon/remixicon.woff2',
    'remixicon/remixicon.ttf',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
        return cacheNames.filter((cacheName) => {
            // このスコープに所属していて且つCACHE_NAMEではないキャッシュを探す
            return cacheName.startsWith(`${registration.scope}!`) && cacheName !== CACHE_NAME;
        });
        }).then((cachesToDelete) => {
            return Promise.all(cachesToDelete.map((cacheName) => {
                // いらないキャッシュを削除する
                return caches.delete(cacheName);
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            let fetchRequest = event.request.clone();
            
            return fetch(fetchRequest).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                let responseToCache = response.clone();
                
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            });
        })
    );
});
