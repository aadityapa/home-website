import type { Metadata } from "next";
import CommerceHomePage from "@/views/CommerceHomePage";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, itemListSchema } from "@/lib/seo/schema";
import { getServerCatalog } from "@/lib/commerce/catalog-server";
import { flattenCatalog } from "@/lib/catalog-utils";

export const metadata: Metadata = buildHomeMetadata();

export default async function HomePage() {
  const categories = await getServerCatalog();
  const all = flattenCatalog(categories);
  const bestSellers = all.slice(0, 6);
  const trending = [...all].reverse().slice(0, 4);

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
