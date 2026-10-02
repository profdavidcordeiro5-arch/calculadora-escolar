/* Calculadora de mercado escolar - cache do app.
   Rede primeiro, arquivo guardado depois. Assim a versao publicada chega assim
   que houver internet, e o app continua abrindo quando nao houver. A cada
   atualizacao troque o numero de C para limpar o que ficou para tras. */
var C = "mercado-v3";
self.addEventListener("install", function(e){ self.skipWaiting() });
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){ return k === C ? null : caches.delete(k) }));
  }).then(function(){ return self.clients.claim() }));
});
self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function(n){
      var c = n.clone();
      caches.open(C).then(function(x){ x.put(e.request, c) });
      return n;
    }).catch(function(){ return caches.match(e.request) })
  );
});
