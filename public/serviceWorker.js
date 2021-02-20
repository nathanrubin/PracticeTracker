importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js'
)

workbox.precaching.precacheAndRoute([])

workbox.routing.registerRoute(/\.*$/, new workbox.strategies.NetworkFirst())
workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)
