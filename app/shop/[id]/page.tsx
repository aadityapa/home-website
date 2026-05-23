import type { Metadata } from "next";
import ProductDetailPage from "@/views/ProductDetailPage";
import { flattenCatalog, findProductByIdInCategories } from "@/lib/catalog-utils";
import { buildProductMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import { getServerCatalog } from "@/lib/commerce/catalog-server";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const categories = await getServerCatalog();
  return flattenCatalog(categories).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const categories = await getServerCatalog();
  const found = findProductByIdInCategories(id, categories);
  if (!found) return { title: "Product not found" };
  return buildProductMetadata(found.item, found.category);
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const categories = await getServerCatalog();
  const found = findProductByIdInCategories(id, categories);

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
