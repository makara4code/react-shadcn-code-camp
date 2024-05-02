import { defineConfig, loadEnv } from "vite";

import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode ?? "development", process.cwd(), "");
  const basePath: string = env.BASE_PATH ? env.BASE_PATH + "/" : "/";

  const proxy: Record<string, string> = {
    api: basePath + "api",
  };

  return {
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
        [proxy.api]: {
          target: env.BASE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(basePath, ""),
        },
      },
    },
  };
});
