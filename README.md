# Bautrocknung Plus — Blue Cinema

Custom German-language website for Bautrocknung Plus GbR in Friedberg, built for Cloudflare Pages.

## Live preview

https://bautrocknung-plus.pages.dev/

## Deployment

- Connect GitHub repository `hsdarestani/bautrocknung-plus`
- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Output directory: `.`

No Node.js build, dependencies or private API keys are required.

## Design

The November 2026 redesign replaces the old architectural comparison demo with a high-contrast, photograph-led visual identity called **Blue Cinema**. This uses deep original-brand blues, real restoration photography, Sora headlines and Manrope body type. The homepage is in `index.html`, styles in `assets/blue-cinema.css`, and its accessible mobile menu in `assets/blue-cinema.js`.

All interior pages retain their functional structures and navigation; `assets/vx-inner.css` is loaded after `assets/design.css` to harmonize their design with the new visual identity.

## Features and limitations

- Clear service links for Wasserschäden, Leckortung and Bautrocknung.
- Phone call and water-damage reporting CTAs on desktop and mobile.
- Contact and damage-report forms on inner pages still create a **mailto draft**, not a server submission. The user must send the email from their own mail application.
- Factual company information, canonical URLs, legal routes, and SEO structured data are retained.
- Illustrative photographs originate from iDry Columbus under CC BY 4.0, credited in the site; they are not company staff or completed projects.
- Fonts load from Google Fonts in the current preview. For a public German production site, consider **self-hosting** the open-source font files and revise Datenschutz accordingly.
- The new homepage has been rendered locally for desktop (1440px), small desktop (1024px), and mobile (390px) with no horizontal overflow. The local testing environment could not fetch the remote font files, so deployed font rendering requires additional device-based verification.
- Privacy and legal notices need the business owner's review before migrating the public primary domain.
