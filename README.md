# Bautrocknung Plus

German-language static website for Bautrocknung Plus GbR, Friedberg.

## Cloudflare Pages

- Production branch: `main`
- Framework preset: **None**
- Build command: `exit 0`
- Build output directory: `.`

No dependencies, installation, build pipeline, API keys or external fonts.

## Design: Unter der Oberfläche

A purpose-built architectural identity: mineral paper, oxide red, dark olive,
editorial typography and an original SVG section through a damp building element.
The illustration is schematic, not a survey or a live measurement. Service pages
use distinct palettes, image compositions and practical, service-specific guidance.

`assets/design.css` is the complete design system; `assets/site.js` manages
navigation, current-page state and email-draft forms; `assets/design.js` adds
progressive motion and keyboard support. Reduced motion is respected. All content
remains visible without animation or JavaScript. The reporting wizard needs JS;
phone and email alternatives remain available.

## Contact flow

Contact and damage-report forms prepare a `mailto:` draft in the visitor's email
application. They **do not transmit or store submissions**. The visitor must send
the email. Validation covers required selections, five-digit German postcode,
contact fields, email format and privacy acknowledgement. There is no upload or
backend. Photos can be attached in the visitor's email app.

## Images and content

Photographs are served locally to avoid runtime requests to a third-party image
server. They are illustrative photographs by iDry Columbus, CC BY 4.0, not company
projects or staff. Attribution and modification notices appear with the images
and in the Impressum. Source: https://idrycolumbus.com/free-restoration-photos/.
The SVG section artwork was created specifically for this website.

Existing company details, legal content, routes, redirects, canonical metadata
and LocalBusiness structured data are preserved. The privacy notice reflects
local image delivery. Company/legal details still require owner verification
before switching the business's primary domain.

## Verification (3 November 2026)

Two browser review/refinement passes covered desktop and mobile compositions.
The homepage was checked in 375, 390, 768, 1024 and 1440 px iframe viewports; all
nine inner pages were checked at 375 and 1440 px. No horizontal overflow was
observed. These are desktop Chrome responsive viewports, not physical-device tests.

Verified mobile menu opening, required wizard selections, progression through
all four steps, invalid/valid postcode behavior, accessible contact inputs and
FAQ interaction. Static checks cover local links, image files and alt text,
unique IDs, one H1 per page, JSON-LD syntax and JavaScript syntax. Email delivery
is not tested because this site has no submission backend.
