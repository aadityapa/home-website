import { useParams, Link } from "react-router-dom";
import { useMemo, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { useCart } from "../context/CartContext";
import { transitionSection } from "../lib/motion";
import { productAccent } from "../lib/product3d";
import { use3DQuality } from "../hooks/use3DQuality";
import { ProductCard3D } from "../components/three/ProductCard3D";

const ProductViewerCanvas = lazy(() =>
  import("../components/three/ProductViewerCanvas").then((m) => ({
    default: m.ProductViewerCanvas,
  })),
);

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const quality = use3DQuality();

  const { item, category } = useMemo(() => {
    for (const cat of PRODUCT_CATEGORIES) {
      const found = cat.items.find((i) => i.id === id);
      if (found) return { item: found, category: cat };
    }
    return { item: null, category: null };
  }, [id]);

  if (!item || !category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24">
        <p className="font-display text-2xl text-ink">Product not found</p>
        <Link to="/shop" className="btn-primary">
          Back to shop
        </Link>
      </div>
    );
  }

  function handleAdd() {
    if (!item || !category) return;
    for (let i = 0; i < qty; i++)
      addItem(
        {
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          price: item.price,
          unit: item.unit,
        },
        category.title,
        1,
      );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const related = category.items.filter((i) => i.id !== id);
  const accent = productAccent(item.id);

  return (
    <div className="min-h-screen bg-clay-50 pt-20">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-10">
        <nav className="flex items-center gap-2 font-sans text-xs text-clay-500">
          <Link to="/" className="hover:text-saffron-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-saffron-600 transition">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink">{item.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 md:grid-cols-2 md:items-start md:gap-16 md:px-10">
        <motion.div
          className="sticky top-24"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transitionSection}
        >
          <div className="relative h-96 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl shadow-clay-400/15 md:h-[520px]">
            {quality !== "off" ? (
              <Suspense
                fallback={
                  <ProductCard3D
                    image={item.image}
                    alt={item.name}
                    className="h-full"
                  />
                }
              >
                <ProductViewerCanvas
                  imageUrl={item.image}
                  accent={accent}
                  quality={quality}
                />
              </Suspense>
            ) : (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 font-sans text-xs font-medium text-saffron-700 backdrop-blur-sm shadow-sm">
              Interactive 3D · drag to orbit
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transitionSection, delay: 0.1 }}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600">
            {category.title}
          </p>
          <h1
            className="mt-2 font-display text-4xl text-ink md:text-5xl"
            style={{ textShadow: "0 2px 16px rgba(180,83,9,0.12)" }}
          >
            {item.name}
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-clay-600">
            {item.description}
          </p>

          <div className="mt-8 rounded-2xl border border-saffron-200/60 bg-gradient-to-br from-saffron-50/90 to-amber-50/50 p-5">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-clay-500">
              MRP (incl. taxes)
            </p>
            <p className="font-display text-4xl tabular-nums text-saffron-800 mt-1">
              {item.price}
            </p>
            {item.unit && (
              <p className="mt-1 font-sans text-sm text-clay-600">{item.unit}</p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="font-sans text-sm text-clay-600">Quantity</p>
            <div className="flex items-center gap-2 rounded-full border border-clay-200 bg-white/80">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full font-sans text-lg text-clay-600 hover:bg-clay-100"
              >
                −
              </button>
              <span className="w-8 text-center font-display text-lg text-ink">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full font-sans text-lg text-clay-600 hover:bg-clay-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={handleAdd}
              className="btn-primary flex-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {added ? "✓ Added!" : "Add to cart"}
            </motion.button>
            <motion.a
              href={`https://wa.me/91${import.meta.env.VITE_PHONE ?? "9423431674"}?text=Hi, I want to order ${qty}x ${item.name}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              WhatsApp order
            </motion.a>
          </div>

          <motion.div className="mt-8 space-y-2">
            {[
              "100% vegetarian",
              "FSSAI Licensed",
              "Small batch crafted in Telhara",
              "No artificial preservatives",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 font-sans text-sm text-clay-600"
              >
                <span className="text-emerald-500">✓</span> {f}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-clay-200/60 bg-clay-100/60 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <h2 className="font-display text-2xl text-ink mb-8">
              More from {category.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <motion.div key={r.id} whileHover={{ y: -4 }}>
                  <Link
                    to={`/shop/${r.id}`}
                    className="group block overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-md"
                  >
                    <motion.div className="h-48">
                      <ProductCard3D image={r.image} alt={r.name} />
                    </motion.div>
                    <div className="p-4">
                      <p className="font-display text-lg text-ink">{r.name}</p>
                      <p className="font-display text-xl text-saffron-700 mt-1">
                        {r.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
