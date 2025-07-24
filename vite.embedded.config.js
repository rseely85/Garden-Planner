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
  },
  build: {
    outDir: 'dist/embed',
    rollupOptions: {
      input: './index-embedded.html',
    },
  },
});