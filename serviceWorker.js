const staticDevCoffee = "dev-coffee-site-v4";
const dynamicCacheName = "dev-coffee-dynamic-v4";
const assets = [
    "/",
    "/index.html",
    "/fallback.html",
    "/about.html",
    "/contact.html",
    "/blog.html",
    "/css/style.css",
    "/js/app.js",
    "/images/coffee1.jpg",
    "/images/coffee2.jpg",
    "/images/coffee3.jpg",
    "/images/coffee4.jpg",
    "/images/coffee5.jpg",
    "/images/coffee6.jpg",
    "/images/coffee7.jpg",
    "/images/coffee8.jpg",
    "/images/coffee9.jpg",
]
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    );
});
self.addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keys => {
         return Promise.all(keys
                .filter(key => key !== staticDevCoffee  && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', fetchEvent => {
    if(!(fetchEvent.request.url.indexOf("http") === 0)) return
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(cacheRes => {
            return cacheRes || fetch(fetchEvent.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(fetchEvent.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(()=> caches.match("/fallback.html"))
    );
});
