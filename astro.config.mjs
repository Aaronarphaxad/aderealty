import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";  
import sitemap from "@astrojs/sitemap";

// Keep in sync with SITE_URL in src/lib/agent.ts.
const site = "https://aderealty.ca";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site,
  integrations: [sitemap({ filter: (page) => page === `${site}/` })],
});
