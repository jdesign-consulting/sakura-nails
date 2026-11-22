Sakura Nails is a US-only press-on nails brand. Its look is deep red on warm cream, a sharp five-petal mark and a spaced lowercase serif wordmark: quiet, elegant and a little formal.

## Content fundamentals

- Write the name as Sakura Nails in running text. Only the logo sets it as lowercase "sakura" over capital NAILS.
- Use US English spelling and USD prices. The audience is US customers only.
- Keep copy short, calm and concrete. Use sentence case for headlines, no emoji as decoration, no stacked exclamation marks.
- Mention the subscriber launch offer only as "a launch discount". Never state an amount, code or deadline unless the owner has supplied it.

## Logo

- Use `assets/Logos/logo-lockup.svg` (mark, "sakura", NAILS) wherever there is room: headers, the OG image, packaging.
- Use `logo-mark.svg` on its own when the wordmark would be unreadable. Below 48px use `logo-mark-simplified.svg` (solid nail beds on a pale nail shape, no thin lines): favicons, avatars, app icons.
- On a `sakura-red` background use `logo-lockup-reversed.svg`. For one-colour printing use `logo-lockup-mono-dark.svg`.
- Keep clear space of at least one filled petal (about a quarter of the mark's height) on every side. Minimum widths: lockup 120px, mark 24px.
- Never recolour, stretch or outline the logo, and never place the red lockup on `rose` or on a photograph.

## Colour

- Set pages on `cream`. Body text is `ink`; secondary text is `warm-charcoal`.
- Use `sakura-red` for headings, links and primary buttons, with `on-sakura-red` for the text on those buttons.
- Use `blush` for soft panels and form fields, with `ink` or `sakura-red` text on them.
- Use `rose` sparingly as an accent. It meets 4.5:1 on `cream` and `blush`, so it can carry text, but it is never a background for the red logo.
- Checked pairs: `sakura-red` on `cream` 10.1:1, `ink` on `cream` 14.5:1, `warm-charcoal` on `cream` 6.7:1, `sakura-red` on `blush` 7.8:1, `rose` on `cream` 5.8:1, `on-sakura-red` on `sakura-red` 10.1:1.
- Focus ring: 2px solid `sakura-red` with a 2px offset on `cream` and `blush`; `cream` on `sakura-red` fills.

## Typography

- Headlines use the `display-xl`, `headline` and `title` styles (Crimson Text, regular weight, generous tracking). Use lowercase only for the logo; headlines are sentence case.
- Body and interface text use `body` and `body-sm` (Montserrat 400).
- Eyebrows, buttons and tags use `label` (Montserrat 500, 12px, wide tracking, capitals), which echoes the NAILS line.
- Both families are open-licensed Google Fonts. Self-host the font files on the site rather than loading them from a CDN.

## Shape and spacing

- Use only the `space-*` steps. Cards, panels and colour blocks use `radius-md`; inputs and tags use `radius-sm`; buttons use `radius-pill`.
- Build with flat colour. No gradients and no drop shadows.
- Each petal is a press-on nail: a solid teardrop (the nail bed) inside a pointed outline that closes around it and meets it at the base, tip pointing away from the centre. Use the plain teardrop as a divider or a repeating pattern at a `space-12` pitch, never as a bullet in running text.

## Icons and favicon

- Favicon: `assets/Icons/favicon.svg` (it switches to `blush` in dark mode) with `favicon-32.png`. Add `apple-touch-icon.png` (180px) and the 192px and 512px icons for the web manifest; `icon-512.png` keeps the mark inside the maskable safe zone.
- Social: `assets/Social/social-avatar-1080.png` for TikTok and Instagram profile pictures; `og-image-1200x630.png` as the link-preview image.

## On the web

```css
body { background: var(--cream); color: var(--ink); font-family: var(--font-sans); }
h1 { font-family: var(--font-display); color: var(--sakura-red); }
.button { background: var(--sakura-red); color: var(--on-sakura-red); border-radius: var(--radius-pill); padding: var(--space-3) var(--space-6); }
input { background: var(--blush); color: var(--ink); border-radius: var(--radius-sm); padding: var(--space-3) var(--space-4); }
```
