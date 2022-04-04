import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.png', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'icons/*.png', 'logos/clubs/*.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Handball 4 you',
        short_name: 'H4Y',
        description: 'Handball scores and live ticker from h4a api',
        theme_color: '#30cba0',
        background_color: '#30cba0',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ]
})
