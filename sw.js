'use strict';

const CACHE = 'sean-v38';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest?v=38',
  'css/style.css?v=38',
  'css/adventure.css?v=38',
  'js/art.js?v=38',
  'js/content.js?v=38',
  'js/audio.js?v=38',
  'js/app.js?v=38',
  'assets/icons/favicon.svg',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-512.png',
  'assets/fonts/Fredoka-Variable.woff2',
  'assets/fonts/Nunito-Variable.woff2',
  'assets/audio/narration/manifest.json',
  'assets/audio/bgm/practical.mp3?v=2',
  'assets/audio/bgm/sensorial.mp3?v=2',
  'assets/audio/bgm/math.mp3?v=2',
  'assets/audio/bgm/language.mp3?v=2',
  'assets/audio/bgm/culture.mp3?v=2',
  'assets/images/game-montessori/ant-alt.webp',
  'assets/images/game-montessori/ant.webp',
  'assets/images/game-montessori/beach.webp',
  'assets/images/game-montessori/bedroom.webp',
  'assets/images/game-montessori/cat.webp',
  'assets/images/game-montessori/dog.webp',
  'assets/images/game-montessori/elephant.webp',
  'assets/images/game-montessori/garden.webp',
  'assets/images/game-montessori/ice-cube.webp',
  'assets/images/game-montessori/lamp.webp',
  'assets/images/game-montessori/log-alt.webp',
  'assets/images/game-montessori/log.webp',
  'assets/images/game-montessori/montessori-room.webp',
  'assets/images/game-montessori/moon.webp',
  'assets/images/game-montessori/night.webp',
  'assets/images/game-montessori/paper.webp',
  'assets/images/game-montessori/pillow.webp',
  'assets/images/game-montessori/rock.webp',
  'assets/images/game-montessori/sean-angry.webp',
  'assets/images/game-montessori/sean-confused.webp',
  'assets/images/game-montessori/sean-cute.webp',
  'assets/images/game-montessori/sean-happy.webp',
  'assets/images/game-montessori/sean-pouring.webp',
  'assets/images/game-montessori/sean-sad.webp',
  'assets/images/game-montessori/sean-speaking.webp',
  'assets/images/game-montessori/sean-surprised.webp',
  'assets/images/game-montessori/sean.webp',
  'assets/images/game-montessori/sun.webp',
  'assets/images/game-montessori/teddy.webp',
  'assets/images/game-montessori/water-drop.webp',
  'assets/images/game-montessori/math-abacus.webp',
  'assets/images/game-montessori/math-apples.webp',
  'assets/images/game-montessori/math-balloon.webp',
  'assets/images/game-montessori/math-beach.webp',
  'assets/images/game-montessori/math-cupcake.webp',
  'assets/images/game-montessori/math-five-stars.webp',
  'assets/images/game-montessori/math-number-tiles.webp',
  'assets/images/game-montessori/math-star.webp',
  'assets/images/game-montessori/math-sun.webp',
  'assets/images/game-montessori/math-whale.webp',
  'assets/images/game-montessori/practical-ball.webp',
  'assets/images/game-montessori/practical-bed.webp',
  'assets/images/game-montessori/practical-care.webp',
  'assets/images/game-montessori/practical-pitcher.webp',
  'assets/images/game-montessori/practical-rinse.webp',
  'assets/images/game-montessori/practical-room.webp',
  'assets/images/game-montessori/practical-shelf.webp',
  'assets/images/game-montessori/practical-toybox.webp',
  'assets/images/game-montessori/practical-wash.webp',
  'assets/images/game-montessori/science-bg.webp',
  'assets/images/game-montessori/science-burrow.webp',
  'assets/images/game-montessori/science-butterfly.webp',
  'assets/images/game-montessori/science-camel.webp',
  'assets/images/game-montessori/science-caterpillar.webp',
  'assets/images/game-montessori/science-chrysalis.webp',
  'assets/images/game-montessori/science-cloud.webp',
  'assets/images/game-montessori/science-flower.webp',
  'assets/images/game-montessori/science-frog.webp',
  'assets/images/game-montessori/science-globe.webp',
  'assets/images/game-montessori/science-nest.webp',
  'assets/images/game-montessori/science-panda.webp',
  'assets/images/game-montessori/science-seed.webp',
  'assets/images/game-montessori/science-sprout.webp',
  'assets/images/game-montessori/science-tree.webp',
  'assets/images/game-montessori/science-whale.webp',
  'assets/images/game-montessori/sensorial-bell.webp',
  'assets/images/game-montessori/sensorial-cube.webp',
  'assets/images/game-montessori/sensorial-fabric.webp',
  'assets/images/game-montessori/sensorial-ice.webp',
  'assets/images/game-montessori/sensorial-pink-tower.webp',
  'assets/images/game-montessori/sensorial-room.webp',
  'assets/images/game-montessori/subject-culture.webp',
  'assets/images/game-montessori/subject-language.webp',
  'assets/images/game-montessori/subject-math.webp',
  'assets/images/game-montessori/subject-practical.webp',
  'assets/images/game-montessori/subject-sensorial.webp',
  'assets/images/game-montessori/treasure-chest.webp'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(CORE.map(function (path) {
        return fetch(new Request(path, { cache: 'reload' })).then(function (response) {
          if (!response || !response.ok) throw new Error('Precache failed: ' + path);
          return cache.put(path, response);
        });
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

function cacheFirst(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(request, copy);
        });
      }
      return response;
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.match(request).then(function (cached) {
    const network = fetch(request).then(function (response) {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(request, copy);
        });
      }
      return response;
    }).catch(function () {
      return cached;
    });
    return cached || network;
  });
}

function networkFirst(request) {
  return fetch(request).then(function (response) {
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(function (cache) {
        cache.put(request, copy);
      });
    }
    return response;
  }).catch(function () {
    return caches.match(request);
  });
}

function networkFirstNavigation(request) {
  return fetch(request).then(function (response) {
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(function (cache) {
        cache.put('index.html', copy);
      });
    }
    return response;
  }).catch(function () {
    return caches.match('index.html').then(function (cached) {
      return cached || caches.match('./');
    });
  });
}

self.addEventListener('fetch', function (event) {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  const destination = request.destination;
  if (url.pathname.endsWith('/assets/audio/narration/manifest.json')) {
    event.respondWith(networkFirst(request));
    return;
  }
  if (destination === 'audio' || destination === 'font' || destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }
  if (destination === 'style' || destination === 'script') {
    event.respondWith(networkFirst(request));
    return;
  }
  event.respondWith(cacheFirst(request));
});
