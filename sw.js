// Offline support: keeps the app, the chess rules library and Stockfish on the phone after the first visit.
const CACHE = "chess-coach-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
const REMOTE = [
  "https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js"
];
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    try { await c.add("./stockfish.js"); } catch (_) {}            // only if you uploaded it
    for (const u of REMOTE) { try { await c.add(new Request(u, {mode: "cors"})); } catch (_) {} }
    self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, {ignoreSearch: true});
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
      return res;
    } catch (err) {
      if (req.mode === "navigate") return (await c.match("./index.html")) || Response.error();
      throw err;
    }
  })());
});
