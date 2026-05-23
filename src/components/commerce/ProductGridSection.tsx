"use client";

import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog-utils";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";

export function ProductGridSection({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref = "/shop",
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: CatalogProduct[];
  viewAllHref?: string;
}) {
  return (
    <section className="commerce-section" aria-labelledby={id}>
      <SectionHeader
        id={id}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        action={
          <Link href={viewAllHref} className="commerce-btn-ghost rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-white">
            View all
          </Link>
        }
      />
      <div className="commerce-grid-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
