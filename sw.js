const CACHE_NAME = "dumbfounded-off-v1";
const OFFLINE_URLS = [
  "/",
  "/home",
  "/index.html",
  "/home/",
  "/home/index.html",
  "/style.css",
  "/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of OFFLINE_URLS) {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      } catch (error) {
        console.warn("Could not cache:", url, error);
      }
    }
  })());
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const pathname = url.pathname;

    const cached = await cache.match(request) ||
      await cache.match(pathname + url.search) ||
      await cache.match(pathname);

    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok) {
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      if (request.mode === "navigate") {
        const fallbacks = [
          "/index.html",
          "/home/index.html",
          "/home/",
          "/home",
          "/"
        ];

        for (const path of fallbacks) {
          const fallback = await cache.match(path);
          if (fallback) return fallback;
        }
      }

      return new Response("You are offline. This page has not been cached yet.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
