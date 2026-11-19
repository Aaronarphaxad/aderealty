import type { APIRoute } from "astro";
import { agent, areas, paths, seo, SITE_URL, teamRecord } from "@/lib/agent";

// Machine-readable site summary for AI agents (Chrome Lighthouse Agentic Browsing + llmstxt.org).
// Keep this short: agents read it first, then follow the linked markdown for detail.
export const GET: APIRoute = () => {
  const home = `${SITE_URL}/`;
  const body = `# ${agent.name}, ${agent.title}

> Surrey and Lower Mainland BC real estate agent with ${agent.team}, brokered by ${agent.brokerageLegal}. Helps people buy, sell and invest in homes across ${areas.join(", ")}.

${agent.shortName} (${agent.name}) is a ${agent.title} based at ${agent.address.street}, ${agent.address.city}, ${agent.address.region} ${agent.address.postalCode}. Phone ${agent.cell.label}. Email ${agent.email.label}. Licensed since ${agent.licensedSince}.

He works with ${agent.team}, the Fraser Valley Real Estate Board's overall #1 team for ${teamRecord.yearsAtNumberOne} years running (${teamRecord.awards.year} awards: ${teamRecord.awards.titles.map((t) => `#1 ${t}`).join("; ")}). Team results include ${teamRecord.yearToDate.homesSold} homes sold in ${teamRecord.yearToDate.year} as of ${teamRecord.yearToDate.asOf}, and ${teamRecord.lastYear.homesSold} homes / $${teamRecord.lastYear.salesVolumeMillions}M volume in ${teamRecord.lastYear.year}.

Primary search intents this site serves: Surrey REALTOR, Surrey real estate agent, buy or sell a home in Surrey, Vancouver, Langley, and the Lower Mainland BC.

## Prefer these pages

- [Home](${home}): ${seo.description}
- [Site summary (Markdown)](${home}index.md): Full plain-text overview for agents
- [Book a discovery call](${agent.bookingUrl}): 30-minute Calendly booking
- [Contact](${home}#contact): Form, phone and email
- [How it works](${home}#how-it-works): Buying and selling process
- [Services](${home}#services): ${paths.map((p) => p.label).join(", ")}
- [About ${agent.shortName}](${home}#about): Background, MBA, team
- [Areas served](${home}#areas): ${areas.join(", ")}
- [Licence lookup](${agent.licenceLookupUrl}): BCFSA public register
- [Featured listings](${agent.listingsUrl}): Current homes for sale (Katrina & The Team)
- [Agent profile](${agent.agentPageUrl}): ${agent.name} on katrinaandtheteam.com

## Optional

- [Privacy policy](${home}legal/privacy-policy)
- [Terms of service](${home}legal/terms-of-service)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
