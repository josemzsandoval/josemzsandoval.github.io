import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  worker: { format: 'es' },
  build: {
    chunkSizeWarningLimit: 1200, // maplibre-gl is lazy-loaded in its own chunk
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        es: resolve(import.meta.dirname, 'es/index.html'),
        ptBR: resolve(import.meta.dirname, 'pt-br/index.html'),
        cv: resolve(import.meta.dirname, 'cv.html'),
      },
    },
  },
});
