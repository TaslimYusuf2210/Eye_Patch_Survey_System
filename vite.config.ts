import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Expose the dev server on the local network (0.0.0.0) so other devices
    // can access it — Vite will print the Network URL on startup.
    host: true,
    allowedHosts: ['.trycloudflare.com'],
  },
})
