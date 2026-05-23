import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = buildPageMetadata({
  title: `About ${BRAND.name} | ${BRAND.company}`,
  description: `Discover the story behind ${BRAND.name} — ${BRAND.tagline}. ${BRAND.certification}, Telhara, Maharashtra.`,
  path: "/about",
});

export default function AboutRoute() {
  return <AboutPage />;
}
