if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const f=e=>i(e,o),l={module:{uri:o},exports:r,require:f};s[o]=Promise.all(n.map((e=>l[e]||f(e)))).then((e=>(c(...e),r)))}}define(["./workbox-f279ae30"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.5dc73ddf.js",revision:null},{url:"assets/index.9f1353db.css",revision:null},{url:"assets/vendor.acf1ccdf.js",revision:null},{url:"index.html",revision:"62aa7245b13d8581b582adb202cd3325"},{url:"favicon.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"apple-touch-icon.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"pwa-192x192.png",revision:"4e7f0ec805a85d803247c96a5c71b19a"},{url:"pwa-512x512.png",revision:"ed4bf36c267af1021e36bd00952e4470"},{url:"icons/goal.png",revision:"2f1fafd37d0850ff6c9998dbc3a41e99"},{url:"logos/clubs/109.png",revision:"3dd42ae559ebc8d43cb8b5f2bfa5fbb1"},{url:"logos/clubs/590.png",revision:"e6ece61fdadc3eeaf63bc5fbf54ddb9f"},{url:"logos/clubs/784.png",revision:"e21ce09c6841698e64cd0a564340e0db"},{url:"manifest.webmanifest",revision:"cfac43a26f7f6cbec11652eec96717b4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
