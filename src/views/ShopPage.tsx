import { useState, useMemo, lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { useCart } from "../context/CartContext";
import { easeOut, transitionSection } from "../lib/motion";
import { ProductCard3D } from "../components/three/ProductCard3D";
import { use3DQuality } from "../hooks/use3DQuality";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { Magnetic } from "../components/immersive/Magnetic";
import type { ProductItem } from "../data/brand";

const ShopBannerScene = lazy(() =>
  import("../components/three/ShopBannerScene").then((m) => ({
    default: m.ShopBannerScene,
  })),
);
const ProductViewerCanvas = lazy(() =>
  import("../components/three/ProductViewerCanvas").then((m) => ({
    default: m.ProductViewerCanvas,
  })),
);

const categories = [
  { id: "all", label: "All" },
  ...PRODUCT_CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCat, setActiveCat] = useState(searchParams.get("cat") ?? "all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );
  const [selected, setSelected] = useState<
    | (ProductItem & {
        category: string;
        categoryLabel: string;
      })
    | null
  >(null);
  const { addItem } = useCart();
  const quality = use3DQuality();
  const [priceFlash, setPriceFlash] = useState<string | null>(null);

  const allItems = useMemo(
    () =>
      PRODUCT_CATEGORIES.flatMap((c) =>
        c.items.map((item) => ({
          ...item,
          category: c.id,
          categoryLabel: c.title,
        })),
      ),
    [],
  );

  const filtered = useMemo(() => {
    let items =
      activeCat === "all"
        ? allItems
        : allItems.filter((i) => i.category === activeCat);
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
  }, [activeCat, sort, allItems]);

  useEffect(() => {
    const cat = searchParams.get("cat") ?? "all";
    setActiveCat(cat);
  }, [searchParams]);

  function handleCat(id: string) {
    setActiveCat(id);
    router.push(id === "all" ? "/shop" : `/shop?cat=${id}`);
  }

  function handleAdd(item: (typeof allItems)[number]) {
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
    );
    setPriceFlash(item.id);
    window.setTimeout(() => setPriceFlash(null), 550);
  }

  return (
    <ImmersivePageLayout className="pt-20">
      <section className="relative h-56 overflow-hidden bg-gradient-to-br from-[#1a0b05] via-[#2c1307] to-[#0c0a14] md:h-72">
        <div className="absolute inset-0">
          {quality !== "off" ? (
            <Suspense
              fallback={
                <div className="h-full w-full bg-amber-900/80 animate-pulse" />
              }
            >
              <ShopBannerScene quality={quality} />
            </Suspense>
          ) : (
            <motion.div className="h-full w-full bg-gradient-to-br from-[#3d1c0b] to-[#190f0d]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
          <motion.p
            className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Uma Laghoo Udyog · 3D Shop
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-4xl text-white md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          >
            Immersive Shop
          </motion.h1>
          <motion.p
            className="mt-2 max-w-sm font-sans text-sm text-amber-100/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            Cinematic product storytelling in real-time 3D with luxury motion choreography.
          </motion.p>
        </div>
      </section>

      <div className="sticky top-[70px] z-30 border-b border-white/[0.08] bg-noir-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => handleCat(cat.id)}
                className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition ${
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
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-xl border border-white/[0.16] bg-white/[0.06] px-3 py-1.5 font-sans text-xs text-noir-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-10">
        <p className="mb-6 font-sans text-sm text-noir-300">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} · drag to
          explore 3D frames
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat + sort}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                className="group relative"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, ...transitionSection }}
                whileHover={{ y: -5 }}
              >
                <div className="shop-cinematic-panel overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-black/30 shadow-2xl backdrop-blur-xl transition">
                  <Link
                    href={`/shop/${item.id}`}
                    className="block aspect-[4/3] overflow-hidden"
                  >
                    <ProductCard3D image={item.image} alt={item.name} />
                  </Link>

                  <div className="p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-saffron-600">
                      {item.categoryLabel}
                    </p>
                    <Link href={`/shop/${item.id}`}>
                      <h2 className="mt-1 font-display text-xl text-white transition group-hover:text-amber-300">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="mt-2 line-clamp-2 font-sans text-sm text-noir-300">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-2xl tabular-nums text-amber-300">
                          <motion.span
                            key={`${item.id}-${item.price}`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.35, ease: easeOut }}
                            className={priceFlash === item.id ? "price-flash inline-block" : "inline-block"}
                          >
                            {item.price}
                          </motion.span>
                        </p>
                        {item.unit && (
                          <p className="font-sans text-xs text-noir-400">
                            {item.unit}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Magnetic strength={0.2}>
                          <motion.button
                            type="button"
                            onClick={() => setSelected(item)}
                            className="rounded-full border border-white/[0.2] bg-white/[0.05] px-3 py-1.5 font-sans text-xs font-semibold text-white hover:border-amber-400/70"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                          >
                            Quick View
                          </motion.button>
                        </Magnetic>
                        <Magnetic strength={0.22}>
                          <motion.button
                            type="button"
                            onClick={() => handleAdd(item)}
                            className="rounded-full bg-gradient-to-r from-amber-700 to-amber-500 px-3 py-1.5 font-sans text-xs font-semibold text-black"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                          >
                            + Cart
                          </motion.button>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

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
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.16] bg-gradient-to-b from-[#16121a] via-[#120f14] to-[#0b0b10] p-5 md:p-8"
              initial={{ y: 32, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close quick view"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full border border-white/[0.2] bg-white/[0.06] px-3 py-1 text-xs text-white"
              >
                Close
              </button>
              <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                <div className="h-[320px] overflow-hidden rounded-2xl border border-white/[0.1] bg-black/40 md:h-[420px]">
                  {quality !== "off" ? (
                    <Suspense fallback={<div className="h-full w-full animate-pulse bg-white/[0.05]" />}>
                      <ProductViewerCanvas imageUrl={selected.image} accent="#f59e0b" quality={quality} />
                    </Suspense>
                  ) : (
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-amber-400/80">
                    {selected.categoryLabel}
                  </p>
                  <h3 className="mt-2 font-display text-4xl text-white">{selected.name}</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-noir-300">{selected.description}</p>
                  <p className="mt-5 font-display text-3xl tabular-nums text-amber-300">{selected.price}</p>
                  {selected.unit && (
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-noir-400">{selected.unit}</p>
                  )}
                  <div className="mt-7 flex flex-wrap gap-3">
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
