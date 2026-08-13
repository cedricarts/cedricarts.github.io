# Cedric Arts Portfolio Site

This repository contains the static Cedric Arts personal portfolio for Njabulo Cedric Mnisi. The site is built with HTML, CSS, and lightweight JavaScript, preserving the bento-style visual identity while presenting products, games, ventures, experiments, and creative output.

## Structure

- `index.html`: Main page markup and content structure.
- `styles.css`: Visual design, layout, typography, responsive behavior, and bento card system.
- `script.js`: Theme switching, mobile navigation, reveal interactions, project modals, and dynamic metrics loading.
- `data/metrics.json`: Public aggregated metrics consumed by the static frontend.
- `scripts/update-metrics.mjs`: GitHub Actions metrics generator.
- `.github/workflows/update-metrics.yml`: Daily and manual workflow that updates `data/metrics.json` and commits only when values change.
- `cedric_mnisi_resume.pdf`: Resume linked from the portfolio.

## Dynamic Metrics Architecture

The public website remains static. API credentials are never exposed to client-side JavaScript.

```text
External APIs
  -> GitHub Actions
  -> data/metrics.json
  -> GitHub Pages
  -> Cedric Arts portfolio
```

The frontend fetches `data/metrics.json`, hides missing or zero values, shows a subtle freshness label, and falls back to safe curated signals if the fetch fails.

## Metrics Secrets

Configure these GitHub repository secrets to enable automated metrics:

- `YOUTUBE_API_KEY`: YouTube Data API key used only inside GitHub Actions.
- `YOUTUBE_CHANNEL_ID`: YouTube channel ID for `@Cedric_Arts`.
- `METRICS_GITHUB_TOKEN`: Optional GitHub token for higher rate limits. Public unauthenticated requests are used if this is absent.
- `STUDX_USERS`: Optional controlled StudX user count. Do not expose Firebase admin credentials to the frontend.

Curated values such as products built, published apps, and major ventures live in `data/metrics.json` so the frontend has one source of truth.

## Local Preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deployment

The site is static and can be deployed through GitHub Pages. Push changes to the branch configured for Pages. The metrics workflow runs daily and can also be triggered manually with `workflow_dispatch`.
