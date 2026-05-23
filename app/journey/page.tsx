import type { Metadata } from "next";
import JourneyPage from "@/views/JourneyPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = buildPageMetadata({
  title: `Our Journey | ${BRAND.name}`,
  description: `From Telhara kitchens to your table — explore how ${BRAND.name} crafts authentic vegetarian products with care.`,
  path: "/journey",
});

export default function JourneyRoute() {
  return <JourneyPage />;
}
