import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

// VITE_BASE_URL is set to /portfolio/ by the GitHub Actions workflow.
// Locally, it falls back to '/' so npm run dev works without changes.
const lastCommitDate = execSync('git log -1 --format=%cd --date=format:"%B %Y"').toString().trim();

export default defineConfig({
  plugins: [react()],
  define: { __LAST_UPDATED__: JSON.stringify(lastCommitDate) },
  base: process.env.VITE_BASE_URL ?? '/',
  server: { port: 5173, open: true },
  build: {
    target: 'esnext',
    cssMinify: true,
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
