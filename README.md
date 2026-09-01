# Headmasters Beauty &amp; Barbershop — Website

A single-page marketing site for **Headmasters Beauty &amp; Barbershop**, 3255 Peachtree Rd NE, Ste 1, Buckhead, Atlanta GA 30305.

Static HTML/CSS/JS — no build step, no dependencies. Open `index.html` in any browser, or host the folder on any static host (Netlify, GitHub Pages, Cloudflare Pages, Vercel, etc.).

## Local preview

Because the pages load `css/`, `js/` and `images/` by relative path, use a tiny local server rather than opening the file directly:

```bash
python -m http.server 8777
```

Then visit `http://localhost:8777`.

## File structure

```
index.html          Page markup + SEO/schema.org metadata
css/style.css        All styles (design tokens at the top under :root)
js/main.js           Sticky header, mobile nav, scroll reveal, gallery lightbox, today's-hours highlight
images/              Photography (see "Replacing the photos" below)
headmasters wall sign logo.png    Original reference photo of the framed shop sign
barbershop website reference.png  Original layout reference supplied by the client
```

## Brand

Colors were taken from the shop's framed wall sign (royal blue + barber red on warm white):

| Token | Hex | Use |
|-------|-----|-----|
| `--brand-blue` | `#1c3f9c` | Primary brand blue (logo, headings on light) |
| `--brand-red` | `#d02736` | Brand red (logo, accents) |
| `--brand-red-btn` | `#b81622` | Button background on light backgrounds (passes AA with white text) |
| `--brand-red-lift` | `#f0454f` | Red accent/large text on dark backgrounds |
| `--brand-blue-lift` | `#4f74d8` | Blue accent on dark backgrounds |
| `--paper` | `#faf7f0` | Warm white |
| `--charcoal` | `#0f1116` | Dark base |

Fonts: **Anton** (display) + **Inter** (body), loaded from Google Fonts.

The logo is **recreated in HTML/CSS** (`.logo` in `index.html` + `css/style.css`) from the low-resolution sign photo — a blue "HEADMASTERS" wordmark over red "Beauty &amp; Barbershop" inside a red/blue double rule. If you have the original vector or a high-res logo file, drop it in and replace the `.logo__box` markup with an `<img>`.

## Replacing the photos

Every image in `images/` is a **licensed stock placeholder** from [Pexels](https://www.pexels.com) (free to use, no attribution required — see `images/ATTRIBUTION.md`). All of them come from a single real barbershop photo shoot by the photographer "RDNE Stock project" (no AI-generated images). They are stand-ins so the layout looks complete.

**Swap in real photos of the shop and its work** by replacing these files (keep the same names, or update the `src`/`data-full` paths in `index.html`):

| File | Where it appears | Ideal replacement |
|------|------------------|-------------------|
| `hero.jpg` | Full-screen hero background | Wide shot of the Headmasters interior / chairs |
| `about.jpg` | "Where Craft Meets Culture" main image | A barber mid-cut at Headmasters |
| `g05.jpg` | Also used as the small inset image in the About section | Straight-razor / hot-towel finish |
| `g01.jpg`–`g12.jpg` | "Fresh Off The Chair" gallery | Before/after cuts, fades, line-ups, beard work |

Recommended sizes: hero ~1920px wide, gallery ~900–1200px. Compress to keep each under ~300 KB. Update the `alt=""` text on each `<img>` to describe the actual photo.

## Booking

All "Book Now" / "Book on Booksy" buttons link to:
`https://booksy.com/en-us/1787133_headmaster-barbershop_barber-shop_134770_atlanta`

If the shop uses a different primary booking page, find-and-replace that URL in `index.html`.

## Content to verify with the shop

- **Pricing** in the Services section was read from the low-resolution wall-sign photo and may be out of date. Confirm every price, especially braiding (`from $…`) and the after-hours note.
- **Hours** are from public listings (Google/Booksy). Confirm and update `#hoursList` in `index.html` (and the `openingHoursSpecification` in the JSON-LD `<script>` in `<head>`).
- **Phone**: (404) 841-9101 — used in `tel:` links and schema.
- Add real **team/barber bios**, **customer reviews**, and a proper **social media** link set when available. The reviews section from the layout reference was intentionally left out (ratings differ across platforms); add it back once you have approved quotes.

## Accessibility notes

- Skip link, semantic landmarks, visible focus rings, `prefers-reduced-motion` handling.
- Gallery lightbox is keyboard operable (Esc to close, ←/→ to navigate) with a focus trap.
- Colour pairings target WCAG AA (4.5:1 for body text).
