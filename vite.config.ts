import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Substitui as variáveis de ambiente no código durante o build
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    strictPort: true
  }
});