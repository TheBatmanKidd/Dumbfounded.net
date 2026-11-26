const CACHE_NAME = "dumbfounded-off-v8";
const CACHE_PREFIX = "dumbfounded-off-";

const CORE_URLS = [
  "/index.html",
  "/style.css",
  "/index.js"
];

const OPTIONAL_URLS = [
  "/sign-up/",
  "/hr/",
  "/dfa/",
  "/search/",
  "/images/DumbfoundedLogo.png",
  "/images/BlackHoleInABag.png",
  "/images/Confetto.png",
  "/images/Kaurr.png",
  "/images/NonCorrectionGlasses.png",
  "/images/StormInACan.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    for (const url of CORE_URLS) {
      const response = await fetch(url, {
        cache: "reload"
      });

      if (!response.ok) {
        throw new Error("Failed to cache: " + url);
      }

      await cache.put(url, response);
    }

    await Promise.allSettled(
      OPTIONAL_URLS.map(async url => {
        const response = await fetch(url, {
          cache: "reload"
        });

        if (response.ok) {
          await cache.put(url, response);
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
        .filter(key =>
          key.startsWith(CACHE_PREFIX) &&
          key !== CACHE_NAME
        )
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
  if (request.headers.has("range")) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    try {
      const response = await fetch(request);

      if (response.ok && response.type === "basic") {
        await cache.put(request, response.clone());
      }

      return response;

    } catch (error) {
      if (request.mode === "navigate") {
        const fallback = await cache.match("/index.html");

        if (fallback) return fallback;
      }

      return new Response(
        "DumbFounded™ is currently offline.",
        {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store"
          }
        }
      );
    }
  })());
});
