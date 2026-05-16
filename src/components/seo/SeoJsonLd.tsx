import { useMemo } from "react";
import { BRAND } from "../../data/brand";
import { getSiteOrigin, OG_IMAGE_PATH, SITE_DEFAULT_DESCRIPTION } from "../../config/site";

/**
 * LocalBusiness + WebSite structured data for rich results.
 * @see https://schema.org/LocalBusiness
 */
export function SeoJsonLd() {
  const origin = getSiteOrigin();

  const jsonLd = useMemo(() => {
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
  }, [origin]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
