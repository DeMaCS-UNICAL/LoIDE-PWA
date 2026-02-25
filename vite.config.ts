/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "service-worker.ts",
      registerType: "prompt",
      injectRegister: "auto",
      manifest: {
        name: "LoIDE PWA",
        short_name: "LoIDE",
        description: "Progressive Web App IDE for Logic Programming",
        theme_color: "#ffffff",
        background_color: "#f6f6f6",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "assets/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "assets/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "assets/splashscreens/ipad_splash.png",
            sizes: "1536x2048",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "assets/splashscreens/ipadpro2_splash.png",
            sizes: "2048x2732",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        // Exclude manifest icons to avoid duplicate precache entries
        globIgnores: ["**/android-chrome-192x192.png", "**/android-chrome-512x512.png"],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    open: true, // automatically open browser
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
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
