"use client";

import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";
import type { CatalogProduct } from "@/lib/catalog-utils";

type CrossSellSectionProps = {
  title?: string;
  subtitle?: string;
  products: CatalogProduct[];
};

export function CrossSellSection({
  title = "Complete your pantry",
  subtitle = "Customers also add these favourites to cart.",
  products,
}: CrossSellSectionProps) {
  if (!products.length) return null;

  return (
    <section className="commerce-section border-t border-white/[0.06] bg-white/[0.02]" aria-labelledby="cross-sell">
      <SectionHeader id="cross-sell" eyebrow="Recommended" title={title} subtitle={subtitle} />
      <div className="commerce-grid-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
