# Cedric Arts Portfolio Site

This repository contains the source for the Cedric Arts personal portfolio site. It is a static, single-page site built with HTML, CSS, and a small amount of JavaScript.

## Overview

The site presents:
- A hero section highlighting the developer and primary calls to action.
- About, Projects, Skills, Certifications, Content, and Contact sections.
- A bento-style card layout with a dark/charcoal theme and accent color `#0099ff`.
- Responsive behavior for mobile devices, including a side navigation drawer.

## Files

- `index.html`: Main page markup and content structure.
- `styles.css`: Visual design, layout, typography, and responsive styles.
- `script.js`: Smooth scrolling, nav scroll styling, and mobile navigation toggle.
- `cert.html`: Additional certificate page (if linked/used).
- Image and asset files: `ca-logo.png`, `ca.png`, `sdicon.jpeg`, language logos, and PDF resume.
- `ads.txt`: Ads/verification file.

## Design System

**Typography**
- Headings/titles: **League Spartan**
- Body text/paragraphs: **Roboto**

**Color Palette**
- Primary accent: `#0099ff`
- Dark base: `#0f1115`
- Card background: `#171b22`
- Text: `#f5f7fb`
- Muted text: `#a0a9b6`

## Layout Notes

- Cards use a bento-style grid with a 12-column layout that collapses to one column on small screens.
- Cards include layered shadows for a subtle 3D depth effect.
- Video embeds use a 16:9 `aspect-ratio` wrapper to remain responsive.

## Navigation

- Desktop: Top navigation bar with anchor links.
- Mobile: Hamburger button opens a right-side drawer with section links. The drawer can be closed by the close button, tapping a link, or tapping the backdrop.

## Development

This is a static site. To preview locally:

```bash
python -m http.server 8000
```

Then open: `http://localhost:8000/`

## Deployment

This site can be deployed using any static hosting provider (GitHub Pages, Netlify, Vercel, etc.). Push your changes to the branch configured for your host, and the HTML/CSS/JS will be served as-is.

## Maintenance Tips

- Keep section IDs in `index.html` aligned with navigation anchor links.
- Update content directly in `index.html` (projects, certifications, stats, etc.).
- If you change the design tokens, update the CSS variables in `:root` inside `styles.css`.

## License

All content and assets are owned by Cedric Arts unless otherwise noted.
