# The Earthen Studio — mock website

Static site. No build step, no dependencies, no server. Drop the files into a
GitHub repository and turn on Pages.

**This is a mock site for a class project. The business is fictional.**

---

## 1. Do this first — one find-and-replace

Every canonical URL, Open Graph tag, sitemap entry and robots.txt line points at
a placeholder domain. Search across all files for:

```
https://YOURUSERNAME.github.io/earthen-studio
```

Replace it with your real Pages URL, for example
`https://priyaverma.github.io/earthen-studio`. It appears in the five HTML
pages, `404.html`, `sitemap.xml` and `robots.txt`.

**If you skip this, every page will tell Google the canonical version of itself
lives somewhere else, and none of the SEO work below counts.**

---

## 2. Deploy

1. github.com → **New repository** → name it `earthen-studio` → **Public** → Create.
2. **Add file → Upload files.** Drag in every file in this folder, including the
   `images` folder. Commit.
3. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.**
4. Wait 1–3 minutes. Your URL appears at the top of that same settings screen.

To edit later: upload the changed file again. It redeploys in about a minute.

---

## 3. Add the photographs

Every image slot currently shows a captioned clay-texture placeholder telling
you what shot belongs there. Drop a correctly-named JPG into `images/` and it
replaces the placeholder automatically — no code change.

| File | Shot |
|---|---|
| `centring.jpg` | Hands centring clay on the wheel (homepage hero) |
| `teams.jpg` | A group around the long table |
| `offsite.jpg` | A large corporate group at wheels |
| `solo.jpg` | One person at a wheel |
| `couple.jpg` | Two wheels side by side |
| `group.jpg` | Friends hand-building together |
| `course.jpg` | A drying shelf of trimmed pots |
| `studio.jpg` | The studio entrance from the street |
| `map.jpg` | Map with the studio marked |
| `tumbler.jpg` `bowl.jpg` `cups.jpg` `jug.jpg` `plate.jpg` `planter.jpg` `vase.jpg` `seconds.jpg` | The eight shop products |

Sources: Unsplash and Pexels, both free for commercial use. Search "pottery
wheel", "ceramic studio", "stoneware".

**Compress before uploading.** Unsplash originals are 5–8 MB. Run them through
squoosh.app and target under 300 KB each, 1600 px wide. Filenames must be
lowercase — GitHub Pages is case-sensitive and your laptop is not.

`og-cover.png` is the social share card. Replace it with a real photograph at
exactly 1200 × 630 once you have one.

---

## 4. What was done for search and quality

**Crawling and indexing**
- Unique `<title>` under 62 characters and unique meta description of 110–160
  characters on every page — both lengths chosen so Google does not truncate them.
- `rel="canonical"` on every page.
- `sitemap.xml` with all five indexable pages, referenced from `robots.txt`.
- `404.html` set to `noindex, nofollow` so error pages never enter the index.
- `max-image-preview:large` so images can appear at full size in results.

**Structured data (JSON-LD, 14 blocks)**
- `LocalBusiness` with address, geo-coordinates, opening hours, phone, price
  range and payment methods — this is what feeds a local knowledge panel.
- `Service` with `Offer` and price for each session type and each corporate format.
- `ItemList` of `Product` entries with prices, currency, availability and condition.
- `FAQPage` on the Visit page, matching the visible questions exactly.
- `BreadcrumbList` on every sub-page.

Validate at [validator.schema.org](https://validator.schema.org) — paste your
live URL once deployed. Take the screenshot for your appendix.

**Note on what is deliberately absent:** there is no `AggregateRating` or
`Review` markup. Inventing review counts for a business with no customers is a
structured-data policy violation and Google issues manual actions for it. Do not
add it to make the rich result look better.

**On-page**
- One `<h1>` per page, correct `h2`/`h3` nesting, no heading levels skipped.
- Descriptive alt text on every image, written as a sentence describing the
  photograph rather than a keyword list.
- Internal links use meaningful anchor text ("Book a pottery session", "Buy
  handmade ceramics") rather than "click here" or "read more".
- Semantic landmarks: `<main>`, `<nav aria-label>`, `<header>`, `<footer>`,
  `<table><caption>`, `<th scope="row">`.

**Performance and Core Web Vitals**
- `.shot` containers carry a fixed `aspect-ratio`, so images reserve their space
  before loading — this is what keeps Cumulative Layout Shift at zero.
- `loading="lazy"` and `decoding="async"` below the fold; `fetchpriority="high"`
  on the hero image only.
- One CSS file, one JS file, both tiny. JS is `defer`red so it never blocks render.
- `preconnect` and `preload` on the font stylesheet; `display=swap` prevents
  invisible text while fonts load.

**Accessibility (a Lighthouse category and part of Google Ads landing page experience)**
- Skip-to-content link, visible focus rings, `aria-current` on the active nav item.
- Reveal animations are opt-in via a `.js` class, so with JavaScript disabled
  every section is visible rather than blank — this also protects you if a
  crawler does not execute JS.
- `prefers-reduced-motion` disables the wheel rotation, the ticker and all transitions.
- The closed cart drawer is `inert`, so its buttons are not keyboard-reachable.

**Social**
- Open Graph and Twitter Card tags with a real 1200 × 630 image, so pasting the
  link into WhatsApp or Slack produces a proper preview.
- `favicon.svg` and `site.webmanifest`.

---

## 5. Before you submit

- [ ] Replaced `https://YOURUSERNAME.github.io/earthen-studio` everywhere
- [ ] Replaced the placeholder phone, email and street address with fictional
      ones you have checked are not a real business
- [ ] Confirmed `theearthenstudio.in` is not a registered domain owned by
      someone else before using that email in your deck
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse → Analyze) and screenshot the
      four scores for your appendix
- [ ] Screenshot every page — free hosting gets deprovisioned, and a dead link
      three weeks after submission is your problem, not the grader's

---

## Files

```
index.html      Home
sessions.html   Individual, couples, group, six-week course + booking form
teams.html      Corporate workshops, pricing, enquiry form
shop.html       Eight products, cart drawer, demonstration checkout
visit.html      Studio info, team, FAQ, directions
404.html        Custom error page
styles.css      All styling
main.js         Nav, reveals, forms, cart
sitemap.xml     Update the domain before deploying
robots.txt      Update the domain before deploying
og-cover.png    Social share card, 1200x630
favicon.svg     Site icon
site.webmanifest
.nojekyll       Stops GitHub Pages running Jekyll over the files
images/         Empty. Add your photographs here.
```

## How the cart works

State lives in a JavaScript variable and nothing else. No `localStorage`, no
cookies, no network requests, no payment gateway. Adding items updates the
header count; opening the crate shows line items with quantity steppers,
subtotal, and delivery that becomes free over ₹3,000. Checkout collects
address and payment method, then returns an order number. Reloading the page
empties the crate. That is correct behaviour for a demonstration.
