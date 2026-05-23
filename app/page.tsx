import type { Metadata } from "next";
import CommerceHomePage from "@/views/CommerceHomePage";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, itemListSchema } from "@/lib/seo/schema";
import { getBestSellers, getTrendingProducts } from "@/lib/catalog-utils";

export const metadata: Metadata = buildHomeMetadata();

export default function HomePage() {
  const bestSellers = getBestSellers(6);
  const trending = getTrendingProducts(4);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(),
          itemListSchema("Best sellers", bestSellers, "/#best-sellers"),
          itemListSchema("Trending products", trending, "/#trending"),
        ]}
      />
      <CommerceHomePage />
    </>
  );
}
