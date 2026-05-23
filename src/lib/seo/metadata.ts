import type { Metadata } from "next";
import { BRAND, type ProductItem, type ProductCategory } from "@/data/brand";
import { OG_IMAGE_PATH, SITE_DEFAULT_DESCRIPTION, SITE_TITLE } from "@/config/site";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://homewebsite-five.vercel.app";

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = opts.image ?? OG_IMAGE_PATH;
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: BRAND.name,
      title: opts.title,
      description: opts.description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [imageUrl],
    },
  };
}

export function buildProductMetadata(
  product: ProductItem,
  category: ProductCategory,
): Metadata {
  const title = `${product.name} · ${category.title} | ${BRAND.name}`;
  const description = `${product.description} ${product.unit ? `Pack: ${product.unit}.` : ""} ${product.price}. Order ${BRAND.name} — ${BRAND.certification}.`;
  return buildPageMetadata({
    title,
    description,
    path: `/shop/${product.id}`,
    image: product.image,
  });
}

export function buildHomeMetadata(): Metadata {
  return buildPageMetadata({
    title: SITE_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    path: "/",
  });
}

export function buildCollectionMetadata(category: ProductCategory): Metadata {
  return buildPageMetadata({
    title: `${category.title} Collection | ${BRAND.name}`,
    description: `${category.blurb} Shop ${category.title} from ${BRAND.name}, Telhara. ${BRAND.certification}.`,
    path: `/collections/${category.id}`,
    image: category.items[0]?.image,
  });
}
