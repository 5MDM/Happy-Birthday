;(function() {
  const name = "5MDM/Happy-Birthday/v4";
  addEventListener("install", e => {
    e.waitUntil(
      caches.open(name)
      .then(cache => cache.addAll("/offline.html"))
      .then(() => self.skipWaiting())
    );
  });
  
  addEventListener("activate", e => {
    // wait until cache is deleted
    e.waitUntil(
      caches.key()
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
  addEventListener("fetch", e => e.respondWith(
    fetch(e.request)
    .then(res => {
      const clone = res.clone();
      
      caches.open(name).then(cache =>
        cache.put(e.request, clone)
      );
      
      return res;
    })
    .catch(err => {
      caches.match(e.request)
      .then(res => res)
      .then(err => console.error(err));
    })
  ));
})();