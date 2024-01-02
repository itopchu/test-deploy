var CACHE_STATIC_NAME = 'static-v15';
var CACHE_DYNAMIC_NAME = 'dynamic-v15';

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
        .then(function(cache) {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
                'https://omerakgull.github.io/pwa_zoo/',
                'https://omerakgull.github.io/pwa_zoo/index.html',
                'https://omerakgull.github.io/pwa_zoo/src/js/script.js',
                'https://omerakgull.github.io/pwa_zoo/src/img/welcome.PNG',
                'https://omerakgull.github.io/pwa_zoo/src/css/style.css'
            ]);
        })
    )
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
      caches.keys() //this returns array of string keys of all caches as a promise.
        .then(function(keyList) {
          return Promise.all(keyList.map(function(key) { //promise.all takes an array of promises and waits for them to finish. (so far we only have array of cache names unless keyList.map)
            if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
              console.log('[Service Worker] Removing old cache.', key);
              return caches.delete(key);
            }
          })); 
        })
    );
    return self.clients.claim();
  });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              });
          }
        })
    );
  });