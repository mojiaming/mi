/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/0.js',
    './build/1.js',
    './build/2.js',
    './build/3.js',
    './build/4.js',
    './build/5.js',
    './build/6.js',
    './build/7.js',
    './build/8.js',
    './build/9.js',
    './build/10.js',
    './build/11.js',
    './build/12.js',
    './build/13.js',
    './build/14.js',
    './build/15.js',
    './build/16.js',
    './build/17.js',
    './build/18.js',
    './build/19.js',
    './build/20.js',
    './build/21.js',
    './build/22.js',
    './build/23.js',
    './build/24.js',
    './build/25.js',
    './build/26.js',
    './build/27.js',
    './build/28.js',
    './build/29.js',
    './build/30.js',
    './build/31.js',
    './build/32.js',
    './build/33.js',
    './build/34.js',
    './build/35.js',
    './build/36.js',
    './build/37.js',
    './build/38.js',
    './build/39.js',
    './build/40.js',
    './build/41.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
