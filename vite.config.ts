import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Injeta a API_KEY para ser acessível via process.env.API_KEY no código
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Esbuild é nativo e resolve problemas de dependências externas como o terser
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', '@google/genai']
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  }
});