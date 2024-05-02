import { defineConfig, loadEnv } from "vite";

import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode ?? "development", process.cwd(), "");

  const config = {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      proxy: {
        "/api": {
          target: env.API_BASE_PATH,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  };

  return config;
});
