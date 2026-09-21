# Veios de Timóteo — Design System

**Veios de Timóteo** is an urban heritage route ("rota patrimonial urbana") for the city of Timóteo, Minas Gerais, Brazil. It is a public-space intervention, not a software product: a continuous metal strip — *o Veio* — runs through the city, connecting its principal heritage sites, and along it sit corten-steel identification totems, interactive audio benches, a timeline inlaid in the pavement, and LED scenic lighting.

The brand's own line: *"Os caminhos que moldaram uma cidade."* Its promise: *"Patrimônio também se vive no caminho."*

The route has five points, in order:

| # | Patrimônio | Ano | Pilar |
|---|---|---|---|
| 1 | Igreja Matriz São José de Acesita | 1947 | Comunidade |
| 2 | Escola Técnica de Metalurgia | 1952 | Memória |
| 3 | Praça 29 de Abril | 1964 | Comunidade |
| 4 | Vila Operária | 1944 | Território |
| 5 | Usina da Acesita | 1944 | Indústria |

The narrative spine is five fixed pillars, always in this order: **Território** (o início) · **Indústria / Trabalho** (o impulso) · **Comunidade** (a força) · **Memória** (o que permanece) · **Futuro** (o que vem).

## Sources used

- `uploads/4ca91e34-7de9-4d0a-8bfa-a50bc948b13d.jpg` — brand board A (landscape): hero scene, the five intervention elements, route map, closing quote.
- `uploads/c3cc72db-bec5-4040-8bd7-5ef9dce633d5.jpg` — brand board B (five-panel brochure): wordmark panel, city history, the five patrimônios, the dark route-map plate, the manifesto panel.
- Reference for the interaction model (map-driven tour): `https://tour.renanpresidente.com.br/` — a full-screen pan/zoom map with a point list and a detail panel. Only the *interaction pattern* was taken; none of its visual design.
- No codebase, Figma file, or font binaries were provided. Everything here is derived from the two boards.

All photography in `assets/photos/` was **extracted by cropping the two supplied boards** — it is the brand's own imagery, at board resolution (small; replace with originals before production). Nothing was generated.

---

## Content fundamentals

**Language.** Brazilian Portuguese, always. Accents are mandatory (Timóteo, patrimônio, memória) — never strip them for technical convenience.

**Voice.** Institutional but warm; it speaks as the city about itself, never as a company selling a product. Short declarative sentences. Present tense for what exists, past tense only for history.

**Person.** Mostly impersonal third person ("Uma intervenção urbana que conecta os principais patrimônios"). Second-person *você* appears only to invite: *"A rota Veios de Timóteo convida você a percorrer esses caminhos."* Never first-person plural for the institution ("nós oferecemos") — but *nos/nossa* is used in the collective, civic sense: *"É sobre o que nos conecta."*

**Casing.** Sentence case for all sentences and headlines. ALL CAPS with wide letterspacing for labels, eyebrows, pillar names, and place names on totems (`TERRITÓRIO`, `A ROTA EM TIMÓTEO`, `OUTROS PONTOS DA ROTA`). Never all-caps a full sentence.

**Length.** Eyebrow: 2–5 words. Heading: under 10 words. Body paragraph: 2–4 lines, one idea. Heritage description: 1–3 lines (~180 characters), factual — what it is, who built it, why it matters. Pillar caption: 3–6 words (*"o impulso"*, *"o que permanece"*).

**Rhetoric.** The brand's signature device is the three-beat imperative: *"Preserve o que nos forma. Valorize o que nos une. Construa o que vem."* Also the paired noun list: *"território, trabalho e pessoas"*; *"moradia, escola, lazer e fé"*. Use each at most once per surface.

**Dates and numbers.** Bare years, no "em" in labels (`1947`). Distances in km with a comma decimal (`2,4 km`). Counts spelled out under ten in prose, numerals in labels.

**Emoji: never.** Not in UI, not in copy, not in social. The tone is civic and permanent; emoji read as disposable. Unicode is used only as typographic connective tissue: the middot `·` between label fragments, the em dash, and curly quotes `“ ”` for quotations.

**Do say:** patrimônio, rota, percurso, caminho, território, veio, memória, comunidade, moradores, trabalhadores.
**Don't say:** "experiência imersiva", "atração turística", "solução", "plataforma", "conteúdo", exclamation marks, superlatives ("o melhor", "incrível").

**Examples to copy.**
- Eyebrow: `A ROTA EM TIMÓTEO`
- Headline: *Uma cidade formada por território, trabalho e pessoas.*
- Body: *Timóteo nasceu do encontro entre o seu território e a indústria. A chegada da Acesita, em 1944, transformou o antigo povoado em uma cidade, trazendo moradia, escola, lazer e fé.*
- Heritage: *Construída em 1947 pela Acesita, é um símbolo da fé e da comunidade operária de Timóteo.*
- Closing: *"Timóteo é feita de pessoas, de trabalho e de lugares que contam uma história em comum. O Veio é o que liga tudo isso."*

---

