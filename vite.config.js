import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE_URL is set to /portfolio/ by the GitHub Actions workflow.
// Locally, it falls back to '/' so npm run dev works without changes.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL ?? '/',
  server: { port: 5173, open: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
});
