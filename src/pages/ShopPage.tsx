import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { useCart } from "../context/CartContext";
import { easeOut, transitionSection } from "../lib/motion";
import { Canvas } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

/* ── Tiny 3D banner scene for the shop header ── */
function ShopBannerOrb({ pos, color }: { pos: [number, number, number]; color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame(s => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.2 + pos[0];
    ref.current.rotation.y = s.clock.elapsedTime * 0.3;
  });
  return (
    <Float speed={1.2} floatIntensity={0.6}>
      <mesh ref={ref} position={pos} castShadow>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.35} emissive={color} emissiveIntensity={0.1} />
      </mesh>
    </Float>
  );
}

function ShopBanner3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.3]} gl={{ antialias: false }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#fff4e0" />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#ffb347" />
      {[
        { pos: [-2.2, 0.5, 0] as [number, number, number], color: "#c45f00" },
        { pos: [2.0, -0.3, 0] as [number, number, number], color: "#e6a01a" },
        { pos: [0, 1.0, -1] as [number, number, number],  color: "#d97706" },
        { pos: [-0.8, -0.6, 0.5] as [number, number, number], color: "#b45309" },
        { pos: [1.2, 0.8, 0.8] as [number, number, number], color: "#f59e0b" },
      ].map((s) => <ShopBannerOrb key={s.pos.join()} pos={s.pos} color={s.color} />)}
      <Sparkles count={30} scale={5} size={1.8} speed={0.3} color="#ffd899" opacity={0.55} />
    </Canvas>
  );
}

const categories = [
  { id: "all", label: "All" },
  ...PRODUCT_CATEGORIES.map(c => ({ id: c.id, label: c.title })),
];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState(params.get("cat") ?? "all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");
  const { addItem } = useCart();

  const allItems = useMemo(() =>
    PRODUCT_CATEGORIES.flatMap(c => c.items.map(item => ({ ...item, category: c.id, categoryLabel: c.title }))),
    []
  );

  const filtered = useMemo(() => {
    let items = activeCat === "all" ? allItems : allItems.filter(i => i.category === activeCat);
    if (sort === "price-asc")  items = [...items].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
    if (sort === "price-desc") items = [...items].sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
    return items;
  }, [activeCat, sort, allItems]);

  function handleCat(id: string) {
    setActiveCat(id);
    setParams(id === "all" ? {} : { cat: id });
  }

  return (
    <div className="min-h-screen bg-clay-50 pt-20">
      {/* 3D Banner Header */}
      <section className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-900 via-saffron-800 to-amber-700 md:h-72">
        <div className="absolute inset-0">
          <ShopBanner3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
          <motion.p
            className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Uma Laghoo Udyog
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-4xl text-white md:text-5xl"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            The Shop
          </motion.h1>
          <motion.p
            className="mt-2 max-w-sm font-sans text-sm text-amber-100/80"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
            Shrikhand · Achaar · Chai Masala · Aamchur
          </motion.p>
        </div>
      </section>

      {/* Filter + sort bar */}
      <div className="sticky top-[70px] z-30 border-b border-clay-200/70 bg-clay-50/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => handleCat(cat.id)}
                className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition ${
                  activeCat === cat.id
                    ? "bg-saffron-600 text-white shadow-md shadow-saffron-500/30"
                    : "border border-clay-200 bg-white text-clay-600 hover:border-saffron-400"
                }`}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
            className="rounded-xl border border-clay-200 bg-white px-3 py-1.5 font-sans text-xs text-clay-600 focus:outline-none focus:ring-2 focus:ring-saffron-500/40"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-10">
        <p className="mb-6 font-sans text-sm text-clay-500">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
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
                  {/* Image */}
                  <Link to={`/shop/${item.id}`} className="block aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image} alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Body */}
                  <div className="p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-saffron-600">{item.categoryLabel}</p>
                    <Link to={`/shop/${item.id}`}>
                      <h2 className="mt-1 font-display text-xl text-ink hover:text-saffron-700 transition">{item.name}</h2>
                    </Link>
                    <p className="mt-2 font-sans text-sm text-clay-500 line-clamp-2">{item.description}</p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-2xl tabular-nums text-saffron-800">{item.price}</p>
                        {item.unit && <p className="font-sans text-xs text-clay-500">{item.unit}</p>}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          type="button"
                          onClick={() => addItem({ id: item.id, name: item.name, description: item.description, image: item.image, price: item.price, unit: item.unit }, item.categoryLabel, 1)}
                          className="rounded-full border border-saffron-500/40 bg-white px-3 py-1.5 font-sans text-xs font-semibold text-saffron-700 hover:bg-saffron-50"
                          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                          + Cart
                        </motion.button>
                        <Link to={`/shop/${item.id}`}
                          className="rounded-full bg-gradient-to-r from-amber-800 to-saffron-600 px-3 py-1.5 font-sans text-xs font-semibold text-white">
                          View
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
