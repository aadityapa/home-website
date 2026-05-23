import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/views/CollectionPage";
import { findCategoryById } from "@/lib/catalog-utils";
import { buildCollectionMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryById(slug);
  if (!category) return { title: "Collection not found" };
  return buildCollectionMetadata(category);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = findCategoryById(slug);
  if (!category) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: category.title, path: `/collections/${category.id}` },
          ]),
          itemListSchema(
            category.title,
            [...category.items],
            `/collections/${category.id}`,
          ),
        ]}
      />
      <CollectionPage category={category} />
    </>
  );
}
