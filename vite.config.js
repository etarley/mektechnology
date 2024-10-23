// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compress from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compress({
      algorithm: "brotli",
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
      verbose: true,
    }),
    compress({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
      verbose: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-dom/client"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["react-icons"],
          "vendor-utils": ["clsx", "tailwind-merge"],
          "react-hook-form": ["react-hook-form"],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
