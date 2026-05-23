"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlistStore } from "@/stores/wishlist";
import type { CatalogProduct } from "@/lib/catalog-utils";

type ProductCardProps = {
  product: CatalogProduct;
  priority?: boolean;
  onQuickView?: (product: CatalogProduct) => void;
};

function getPseudoStock(productId: string) {
  const sum = [...productId].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return 4 + (sum % 14);
}

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
  const stockLeft = getPseudoStock(product.id);
  const lowStock = stockLeft <= 8;
  const { rating, reviews } = getRatingMeta(product.id);

  return (
    <article className="commerce-card group relative flex flex-col">
      <div className="framer-surface relative aspect-[4/5] max-h-[220px] overflow-hidden rounded-xl md:max-h-none md:rounded-2xl">
        <Link href={`/shop/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
            priority={priority}
          />
        </Link>
        <button
          type="button"
          onClick={() => toggleWish(product.id)}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-xs backdrop-blur-md transition hover:bg-black/60 md:right-3 md:top-3 md:h-9 md:w-9 md:text-sm"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
        <div className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.13em] text-noir-100 backdrop-blur-md md:left-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px] md:tracking-[0.16em]">
          {lowStock ? `Only ${stockLeft} left` : "In stock"}
        </div>
        <motion.div
          className="absolute inset-x-0 bottom-0 flex gap-1.5 p-2 opacity-100 transition duration-300 md:gap-2 md:p-3 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          initial={false}
          whileHover={{ y: -2 }}
        >
          <button
            type="button"
            onClick={() =>
              addItem(
                {
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  image: product.image,
                  price: product.price,
                  unit: product.unit,
                },
                product.categoryTitle,
                1,
              )
            }
            className="commerce-btn-primary flex-1 rounded-full py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] md:py-2.5 md:text-[11px] md:tracking-[0.16em]"
          >
            Quick add
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
        </motion.div>
      </div>
      <motion.div className="mt-2 space-y-0.5 md:mt-4 md:space-y-1" whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
        <p className="font-sans text-[9px] uppercase tracking-[0.16em] text-amber-400/85 md:text-[10px] md:tracking-[0.28em]">
          {product.categoryTitle}
        </p>
        <Link href={`/shop/${product.id}`}>
          <h3 className="line-clamp-1 font-display text-base text-white transition hover:text-amber-300 md:text-2xl">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-1 pt-0.5 md:gap-2 md:pt-1">
          <p className="font-display text-base text-amber-300 md:text-lg">{product.price}</p>
          {product.unit ? (
            <p className="font-sans text-[10px] text-noir-300 md:text-xs">{product.unit}</p>
          ) : null}
        </div>
        <p className="font-sans text-[10px] text-noir-300 md:text-xs">
          ★ {rating} ({reviews} reviews)
        </p>
        <p className="line-clamp-1 font-sans text-[10px] text-noir-300 md:text-[11px]">
          {lowStock ? "Selling fast this week" : "Dispatch in 24-48 hours"}
        </p>
      </motion.div>
    </article>
  );
}
