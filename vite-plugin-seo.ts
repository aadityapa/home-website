import fs from "node:fs";
import path from "node:path";
import { loadEnv, type Plugin, type ResolvedConfig } from "vite";

const DEFAULT_SITE = "https://www.example.com";

function normalizeSiteUrl(raw: string | undefined): string {
  const s = (raw?.trim() || DEFAULT_SITE).replace(/\/$/, "");
  return s.startsWith("http") ? s : `https://${s}`;
}

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/**
 * Injects SEO meta into index.html and writes robots.txt + sitemap.xml to `outDir` on build.
 */
export function seoPlugin(): Plugin {
  let resolved: ResolvedConfig | null = null;

  return {
    name: "vite-plugin-seo-static",

    configResolved(config) {
      resolved = config;
    },

    transformIndexHtml(html) {
      if (!resolved) return html;
      const env = loadEnv(resolved.mode, resolved.root, "");
      const site = normalizeSiteUrl(env.VITE_SITE_URL);
      const ogImage = `${site}/images/chai-masala.png`;
      const title =
        "Uma Laghoo Udyog · AAProduct | Authentic Taste of Tradition";
      const desc =
        "Uma Laghoo Udyog by AAProduct — homemade vegetarian shrikhand, achaar, chai masala and aamchur from Telhara, Maharashtra. FSSAI licensed.";
      const titleEsc = escapeAttr(title);
      const descEsc = escapeAttr(desc);
      const ogAltEsc = escapeAttr(
        "Chai masala and homemade products from Uma Laghoo Udyog",
      );

      const inject = `
    <link rel="canonical" href="${site}/" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="author" content="Uma Laghoo Udyog" />
    <meta name="keywords" content="Uma Laghoo Udyog, AAProduct, shrikhand Telhara, achaar Maharashtra, chai masala, aamchur powder, homemade pickles, vegetarian food India, FSSAI" />
    <meta name="theme-color" content="#faf6f1" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#1a1410" media="(prefers-color-scheme: dark)" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Uma Laghoo Udyog" />
    <meta name="format-detection" content="telephone=yes" />
    <meta name="geo.region" content="IN-MH" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="Uma Laghoo Udyog" />
    <meta property="og:title" content="${titleEsc}" />
    <meta property="og:description" content="${descEsc}" />
    <meta property="og:url" content="${site}/" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${ogAltEsc}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${titleEsc}" />
    <meta name="twitter:description" content="${descEsc}" />
    <meta name="twitter:image" content="${ogImage}" />
`;

      return html.replace("</head>", `${inject}\n  </head>`);
    },

    closeBundle() {
      if (!resolved) return;
      const env = loadEnv(resolved.mode, resolved.root, "");
      const site = normalizeSiteUrl(env.VITE_SITE_URL);
      const out = path.resolve(resolved.build.outDir);

      const robots = `User-agent: *
Allow: /

# Set VITE_SITE_URL in .env.production to your live domain before running npm run build.
Sitemap: ${site}/sitemap.xml
`;

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

      fs.mkdirSync(out, { recursive: true });
      fs.writeFileSync(path.join(out, "robots.txt"), robots, "utf8");
      fs.writeFileSync(path.join(out, "sitemap.xml"), sitemap, "utf8");
    },
  };
}
