if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),l={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>l[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-f8b5deff"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.404cb479.js",revision:null},{url:"assets/index.d35adaa2.css",revision:null},{url:"assets/vendor.dafb6475.js",revision:null},{url:"index.html",revision:"d8f70f5ebfa3089552380aedf168be30"},{url:"favicon.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"apple-touch-icon.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"pwa-192x192.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"pwa-512x512.png",revision:"ed4bf36c267af1021e36bd00952e4470"},{url:"manifest.webmanifest",revision:"06d550c3612b79c3cc9e23384282a119"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
