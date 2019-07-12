var CACHE_NAME = 'my-site-cache-v49';
var FILES_TO_CACHE = [
  '/',
  '/offline.html?v49',
  '/css/main.css?v49',
  '/img/shop.png?v49'
];




self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install v49');
  // CODELAB: Precache static resources here.

  evt.waitUntil(



    caches.keys().then(function(names) {
        console.log("caches.keys()");
        console.log(names);
        // for (let name of names){
        //     caches.delete(name);
        // }
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
        self.skipWaiting();

    })







  );




});


self.addEventListener('activate', function(event) {
  console.log("no se cuando se ejecuta este v49");
  event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          // console.log('[ServiceWorker] Removing old cache', key);
          if(key !== CACHE_NAME){
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);

          }
          // if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          //   console.log('[ServiceWorker] Removing old cache', key);
          //   return caches.delete(key);
          // }
        }));
      })
  );

  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.filter(function(cacheName) {
  //         // Return true if you want to remove this cache,
  //         // but remember that caches are shared across
  //         // the whole origin
  //       }).map(function(cacheName) {
  //         return caches.delete(cacheName);
  //       })
  //     );
  //   })
  // );
});



self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.

  console.log(evt.request.mode)

  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
   evt.respondWith(
       fetch(evt.request)
       .catch(() => {
         console.log(evt.request)
         return caches.open(CACHE_NAME)
             .then((cache) => {
               return cache.match(evt.request);
               return cache.match('offline.html?v49');
             });
       })
   );

});
//









// importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
//
// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
//
//
//   workbox.routing.registerRoute(
//     /\.js$/,
//     new workbox.strategies.NetworkFirst()
//   );
//
//
//
//   workbox.routing.registerRoute(
//     // Cache CSS files.
//     /\.css$/,
//     // Use cache but update in the background.
//     new workbox.strategies.StaleWhileRevalidate({
//       // Use a custom cache name.
//       cacheName: 'css-cache',
//     })
//   );
//
//   workbox.routing.registerRoute(
//     // Cache image files.
//     /\.(?:png|jpg|jpeg|svg|gif)$/,
//     // Use the cache if it's available.
//     new workbox.strategies.CacheFirst({
//       // Use a custom cache name.
//       cacheName: 'image-cache',
//       plugins: [
//         new workbox.expiration.Plugin({
//           // Cache only 20 images.
//           maxEntries: 20,
//           // Cache for a maximum of a week.
//           maxAgeSeconds: 7 * 24 * 60 * 60,
//         })
//       ],
//     })
//   );
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }
