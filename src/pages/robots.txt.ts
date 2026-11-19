import type { APIRoute } from "astro";
import { SITE_URL } from "@/lib/agent";

// Built from SITE_URL so the sitemap link follows the domain when it changes.
// Pages that should stay out of Google carry a noindex tag (see BaseLayout), so nothing is
// blocked here: Google has to be able to read a page to see that tag.
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\n# AI / agent discovery\nAllow: /llms.txt\nAllow: /index.md\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
