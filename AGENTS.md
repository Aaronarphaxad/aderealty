# AGENTS.md — Westend (Lexington Themes)

**Westend** is a multi-page Astro theme for a **real-estate brokerage / property marketing** site: listings, open houses, agents, neighborhoods, services, resources, blog, careers, client stories (sales with prices and days on market), and lead-gen pages (book a call, valuation, sell your property). Primary use case is **marketing and operations for a property firm**, not a generic SaaS landing template.

**Publisher:** [Lexington Themes](https://lexingtonthemes.com/)
**Design rules:** [.cursor/skills/westend-design/SKILL.md](./.cursor/skills/westend-design/SKILL.md) - read before creating or changing any UI.  

## Tech stack (from `package.json` + `astro.config.mjs`)

| Area | Details |
|------|---------|
| Framework | **Astro** `^7.2.2` (Node `>=22.12`) |
| Styling | **Tailwind CSS** `^4.3.3` via **`@tailwindcss/vite`** |
| Content | Markdown content collections (`src/content.config.ts`) |
| Motion | **Lenis** smooth scroll, started in `BaseLayout.astro` |
| Bundled libraries | **Fuse.js** (search), **Keen Slider** (home carousel) and **`@fontsource-variable/inter`** (self-hosted Inter, latin file preloaded in `Fonts.astro`). No CDN scripts or fonts. |
| Images | `astro:assets` with **`sharp`** |
| SEO / feeds | `@lexingtonthemes/seo` `^0.4.0`; `@astrojs/sitemap` `^3.7.3`; `@astrojs/rss` `^4.0.19` |
| Tailwind plugins (deps) | `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide` |
| NPM package name | `@lexington/starter` (`package.json`) |

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes (marketing pages, indexes, `[...slug]` / `[status]` segments, `rss.xml.js`, `system/*` design screens) |
| `src/layouts/` | `BaseLayout.astro` + per-section layouts (`BlogLayout`, `PropertiesLayout`, `LegalLayout`, …) |
| `src/components/` | `fundations/` (head, elements, containers, icons, scripts), `global/` (Navigation, Footer, Search), `landing/`, feature folders (`properties/`, `agents/`, …), `assets/` (Logo) |
| `src/content/` | Markdown for all collections (see below). **`openHouses`** uses camelCase folder name. |
| `src/styles/` | `colors.css` (six semantic tokens: `background`, `foreground`, `muted`, `muted-foreground`, `border`, `accent`) and `global.css` (Tailwind entry, plugins) |
| `src/lib/` | `properties.ts`: price, price per m², viewing date, recent sales and URL helpers shared by cards, layouts and sections |
| `public/` | **Not present in this repository.** `Favicons.astro` still references root paths like `/favicon.ico`; add a `public/` directory if you need those assets. |

Import alias: `@/*` → `src/*` (`tsconfig.json`).

## Content collections (`src/content.config.ts`)

Loader pattern for all collections: `glob({ pattern: "**/*.md", base: "./src/content/<folder>" })`. Entry **`id`** is the filename without `.md` (used in URLs).

### `posts` → `src/content/posts/`

- **Required:** `title`, `pubDate` (date), `description`, `image: { url, alt }`.
- **Images:** `image.url` uses **`image()`** from the schema callback — use paths Astro can resolve (e.g. `"/src/images/blog/1.jpeg"` in existing entries).
- **Template:** copy from `src/content/posts/1.md`.

### `legal` → `src/content/legal/`

- **Required:** `page` (string), `pubDate` (date).
- **Images:** none in schema.
- **Template:** `src/content/legal/privacy-policy.md`.

### `resources` → `src/content/resources/`

- **Required:** `page`, `pubDate`.
- **Images:** none in schema.
- **Template:** `src/content/resources/faq.md`.

### `properties` → `src/content/properties/`

- **Required:** `title`, `coverImage: { url, alt }`.
- **Defaults / enums:** `status` (`for-sale` \| `for-rent` \| `sold` \| `off-market`), `propertyType`, nested `features` buckets, `isFeatured`, `isPriceOnRequest`, `gallery` (array of `{ url, alt?, caption? }` with `url: image()`).
- **Optional:** `tagline`, address fields, `coordinates`, counts, pricing fields, `energyClass` (`A` to `G`), `monthlyFee` (apartments), `agent`, `neighborhood` (string **ids** matching `agents` / `neighborhoods` entry ids), `pubDate`, `priority`, etc.
- **Template:** `src/content/properties/munkkiniemi-home.md`.

### `agents` → `src/content/agents/`

- **Required:** `name`, `city`.
- **Optional:** `languages` (string array, default `[]`), `role`, `email`, `phone`, `licenseId`, `photo: { url, alt }` (`image()`), `bio`, `isFeatured`.
- **Template:** `src/content/agents/tove-holmgren.md`.

### `services` → `src/content/services/`

- **Required:** `name`, `description`.
- **Optional:** `tagline`, `category` (`buying` \| `selling` \| `renting` \| `investing` \| `other`), `isFeatured`, `priority`.
- **Template:** `src/content/services/buyer-representation.md`.

### `neighborhoods` → `src/content/neighborhoods/`

- **Required:** `name`, `city`, `commute`, `schools`, `avgPricePerSqm`.
- **Optional:** `tagline`, `coverImage` (`image()`), `summary`, `highlights` (string array, default `[]`).
- **Template:** `src/content/neighborhoods/munkkiniemi.md`.

### `careers` → `src/content/careers/`

- **Required:** `title`, `department`, `description`.
- **Optional:** `type` (`full-time` \| `part-time` \| `contract`), `location`, `requirements`, `benefits` (arrays, default `[]`), `pubDate`.
- **Template:** `src/content/careers/senior-real-estate-agent.md`.

### `openHouses` → `src/content/openHouses/`

- **Required:** `title`, `property` (string **`id` of a `properties` entry**), `date`, `startTime`, `endTime`.
- **Optional:** `note`.
- **Images:** none in schema.
- **Template:** `src/content/openHouses/munkkiniemi-home-open-house.md`.

### `stories` → `src/content/stories/`

- **Required:** `name`, `role`, `outcome` (`sold` or `bought`), `property` (string **`id` of a `properties` entry**, which should have status `sold`), `salePrice`, `daysOnMarket`, `quote`, `photo` (`image()`), `pubDate`.
- **Optional:** **`featured`** (boolean; the newest featured story shows on the home page).
- **Template:** `src/content/stories/iker-salaberri.md`.

## Routing (content → URLs)

| Collection / area | Index | Detail URL |
|-------------------|--------|------------|
| Blog | `/blog` | `/blog/posts/[id]` (`src/pages/blog/posts/[...slug].astro`) |
| Legal | — | `/legal/[id]` |
| Resources | `/resources` | `/resources/[id]` |
| Properties | `/properties` | `/properties/[status]` (e.g. `/properties/for-sale`); detail **`/properties/[status]/[id]`** via `params.slug` = `` `${status}/${id}` `` in `src/pages/properties/[...slug].astro` |
| Services | `/services` | `/services/[id]` |
| Agents | `/agents` | `/agents/[id]` |
| Neighborhoods | `/neighborhoods` | `/neighborhoods/[id]` |
| Careers | `/careers` | `/careers/[id]` |
| Open houses | `/open-houses` | `/open-houses/[id]` |
| Stories | `/stories` | `/stories/[id]` |

**Static / non-collection pages (examples):** `/`, `/company`, `/book-a-call`, `/sell-your-property`, `/valuation`, `/404`, `/system/*`.

- **RSS:** `/rss.xml` is generated by `src/pages/rss.xml.js` from the `posts` content collection via `getCollection`, linking to `/blog/posts/{id}/`.

## Customization guide

- **Site URL:** `astro.config.mjs` → `site: "https://yourwebsite.com"` (feeds/sitemap/canonical behavior). **`Seo.astro`** (`@/components/fundations/head/BaseHead.astro`) currently hard-codes placeholder title/description/canonical/OG/Twitter; replace or wire to real meta per page as you evolve the theme.
- **Brand colors:** `src/styles/colors.css`, six semantic tokens. Typography: `src/styles/global.css` and `fundations/head/Fonts.astro`.
- **Navigation / footer:** `src/components/global/Navigation.astro` (with `MegaMenu.astro`) and `Footer.astro` (valuation call to action, office addresses with local clocks, link columns, full-width wordmark).
- **Pages are composed of section components:** pages and layouts hold no inline `<section>` markup. Layouts fetch and compute the data, then pass it as props to section components in `src/components/<feature>/` (for example `PropertyHero`, `PropertyDetails`, `MoreHomes`). Add new sections the same way.
- **Home page:** `src/pages/index.astro` composes section components from `src/components/landing/` (Hero, FeaturedProperties, Intro, NextOpenHouse, StuffPicks, Neighborhoods, RecentlySold, Method, Agents, Testimonial) plus `forms/LookingFor`.
- **Global shell:** `src/layouts/BaseLayout.astro` imports `global.css`, **`BaseHead`** (`@/components/fundations/head/BaseHead.astro`), Navigation, Footer.

## Commands

From **`README.md`** (same as `package.json` scripts):

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (`astro dev`) |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |
| `npm run astro --help` | Astro CLI help |

## Guardrails

- **Do not rename** `src/components/fundations/` — spelling is intentional and widely referenced.
- **Content schemas:** changing `src/content.config.ts` requires updating every layout/page/component that reads those fields; prefer additive optional fields.
- **Minimal diffs:** match existing import style (`@/…`), layout patterns, and collection usage.
- **`image()` fields:** keep `url` values compatible with Astro’s image handling; don’t switch to arbitrary strings without updating consumers.

## Lexington docs & support (from README)

Use these as-is for this theme:

- **Theme specs:** https://lexingtonthemes.com/templates/westend  
- **Documentation:** https://lexingtonthemes.com/documentation  
- **Changelog:** https://lexingtonthemes.com/changelog/westend  
- **Support:** https://lexingtonthemes.com/legal/support/  
- **Bundle:** https://lexingtonthemes.com  
