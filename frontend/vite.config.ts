import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"


export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})