---
name: westend-design
description: Westend's design system - typography, color, spacing, and component rules. Use whenever creating or modifying UI in this theme (new pages, sections, components) so the result matches Westend's visual language.
---

# Westend design system

Westend is a real-estate brokerage theme with a calm Nordic-luxury look:
near-monochrome, huge uppercase Inter headlines, pill buttons, hairline
dividers, and softly rounded photography. New UI you build here should be
indistinguishable from the existing pages.

## Design personality

- Monochrome first: the whole site runs on six semantic color tokens.
  Color is rare and intentional.
- Editorial-brutalist type: section headings are large, `uppercase`,
  `font-semibold leading-none`, often full-width statements.
- Photography carries the warmth: images are rounded, large, and zoom
  gently on hover; the chrome around them stays austere.
- Hairlines, not shadows: `border-border` top borders divide content;
  drop shadows are effectively banned.
- Facts over adjectives: listings show price per m², energy class,
  monthly fee and viewing dates; neighborhoods show commute, schools and
  average price per m²; sales show asking, final price and days on market.

## Typography

Font is **Inter / InterVariable** only (loaded in
`fundations/head/Fonts.astro`). No serif, no mono, never another font.

Always use the `Text` component (`@/components/fundations/elements/Text.astro`)
instead of raw tags with ad-hoc sizes. Variants: `display6XL` down to
`displayXS`, then `textXL`, `textLG`, `textBase`, `textSM`, `textXS`,
`textXXS`. Real usage:

- **Section heading (the house pattern):** `tag="h2" variant="displayLG"` +
  `font-semibold leading-none text-foreground tracking-tight text-balance
  uppercase`. Copy this string from a sibling section.
- Inner-page title: `tag="h1" variant="displayLG"` with the same classes in
  sentence case, inside a Wrapper with `py-24 lg:pt-48`.
- Big numerals (stats, step numbers): `tag="span" variant="displayXL"` +
  `font-semibold leading-none tracking-tighter`.
- Card title: `tag="h3" variant="textBase"` (or `textSM`) + `font-medium
  text-foreground`; card body: `variant="textSM" class="text-muted-foreground"`.
- Lead paragraph under a heading: `variant="textLG"` in
  `text-muted-foreground`, with `text-pretty` or `text-balance`.
- Fact lists use `<dl>`: `dt` in `text-xs text-muted-foreground`, `dd` in
  `text-sm font-medium text-foreground`.

Only two weights exist: `font-semibold` for display type and `font-medium`
for card titles, labels, and buttons. Never `font-bold`, never `font-light`.

## Color system

Tokens live in `src/styles/colors.css` under `@theme`. There are exactly six:
`background`, `foreground`, `muted`, `muted-foreground`, `border` and
`accent` (a deep blue-violet). Never use Tailwind default palettes or hex
values in markup.

Usage rules:

- Pages sit on `bg-background`. Headings are `text-foreground`, body and
  metadata `text-muted-foreground`.
- `accent` is scarce: the next viewing line on cards, inline links,
  hover states and small status highlights. Do not paint sections or cards
  with accent.
- The footer is the one dark surface: `bg-foreground/95` with
  `text-background`, `text-background/60` for secondary text and
  `border-background/15` hairlines. Buttons on it use `variant="inverted"`.
- There is **no dark mode**; don't add `dark:` classes.

## Layout and spacing

- Every section is `<section>` wrapping `Wrapper`
  (`@/components/fundations/containers/Wrapper.astro`): `variant="standard"`
  for the page width, `paddingLess` for full-bleed, `prose` for markdown
  bodies. Don't hand-roll `max-w-* mx-auto` containers. The `<section>`
  itself only takes ground classes (background, `relative`,
  `overflow-hidden`).
- Section vertical padding goes on the Wrapper: `py-24`.
- **HeadingWrapper** (`fundations/containers/HeadingWrapper.astro`) is the
  standard section opener: a 12-col grid with a dot label on the left
  (`md:col-span-3`) and the heading/lead in the right `md:col-span-9`.
- Rhythm: content block after a heading area is `mt-12`; heading to lead
  paragraph `mt-4`; label to value `mt-1`. One value per spacing, never a
  responsive step like `mt-12 lg:mt-16`.
