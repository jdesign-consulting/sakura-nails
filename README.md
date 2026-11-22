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
| `signup-soon.html` | Shown only to visitors **without JavaScript** who submit before Kit is wired up. Nothing is sent |
| `css/style.css` | All styles (brand tokens at the top) |
| `js/config.js` | **Every value you edit lives here**: Kit form URL, email field name, social links |
| `js/main.js` | Form validation, Kit submission, social links, footer year |
| `assets/logo/` | Logo lockups and marks (SVG + PNG) from the brand kit |
| `assets/icons/` | Favicons, Apple touch icon, PWA icons from the brand kit |
| `assets/social/` | `og-image-1200x630.png` (link previews), `social-avatar-1080.png` (TikTok/Instagram profile picture) |
| `assets/fonts/` | Self-hosted Crimson Text and Montserrat (woff2) and their SIL OFL licences |
| `brand/` | Brand guidelines, design tokens (`tokens.css`, `tokens.json`) and asset notes from the brand kit |
| `site.webmanifest` | Web app manifest (icons, theme colour) |
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
  KIT_FORM_ACTION_URL: "",              // Kit form endpoint; "" = signups not open yet
  KIT_EMAIL_FIELD_NAME: "email_address",// name of the email input in Kit's embed code
  SOCIAL_LINKS: { tiktok: "", instagram: "" }
};
```

- **Social links:** paste a full `https://` URL, e.g. `tiktok: "https://www.tiktok.com/@yourhandle"`.
  Nothing else needs changing. Empty = shown as a greyed-out, non-clickable item with a "soon" badge.
  Anything that isn't an `https://` URL is ignored.
- **While `KIT_FORM_ACTION_URL` is empty:** the form still shows. Submitting shows
  "Signups open very soon…" and sends **nothing** anywhere. It never pretends to succeed.

---

## Wire up Kit (once the Kit account exists)

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
   Replace
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

- I could **not** read Kit's help centre from here (it refused automated access), so the steps above
  rely on Kit's long-standing embed format and are **assumptions to check against your own embed code**:
  the action URL shape `https://app.kit.com/forms/<ID>/subscriptions` (older accounts may show
  `app.convertkit.com`; either works if it's what your embed shows), `method="post"`, the field name
  `email_address`, and the menu names in steps 1–3.
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
- [ ] **Kit:** steps 1–7 above.
- [ ] **Social links:** add URLs in `js/config.js` when the accounts exist; use
      `assets/social/social-avatar-1080.png` as the profile picture.
- [ ] **Logo artwork:** the brand-kit SVGs are vector redraws of the first logo design. When the Canva
      original's SVG export is available, drop it in `assets/logo/` with the same filenames.
- [x] **DNS + Pages + HTTPS:** live at https://sakuranails.store (www and http redirect to it).
      Check that the domain shows as **verified** in the organisation's Settings → Pages (its TXT record exists).
- [ ] **OG image:** `assets/social/og-image-1200x630.png` says "Coming soon"; swap the text line at launch.
