"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { useWishlistStore } from "../stores/wishlist";
import { useCatalog } from "../hooks/useCatalog";
import { ProductCard3D } from "../components/three/ProductCard3D";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const clear = useWishlistStore((s) => s.clear);
  const { categories } = useCatalog();
  const { addItem } = useCart();

  const items = categories
    .flatMap((cat) => cat.items.map((item) => ({ ...item, categoryLabel: cat.title })))
    .filter((item) => ids.includes(item.id));

  return (
    <ImmersivePageLayout className="pt-24">
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-pink-300/85">
              Saved for later
            </p>
            <h1 className="mt-2 font-display text-4xl text-white md:text-5xl">
              Your wishlist
            </h1>
            <p className="mt-3 font-sans text-sm text-noir-300">
              Curate your own premium drop and convert when ready.
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="rounded-full border border-white/[0.18] px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] text-noir-200"
            >
              Clear all
            </button>
          )}
        </div>
      </section>

      {items.length === 0 ? (
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 md:px-10">
          <div className="rounded-3xl border border-white/[0.12] bg-white/[0.04] p-8 text-center">
            <p className="font-display text-3xl text-white">No saved products yet</p>
            <p className="mt-3 font-sans text-sm text-noir-300">
              Tap wishlist on any product card to build your shortlist.
            </p>
            <Link
              href="/shop"
              className="glass-btn-primary mt-6 inline-block rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-noir-950"
            >
              Explore shop
            </Link>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-black/35 p-4"
              >
                <div className="h-56 overflow-hidden rounded-2xl">
                  <ProductCard3D image={item.image} alt={item.name} />
                </div>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.3em] text-amber-400/80">
                  {item.categoryLabel}
                </p>
                <h2 className="mt-1 font-display text-2xl text-white">{item.name}</h2>
                <p className="mt-2 line-clamp-2 font-sans text-sm text-noir-300">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-display text-2xl text-amber-300">{item.price}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="rounded-full border border-pink-400/70 bg-pink-500/20 px-3 py-1.5 font-sans text-xs text-pink-200"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        addItem(
                          {
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            image: item.image,
                            price: item.price,
                            unit: item.unit,
                          },
                          item.categoryLabel,
                          1,
                        )
                      }
                      className="rounded-full bg-gradient-to-r from-amber-700 to-amber-500 px-3 py-1.5 font-sans text-xs font-semibold text-black"
                    >
                      Add cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </ImmersivePageLayout>
  );
}
