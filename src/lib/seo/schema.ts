import { BRAND, type ProductItem, type ProductCategory } from "@/data/brand";
import { SITE_DEFAULT_DESCRIPTION, OG_IMAGE_PATH } from "@/config/site";
import { absoluteUrl } from "./metadata";
import { HOME_FAQS } from "@/data/commerce";

export function organizationSchema() {
  const imageUrl = absoluteUrl(OG_IMAGE_PATH);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: BRAND.name,
    legalName: BRAND.company,
    description: SITE_DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    logo: imageUrl,
    image: imageUrl,
    telephone: `+91${BRAND.phone}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Telhara",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}

export function localBusinessSchema() {
  const imageUrl = absoluteUrl(OG_IMAGE_PATH);
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${absoluteUrl("/")}#business`,
    name: BRAND.name,
    description: SITE_DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    telephone: `+91${BRAND.phone}`,
    image: imageUrl,
    priceRange: "₹₹",
    servesCuisine: "Indian vegetarian",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Telhara",
      addressLocality: "Telhara",
      addressRegion: "Maharashtra",
      postalCode: "444108",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.026,
      longitude: 77.527,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    parentOrganization: { "@id": `${absoluteUrl("/")}#organization` },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: BRAND.name,
    description: SITE_DEFAULT_DESCRIPTION,
    publisher: { "@id": `${absoluteUrl("/")}#business` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/shop")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: ProductItem, category: ProductCategory) {
  const price = parseInt(product.price.replace(/\D/g, ""), 10) || 0;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    sku: product.id,
    brand: { "@type": "Brand", name: BRAND.name },
    category: category.title,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${product.id}`),
      priceCurrency: "INR",
      price: price,
      availability:
        product.availableForSale === false ||
        (typeof product.inventoryQuantity === "number" && product.inventoryQuantity <= 0)
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: { "@id": `${absoluteUrl("/")}#business` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListSchema(
  name: string,
  products: ProductItem[],
  listPath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(listPath),
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/shop/${p.id}`),
      name: p.name,
    })),
  };
}
