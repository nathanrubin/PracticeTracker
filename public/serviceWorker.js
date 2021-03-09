importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([])

workbox.routing.registerRoute(
  // Custom `matchCallback` function
  ({event}) => event.request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'image',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)
workbox.routing.registerRoute(/\.*$/, new workbox.strategies.NetworkFirst())

