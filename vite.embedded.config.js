// vite.embedded.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  server: {
    port: 5175,
    open: '/index-embedded.html', // Ensures dev server opens the correct HTML
  },
  build: {
    outDir: 'dist/embed',
    rollupOptions: {
      input: path.resolve(__dirname, 'index-embedded.html'),
    },
  },
});