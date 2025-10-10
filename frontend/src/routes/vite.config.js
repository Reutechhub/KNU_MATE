import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['asset/logo.png'],
      manifest: {
        name: 'KNU MATE',
        short_name: 'KNUMATE',
        description: 'Your academic companion for notes and past papers at KNU.',
        theme_color: '#0d6efd',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'asset/logo.png', // Path to your logo in the public folder
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'asset/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'asset/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});