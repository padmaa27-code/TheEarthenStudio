# The Earthen Studio

Complete static website. No build step, no dependencies, no placeholders,
nothing left to fill in. Upload and publish.

**Mock site produced for an academic project. The business is fictional.**

---

## Deploy

**The repository must be named exactly `TheEarthenStudio`.** Every canonical URL,
Open Graph tag and sitemap entry is already set to
`https://padmaa27-code.github.io/TheEarthenStudio`. A different repo name breaks
all of them.

1. github.com → **New repository**
   - Name: `TheEarthenStudio` (exact capitalisation)
   - **Public**
   - Do **not** tick "Add a README file"
   - Create
2. On the empty repo screen click **"uploading an existing file."**
   Select everything **inside** this folder (Ctrl+A) and drag it in. Drag the
   `images` folder in as a second action. Commit.
3. Confirm the repo root lists `index.html`, `styles.css`, `main.js` as
   top-level rows — not a single folder containing them.
4. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
5. Wait 1–3 minutes. Live at **https://padmaa27-code.github.io/TheEarthenStudio/**

To edit later: click the file → pencil icon → edit → commit. Or re-upload a
file with the same name.

---

## What's in it

Five pages plus a custom 404, all cross-linked and all responsive.

| Page | Contents |
|---|---|
| `index.html` | Hero, session summary, the six-step firing process, corporate teaser, shop preview |
| `sessions.html` | Solo, couples, group and six-week course with rate tables, plus a booking form |
| `teams.html` | Four corporate formats, inclusions and add-ons, booking process, past work, enquiry form |
| `shop.html` | Eight products, cart drawer with quantity steppers, full checkout flow |
| `visit.html` | Studio info, the team, seven-question FAQ, directions |
| `404.html` | Custom error page, set to noindex |

**Interactive parts that work:** mobile navigation, scroll reveals, add to cart,
quantity up and down, running subtotal with free delivery over 3,000 rupees,
checkout form, order confirmation with a generated order number, two enquiry
forms with confirmation states, Escape-to-close on the drawer and modal.

Cart state lives in a JavaScript variable. No storage, no cookies, no network
calls, no payment gateway. Reloading empties it — correct for a demonstration.

---

## The images

All 17 are included as SVG and already wired in. They are **illustrations, not
photographs**: vessel drawings for the eight products, plan views and elevations
for the studio scenes, and a street map. This is a deliberate art direction —
the studio's own working drawings — and the alt text describes them accurately
rather than pretending they are photos.

They are vector, so they stay sharp at any size and the whole set weighs under
200 KB.

If you later want photographs, replace the file and update that one `src`
attribute. Unsplash and Pexels are free for commercial use.

---

## Search and quality work already done

**Indexing**
- Unique title (under 62 characters) and unique meta description (110–160
  characters) on every page, sized so Google does not truncate them
- `rel="canonical"` on all six pages
- `sitemap.xml` listing all five indexable pages, referenced from `robots.txt`
- `404.html` set to `noindex, nofollow`
- `max-image-preview:large`

**Structured data — 14 JSON-LD blocks**
- `LocalBusiness` with address, geo-coordinates, opening hours, phone, price
  range, payment methods
- `Service` with `Offer` and price for each session type and corporate format
- `ItemList` of eight `Product` entries with price, currency, availability, condition
- `FAQPage` on the Visit page, matching the visible questions exactly
- `BreadcrumbList` on every sub-page

Validate at **validator.schema.org** with your live URL. Screenshot it for your
appendix.

**No `AggregateRating` or `Review` markup, deliberately.** Fabricating review
counts for a business with no customers is a structured-data policy violation
and Google issues manual actions for it. Knowing what not to mark up is worth
saying out loud in your presentation.

**On-page**
- One `<h1>` per page, correct heading nesting, no skipped levels
- Descriptive alt text on every image
- Internal links use meaningful anchor text, never "click here"
- Semantic landmarks: `<main>`, `<nav aria-label>`, `<table><caption>`, `<th scope>`

**Core Web Vitals**
- Every image container has a fixed `aspect-ratio` and every image carries
  explicit width and height, so layout shift is zero
- `loading="lazy"` below the fold, `fetchpriority="high"` on the hero only
- One CSS file, one JS file, both small; JS is deferred
- `preconnect` and `preload` on fonts with `display=swap`

**Accessibility**
- Skip-to-content link, visible focus rings, `aria-current` on the active nav item
- Reveal animations are opt-in via a `.js` class, so with JavaScript disabled
  every section is visible rather than blank
- `prefers-reduced-motion` disables all animation
- The closed cart drawer is `inert`, so its controls are not keyboard-reachable

**Social**
- Open Graph and Twitter Card tags with a real 1200x630 image, so pasting the
  link into WhatsApp or Slack renders a proper preview
- `favicon.svg` and `site.webmanifest`

---

## Before you submit

- [ ] Repo named exactly `TheEarthenStudio`, set to Public
- [ ] Site loads and all five pages cross-link
- [ ] Cart works: add two items, change quantity, checkout, order number appears
- [ ] View source, Ctrl+F `canonical` — must read `padmaa27-code.github.io/TheEarthenStudio`
- [ ] Structured data validated, screenshot taken
- [ ] Lighthouse run in Chrome DevTools, four scores screenshotted
- [ ] Every page screenshotted — free hosting gets deprovisioned, and a dead
      link at grading time is your problem
- [ ] Placeholder contact details reviewed: the phone, the email and the Cooke
      Town address are invented. Confirm none of them belongs to a real
      business before they go in a deck.

**Do not verify this site in Google Search Console or submit the sitemap.** You
would be asking Google to index a fictional local business at a fabricated
address. The validator and Lighthouse give you the same evidence.

---

## File list

```
index.html  sessions.html  teams.html  shop.html  visit.html  404.html
styles.css        all styling
main.js           navigation, reveals, forms, cart
sitemap.xml       five URLs
robots.txt        points at the sitemap
og-cover.png      social share card, 1200x630
favicon.svg       site icon
site.webmanifest
.nojekyll         stops GitHub Pages running Jekyll over the files
images/           17 SVG illustrations
```

## If it breaks

| Symptom | Cause |
|---|---|
| Whole site 404s | Files are in a subfolder, or Pages source not saved |
| Unstyled text on white | `styles.css` did not upload |
| Cart does nothing | `main.js` did not upload |
| Images missing | The `images` folder did not upload |
| Edits not showing | Hard refresh (Ctrl+Shift+R); deploys take ~60 seconds |
| No Pages tab in Settings | Repository is private |