## Visual foundations

### The motif
One idea carries the whole identity: **a single flowing line** — the Veio. It appears as the physical metal strip in the pavement, as thin copper strokes beside the wordmark, as a divider between sections, and as the connector between steps in a sequence. Nothing else decorates. If a surface needs visual interest, it gets a Veio, a photograph, or nothing.

### Color
The system holds a **70 / 25 / 5 ratio**: white paper carries the page, institutional green carries the identity, copper is the Veio and nothing else.

- **Green** (`--green-*`, primary `#2F4B39`, dark surfaces `#1B2B22`) — the institutional voice. Every action, every dark panel, icon discs, the footer, the map plate. This is the brand's colour.
- **Paper / white** (`--paper-*`, page `#FFFFFF`) — the dominant ground. Roughly 70% of any layout. Clean white, not beige.
- **Copper / Veio** (`--copper-*`, `#A96A3D`) — **accent only**: the metal line, the route polyline, route numbers, totem edges, lit details. Never a button, never a link, never a background.
- **Corten** (`--corten-*`) — weathered steel of the totems; a fill/gradient (`--fill-corten`), not flat UI colour.
- **Ink** (`--ink-*`, `#161A17`) — cool graphite text. **No pure black.**

Never more than two background colours per surface: white + one of green/photography. There are **no semantic status colours** (red/amber) in the source material — if a product needs them, propose them explicitly rather than inventing them here.

### Type
Three faces, each doing an institutional job. The pairing is deliberately *not* a trend pairing — it is museum-plaque, archive-catalogue and civic-wayfinding lettering put together.

- **Marcellus** (`--font-display`) — inscriptional Roman capitals, in the Trajan tradition. The wordmark, monumental headings, totem plates. Always uppercase, letterspaced `--tracking-display` (0.09em); the wordmark's "DE TIMÓTEO" takes 0.26em. The physical route is made of engraved plaques, so the display face is engraved lettering.
- **Source Serif 4** (`--font-serif`) — a text serif built for long-form reading. **All prose**: body, standfirsts, captions, quotations. The reading matter here is history, so it is set like history.
- **Archivo** (`--font-sans`) — a grotesque with strong capitals. Labels, eyebrows, buttons, nav, wayfinding, map furniture. 500 for interface text, 600 for uppercase labels.

Scale is 1.25 off 16px (`--size-3xs` 11px → `--size-6xl` 76px). Body 15px/1.62, measure capped at `62ch`. Tracking is applied to capitals only (0.10–0.26em) and **never to prose** — letterspaced lowercase is the clearest tell of amateur typesetting.

**⚠ Font substitution.** No font binaries were supplied; these are the nearest institutional matches on Google Fonts (loaded via `tokens/fonts.css`). **Please send the licensed originals.** If the boards' display face is genuinely Trajan Pro, Optima or Albertus, Marcellus is the closest free stand-in and should be swapped.

### Layout
Flush-edge panels divided by a **6px hairline gutter** (`--gutter-panel`) — inherited directly from the brochure boards; this is the single most recognisable layout rule. Interior padding is generous (32–80px). Content grids use `--gutter-grid` 24px. Max width 1240px, 1440px for map-width sections. Header is sticky, 72px, and is the only fixed element.

### Backgrounds
Full-bleed photography for heroes and manifesto panels; flat white for reading; flat green for the map and footer; `--surface-tint` (green-50) for the rare quiet band. **No gradients as decoration** — the only gradients in the system are physical simulations (corten metal, the polished Veio strip) and protection scrims. No patterns, no textures, no noise overlays, no hand-drawn illustration.

### Imagery
Golden-hour, true-to-life saturation for contemporary photography (`Figure tone="warm"`) — no filter look, no teal-orange grade. Historical material is **straight black and white** (`tone="archive"`), never sepia-tinted and never colourised. Aerials run slightly cool. Archive photos are masked into circles in timeline strips; everything else is a hard rectangle — no rounded photo corners.

### Corners, borders, shadows
Radii 0–6px; `--radius-xs` 2px is the default. Circles only for route numbers, icon discs and map pins. Borders are 1px hairlines in `--line-hairline` (`#DCD5C7`); a 2px copper rule marks an accent division. Cards are **flat**: bone fill, 1px hairline, 2px radius, no shadow at rest — `--shadow-card` appears only on the active/selected card. Depth is expressed as **light, not shadow**: the copper glow tokens (`--glow-veio-sm/md/lg`) are the brand's real elevation system and belong on metal and lit edges, never on paper.

### Transparency and blur
Rare and purposeful — only for controls floating over a map or photograph (`--glass-dark`, `--glass-light` + `--blur-glass`). Never on paper panels. Text over photography always sits on a scrim (`--scrim-bottom` / `--scrim-top` / `--scrim-side`), never on raw image.

### Motion
Walking pace. `--ease-out-soft` for entrances, `--ease-standard` for controls, `--ease-in-out-walk` for the Veio drawing itself in over `--duration-draw` (2400ms). Panels fade and rise a few pixels; lines draw; the map flies between points at ~1.1s. **Nothing bounces, nothing overshoots, nothing spins.** Respect `prefers-reduced-motion` by dropping the draw animation, not by disabling the map.

