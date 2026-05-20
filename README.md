# Uma Laghoo Udyog (AAProduct)

Enterprise-style marketing & e-commerce storefront for **Uma Laghoo Udyog** — **AAProduct**, Telhara, Maharashtra.

Stack: **Next.js 15** (App Router), React 19, Tailwind CSS, Framer Motion, GSAP, Lenis, React Three Fiber, post-processing.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy env vars from `.env.example` into `.env.local` as needed.

## Production build

```bash
npm run build
npm start
```

## Deploy (Vercel) — recommended

Live: **https://homewebsite-five.vercel.app**

1. Import [github.com/aadityapa/home-website](https://github.com/aadityapa/home-website) in [vercel.com/new](https://vercel.com/new) — `vercel.json` uses the Next.js framework preset.
2. Set env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PHONE` (see `.env.example`).
3. Preview: `npm run deploy:vercel` · Production: `npm run deploy:vercel:prod`

Optional hero GLTF: add `public/models/pavilion.glb` (see `public/models/README.md`).

## CI

Push to `main` runs [.github/workflows/ci.yml](.github/workflows/ci.yml) (`npm ci` + `npm run build`).

## Content & catalog

| What | Where |
|------|--------|
| Brand / phone | `src/data/brand.ts` |
| Product catalog JSON | `public/data/catalog.json` |
| Page views (client) | `src/views/` |
| App routes | `app/` |
| 3D / immersive | `src/components/immersive/`, `src/components/three/` |

Override catalog URL with `NEXT_PUBLIC_CATALOG_URL`.
