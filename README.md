# BuildWorks Software

A single-page static marketing site for "BuildWorks Software," a custom software development company. The entire site is one self-contained file: [index.html](index.html) — plain HTML, CSS, and vanilla JavaScript, no build step or backend required.

## Sections

- **Home** — hero/landing content
- **Services** — offerings overview
- **Testimonials** — client feedback
- **Contact** — client enquiry form (client-side validated, submitted via [formsubmit.co](https://formsubmit.co/))
- **WhatsApp widget** — floating button (bottom-right) with quick-reply suggestions that open a pre-filled WhatsApp chat

## SEO

[index.html](index.html) includes a canonical tag, Open Graph/Twitter Card meta tags, and `Organization` JSON-LD structured data. [robots.txt](robots.txt) and [sitemap.xml](sitemap.xml) at the repo root support crawler discovery.

## Local preview

Open [index.html](index.html) directly in a browser. There is nothing to install or build.

## Deployment

The site is deployed to GitHub Pages automatically via GitHub Actions on every push to `main` (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

Live site: https://phillipphyo.github.io/agentic/
