/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../dist',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    // setupFiles: ['__test__/setup.ts'],
    include: ['**/(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
