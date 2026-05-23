import type { Metadata } from "next";
import ProductDetailPage from "@/views/ProductDetailPage";
import { findProductById } from "@/lib/catalog-utils";
import { buildProductMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { flattenCatalog } = await import("@/lib/catalog-utils");
  return flattenCatalog().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const found = findProductById(id);
  if (!found) return { title: "Product not found" };
  return buildProductMetadata(found.item, found.category);
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const found = findProductById(id);

  return (
    <>
      {found ? (
        <JsonLd
          data={[
            productSchema(found.item, found.category),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: found.item.name, path: `/shop/${found.item.id}` },
            ]),
          ]}
        />
      ) : null}
      <ProductDetailPage />
    </>
  );
}
