import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { seoPlugin } from "./vite-plugin-seo";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /** GitHub Pages: set `VITE_BASE_PATH=/home-website/` in CI or `.env.production` */
  const base = env.VITE_BASE_PATH || "/";

  return {
    base,
    plugins: [react(), seoPlugin()],
    build: {
      chunkSizeWarningLimit: 1100,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("node_modules/three") ||
              id.includes("node_modules/@react-three")
            ) {
              return "vendor-three";
            }
            if (id.includes("node_modules/gsap")) {
              return "vendor-gsap";
            }
            if (
              id.includes("node_modules/framer-motion") ||
              id.includes("node_modules/motion")
            ) {
              return "vendor-motion";
            }
          },
        },
      },
    },
  };
});
