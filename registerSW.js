if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/h4y/sw.js', { scope: '/h4y/' })})}