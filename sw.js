const CACHE_NAME = "dumbfounded-off-v7";
const OFFLINE_URLS = [
  "/images/",
  "/images/DumbfoundedLogo.png",
  "/images/DumbfoundedLogo.png",
  "/images/BlackHoleInABag.png",
  "/images/Confetto.png",
  "/images/Kaurr.png",
  "/images/NonCorrectionGlasses.png",
  "/images/StormInACan.png",
  "/index.html",
  "/sign-up/",
  "/hr/",
  "/dfa/",
  "/search/",
  "/fonts/",
  "/style.css",
  "/index.js"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.all(
      OFFLINE_URLS.map(async url => {
        try {
          const response = await fetch(url, {
            cache: "reload"
          });

          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (error) {
          console.warn("Could not cache:", url, error);
        }
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
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

    const cached = await cache.match(request);

    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok) {
        await cache.put(request, response.clone());
      }

      return response;

    } catch (error) {
      if (request.mode === "navigate") {
        const fallback = await cache.match("/index.html");

        if (fallback) return fallback;
      }

      return new Response(
        "You are offline. This page has not been cached yet.",
        {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }
  })());
});
