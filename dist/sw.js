if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const t=e=>n(e,r),l={module:{uri:r},exports:o,require:t};i[r]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(c(...e),o)))}}define(["./workbox-f279ae30"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.06092240.js",revision:null},{url:"assets/index.9f1353db.css",revision:null},{url:"assets/vendor.c23fb2ec.js",revision:null},{url:"index.html",revision:"1c3364cf936434ac5af39cc588c1cd31"},{url:"favicon.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"apple-touch-icon.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"pwa-192x192.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"pwa-512x512.png",revision:"ed4bf36c267af1021e36bd00952e4470"},{url:"icons/goal.png",revision:"2f1fafd37d0850ff6c9998dbc3a41e99"},{url:"manifest.webmanifest",revision:"cfac43a26f7f6cbec11652eec96717b4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));