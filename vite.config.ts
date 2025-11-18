import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Copies the pictures folder to the build output (dist/pictures)
    viteStaticCopy({
      targets: [
        {
          src: 'pictures',
          dest: '.'
        }
      ]
    })
  ],
  base: './', // Ensures relative paths work on GitHub Pages
});