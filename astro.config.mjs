import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Netlify sets URL (site primary) and DEPLOY_PRIME_URL (this deploy).
// Local / unset builds fall back to the final production domain.
const site =
  process.env.URL || process.env.DEPLOY_PRIME_URL || "https://aderealty.ca";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site,
  integrations: [sitemap({ filter: (page) => page === `${site}/` })],
});
