import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/calendar-demo.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
