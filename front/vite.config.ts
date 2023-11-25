import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./env",
  plugins: [react()],
  server: { port: 3001 },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
    },
  },
  base: "https://hlg.mro.teamsoft.com.br/ecommerce",
});
