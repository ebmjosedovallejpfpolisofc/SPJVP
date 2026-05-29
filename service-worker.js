const CACHE_NAME =
"sgjvp-cache-v1";

const urlsToCache = [

"./",
"./index.html",
"./portal-aluno.html",
"./portal-monitor-prof.html",
"./manifest.json",
"./icon-192.png",
"./icon-512.png"

];

self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open(
CACHE_NAME
)

.then(cache=>{

return cache.addAll(
urlsToCache
);

})

);

console.log(
"Service Worker instalado"
);

});

self.addEventListener(
"activate",
event=>{

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(
key !==
CACHE_NAME
){

return caches.delete(
key
);

}

})

);

})

);

console.log(
"Service Worker ativado"
);

});

self.addEventListener(
"fetch",
event=>{

if(
event.request.method
!== "GET"
){
return;
}

event.respondWith(

caches.match(
event.request
)

.then(response=>{

if(
response
){
return response;
}

return fetch(
event.request
)

.then(networkResponse=>{

return networkResponse;

})

.catch(()=>{

return caches.match(
"./index.html"
);

});

})

);

});
