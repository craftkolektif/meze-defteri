const SURUM='meze-v1';
const DOSYALAR=['./','index.html','xlsx.full.min.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SURUM).then(c=>c.addAll(DOSYALAR)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==SURUM).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Önce önbellek: internet olmadan da açılır. Yazı tipleri ilk açılışta önbelleğe alınır.
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(y=>{
    if(y&&(y.ok||y.type==='opaque')){const k=y.clone();caches.open(SURUM).then(ca=>ca.put(r,k))}return y;
  }).catch(()=>r.mode==='navigate'?caches.match('index.html'):Response.error())));
});
