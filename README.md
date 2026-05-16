# Uma Laghoo Udyog (AAProduct)

Enterprise-style marketing & e-commerce storefront for **Uma Laghoo Udyog** — **AAProduct**, Telhara, Maharashtra.

Stack: React 19, Vite 6, Tailwind CSS, Framer Motion, GSAP, React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

For **GitHub Pages** locally:

```bash
cp .env.production.example .env.production
npm run build
npm run preview:pages
```

## Deploy (Vercel) — recommended

Uses the [Vercel plugin for Cursor](https://vercel.com/docs/agent-resources/vercel-plugin) (`npx plugins add vercel/vercel-plugin --target cursor -y`). **Restart Cursor** after installing so skills and `/vercel-plugin:deploy` load.

1. Install CLI: `npm i -g vercel` (or use `npx vercel`).
2. Log in: `vercel login`
3. Link project (once): `vercel link`
4. Set env in Vercel dashboard (see `.env.vercel.example`): `VITE_BASE_PATH=/`, then `VITE_SITE_URL` to your `*.vercel.app` or custom domain.
5. Preview: `npm run deploy:vercel` · Production: `npm run deploy:vercel:prod`

Or import [github.com/aadityapa/Homewebsite](https://github.com/aadityapa/Homewebsite) in [vercel.com/new](https://vercel.com/new) — `vercel.json` is already configured for Vite + React Router SPA.

## Deploy (GitHub Pages)

Repository: [github.com/aadityapa/Homewebsite](https://github.com/aadityapa/Homewebsite)

1. Push to `main` — the [Deploy workflow](.github/workflows/deploy.yml) builds and publishes `dist/`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Live URL: **https://aadityapa.github.io/Homewebsite/**

Set these in CI (already in the workflow) or `.env.production`:

- `VITE_SITE_URL=https://aadityapa.github.io/Homewebsite`
- `VITE_BASE_PATH=/Homewebsite/`

## Content & catalog

| What | Where |
|------|--------|
| Brand / phone | `src/data/brand.ts` |
| Products (dynamic) | `public/data/catalog.json` |
| Product images | `public/images/` |
| Brand video | `public/videos/kitchen-to-table.mp4` |
| SEO site URL | `VITE_SITE_URL` in `.env.production` |

## Custom domain

Point DNS to GitHub Pages, then set:

```env
VITE_SITE_URL=https://www.yourdomain.com
VITE_BASE_PATH=/
```

Rebuild and redeploy.
