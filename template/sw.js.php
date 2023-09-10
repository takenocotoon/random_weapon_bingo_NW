<?php 
    if (!isset($is_prod)) {
        header('Content-type: text/javascript'); 
        include(__DIR__.'/settings.php');
    } else {
        $version = VERSION;
    } ?>const CACHE_VERSION = 'v<?php echo $version; ?>';
const CACHE_NAME = `${registration.scope}!${CACHE_VERSION}`;

const urlsToCache = [
    'index.html<?php if (!isset($is_prod)) echo '.php'; ?>',
    'css/style.<?php if (!isset($is_prod)) echo 'dev'; else echo 'min'; ?>.css',
    'js/main.<?php if (!isset($is_prod)) echo 'dev'; else echo 'min'; ?>.js',
    'font/s1font.woff2',
    'font/s2font.woff2',
    'remixicon/remixicon.css',
    'remixicon/remixicon.woff2',
    'img/background.webp',
    'img/background-title.webp',
    'img/background2.webp',
    'img/background2-title.webp',
    'img/background3.webp',
    'img/background4.webp',
    'img/paint_bingo.webp',
    'img/paint.webp',
    'img/weapons/--.webp',
    'img/weapons/-1.webp',
    'img/weapons/-2.webp',
    'img/weapons/-10.webp',
    'img/weapons/-11.webp',
    'img/weapons/-999.webp',
    'img/weapons/0.webp',
    'img/weapons/1.webp',
    'img/weapons/10.webp',
    'img/weapons/11.webp',
    'img/weapons/20.webp',
    'img/weapons/21.webp',
    'img/weapons/30.webp',
    'img/weapons/31.webp',
    'img/weapons/40.webp',
    'img/weapons/41.webp',
    'img/weapons/45.webp',
    'img/weapons/50.webp',
    'img/weapons/60.webp',
    'img/weapons/61.webp',
    'img/weapons/70.webp',
    'img/weapons/71.webp',
    'img/weapons/80.webp',
    'img/weapons/81.webp',
    'img/weapons/90.webp',
    'img/weapons/91.webp',
    'img/weapons/100.webp',
    'img/weapons/101.webp',
    'img/weapons/200.webp',
    'img/weapons/201.webp',
    'img/weapons/210.webp',
    'img/weapons/220.webp',
    'img/weapons/230.webp',
    'img/weapons/231.webp',
    'img/weapons/240.webp',
    'img/weapons/241.webp',
    'img/weapons/250.webp',
    'img/weapons/251.webp',
    'img/weapons/260.webp',
    'img/weapons/300.webp',
    'img/weapons/301.webp',
    'img/weapons/310.webp',
    'img/weapons/311.webp',
    'img/weapons/400.webp',
    'img/weapons/1000.webp',
    'img/weapons/1001.webp',
    'img/weapons/1010.webp',
    'img/weapons/1011.webp',
    'img/weapons/1020.webp',
    'img/weapons/1021.webp',
    'img/weapons/1030.webp',
    'img/weapons/1040.webp',
    'img/weapons/1041.webp',
    'img/weapons/1100.webp',
    'img/weapons/1101.webp',
    'img/weapons/1110.webp',
    'img/weapons/1111.webp',
    'img/weapons/1120.webp',
    'img/weapons/2000.webp',
    'img/weapons/2010.webp',
    'img/weapons/2011.webp',
    'img/weapons/2020.webp',
    'img/weapons/2021.webp',
    'img/weapons/2030.webp',
    'img/weapons/2040.webp',
    'img/weapons/2050.webp',
    'img/weapons/2060.webp',
    'img/weapons/2061.webp',
    'img/weapons/2070.webp',
    'img/weapons/3000.webp',
    'img/weapons/3001.webp',
    'img/weapons/3010.webp',
    'img/weapons/3011.webp',
    'img/weapons/3020.webp',
    'img/weapons/3021.webp',
    'img/weapons/3030.webp',
    'img/weapons/3031.webp',
    'img/weapons/3040.webp',
    'img/weapons/3050.webp',
    'img/weapons/4000.webp',
    'img/weapons/4001.webp',
    'img/weapons/4010.webp',
    'img/weapons/4011.webp',
    'img/weapons/4020.webp',
    'img/weapons/4030.webp',
    'img/weapons/4031.webp',
    'img/weapons/4040.webp',
    'img/weapons/4050.webp',
    'img/weapons/5000.webp',
    'img/weapons/5001.webp',
    'img/weapons/5010.webp',
    'img/weapons/5020.webp',
    'img/weapons/5030.webp',
    'img/weapons/5031.webp',
    'img/weapons/5040.webp',
    'img/weapons/5041.webp',
    'img/weapons/6000.webp',
    'img/weapons/6001.webp',
    'img/weapons/6010.webp',
    'img/weapons/6011.webp',
    'img/weapons/6020.webp',
    'img/weapons/7010.webp',
    'img/weapons/7011.webp',
    'img/weapons/7020.webp',
    'img/weapons/8000.webp',
    'img/weapons/8010.webp',
    'img/weapons/8011.webp',
    'img/weapons/20900.webp',
    'img/weapons/22900.webp',
    'img/weapons/23900.webp',
    'img/weapons/25900.webp',
    'img/weapons/26900.webp',
    'img/weapons/27900.webp',
    'img/weapons/28900.webp',
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
