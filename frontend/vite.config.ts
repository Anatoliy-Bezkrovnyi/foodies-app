import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), svgr()],
  // Ð”Ð»Ñ Ð´ÐµÐ¿Ð»Ð¾ÑŽ Ð½Ð° GitHub Pages: Ð½Ð°Ð·Ð²Ð° Ð²Ð°ÑˆÐ¾Ð³Ð¾ Ñ€ÐµÐ¿Ð¾Ð·Ð¸Ñ‚Ð¾Ñ€Ñ–ÑŽ
  base: command === 'build' || process.env.npm_lifecycle_event === 'preview' ? '/foodies-app/' : '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
}));
