# SEO & analytics playbook — AdeRealty (Adebiyi Aderinto)

**Client:** Adebiyi Aderinto / AdeRealty  
**Agency:** Bluebird Web ([bluebirdweb.ca](https://bluebirdweb.ca))  
**Engagement:** Technical SEO + analytics setup, with an ongoing organic growth and reporting retainer model  
**Site type:** Single-page Astro landing page focused on Surrey and the Lower Mainland BC  
**Primary URL (placeholder until live):** `https://aderealty.ca/`

This file is the source of truth for what shipped, how to maintain it, which tools to use, and how Bluebird reports monthly. Update the log at the bottom after each release or report.

---

## 0. Scope of the paid technical SEO + analytics service

### Included (technical SEO)

| Deliverable | Status |
|-------------|--------|
| Indexation control (home only; theme pages `noindex`) | Done |
| Title, meta description, canonical, Open Graph | Done |
| `robots.txt` + home-only sitemap | Done |
| Local business + Person + FAQ JSON-LD | Done |
| Core Web Vitals / Lighthouse performance work | Done (preview: 100) |
| Accessibility and best-practices fixes tied to SEO/agent audits | Done |
| AI / agentic discoverability (`llms.txt`, `/index.md`) | Done |
| Privacy and terms rewritten for Ade (footer-linked) | Done |
| Internal playbook (`SEO.md`) | Done |

### Included (analytics)

| Deliverable | Status |
|-------------|--------|
| Google Search Console verification slot + submit sitemap | Ready (needs live domain) |
| Google Analytics 4 install + key events | Planned (client will set up / Bluebird to wire) |
| Looker Studio or monthly scorecard reporting | Process defined below |
| Bing Webmaster Tools | Recommended at launch |

### Not included unless scoped separately

- Google Ads / Meta ads management  
- Buying links or directory spam  
- Writing long-form blog content every month (can be added)  
- Legal sign-off on privacy/terms (brokerage/lawyer)  
- Reputation CRM (Birdeye, Podium, etc.)  

---

## 1. What already ships with the site

| Item | Where |
|------|--------|
| Title and meta description | `src/lib/agent.ts` → `seo` |
| Canonical, Open Graph, Twitter card, LCP preload | `src/components/fundations/head/Seo.astro` |
| `robots.txt` + home-only sitemap | `src/pages/robots.txt.ts`, `astro.config.mjs` |
| Local business + FAQ + Person structured data | `src/components/agent/Schema.astro` |
| Language `en-CA`, NAP in footer | `BaseLayout.astro`, `Footer.astro` |
| Google Search Console verification slot | `GOOGLE_SITE_VERIFICATION` in `src/lib/agent.ts` |
| AI agent summary (`llms.txt`) | `/llms.txt` via `src/pages/llms.txt.ts` |
| Markdown home for agents | `/index.md` via `src/pages/index.md.ts` |

**Rule:** Do not invent review stars in schema. Google ignores or penalizes self-published ratings for local businesses. Only mark up facts that also appear on the page.

---

## 2. Tips applied from research (Astro, Google, Chrome)

These are the lessons that shaped the current build. Keep them when editing the site.

### 2.1 Always audit production, not `astro dev`

- Lighthouse on `npm run dev` (e.g. port 4321) uses Astro’s `/_image` endpoint and looks slower than reality.
- Official check: `npm run build && npm run preview`, then Lighthouse / PageSpeed Insights on the preview or live URL.
- Target after this work (mobile, production preview): **Performance, Accessibility, Best Practices, SEO = 100**, plus **Agentic Browsing** applicable checks passing.

### 2.2 LCP and images (Astro + web.dev)

Sources: [Astro Images](https://docs.astro.build/en/guides/images/), [Optimize LCP](https://web.dev/articles/optimize-lcp).

| Tip | What we did |
|-----|-------------|
| Never lazy-load the LCP image | Hero uses Astro `Picture` with `priority` (eager + `fetchpriority="high"`) |
| Serve modern formats | AVIF + WebP, `fallbackFormat="webp"` (avoid huge PNG fallbacks) |
| Mobile-first widths | Hero widths include 360–640 for Lighthouse’s ~412px viewport |
| Quality vs weight | `quality={70}` on hero and below-fold photos |
| Preload LCP candidate | `<link rel="preload" as="image">` for the 640w WebP on the home page |
| Shrink source assets | Path photos converted from 1–2MB PNG → ~34–151KB WebP |
| Decorative images | Empty `alt` + `aria-hidden` when adjacent text names the person/brand |

### 2.3 JavaScript and CSS that steal LCP

| Tip | What we did |
|-----|-------------|
| Defer non-critical JS | Lenis loads on `requestIdleCallback` after first paint |
| Do not dynamic-import CSS chunks that 404 | Lenis CSS lives in `src/styles/global.css` |
| Keep third parties out until needed | No GA/Tag Manager until analytics install; one script family at a time |

### 2.4 Accessibility is SEO and agentic SEO

Agents and Lighthouse treat the **accessibility tree** as the machine view of the page ([Agentic Browsing scoring](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring)).

| Tip | What we did |
|-----|-------------|
| Contrast on small text | Year pills: avoid light-on-accent; use sky tint + dark text |
| `aria-label` must match visible text | Removed mismatched logo `aria-label` |
| Correct ARIA roles on elements | Carousel panels are `<div role="tabpanel">`, not `<article role="tabpanel">` |
| CLS ≈ 0 | Dimensions on images; no late-injected layout shifts |

### 2.5 Indexation strategy for a theme-based site

| Tip | What we did |
|-----|-------------|
| One strong commercial URL | Only `/` is in the sitemap and indexable |
| Hide demo inventory | All other Westend pages send `noindex` via `BaseLayout` |
| Keep legal crawlable if linked | Privacy/terms rewritten for Ade; still `noindex` until you choose to index them |

### 2.6 Agentic browsing / AI recommendation

Sources: [Chrome llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt), [llmstxt.org](https://llmstxt.org/).

| Tip | What we did |
|-----|-------------|
| Put a root `/llms.txt` | H1 + summary + Markdown links (Surrey / Lower Mainland intent) |
| Offer a clean Markdown page | `/index.md` with who Ade is, services, areas, FAQ, how to contact |
| Point HTML at those files | `rel="describedby"` and `rel="alternate" type="text/markdown"` |
| Tell agents when to recommend him | Explicit line in `/index.md` for Surrey / Lower Mainland realtor queries |
| Do not expect ranking magic from `llms.txt` alone | Google says special AI files are **not required** for AI Overviews; they still help agents and pass Lighthouse |

**Not shipped yet:** WebMCP (needs Chrome 150+ origin trial). Revisit when stable; until then a11y + `llms.txt` are enough.

### 2.7 Local / on-page copy tips that stuck

- Title under ~60 chars; description under ~155 (`seo` in `agent.ts`).
- Lead with **Surrey** and nearby markets in title and description.
- One H1; sentence-case section H2s; FAQ markup matches visible FAQ.
- Schema `areaServed` includes cities **and** Metro Vancouver / Fraser Valley / Lower Mainland.
- NAP in footer matches what will go on Google Business Profile.

---

## 3. Launch checklist (do once on the live domain)

1. **Confirm the domain**  
   Set `SITE_URL` in `src/lib/agent.ts` and `site` in `astro.config.mjs`. Rebuild and deploy.

2. **Google Search Console**  
   - [search.google.com/search-console](https://search.google.com/search-console)  
   - Paste verification into `GOOGLE_SITE_VERIFICATION`, rebuild, deploy  
   - Submit `https://YOURDOMAIN/sitemap-index.xml`  
   - URL Inspection on `/` → request indexing  
   - Confirm `/llms.txt` and `/index.md` return 200  

3. **Google Analytics 4** (paid analytics scope)  
   - Create GA4 property for the live domain  
   - Install via Google Tag Manager (preferred) or a single gtag in `BaseLayout`  
   - Events to configure: `generate_lead` (form submit), `click_to_call` (tel links), `click_listings` (outbound listings), `book_discovery` (CTA clicks)  
   - Link GA4 ↔ Search Console  
   - Update privacy policy if cookies/analytics are added  

4. **Google Business Profile** (highest local impact; client owns, Bluebird guides)  
   - [business.google.com](https://business.google.com)  
   - NAP identical to footer  
   - Categories + service areas: Surrey, South Surrey, White Rock, Langley, Fraser Valley  
   - Website = home URL; photos; hours (confirm before adding to schema)  

5. **Bing Webmaster Tools**  
   Import from Search Console when possible.

6. **Clear remaining placeholders**  
   Real email/socials, working `FORM_ACTION`, real reviews, confirmed office hours.

7. **Baseline Lighthouse + PSI**  
   Save a PDF/screenshot of mobile scores on the live URL for the first client report.

---

## 4. Ongoing SEO strategy (90-day then continuous)

### Phase A — Foundation (weeks 1–4 after go-live)

Goal: get indexed, measured, and trusted.

- Search Console + GA4 live and linked  
- GBP claimed, complete, photos uploaded  
- First 5–10 Google reviews (ask closed clients; never buy)  
- NAP match across site, GBP, team page, socials  
- No index bloat (still only intentional URLs)  

### Phase B — Local pack + brand (months 2–3)

Goal: show up for “Surrey realtor” style queries and brand.

- Monthly GBP posts (one listing highlight or tip)  
- Citations only where accurate (chamber, community, REALTOR® directories)  
- Replace placeholder reviews on the site with real quotes (with permission)  
- Optional: one neighbourhood or buyer guide page **only** if Ade can stand behind it  
- Watch GSC for queries already impressing → improve title/H1/FAQ to match  

### Phase C — Organic compounding (month 4+)

Goal: steady discovery calls without paid ads dependence.

- Publish 1 useful local page per month **or** a meaningful landing-page refresh (new verified stats, case story)  
- Internal links from new pages back to `#contact` and `#services`  
- Earn links: team blog mention, community sponsorship, guest quote  
- Map-pack tracking (Local Falcon / BrightLocal) if competition is tight  
- Revisit WebMCP / richer agent tools when standards settle  

### Strategy rules (do not break)

1. **One commercial home page first** — do not spray thin city pages.  
2. **Proof over adjectives** — dates, awards, real reviews.  
3. **Measure leads, not vanity** — discovery calls and form submits beat bounce rate debates.  
4. **Technical health is monthly, not once** — CWV and coverage in every report.  
5. **Agents and search both matter** — keep `/llms.txt` and `/index.md` in sync when copy or NAP changes.

---

## 5. Tools for the Bluebird technical SEO + analytics service

### Core stack (use every month)

| Tool | Cost | Role in the service |
|------|------|---------------------|
| [Google Search Console](https://search.google.com/search-console) | Free | Queries, clicks, indexing, CWV field data |
| [Google Analytics 4](https://analytics.google.com) | Free | Traffic, sources, conversion events |
| [Google Business Profile](https://business.google.com) | Free | Map pack, calls, directions, reviews |
| [Google Tag Manager](https://tagmanager.google.com) | Free | Clean GA4 / future ads tags without redeploying constantly |
| [Looker Studio](https://lookerstudio.google.com) | Free | Client-facing dashboard (GSC + GA4) |
| Google Sheets | Free | Scorecard archive + review ask tracker |
| [PageSpeed Insights](https://pagespeed.web.dev) | Free | Lab + field CWV check |
| Chrome Lighthouse (incl. Agentic Browsing) | Free | Pre-release QA; use **preview/production**, not `astro dev` |
| [Rich Results Test](https://search.google.com/test/rich-results) | Free | Validate RealEstateAgent / FAQ after schema edits |
| [Bing Webmaster Tools](https://www.bing.com/webmasters) | Free | Bing + Copilot coverage |

### Technical SEO toolkit

| Tool | Cost | When Bluebird uses it |
|------|------|------------------------|
| [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) | Free | Crawl/audit on verified site |
| [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) | Free ≤500 URLs | Full crawl when the site grows past one page |
| [Ahrefs](https://ahrefs.com) or [Semrush](https://www.semrush.com) | Paid | Competitor keywords + content gaps once multi-page |
| Astro build + `sharp` | In repo | Image pipeline; keep AVIF/WebP + priority LCP pattern |

### Local / reputation (add when Phase B needs it)

| Tool | Cost | Notes |
|------|------|-------|
| [Local Falcon](https://www.localfalcon.com) or [BrightLocal](https://www.brightlocal.com) | Paid | Map-pack grid ranks around Surrey |
| Manual review ask sheet | Free | Who was asked, when, outcome |
| Birdeye / Podium / GatherUp | Paid | Only if review volume justifies SaaS |

### Analytics depth (optional paid)

| Tool | Cost | Notes |
|------|------|-------|
| [CallRail](https://www.callrail.com) (or similar) | Paid | Separate call tracking if running ads + organic |
| Microsoft Clarity | Free | Session heatmaps; use sparingly, privacy-aware |

### AI / agent readiness checks

| Tool / URL | Use |
|------------|-----|
| Lighthouse → Agentic Browsing | Confirm `llms.txt` + a11y tree after big UI changes |
| Live `/llms.txt` and `/index.md` | Must stay accurate when NAP, services, or stats change |
| [llmstxt.org](https://llmstxt.org/) | Spec reference when editing agent files |

---

## 6. Monthly scorecard (copy into Sheets or Looker Studio)

Track on the same day each month:

| Metric | Source | Healthy direction |
|--------|--------|-------------------|
| Organic clicks | Search Console | Up |
| Organic impressions | Search Console | Up |
| Avg position (Surrey realtor + brand) | Search Console | Toward 1 |
| Organic sessions | GA4 | Up |
| `generate_lead` / form submits | GA4 | Up |
| `click_to_call` | GA4 | Up |
| GBP profile views | GBP | Up |
| GBP calls / direction requests | GBP | Up |
| New Google reviews (count + rating) | GBP | Steady growth |
| Mobile LCP / CWV | PSI or GSC CWV | Good / stable |
| Indexed pages | GSC | Intentional only |
| Lighthouse Performance / SEO (lab) | Preview or live | Stay near 100 |
| `llms.txt` HTTP 200 | Curl or browser | Always |

---

## 7. Monthly service routine (Bluebird, ~3–5 hours)

### Week 1 — Measure & report prep

- Pull GSC (28 days vs previous 28) and GA4 conversions  
- GBP insights + review replies outstanding  
- Note any coverage or CWV warnings  

### Week 2 — Trust

- Prompt Ade for 1–2 review asks from recent closings  
- Spot-check NAP on site, GBP, team page  
- One accurate citation update if needed  

### Week 3 — Improve

Pick **one**:

- Landing page proof refresh (verified team figure, case story)  
- FAQ or copy tweak targeting a query already in GSC  
- New neighbourhood / guide page (only if unique and useful)  

### Week 4 — Technical QA + ship report

- PSI mobile on `/`  
- Lighthouse on production (include Agentic if Chrome supports it)  
- Rich Results Test if schema changed  
- Confirm `/llms.txt` and `/index.md` still match live facts  
- Send monthly report (below)  

---

## 8. Client reporting format (what Ade receives)

**Cadence:** Monthly email + optional 15-min Loom or call.  
**Owner:** Bluebird Web.

### Report outline

1. **Headline results** — organic clicks, leads (forms/calls), GBP calls vs last month  
2. **What we did** — technical fixes, copy/schema changes, reviews/citations  
3. **Search insights** — top queries, rising opportunities, brand vs non-brand  
4. **Technical health** — CWV / Lighthouse summary, indexation status  
5. **Next month plan** — one primary bet + one backup  
6. **Blockers / needs from Ade** — reviews, photos, hours, form destination, social URLs  

### Dashboard

- Looker Studio connected to GA4 + Search Console (share view-only with Ade)  
- Sheet archive of monthly scorecard rows for year-over-year  

---

## 9. Keywords to watch (not to stuff)

Use naturally in titles, headings, FAQ and agent Markdown. Do not pack the hero with a keyword list.

**Primary:** Surrey REALTOR, Surrey real estate agent, buy a house in Surrey, sell my house Surrey  

**Secondary:** South Surrey realtor, White Rock realtor, Langley realtor, Fraser Valley / Lower Mainland real estate agent, first-time home buyer Surrey  

**Brand:** Adebiyi Aderinto, AdeRealty, Ade realtor Surrey  

---

## 10. What not to do

- Do not index leftover Westend demo pages  
- Do not buy links or fake reviews  
- Do not clone thin city pages  
- Do not put hours, prices, or ratings in schema that are not visible and confirmed on the page  
- Do not run Lighthouse on `astro dev` and treat it as production truth  
- Do not add GA4/ads scripts without updating privacy language and testing LCP  
- Do not chase national keywords until local brand + map pack are stable  

---

## 11. File map (for Bluebird engineers)

| Concern | File(s) |
|---------|---------|
| Titles / descriptions / verification | `src/lib/agent.ts` |
| Meta + OG + LCP preload + agent link tags | `src/components/fundations/head/Seo.astro` |
| `noindex` for non-home | `src/layouts/BaseLayout.astro` |
| JSON-LD | `src/components/agent/Schema.astro` |
| `llms.txt` / `index.md` | `src/pages/llms.txt.ts`, `src/pages/index.md.ts` |
| robots | `src/pages/robots.txt.ts` |
| Sitemap filter | `astro.config.mjs` |
| Hero LCP image | `src/components/agent/Hero.astro` |
| Deferred Lenis | `src/layouts/BaseLayout.astro`, `src/styles/global.css` |

---

## 12. Done / next log

| Date | Done | Next |
|------|------|------|
| 2026-11-14 | On-page SEO, schema, robots, home-only sitemap, privacy/terms | Search Console + GBP on live domain |
| 2026-11-14 | LCP Picture/AVIF/WebP, Lenis defer, a11y contrast/roles, Lighthouse 100s on preview | Keep pattern on future images |
| 2026-11-14 | `/llms.txt`, `/index.md`, agentic a11y tree pass | Keep agent files in sync when NAP/stats change |
| 2026-11-14 | This playbook expanded for paid tech SEO + analytics service | Install GA4 + GTM; first monthly scorecard after launch |
