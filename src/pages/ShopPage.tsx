import { useState, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { useCart } from "../context/CartContext";
import { easeOut, transitionSection } from "../lib/motion";
import { ProductCard3D } from "../components/three/ProductCard3D";
import { use3DQuality } from "../hooks/use3DQuality";

const ShopBannerScene = lazy(() =>
  import("../components/three/ShopBannerScene").then((m) => ({
    default: m.ShopBannerScene,
  })),
);

const categories = [
  { id: "all", label: "All" },
  ...PRODUCT_CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState(params.get("cat") ?? "all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );
  const { addItem } = useCart();
  const quality = use3DQuality();

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

  function handleCat(id: string) {
    setActiveCat(id);
    setParams(id === "all" ? {} : { cat: id });
  }

  return (
    <div className="min-h-screen bg-clay-50 pt-20">
      <section className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-900 via-saffron-800 to-amber-700 md:h-72">
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
            <motion.div className="h-full w-full bg-gradient-to-br from-amber-800 to-saffron-700" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/88 to-transparent" />
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
            The Shop
          </motion.h1>
          <motion.p
            className="mt-2 max-w-sm font-sans text-sm text-amber-100/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            Every product rendered in WebGL with your real pack shots
          </motion.p>
        </div>
      </section>

      <div className="sticky top-[70px] z-30 border-b border-clay-200/70 bg-clay-50/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => handleCat(cat.id)}
                className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition ${
                  activeCat === cat.id
                    ? "bg-saffron-600 text-white shadow-md shadow-saffron-500/30"
                    : "border border-clay-200 bg-white text-clay-600 hover:border-saffron-400"
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
            className="rounded-xl border border-clay-200 bg-white px-3 py-1.5 font-sans text-xs text-clay-600 focus:outline-none focus:ring-2 focus:ring-saffron-500/40"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-10">
        <p className="mb-6 font-sans text-sm text-clay-500">
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
                <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg shadow-clay-300/10 backdrop-blur-md transition hover:shadow-xl hover:shadow-clay-400/15">
                  <Link
                    to={`/shop/${item.id}`}
                    className="block aspect-[4/3] overflow-hidden"
                  >
                    <ProductCard3D image={item.image} alt={item.name} />
                  </Link>

                  <div className="p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-saffron-600">
                      {item.categoryLabel}
                    </p>
                    <Link to={`/shop/${item.id}`}>
                      <h2 className="mt-1 font-display text-xl text-ink hover:text-saffron-700 transition">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="mt-2 font-sans text-sm text-clay-500 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-2xl tabular-nums text-saffron-800">
                          {item.price}
                        </p>
                        {item.unit && (
                          <p className="font-sans text-xs text-clay-500">
                            {item.unit}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
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
                          className="rounded-full border border-saffron-500/40 bg-white px-3 py-1.5 font-sans text-xs font-semibold text-saffron-700 hover:bg-saffron-50"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                        >
                          + Cart
                        </motion.button>
                        <Link
                          to={`/shop/${item.id}`}
                          className="rounded-full bg-gradient-to-r from-amber-800 to-saffron-600 px-3 py-1.5 font-sans text-xs font-semibold text-white"
                        >
                          3D View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
