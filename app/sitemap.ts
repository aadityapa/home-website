import type { MetadataRoute } from "next";
import { flattenCatalog, getAllCategories } from "@/lib/catalog-utils";
import { BLOG_POSTS } from "@/data/commerce";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://homewebsite-five.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_ORIGIN}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_ORIGIN}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_ORIGIN}/journey`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_ORIGIN}/wishlist`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_ORIGIN}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const collectionRoutes = getAllCategories().map((cat) => ({
    url: `${SITE_ORIGIN}/collections/${cat.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const productRoutes = flattenCatalog().map((p) => ({
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

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...blogRoutes];
}
