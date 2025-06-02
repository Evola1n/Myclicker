// файл: Myclicker/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ← этот параметр говорит Vite: «во всём build’е подставляй префикс /Myclicker/ перед путями к ассетам»
  base: '/Myclicker/',

  build: {
    // теперь итоговый бандл будет попадать в папку 'docs', а не 'dist'
    outDir: 'docs',
    emptyOutDir: true, // опционально: чтобы docs очищался перед новой сборкой
  },
});
