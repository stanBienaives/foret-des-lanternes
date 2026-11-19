/* Service worker : rend le jeu utilisable hors ligne.
   - sons et images (audio/, images/) : immuables, leur adresse porte un numéro de version (?abc123) -> cache d'abord ;
   - polices Google : cache d'abord ;
   - la page et le reste : réseau d'abord (pour recevoir les mises à jour), cache en secours.
   Le nom du cache est aussi utilisé par src/jeu.js (téléchargement d'avance). */
const CACHE = "lanternes-v1";
const COQUE = ["./", "manifest.webmanifest", "icone-192.png", "icone-512.png", "icone-180.png"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(COQUE)).catch(() => {}));
});
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

const cacheDabord = req => caches.open(CACHE).then(c => c.match(req).then(r => r || fetch(req).then(n => {
  if (n.ok || n.type === "opaque") c.put(req, n.clone());
  return n;
})));
const reseauDabord = req => caches.open(CACHE).then(c => fetch(req).then(n => {
  if (n.ok) c.put(req, n.clone());
  return n;
}).catch(() => c.match(req, {ignoreSearch: true}).then(r => r || c.match("./"))));

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin !== location.origin) {
    if (/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) e.respondWith(cacheDabord(req));
    return;
  }
  e.respondWith(/\/(audio|images)\//.test(u.pathname) ? cacheDabord(req) : reseauDabord(req));
});
