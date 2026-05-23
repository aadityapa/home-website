import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = buildPageMetadata({
  title: `About ${BRAND.name} | ${BRAND.company}`,
  description: `Discover the story behind ${BRAND.name} — ${BRAND.tagline}. ${BRAND.certification}, Telhara, Maharashtra.`,
  path: "/about",
});

export default function AboutRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPage />
    </>
  );
}
