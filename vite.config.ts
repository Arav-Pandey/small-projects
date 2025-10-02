import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // 👈 enables PWA in dev mode
      },
      manifest: {
        name: "Everything you need website",
        short_name: "BestSite",
        description: "Everything you need in one website",
        theme_color: "#5fdcffff",
        icons: [
          {
            src: "a.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  server: {
    port: 5713,
    host: "localhost",
  },
});
