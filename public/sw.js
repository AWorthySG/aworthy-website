/*
 * A-Worthy service worker — offline fallback and asset caching, nothing more.
 *
 * Three rules, each fixing a real failure of the previous version (v7):
 *
 * 1. Never touch cross-origin requests. A service worker's own fetch() is
 *    governed by the CSP sent with sw.js, whose connect-src does not list most
 *    third-party hosts. v7 re-fetched Google Fonts from inside the worker, the
 *    CSP refused it, and Nunito silently fell back to another font on every
 *    visit after the first. Cross-origin requests now go straight from the
 *    page to the network, under the page's own (correct) policy.
 *
 * 2. Never serve a page from cache while online. v7 precached 14 pages at
 *    install time and answered every non-navigation request cache-first, so
 *    in-page fetches of those pages returned a frozen copy for as long as
 *    sw.js was unchanged: old copy, old phone number, and stylesheet hashes
 *    that no longer existed. Pages are now network-first; the cache is only
 *    a fallback for when the network fails.
 *
 * 3. Only content-addressed files are cache-first: /_astro/* (hashed by the
 *    build) and /fonts/* (versioned by filename). Everything else is left to
 *    the browser's normal HTTP cache.
 *
 * Bump VERSION whenever this file's behaviour changes. Activating a new
 * version deletes every other cache, which is how stale data gets purged.
 */
const VERSION = 'aworthy-v8';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  OFFLINE_URL,
  '/fonts/nunito-latin-wght-normal.woff2',
  '/images/logo.webp',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key)));
    // Start the network request for a navigation while the worker boots,
    // instead of after — removes the worker's start-up cost from page loads.
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;               // form posts go straight out

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;    // rule 1

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstPage(event));       // rule 2
    return;
  }

  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(cacheFirst(request));           // rule 3
  }
  // Anything else: no respondWith, so the browser handles it normally.
});

async function networkFirstPage(event) {
  const cache = await caches.open(VERSION);
  try {
    const response = (await event.preloadResponse) || (await fetch(event.request));
    // Keep a copy for offline use. Redirected and opaque responses cannot be
    // replayed for a navigation, so only plain same-origin 200s are stored.
    if (response.ok && response.type === 'basic' && !response.redirected) {
      cache.put(event.request, response.clone());
    }
    return response;
  } catch (error) {
    return (await cache.match(event.request))
      || (await cache.match(OFFLINE_URL))
      || Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}
