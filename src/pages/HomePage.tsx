import { HeroSection } from "../components/sections/HeroSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { transitionSection, viewportReveal } from "../lib/motion";
import { ProductCard3D } from "../components/three/ProductCard3D";
import { CategoryOrb3D } from "../components/three/CategoryOrb3D";

const categoryMeta: Record<
  string,
  { image: string; bg: string; border: string }
> = {
  shrikhand: {
    image: "/images/shrikhand-kesar-ilaichi.png",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200/60",
  },
  achaar: {
    image: "/images/aam-ka-achar.png",
    bg: "from-green-50 to-emerald-50",
    border: "border-green-200/60",
  },
  "chai-masala": {
    image: "/images/chai-masala.png",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200/60",
  },
  aamchur: {
    image: "/images/aamchur-powder.png",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200/60",
  },
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <section className="relative bg-clay-50 py-20 md:py-28 overflow-hidden">
        <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron-300/50 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={transitionSection}
            className="mb-12 text-center"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600">
              Our range
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              Four categories,
              <span className="block text-gradient-gold">in 3D</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PRODUCT_CATEGORIES.map((cat, i) => {
              const meta = categoryMeta[cat.id];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewportReveal}
                  transition={{ ...transitionSection, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    to={`/shop?cat=${cat.id}`}
                    className={`flex flex-col items-center gap-4 rounded-3xl border bg-gradient-to-br ${meta?.bg} ${meta?.border} p-6 text-center shadow-md shadow-clay-300/10 backdrop-blur-sm transition hover:shadow-xl hover:shadow-clay-400/15`}
                  >
                    {meta && (
                      <CategoryOrb3D image={meta.image} label={cat.title} />
                    )}
                    <div>
                      <p className="font-display text-xl text-ink">{cat.title}</p>
                      <p className="mt-1 font-sans text-xs text-clay-500">
                        {cat.items.length} product
                        {cat.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className="rounded-full bg-saffron-600 px-4 py-1.5 font-sans text-xs font-medium text-white">
                      Explore →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-clay-200/60 bg-clay-100/80 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <motion.div className="flex flex-wrap items-center justify-center gap-8 md:justify-between">
            {[
              { icon: "🌿", label: "100% Vegetarian" },
              { icon: "✅", label: "FSSAI Licensed" },
              { icon: "🏠", label: "Homemade Batches" },
              { icon: "📦", label: "Pan-India Delivery" },
              { icon: "📞", label: "Order by Phone/WhatsApp" },
            ].map(({ icon, label }) => (
              <motion.div
                key={label}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={transitionSection}
              >
                <span className="text-2xl">{icon}</span>
                <span className="font-sans text-sm font-medium text-clay-700">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-clay-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={transitionSection}
            className="flex flex-wrap items-end justify-between gap-4 mb-10"
          >
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600">
                Best sellers
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Most loved · 3D view
              </h2>
            </div>
            <Link to="/shop" className="btn-secondary text-sm">
              View all →
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.flatMap((c) => c.items)
              .slice(0, 3)
              .map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportReveal}
                  transition={{ ...transitionSection, delay: i * 0.07 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={`/shop/${item.id}`}
                    className="group block overflow-hidden rounded-2xl border border-white/60 bg-white/75 shadow-lg shadow-clay-300/10 backdrop-blur-md transition hover:shadow-xl hover:shadow-clay-400/15"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <ProductCard3D image={item.image} alt={item.name} />
                    </div>
                    <div className="p-4">
                      <p className="font-display text-xl text-ink">{item.name}</p>
                      <p className="mt-1 text-sm text-clay-500 line-clamp-2">
                        {item.description}
                      </p>
                      <motion.div className="mt-3 flex items-center justify-between">
                        <span className="font-display text-2xl text-saffron-700">
                          {item.price}
                        </span>
                        <span className="rounded-full bg-saffron-600 px-3 py-1 text-xs text-white">
                          View 3D →
                        </span>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
