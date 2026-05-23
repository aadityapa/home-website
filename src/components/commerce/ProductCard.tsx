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

export function ProductCard({ product, priority, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const toggleWish = useWishlistStore((s) => s.toggle);
  const saved = useWishlistStore((s) => s.has(product.id));

  return (
    <article className="commerce-card group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-noir-950/40">
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
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-sm backdrop-blur-md transition hover:bg-black/60"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
        <motion.div
          className="absolute inset-x-0 bottom-0 flex gap-2 p-3 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          initial={false}
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
            className="commerce-btn-primary flex-1 rounded-full py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em]"
          >
            Quick add
          </button>
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="rounded-full border border-white/20 bg-black/40 px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-md"
            >
              View
            </button>
          ) : null}
        </motion.div>
      </div>
      <motion.div className="mt-4 space-y-1" whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-amber-400/85">
          {product.categoryTitle}
        </p>
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-display text-xl text-white transition hover:text-amber-300 md:text-2xl">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2 pt-1">
          <p className="font-display text-lg text-amber-300">{product.price}</p>
          {product.unit ? (
            <p className="font-sans text-xs text-noir-300">{product.unit}</p>
          ) : null}
        </div>
      </motion.div>
    </article>
  );
}
