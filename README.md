# Bautrocknung Plus

A custom, German-language corporate website for **Bautrocknung Plus GbR** in Friedberg.

## Deploy to Cloudflare Pages

Connect this GitHub repository as a Pages project:

- Production branch: `main`
- Framework preset: **None**
- Build command: `exit 0`
- Build output directory: `.`

This is a static site. HTML, CSS and JavaScript only. It does not need npm, a build system or API credentials.

## Design direction — Atelier

A restrained, editorial industrial identity:

- Architectural typography and warm mineral backgrounds
- Deliberate photo crops, monochromatic print-like treatment
- Quiet horizontal rules, numbered sections, precise spacing
- Minimal motion: image reveal and short transitions only
- No icon packs, particles, dashboard charts, fake sensor readings or animated glow effects
- Responsive layouts, keyboard-operable process tabs and reduced-motion support

The stylesheet `assets/style.css` contains structural base styles; `assets/atelier.css` contains the current editorial art direction. `assets/site.js` handles navigation and contact flows; `assets/atelier.js` handles the optional process tabs.

## Content & functional limits

- The contact form and incident report prepare an email draft in the visitor's own email application; **they do not transmit or save data directly**, and the visitor must explicitly send the draft.
- Photographs are examples from Unsplash and do **not** represent actual company employees or jobs. Replace them with licensed, real project photography when available.
- Review the Impressum and Datenschutz pages and verify company information prior to placing this website on the public primary domain.
- The interactive process overview is explanatory, not live measurement data.
- Existing service and legal-page slugs have redirects in `_redirects`.

## Site structure

`/`, `/leistungen/`, `/wasserschaden/`, `/leckortung/`, `/bautrocknung/`, `/ueber-uns/`, `/kontakt/`, `/schaden-melden/`, `/impressum/`, `/datenschutz/`.
