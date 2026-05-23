"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProductCategory } from "@/data/brand";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CollectionBanner } from "@/components/commerce/CollectionBanner";
import {
  CollectionProductToolbar,
  type SortKey,
} from "@/components/commerce/CollectionProductToolbar";
import type { CatalogProduct } from "@/lib/catalog-utils";
import { getProductStockLabel } from "@/lib/commerce/inventory";

function parsePrice(price: string) {
  return parseInt(price.replace(/\D/g, ""), 10) || 0;
}

export default function CollectionPage({
  category,
}: {
  category: ProductCategory;
}) {
  const [sort, setSort] = useState<SortKey>("default");
  const [inStockOnly, setInStockOnly] = useState(false);

  const products = useMemo(() => {
    let list: CatalogProduct[] = category.items.map((item) => ({
      ...item,
      categoryId: category.id,
      categoryTitle: category.title,
    }));

    if (inStockOnly) {
      list = list.filter((p) => !getProductStockLabel(p).outOfStock);
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [category, sort, inStockOnly]);

  return (
    <ImmersivePageLayout className="theme-commerce pt-16 text-noir-50 sm:pt-20">
      <CollectionBanner category={category} />
      <div className="commerce-section">
        <nav className="mb-4 font-sans text-xs text-noir-400" aria-label="Breadcrumb">
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

        <p className="mb-4 max-w-2xl font-sans text-xs leading-relaxed text-noir-200 md:text-sm">
          {category.blurb} FSSAI licensed · 100% vegetarian · pan-India shipping from Telhara,
          Maharashtra.
        </p>

        <CollectionProductToolbar
          productCount={products.length}
          sort={sort}
          onSortChange={setSort}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
        />

        {products.length === 0 ? (
          <div className="framer-surface rounded-2xl p-8 text-center">
            <p className="font-sans text-sm text-noir-200">No in-stock items in this filter.</p>
            <button
              type="button"
              onClick={() => setInStockOnly(false)}
              className="commerce-btn-ghost mt-4 rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.16em] text-white"
            >
              Show all
            </button>
          </div>
        ) : (
          <div className="commerce-grid-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/shop?cat=${category.id}`}
            className="commerce-btn-primary rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em]"
          >
            View in full shop
          </Link>
          <Link
            href="/compare"
            className="commerce-btn-ghost rounded-full px-6 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-white"
          >
            Buying guides
          </Link>
        </div>
      </div>
    </ImmersivePageLayout>
  );
}
