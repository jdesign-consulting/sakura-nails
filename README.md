# Sakura Nails · coming-soon page

Holding page and email list for **Sakura Nails** (press-on nails, US customers only) at
**https://sakuranails.store/**, hosted on GitHub Pages. The Shopify store comes later.

Plain HTML, CSS and a little vanilla JS. No build step, no frameworks, no npm, no analytics,
no cookies, no third-party requests (fonts are self-hosted).

---

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The coming-soon page: logo, headline, launch-discount teaser, signup form, social row, footer |
| `privacy.html` | Privacy policy (plain English, effective November 22, 2026) |
| `signup-soon.html` | Not used while Kit is wired up. Kept for pausing signups: no-JavaScript visitors would land here and nothing is sent |
| `css/tokens.css` | Brand design tokens (colours, type, spacing, radii) and the `@font-face` rules, copied from the brand kit's `tokens.css` (only the font paths changed). Edit tokens here, not in `style.css` |
| `css/style.css` | All page styles, built only from the tokens (no hard-coded colours) |
| `js/config.js` | **Every value you edit lives here**: Kit form URL, email field name, social links |
| `js/main.js` | Form validation, Kit submission, social links, footer year |
| `favicon.svg`, `favicon.ico`, `favicon-16/32/48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Favicons, Apple touch icon and PWA icons from the brand kit, at the site root |
| `og-image-1200x630.png` | Link-preview image (Open Graph / Twitter), at the site root |
| `assets/logo/` | Logo lockups, wordmarks and marks (SVG + PNG) from the brand kit. The page uses `logo-lockup.svg`; use `logo-mark-simplified.svg` for the mark below 64px |
| `assets/social/` | `social-avatar-1080.png` and `social-avatar-red-1080.png` (TikTok/Instagram profile pictures) |
| `fonts/` | Self-hosted Shippori Mincho (headlines), Lexend Giga (labels, buttons) and Montserrat (body) as woff2, with their SIL OFL licences. The stacks list "AR Mincho" and "Agrandir Wide" first on purpose: those licensed fonts are not shipped, so the free fonts are used |
| `brand/` | Brand book (`README.md`), design tokens (`tokens.css`, `tokens.json`) and asset notes from the v2 brand kit. Reference only, not deployed |
| `site.webmanifest` | Web app manifest from the brand kit (icons, theme colour `#5C0C14`) |
| `CNAME` | `sakuranails.store`. Record of the custom domain (with Actions deploys, the domain is set in Settings → Pages) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (only matters for branch deploys) |
| `.github/workflows/deploy-pages.yml` | GitHub Actions workflow that deploys the site to Pages on every push to `main` |

## Run it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

---

## Editing settings (`js/config.js`)

```js
window.SAKURA_CONFIG = {
  KIT_FORM_ACTION_URL: "https://app.kit.com/forms/10226086/subscriptions", // "" = signups paused
  KIT_EMAIL_FIELD_NAME: "email_address",// name of the email input in Kit's embed code
  SOCIAL_LINKS: { tiktok: "", instagram: "" }
};
```

- **Social links:** paste a full `https://` URL, e.g. `tiktok: "https://www.tiktok.com/@yourhandle"`.
  Nothing else needs changing. Empty = shown as a greyed-out, non-clickable item with a "soon" badge.
  Anything that isn't an `https://` URL is ignored.
