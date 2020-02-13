importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([{"revision":"e25d8cdf558253edbe92448cfdcc05d6","url":"style/main.css"},{"revision":"64d7aa484da9aae1a9d5146321813b12","url":"index.html"},{"revision":"24c6675ea4538b312176f2f5cd5817fd","url":"images/mainprofile.jpg"}]);

  workbox.routing.registerRoute(
    /(.*)images(.*)\.(?:png|gif|jpg)/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );

  const postHandler = workbox.strategies.networkFirst({
    cacheName: 'projects-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  });
  
  workbox.routing.registerRoute(/(.*)post(.*)\.html/, args => {
    return postHandler.handle(args);
  });


  const referenceHandler = workbox.strategies.networkFirst({
    cacheName: 'reference-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  });
  
  workbox.routing.registerRoute(/(.*)review(.*)\.html/, args => {
    return referenceHandler.handle(args);
  });


} else {
  console.log(`Boo! Workbox didn't load 😬`);
}