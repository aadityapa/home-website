"use client";

import Link from "next/link";
import type { ProductCategory } from "@/data/brand";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CollectionBanner } from "@/components/commerce/CollectionBanner";
import { PageReveal } from "@/components/motion/PageReveal";
import type { CatalogProduct } from "@/lib/catalog-utils";

export default function CollectionPage({
  category,
}: {
  category: ProductCategory;
}) {
  const products: CatalogProduct[] = category.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryTitle: category.title,
  }));

  return (
    <ImmersivePageLayout className="theme-commerce pt-16 text-noir-50 sm:pt-20">
      <CollectionBanner category={category} />
      <PageReveal className="commerce-section">
        <nav className="mb-6 font-sans text-xs text-noir-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-amber-300">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-amber-300">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-noir-100">{category.title}</span>
        </nav>
        <div className="commerce-grid-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      </PageReveal>
    </ImmersivePageLayout>
  );
}
