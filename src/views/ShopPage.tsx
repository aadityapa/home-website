"use client";

import { useState, useMemo, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { easeOut } from "../lib/motion";
import { MotionImage } from "../components/motion/MotionImage";
import { ProductCard } from "../components/commerce/ProductCard";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { PageReveal } from "@/components/motion/PageReveal";
import { Magnetic } from "../components/immersive/Magnetic";
import type { CatalogProduct } from "../lib/catalog-utils";
import { useCatalog } from "../hooks/useCatalog";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const [activeCat, setActiveCat] = useState(searchParams.get("cat") ?? "all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const { addItem } = useCart();
  const { categories: catalogCategories } = useCatalog();
  const categories = useMemo(
    () => [
      { id: "all", label: "All", blurb: "Explore our complete premium pantry range." },
      ...catalogCategories.map((c) => ({ id: c.id, label: c.title, blurb: c.blurb })),
    ],
    [catalogCategories],
  );

  const allItems = useMemo(
    () =>
      catalogCategories.flatMap((c) =>
        c.items.map((item) => ({
          ...item,
          category: c.id,
          categoryLabel: c.title,
        })),
      ),
    [catalogCategories],
  );

  const filtered = useMemo(() => {
    let items =
      activeCat === "all"
        ? allItems
        : allItems.filter((i) => i.category === activeCat);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.categoryLabel.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc")
      items = [...items].sort(
        (a, b) =>
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, "")),
      );
    if (sort === "price-desc")
      items = [...items].sort(
        (a, b) =>
          parseInt(b.price.replace(/\D/g, "")) -
          parseInt(a.price.replace(/\D/g, "")),
      );
    return items;
  }, [activeCat, sort, allItems, searchQuery]);
  const activeCategoryMeta = useMemo(
    () => categories.find((c) => c.id === activeCat) ?? categories[0],
    [categories, activeCat],
  );

  useEffect(() => {
    const cat = searchParams.get("cat") ?? "all";
    setActiveCat(cat);
  }, [searchParams]);

  function buildShopUrl(cat: string, q?: string) {
    const params = new URLSearchParams();
    if (cat !== "all") params.set("cat", cat);
    if (q?.trim()) params.set("q", q.trim());
    const query = params.toString();
    return query ? `/shop?${query}` : "/shop";
  }

  function handleCat(id: string) {
    setActiveCat(id);
    router.push(buildShopUrl(id, searchQuery));
  }

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = new FormData(form).get("q")?.toString() ?? "";
    router.push(buildShopUrl(activeCat, q));
  }

  function handleAdd(item: CatalogProduct) {
    addItem(item, item.categoryTitle, 1);
  }

  return (
    <ImmersivePageLayout className="pt-16 sm:pt-20">
      <section className="relative h-44 overflow-hidden bg-gradient-to-br from-[#1a0b05] via-[#2c1307] to-[#0c0a14] sm:h-48 md:h-72">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#3d1c0b] via-[#2a1508] to-[#190f0d]"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 md:px-16">
          <motion.p
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/80 md:text-xs md:tracking-[0.4em]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Uma Laghoo Udyog · Premium Shop
          </motion.p>
          <motion.h1
            className="mt-1 font-display text-2xl text-white sm:text-3xl md:mt-2 md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          >
            Shop Collection
          </motion.h1>
          <motion.p
            className="mt-1 max-w-xs font-sans text-xs text-amber-100/80 sm:max-w-sm sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            Premium vegetarian pantry — quick add, wishlist, and secure WhatsApp checkout.
          </motion.p>
        </div>
      </section>

      <div className="sticky top-[56px] z-30 border-b border-white/[0.08] bg-noir-950/88 backdrop-blur-xl sm:top-[64px]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-3 md:px-10">
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => handleCat(cat.id)}
                className={`shrink-0 rounded-full px-3 py-1 font-sans text-[11px] font-semibold transition sm:px-4 sm:py-1.5 sm:text-xs ${
                  activeCat === cat.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-700 text-black shadow-lg shadow-amber-900/40"
                    : "border border-white/[0.16] bg-white/[0.03] text-noir-200 hover:border-amber-400/60"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full gap-2 sm:max-w-xs sm:flex-1"
            role="search"
          >
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search products…"
              className="min-w-0 flex-1 rounded-lg border border-white/[0.16] bg-white/[0.06] px-2.5 py-1 font-sans text-[11px] text-noir-100 placeholder:text-noir-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xs"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200 sm:rounded-xl sm:text-xs"
            >
              Search
            </button>
          </form>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="w-full rounded-lg border border-white/[0.16] bg-white/[0.06] px-2.5 py-1 font-sans text-[11px] text-noir-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40 sm:w-auto sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xs"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <PageReveal className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-12 md:px-10">
        <p className="mb-2 line-clamp-2 max-w-xl font-sans text-[11px] text-noir-300 sm:text-xs">
          {activeCategoryMeta?.blurb}
        </p>
        <p className="mb-4 font-sans text-xs text-noir-300 sm:mb-6 sm:text-sm">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {searchQuery ? ` for “${searchQuery}”` : ""} · tap for quick add
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCat}-${sort}-${searchQuery}`}
            className="commerce-grid-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            {filtered.map((item, i) => (
              <ProductCard
                key={item.id}
                product={{
                  ...item,
                  categoryId: item.category,
                  categoryTitle: item.categoryLabel,
                }}
                priority={i < 4}
                onQuickView={(p) => setSelected(p)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </PageReveal>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/[0.16] bg-gradient-to-b from-[#16121a] via-[#120f14] to-[#0b0b10] p-4 md:p-8"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close quick view"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded-full border border-white/[0.2] bg-white/[0.06] px-2.5 py-1 text-[11px] text-white md:right-4 md:top-4 md:px-3 md:text-xs"
              >
                Close
              </button>
              <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
                <div className="h-[220px] overflow-hidden rounded-xl border border-white/[0.1] bg-black/40 sm:h-[280px] md:h-[420px] md:rounded-2xl">
                  <MotionImage
                    src={selected.image}
                    alt={selected.name}
                    width={1200}
                    height={900}
                    imageClassName="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-amber-400/80">
                    {selected.categoryTitle}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-white sm:text-3xl md:text-4xl">{selected.name}</h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-noir-300 sm:mt-4 sm:text-sm">{selected.description}</p>
                  <p className="mt-3 font-display text-2xl tabular-nums text-amber-300 sm:mt-5 sm:text-3xl">{selected.price}</p>
                  {selected.unit && (
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-noir-400">{selected.unit}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                    <Magnetic strength={0.2}>
                      <button
                        type="button"
                        onClick={() => handleAdd(selected)}
                        className="glass-btn-primary rounded-full px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-noir-950"
                      >
                        Add to cart
                      </button>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                      <Link
                        href={`/shop/${selected.id}`}
                        className="glass-btn-ghost rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        Open full detail
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ImmersivePageLayout>
  );
}
