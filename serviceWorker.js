const staticDevCoffee = 'dev-coffee-site-v1';
const assets = [
    "https://demo.webtech.app/pwa/",
    "https://demo.webtech.app/pwa/index.html",
    "https://demo.webtech.app/pwa/css/style.css",
    "https://demo.webtech.app/pwa/js/app.js",
    "https://demo.webtech.app/pwa/images/coffee1.jpg",
    "https://demo.webtech.app/pwa/images/coffee2.jpg",
    "https://demo.webtech.app/pwa/images/coffee3.jpg",
    "https://demo.webtech.app/pwa/images/coffee4.jpg",
    "https://demo.webtech.app/pwa/images/coffee5.jpg",
    "https://demo.webtech.app/pwa/images/coffee6.jpg",
    "https://demo.webtech.app/pwa/images/coffee7.jpg",
    "https://demo.webtech.app/pwa/images/coffee8.jpg",
    "https://demo.webtech.app/pwa/images/coffee9.jpg",
]
self.addEventListener("install", installEvent => {
    installEvent.waitUntill(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})
self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("Service worker registered"))
        .catch(err => console.log("Service worker no registered", err))
    })
}