### States
- **Hover** — deepens one green step and lifts `-2px`. Cards gain a green hairline. No glow on paper.
- **Press** — `scale(0.985)`, darkens to `--action-primary-press`. No ripple.
- **Focus** — 2px `--action-focus-ring` outline, 2px offset. Always visible.
- **Selected** — copper glow + filled marker + `--shadow-card`. Map pin and list row light together.
- **Disabled** — `--opacity-disabled` 0.42, cursor `not-allowed`.

---

## Iconography

**System: Lucide (ISC), copied into `assets/icons/`** as 26 individual SVGs, and inlined into `components/icons/iconPaths.js` so `<Icon>` can recolor them with `currentColor`.

**⚠ Substitution flagged.** The boards use custom outline pictograms (mountain, factory, three figures, a classical portico, a leaf) at a light, even stroke. Lucide is the closest open match at the same weight; it is not the original set. If the designer's pictograms exist as vectors, send them and they will replace the Lucide files one-for-one.

Rules:
- Line icons only. 1.6px stroke at 20–24px, 1.1–1.4px at 32px+. Round caps and joins. Never filled, never two-tone, never in a rounded square badge.
- The five pillars have fixed glyphs: `mountain` Território · `factory` Indústria/Trabalho · `users` Comunidade · `landmark` Memória · `leaf` Futuro. Each sits centred in a 46px forest disc — the one place the brand uses a filled circle behind an icon.
- Icons are `currentColor`; on forest they are bone or `--copper-200`.
- **No emoji, ever.** Unicode as iconography is limited to `·`, `→`, and the arrow characters inside buttons.
- The QR code is a real brand element (it appears on both boards, bottom-right, under "SAIBA MAIS SOBRE A ROTA"). Use the `qr-code` glyph as a placeholder and replace with a real, scannable code in production.

---

## Components

React primitives, grouped by concern under `components/`. Each has a sibling `.d.ts` (props contract) and `.prompt.md` (what/when + usage).

**`components/core/`** — `Logo`, `Button`, `Eyebrow`, `Tag`, `VeioDivider`
**`components/icons/`** — `Icon` *(intentional addition: the boards define a pictogram set but no component for it; the wrapper enforces stroke weight and color inheritance)*
**`components/cards/`** — `HeritageCard`, `PillarCard`, `TotemPlate`, `QuoteBlock`
**`components/nav/`** — `NavBar`
**`components/media/`** — `Figure`
**`components/map/`** — `RouteMap`, `RouteLegend`

`RouteMap` requires Leaflet on the page (pinned tags in its `.prompt.md`); it renders real OpenStreetMap tiles filtered into the brand's dark plate, with the route as a copper polyline. The OpenStreetMap attribution is a licence requirement — keep it visible.

### Intentional additions
- **`Icon`** — see above.
- **`RouteLegend`** — the map key exists on the boards as static art; componentised so the map plate and the legend stay in sync.

Nothing else was invented: there are no form controls, dialogs, toasts, avatars or tabs in this system, because the source material defines none. If a product needs them, design them against these foundations and add them deliberately.

---

## Index

| Path | What it is |
|---|---|
| `styles.css` | The single entry point consumers link. `@import`s only. |
| `tokens/colors.css` | Copper, corten, forest, bone, ink + semantic aliases |
| `tokens/typography.css` | Font stacks, scale, tracking, composed type roles |
| `tokens/spacing.css` | Spacing scale, panel gutters, radii, layout widths |
| `tokens/effects.css` | Shadows, copper glows, metal fills, scrims, glass |
| `tokens/motion.css` | Easings, durations, hover/press deltas |
| `tokens/fonts.css` | Google Fonts import (substituted faces) |
| `tokens/base.css` | Minimal global base + link colors |
| `assets/logo-lockup.svg`, `-inverse.svg`, `logo-mark.svg`, `seal.svg`, `veio-divider.svg` | Brand marks, built to match the boards |
| `assets/icons/*.svg` | 26 copied Lucide glyphs |
| `assets/photos/*.png` | Brand photography cropped from the supplied boards |
| `components/**` | The 14 primitives listed above |
| `data/rota.js` | The five route points, coordinates and copy (ES module) |
| `ui_kits/tour/` | The tour site recreation — see its `README.md` |
| `guidelines/*.card.html` | Foundation specimen cards (Colors, Type, Spacing, Brand) |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent-skill entry point |

**Not built, and why:** no `templates/` Design Component for the tour site. The route map must run as plain HTML with ordinary `<script>` tags — Leaflet's container needs deterministic mount timing that a Design Component's `<helmet>` cannot guarantee. `ui_kits/tour/index.html` is the reusable starting point instead.

**⚠ Coordinates in `data/rota.js` are approximate**, read off the brand map plate rather than surveyed. Verify each point against the city's heritage register before production.