- **Social icons:** the TikTok and Instagram glyphs in `index.html` are the official marks, taken from
  [Simple Icons](https://simpleicons.org/) 16.38.1 (CC0). They are shown in sakura-red to match the
  brand (TikTok's and Instagram's own guidelines prefer their marks in black or white, so switch
  `.social__item svg` back if either platform asks). The logos remain trademarks of TikTok and Instagram (Meta).
- **If `KIT_FORM_ACTION_URL` is empty:** the form still shows. Submitting shows
  "Signups open very soon…" and sends **nothing** anywhere. It never pretends to succeed.

---

## Wire up Kit

**Status:** steps 3–5 are done. The site points at Kit form **10226086**
(`https://app.kit.com/forms/10226086/subscriptions`, field `email_address`), for both the JavaScript
and the no-JavaScript paths. Still to do: check steps 1–2 in Kit, then step 7.

1. **Create a form in Kit.** In Kit, go to **Grow → Landing Pages & Forms → Create new → Form**,
   choose **Inline**, and pick any template (the styling isn't used; only the endpoint is).
   Name it something like "Coming soon list".
2. **Turn on double opt-in.** In the form editor open **Settings → Incentive** and make sure
   **"Send incentive email"** (Kit's confirmation email) is **on**. Edit the email so it reads as a
   confirmation ("Confirm your subscription to Sakura Nails"). Set the "after confirming" redirect to
   `https://sakuranails.store/` if you like.
3. **Get the form action URL.** Click **Publish → HTML** (the raw HTML embed, not the JavaScript one).
   In the code, find the opening `<form ...>` tag and copy the `action="..."` value. It should look like
   `https://app.kit.com/forms/1234567/subscriptions`.
4. **Paste it into `js/config.js`:**
   ```js
   KIT_FORM_ACTION_URL: "https://app.kit.com/forms/1234567/subscriptions",
   ```
   In the same embed code, find the email `<input>` and check its `name="..."`. If it is not
   `email_address`, put the real name in `KIT_EMAIL_FIELD_NAME`.
5. **Update the no-JavaScript form in `index.html`** (so visitors with JavaScript off can sign up too).
   *(Done. To pause signups later, set `KIT_FORM_ACTION_URL` back to `""` and reverse this step: restore
   `method="get" action="signup-soon.html"` and remove `name` from the email input. `signup-soon.html`
   is kept for that.)* Replace
   ```html
   <form class="signup" id="signup-form" method="get" action="signup-soon.html">
   ```
   with (your URL)
   ```html
   <form class="signup" id="signup-form" method="post" action="https://app.kit.com/forms/1234567/subscriptions">
   ```
   and add `name="email_address"` (or your field name) to the email input:
   ```html
   <input class="input" id="email" name="email_address" type="email" ...
   ```
6. **Commit and push to `main`.** The Actions workflow redeploys the site in a minute or two.
7. **Test it for real.** On the live site, sign up with an address you control. Check that:
   - the page says "Thanks! Check your inbox to confirm your email." (or takes you to Kit's
     "check your email" page; see "How submission works" below);
   - the **confirmation email arrives**, and clicking it confirms you;
   - you then show up in Kit as a **confirmed** subscriber.
   Then delete the test subscriber in Kit.

### What was verified and what was assumed

- **Verified against the live endpoint** (November 22, 2026, without submitting any real address):
  form 10226086 exists (an unknown form ID is rejected); Kit allows cross-origin requests from
  `https://sakuranails.store` (`Access-Control-Allow-Origin: *`) and replies in JSON, so the page shows its
  own success/error messages instead of falling back to Kit's page; `email_address` is the required field.
- **Not verified:** a real signup, the confirmation email, and the menu names in steps 1–2 (Kit's help
  centre refused automated access). That's what step 7 is for.
- Kit runs its own bot checks. If a genuine signup is ever flagged, Kit replies `"failed"` and the page
  shows "Sorry, something went wrong…" rather than a false success.
- Kit's privacy policy at **https://kit.com/privacy** was verified to load (last updated
  October 9, 2026).

### How submission works

- **With JavaScript:** the email is validated, then sent with `fetch` (`Accept: application/json`).
  A reply of `{"status":"success"}` shows the success message. An error reply shows an error.
  If the browser blocks the request (e.g. CORS) or Kit replies with something unexpected (e.g. it wants
  a captcha), the page falls back to a normal form POST, which opens Kit's own confirmation page in the
  same tab. In the CORS case Kit may receive the signup twice; Kit treats this as the same subscriber.
- **Without JavaScript:** a normal HTML form POST to Kit (after step 5).
- A hidden **honeypot** field catches simple bots. If it's filled in, nothing is sent. It has no `name`,
  so it is never submitted to Kit.
- **No email address is stored, logged or sent anywhere except Kit.** There are no API keys in this
  repo, only the public form URL.

---

## Deploy: GitHub Pages via GitHub Actions

The repo is `jdesign-consulting/sakura-nails` (public, as GitHub Pages on a free plan requires).
The workflow `.github/workflows/deploy-pages.yml` publishes the site **on every push to `main`**
(and on demand from the Actions tab → *Deploy to GitHub Pages* → *Run workflow*).
It publishes only the website files: `README.md`, `brand/` and `.github/` are left out.

One-time setup:

1. Make `main` the default branch (**Settings → General → Default branch**). Pages deployments are
   only allowed from the default branch unless you change the `github-pages` environment's rules.
2. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
3. **Custom domain:** type `sakuranails.store` and **Save**. With Actions deployments GitHub ignores the
   `CNAME` file, so this setting is what counts (the file is kept as a record of the domain).
4. Go to the **Actions** tab, open **Deploy to GitHub Pages**, and click **Run workflow** (or push any
   commit to `main`). Its first run fails if it started before step 2; just re-run it.
5. **Do not tick "Enforce HTTPS" yet.** Wait until the DNS check shows green and GitHub has issued the
   certificate (can take up to 24 hours after DNS works), then tick **Enforce HTTPS**.

If you use the `gh` CLI instead of steps 2–3 (use `-X PUT` if Pages is already enabled):

```bash
gh api -X POST repos/jdesign-consulting/sakura-nails/pages -f build_type=workflow
```

```bash
gh api -X PUT repos/jdesign-consulting/sakura-nails/pages -f cname=sakuranails.store
```

## DNS (at your domain registrar for sakuranails.store)

Remove any existing parking/forwarding records for the apex and `www`, then add:

| Type | Host / Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jdesign-consulting.github.io` |

(Optional IPv6: AAAA records on `@` to `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.)

- The `CNAME` file sets the **apex `sakuranails.store` as the primary domain**. With the `www` CNAME
  in place, GitHub Pages automatically redirects `www.sakuranails.store` to `sakuranails.store`.
- Check with `dig sakuranails.store +short` (should list the four IPs) and
  `dig www.sakuranails.store +short` (should show `jdesign-consulting.github.io`).
- **Verify the domain with GitHub** to prevent domain takeover: for an organisation repo go to the
  **organisation's Settings → Pages → Add a domain** (for a personal account: your profile
  **Settings → Pages**), enter `sakuranails.store`, and add the TXT record GitHub shows you
  (`_github-pages-challenge-jdesign-consulting.sakuranails.store`). Click **Verify** once it resolves.
