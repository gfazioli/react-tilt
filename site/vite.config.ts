import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/react-tilt/",
  plugins: [react()],
  resolve: {
    alias: {
      "@gfazioli/react-tilt": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../site-dist", import.meta.url)),
    emptyOutDir: true,
    sourcemap: true,
  },
});