- Dividers are hairline top borders: `border-t border-border` with `pt-8`
  (section-level) or `pt-4` (inside cards). This replaces boxes and shadows.
- Grids: `grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12` for cards,
  `lg:grid-cols-4` for neighborhoods and offices.
- Images sit in `overflow-hidden rounded-lg` frames with a fixed aspect
  (`aspect-3/2`, `aspect-12/8`, `aspect-square`) and the hover zoom:
  `transition duration-300 ease-out group-hover:scale-105`.
- A "heading row + view-all link" header is common: `flex flex-wrap gap-8
  lg:items-end lg:justify-between` with the `h2` (and lead) on the left and
  a `FancyLink` on the right.

## Components

Reuse these before writing anything new:

- **Button** (`fundations/elements/Button.astro`): pill-shaped -
  `rounded-full` is baked in, never add another radius. Variants: `default`
  (foreground, background text), `accent`, `muted`, `mutedDark`,
  `inverted` (light pill for dark grounds), `none`. Sizes `xxs`-`xl`;
  `iconOnly` swaps to square `size-*`; optional `gap`; `isLink` + `href`
  renders an anchor. Standalone CTAs get `w-fit`.
- **FancyLink** (`fundations/elements/FancyLink.astro`): the animated
  three-dots link, used as the "All neighborhoods / All agents" companion
  to section headings.
- **Text**, **HeadingWrapper**, **Wrapper**: see above.
- **Property helpers** (`src/lib/properties.ts`): `priceText`,
  `pricePerSqm`, `formatEuro`, `propertyUrl`, `formatViewingDate`,
  `getNextViewings`, `getRecentSales`, `isActive`. Use them instead of
  formatting prices or URLs by hand.
- **Cards:** `properties/ProperySmallCard`, `properties/ProperyCarouselCard`,
  `agents/AgentCard`, `neighborhoods/NeighborhoodsCard`,
  `stories/StoryCard`, `openhouses/OpenHouseCard`.
- Icons live in `fundations/icons/` as Astro components (`ArrowRight`,
  `Plus`, `Search`); add new ones there instead of importing icon packs.
  Never use text glyphs for arrows.
- Forms use underline inputs, not boxes: `bg-transparent px-0 border-b
  border-border h-12 text-xs placeholder:text-muted-foreground
  focus:outline-none focus:ring-0` (see `forms/LookingFor.astro`).

## Corners, borders, shadows

- `rounded-lg` on images and media frames, `rounded-full` on buttons, dots
  and avatars. Cards are borderless content stacked on the background,
  not rounded boxes.
- Borders are 1px `border-border` hairlines, mostly `border-t` dividers.
- **No drop shadows**, except the floating MegaMenu popover.

## Voice and copy

Calm, factual, service-first. Section headings are short uppercase
statements ("Recently sold", "Where we sell", "Your agent"). Prefer real
figures (prices, m², days on market) over claims. Nordic places, and people
with Spanish, Nordic or Italian names. No exclamation marks, no emoji, no em
dashes.

## Do / Don't

Do:

- Copy an existing section's structure (Wrapper + HeadingWrapper or
  heading-row + FancyLink) before inventing a new layout.
- Keep the page monochrome; reach for `accent` only on links, viewing
  dates and highlights.
- Give every image a fixed aspect, `rounded-lg`, `overflow-hidden`, and
  the `group-hover:scale-105` zoom when it's inside a linked card.
- Build pages from section components in `src/components/`.

Don't:

- Don't add shadows, gradients, or colored section backgrounds.
- Don't exceed `font-semibold`, and don't lowercase the uppercase `h2`.
- Don't use arbitrary Tailwind values (`[...]`), `@apply`, `mb-*` or
  underlined links.
- Don't restyle Button radii or build boxed form inputs.
- Don't inline a heading with raw classes when `Text` has a variant for it.

## Quality check before finishing

1. Fonts, colors, and spacing come from existing tokens and match a
   sibling section.
2. New section reads correctly at `sm`, `md`, and `lg` breakpoints.
3. Headings use `Text` variants; buttons use `Button` variants with an
   explicit width decision.
4. No new dependencies, no unused imports, minimal diff.
