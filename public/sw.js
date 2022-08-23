;(function() {
  const name = "5MDM/Happy-Birthday/v13";
  const cacheName = [
    "/offline.html",
    "/scripts/navbar.js",
    "/scripts/style.js",
    "/scripts/modules/util.js",
    "/scripts/modules/mcreate-el.js",
    "/styles/main.css",
    "/styles/article.css",
    "/templates/header.html",
  ];
  
  addEventListener("install", e => {
    e.waitUntil(
      caches.open(name)
      .then(cache => cache.addAll(cacheName))
      .then(() => self.skipWaiting())
    );
  });
  
  addEventListener("activate", e => {
    console.log("active");
    // wait until cache is deleted
    e.waitUntil(
      caches.keys()
      .then(name => Promise.all(
        
        // iterate through all caches
        name.map(cache => {
          // delete any old cache
          if(cache != name)
            return cache.delete(cache);
        })
        
      ))
      .then(() => self.skipWaiting())
    );
  });
  
  addEventListener("fetch", e => {
    e.waitUntil(
      caches.keys()
      .then(name => Promise.all(
        
        // iterate through all caches
        name.map(cache => {
          // delete any old cache
          if(cache != name)
            return cache.delete(cache);
        })
        
      ))
      .then(() => self.skipWaiting())
    );
    e.respondWith(
      fetch(e.request)
    );
  });
})();