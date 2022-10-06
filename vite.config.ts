import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@styles': '/src/assets/styles',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
    },
  },
});
