Sakura Nails is a US-only press-on nails brand. Its look is deep red on white: a five-petal mark where every petal is a nail, a spaced lowercase serif wordmark and a small wide-set capital NAILS. Quiet, elegant and a little formal.

## Content fundamentals

- Write the name as Sakura Nails in running text. Only the logo sets it as lowercase "sakura" over capital NAILS.
- Use US English spelling and USD prices. The audience is US customers only.
- Keep copy short, calm and concrete. Use sentence case for headlines, no emoji as decoration, no stacked exclamation marks.
- Mention the subscriber launch offer only as "a launch discount". Never state an amount, code or deadline unless the owner has supplied it.

## Logo

The logo files carry the owner's original artwork as vector outlines: "sakura" is AR Mincho (size 233 in the Canva file) and NAILS is Agrandir Wide (size 65). Use these files for every appearance of the logo; never retype it in another font.

- Use `assets/Logos/logo-lockup.svg` (mark, "sakura", NAILS) wherever there is room: headers, the OG image, packaging. White is the primary ground.
- Use `logo-wordmark.svg` where the mark sits separately or the space is wide and short, and `logo-mark.svg` on its own when the wordmark would be unreadable.
- Below 64px use `logo-mark-simplified.svg` (heavier rim, so the thin outline does not fill in): favicons, avatars, app icons.
- On a `sakura-red` background use `logo-lockup-reversed.svg`, `logo-wordmark-reversed.svg` or `logo-mark-reversed.svg`. For one-colour printing use `logo-lockup-mono-dark.svg`.
- Keep clear space of at least the height of the lowercase "a" in the wordmark on every side. Minimum widths: lockup 120px, mark 24px.
- Never recolour, stretch or outline the logo, and never place the red lockup on `rose` or on a photograph.

## Colour

- Set pages on `white`. Body text is `ink`; secondary text is `warm-charcoal`.
- Use `sakura-red` for headings, links and primary buttons, with `on-sakura-red` (white) for the text on those buttons.
- Use `blush-light` for soft panels, section bands and form fields on a white page, and `blush` for dividers, borders and hover fills. Put `ink` or `sakura-red` text on them.
- Use `rose` sparingly as an accent. It meets 4.5:1 on `white`, `blush-light` and `blush`, so it can carry text, but it is never a background for the red logo.
- Checked pairs: `sakura-red` on `white` 13.8:1, `ink` on `white` 16.5:1, `warm-charcoal` on `white` 7.6:1, `rose` on `white` 6.6:1, `sakura-red` on `blush-light` 12.2:1, `sakura-red` on `blush` 9.4:1, `ink` on `blush` 11.2:1, `warm-charcoal` on `blush` 5.2:1, `rose` on `blush` 4.5:1, `on-sakura-red` on `sakura-red` 13.8:1.
- Focus ring: 2px solid `sakura-red` with a 2px offset on `white` and the blush panels; `white` on `sakura-red` fills.

## Typography

- The logo lettering is AR Mincho and Agrandir Wide. Neither is open-licensed, so the site uses look-alikes for live text and the logo SVGs for the brand name itself.
- Headlines use the `display-xl`, `headline` and `title` styles: Shippori Mincho 400 with generous tracking. The stack lists `"AR Mincho"` first, so a licensed AR Mincho webfont, if the owner adds one, takes over with no other change.
- Body and interface text use `body` and `body-sm` (Montserrat 400).
- Eyebrows, buttons and tags use `label` (Lexend Giga 400, 12px, wide tracking, capitals), which echoes the NAILS line. The stack lists `"Agrandir Wide"` first for the same reason.
- Shippori Mincho, Lexend Giga and Montserrat are SIL Open Font License 1.1 fonts. The Latin-subset files are in `fonts/` for self-hosting: `ShipporiMincho-400.woff2`, `LexendGiga-300.woff2`, `LexendGiga-400.woff2`, `Montserrat-400.woff2`, `Montserrat-500.woff2`. Load them with `font-display: swap`; do not load fonts from a CDN.

## Shape and spacing

- Use only the `space-*` steps. Cards, panels and colour blocks use `radius-md`; inputs and tags use `radius-sm`; buttons use `radius-pill`.
- Build with flat colour. No gradients and no drop shadows.
- Each petal is a press-on nail: a hollow teardrop (the nail) inside a thin outline that swells into a solid, sharp tip at the outer end, five of them turned 72 degrees apart. Use a single petal as a divider or repeating pattern at a `space-12` pitch, never as a bullet in running text.

## Icons and favicon

- Favicon: `assets/Icons/favicon.svg` (it switches to `blush` in dark mode) with `favicon-32.png` as the fallback and `favicon.ico` from the brand kit for old browsers. Add `apple-touch-icon.png` (180px) and the 192px and 512px icons for the web manifest; `icon-512.png` keeps the mark inside the maskable safe zone.
- Social: `assets/Social/social-avatar-1080.png` (white) or `social-avatar-red-1080.png` (red) for TikTok and Instagram profile pictures; `og-image-1200x630.png` as the link-preview image.
- The theme colour for browsers and the web manifest is `sakura-red`; the manifest background is `white`.

## On the web

```css
body { background: var(--white); color: var(--ink); font-family: var(--font-sans); }
h1 { font-family: var(--font-display); color: var(--sakura-red); }
.eyebrow { font-family: var(--font-label); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sakura-red); }
.button { background: var(--sakura-red); color: var(--on-sakura-red); border-radius: var(--radius-pill); padding: var(--space-3) var(--space-6); }
input { background: var(--blush-light); color: var(--ink); border-radius: var(--radius-sm); padding: var(--space-3) var(--space-4); }
```
