import type { MetadataRoute } from "next";
import { flattenCatalog } from "@/lib/catalog-utils";
import { getServerCatalog } from "@/lib/commerce/catalog-server";
import { BLOG_POSTS, COMPARISON_PAGES } from "@/data/commerce";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://homewebsite-five.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const categories = await getServerCatalog();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_ORIGIN}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_ORIGIN}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_ORIGIN}/journey`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_ORIGIN}/wishlist`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_ORIGIN}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_ORIGIN}/shipping`, lastModified: now, changeFrequency: "yearly", priority: 0.45 },
    { url: `${SITE_ORIGIN}/refunds`, lastModified: now, changeFrequency: "yearly", priority: 0.45 },
    { url: `${SITE_ORIGIN}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
  ];

  const collectionRoutes = categories.map((cat) => ({
    url: `${SITE_ORIGIN}/collections/${cat.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const productRoutes = flattenCatalog(categories).map((p) => ({
    url: `${SITE_ORIGIN}/shop/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const comparisonRoutes = COMPARISON_PAGES.map((page) => ({
    url: `${SITE_ORIGIN}/compare/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...blogRoutes, ...comparisonRoutes];
}
