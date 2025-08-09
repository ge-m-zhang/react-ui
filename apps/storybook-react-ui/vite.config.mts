import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

export default defineConfig({
  plugins: [
    react({
      include: '**/src/**/*.{js,jsx,ts,tsx}',
    }),
  ],

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /packages/],
    },
  },
  server: {
    fs: {
      allow: ['..', '../../packages'],
    },
  },
});
