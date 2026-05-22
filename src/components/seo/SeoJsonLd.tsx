"use client";

import { useEffect, useState } from "react";
import { BRAND } from "../../data/brand";
import { getSiteOrigin, OG_IMAGE_PATH, SITE_DEFAULT_DESCRIPTION } from "../../config/site";

function buildJsonLd(origin: string) {
  const logoUrl = `${origin}/favicon.svg`;
  const imageUrl = `${origin}${OG_IMAGE_PATH.startsWith("/") ? OG_IMAGE_PATH : `/${OG_IMAGE_PATH}`}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${origin}/#business`,
    name: BRAND.name,
    legalName: BRAND.company,
    description: SITE_DEFAULT_DESCRIPTION,
    url: `${origin}/`,
    telephone: `+91${BRAND.phone}`,
    image: imageUrl,
    logo: logoUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Telhara",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    priceRange: "₹₹",
    servesCuisine: "Indian vegetarian",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: `${origin}/`,
    name: BRAND.name,
    description: SITE_DEFAULT_DESCRIPTION,
    publisher: { "@id": `${origin}/#business` },
    inLanguage: "en-IN",
  };

  return [localBusiness, website];
}

/**
 * Injected after mount so origin matches the browser (avoids SSR localhost mismatch).
 */
export function SeoJsonLd() {
  const [jsonLdHtml, setJsonLdHtml] = useState<string | null>(null);

  useEffect(() => {
    setJsonLdHtml(JSON.stringify(buildJsonLd(getSiteOrigin())));
  }, []);

  if (!jsonLdHtml) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
    />
  );
}
