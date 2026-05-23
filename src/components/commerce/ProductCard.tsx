"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlistStore } from "@/stores/wishlist";
import type { CatalogProduct } from "@/lib/catalog-utils";
import { getProductStockLabel } from "@/lib/commerce/inventory";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

type ProductCardProps = {
  product: CatalogProduct;
  priority?: boolean;
  onQuickView?: (product: CatalogProduct) => void;
};

function getRatingMeta(productId: string) {
  const sum = [...productId].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rating = 4.4 + (sum % 6) * 0.1;
  const reviews = 18 + (sum % 140);
  return { rating: rating.toFixed(1), reviews };
}

export function ProductCard({ product, priority, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const toggleWish = useWishlistStore((s) => s.toggle);
  const saved = useWishlistStore((s) => s.has(product.id));
  const [adding, setAdding] = useState(false);
  const { label: stockLabel, lowStock, outOfStock } = getProductStockLabel(product);
  const { rating, reviews } = getRatingMeta(product.id);
  const reduceMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const enableTilt = !reduceMotion && !reduceEffects;

  function handleQuickAdd() {
    if (outOfStock || adding) return;
    setAdding(true);
    addItem(product, product.categoryTitle, 1);
    window.setTimeout(() => setAdding(false), 600);
  }

  return (
    <motion.article
      className="commerce-card group relative flex flex-col [perspective:1200px]"
      whileHover={
        enableTilt
          ? { y: -4, rotateX: 1.5, rotateY: -1.5, transition: { duration: 0.28, ease: [0.2, 0, 0, 1] } }
          : { y: -2 }
      }
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="framer-surface relative aspect-[4/5] max-h-[200px] overflow-hidden rounded-xl shadow-[0_12px_32px_-18px_rgba(0,0,0,0.55)] transition-shadow duration-300 group-hover:shadow-[0_20px_44px_-16px_rgba(245,158,11,0.28)] sm:max-h-[220px] md:max-h-none md:rounded-2xl">
        <Link href={`/shop/${product.id}`} className="block h-full w-full" aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
            priority={priority}
          />
        </Link>
        <div className="absolute right-2 top-2 flex flex-col gap-1 md:right-3 md:top-3">
          <button
            type="button"
            onClick={() => toggleWish(product.id)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-xs backdrop-blur-md transition hover:bg-black/60 md:h-9 md:w-9 md:text-sm"
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          >
            {saved ? "♥" : "♡"}
          </button>
          <Link
            href="/compare"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/45 font-sans text-[10px] text-white backdrop-blur-md transition hover:bg-black/60 md:h-9 md:w-9"
            aria-label="Compare products"
            title="Compare"
          >
            ⇄
          </Link>
        </div>
        <div className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.13em] text-noir-100 backdrop-blur-md md:left-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px] md:tracking-[0.16em]">
          {stockLabel}
        </div>
        {product.unit ? (
          <div className="absolute bottom-11 left-2 rounded-full border border-white/15 bg-black/45 px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.12em] text-noir-100 backdrop-blur-md md:bottom-14 md:left-3">
            {product.unit}
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 flex gap-1.5 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-2 opacity-100 md:gap-2 md:p-3 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <button
            type="button"
            disabled={outOfStock || adding}
            onClick={handleQuickAdd}
            className="commerce-btn-primary commerce-btn-loading flex-1 rounded-full py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] disabled:opacity-50 md:py-2.5 md:text-[11px] md:tracking-[0.16em]"
            data-loading={adding ? "true" : undefined}
          >
            {adding ? "Adding…" : outOfStock ? "Sold out" : "Quick add"}
          </button>
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="hidden rounded-full border border-white/20 bg-black/40 px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-md md:inline-flex"
            >
              View
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-2 space-y-0.5 md:mt-3 md:space-y-1">
        <p className="font-sans text-[9px] uppercase tracking-[0.16em] text-amber-400/85 md:text-[10px] md:tracking-[0.28em]">
          {product.categoryTitle}
        </p>
        <Link href={`/shop/${product.id}`}>
          <h3 className="line-clamp-1 font-display text-sm text-white transition hover:text-amber-300 md:text-2xl">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-1 pt-0.5 md:gap-2 md:pt-1">
          <p className="font-display text-sm text-amber-300 md:text-lg">{product.price}</p>
          {product.unit ? (
            <p className="font-sans text-[10px] text-noir-300 md:text-xs">{product.unit}</p>
          ) : null}
        </div>
        <p className="font-sans text-[10px] text-noir-300 md:text-xs">
          ★ {rating} · {reviews} ratings
        </p>
        <p className="line-clamp-1 font-sans text-[10px] text-noir-300 md:text-[11px]">
          {lowStock ? "Selling fast this week" : "Dispatch in 24-48 hours"}
        </p>
      </div>
    </motion.article>
  );
}
