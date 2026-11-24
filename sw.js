const V='controle-v12',A=['./','index.html','firebase-config.js','manifest.webmanifest','icon-192.png','icon-512.png','bg.jpg','fonts/Exo2-Light.ttf','fonts/Exo2-Regular.ttf','fonts/Exo2-Medium.ttf','fonts/Exo2-SemiBold.ttf','fonts/Exo2-Bold.ttf','fonts/Exo2-LightCondensed.otf','fonts/Exo2-RegularCondensed.otf','fonts/Exo2-SemiBoldCondensed.otf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(ch=>ch.put(r,c));return res}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{const c=res.clone();caches.open(V).then(ch=>ch.put(r,c));return res}).catch(()=>h)));
});