- After DNS resolves and the certificate is issued, go back to **Settings → Pages** and tick
  **Enforce HTTPS**.

---

## Remaining TODOs

- [ ] **Postal address (legal requirement before the first marketing email).** Add a valid physical
      postal address (PO box or CMRA mailbox) to the footers and your Kit email footer **before sending any
      marketing email** (CAN-SPAM). Look for `TODO: add valid physical postal address` in
      `index.html`, `privacy.html` and `signup-soon.html`.
- [ ] **Professional review of `privacy.html`** before launch. All placeholders are filled in.
- [ ] **Test `support@sakuranails.store`.** The privacy policy lists it as the contact address. The domain
      already uses the registrar's email forwarding (MX records exist); make sure `support@` has a
      forwarding rule and send it a test email. Using it as Kit's sender address also needs Kit's domain authentication (SPF/DKIM records).
- [ ] **Kit:** endpoint is wired up (steps 3–5). Check double opt-in (steps 1–2), then do a real test
      signup (step 7). Kit's email footer also needs the postal address above before any marketing email.
- [ ] **Social links:** add URLs in `js/config.js` when the accounts exist; use
      `assets/social/social-avatar-1080.png` as the profile picture.
- [x] **Logo artwork:** the v2 brand-kit SVGs carry the owner's original Canva artwork as vector outlines.
- [x] **DNS + Pages + HTTPS:** live at https://sakuranails.store (www and http redirect to it).
      Check that the domain shows as **verified** in the organisation's Settings → Pages (its TXT record exists).
- [ ] **OG image:** `og-image-1200x630.png` (site root) says "Coming soon"; swap the text line at launch.
