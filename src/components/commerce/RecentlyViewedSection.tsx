"use client";

import { ProductCard } from "@/components/commerce/ProductCard";
import type { CatalogProduct } from "@/lib/catalog-utils";
import { SectionHeader } from "@/components/commerce/SectionHeader";

export function RecentlyViewedSection({ products }: { products: CatalogProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="commerce-section border-t border-white/10" aria-labelledby="recently-viewed">
      <SectionHeader
        id="recently-viewed"
        eyebrow="For you"
        title="Recently viewed"
        subtitle="Continue where you left off."
      />
      <div className="commerce-grid-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
