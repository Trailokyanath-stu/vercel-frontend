import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // During development, requests to /api are forwarded to the
    // Express backend so you don't hit CORS issues. In production,
    // build this project and let the Express server serve the
    // resulting dist/ folder directly (see README.md).
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
