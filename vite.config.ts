import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Defines process.env.API_KEY to read from the standard Vite env variable
    // In Netlify, you must set the Environment Variable as VITE_API_KEY
    'process.env.API_KEY': 'import.meta.env.VITE_API_KEY'
  }
});