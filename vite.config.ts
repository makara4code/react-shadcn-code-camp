import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_BASE_PATH,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        }
      },
    }
  }
})
