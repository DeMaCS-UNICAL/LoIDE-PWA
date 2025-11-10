/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // CRA's default build output
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      exclude: ["**/*.stories.{ts,tsx,js,jsx}", "**/stories/**"],
    },
  },
});
