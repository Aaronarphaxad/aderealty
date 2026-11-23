# AdeRealty

Single-page marketing site for **Adebiyi Aderinto**, REALTOR® (Surrey / Metro Vancouver). Built with Astro + Tailwind. Deployed on Netlify.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview the production build |

Requires **Node.js 22.12+**.

## Where to edit

| What | Path |
| --- | --- |
| Site copy, nav, contact, SEO, reviews, FAQs | `src/lib/agent.ts` |
| Home page (section order) | `src/pages/index.astro` |
| Sections (hero, about, paths, contact, …) | `src/components/agent/` |
| Logo in the header | `src/components/assets/Logo.astro` |
| Nav / footer | `src/components/global/` |
| Photos & logos | `src/images/agent/` |
| Favicons & PWA icons | `public/` |
| Brand colors | `src/styles/colors.css` |
| Global CSS / fonts | `src/styles/global.css` |
| Privacy / terms | `src/content/legal/` |
| Site URL & Netlify build | `astro.config.mjs`, `netlify.toml` |

Most day-to-day changes start in **`src/lib/agent.ts`**, then the matching section under **`src/components/agent/`**.

## Deploy (Netlify)

1. Push to GitHub.
2. Import the repo in Netlify (`netlify.toml` already sets `npm run build` → `dist`, Node 22).
3. Preview URL is fine first; point **aderealty.ca** at the site when ready.

Canonical / OG / sitemap follow Netlify’s deploy URL until the custom domain is attached.
