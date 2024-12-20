import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite que el servidor escuche en todas las interfaces
    port: 5173 // Asegúrate de que el puerto sea el correcto
  }
});
