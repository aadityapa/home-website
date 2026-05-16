import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { m, motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SECTION_BACKGROUNDS } from "../../data/backgrounds";
import { useCart } from "../../context/CartContext";
import { BRAND, type ProductItem } from "../../data/brand";
import { useCatalog } from "../../hooks/useCatalog";
import { InternetBackdrop } from "../ui/InternetBackdrop";
import { CatalogSkeleton } from "../ui/CatalogSkeleton";
import { easeOut, transitionSection, viewportReveal } from "../../lib/motion";

const ProductCard = memo(function ProductCard({
  id,
  name,
  description,
  image,
  price,
  unit,
  categoryLabel,
  index,
}: ProductItem & { categoryLabel: string; index: number }) {
  const { addItem } = useCart();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 250, damping: 22 });
  const springRotY = useSpring(rotateY, { stiffness: 250, damping: 22 });
  const reduce = useReducedMotion();

  const glow = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(245,158,11,0.28), transparent 52%)`;

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportReveal}
      transition={{
        ...transitionSection,
        delay: index * 0.06,
        ease: easeOut,
      }}
      style={{ perspective: 1400 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        if (!reduce) {
          rotateX.set((py - r.height / 2) / 28);
          rotateY.set((r.width / 2 - px) / 28);
        }
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/72 shadow-2xl shadow-clay-400/12 backdrop-blur-md"
        style={reduce ? {} : { rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8, z: 10 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Mouse-follow glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-[1]"
          style={{ background: glow }}
        />

        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={image}
            alt={`${name} — ${categoryLabel}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: easeOut }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/12 to-transparent" />

          {/* Shimmer overlay on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl text-white md:text-3xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                {name}
              </h3>
              <p className="font-sans text-sm text-white/90">{categoryLabel}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="rounded-full bg-ink/60 px-3 py-1.5 font-display text-lg tabular-nums text-white backdrop-blur-sm md:text-xl">
                {price}
              </span>
              {unit ? (
                <span className="rounded-md bg-black/35 px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider text-white/90">
                  {unit}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-4 p-6 md:p-7" style={{ transform: "translateZ(12px)" }}>
          <p className="font-sans text-sm leading-relaxed text-clay-600">
            {description}
          </p>

          {/* Price + actions */}
          <motion.div
            className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-saffron-200/60 bg-gradient-to-br from-saffron-50/90 to-amber-50/50 px-4 py-3"
            whileHover={{ borderColor: "rgba(245,158,11,0.5)" }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-clay-500">
                MRP (incl. taxes)
              </p>
              <p className="font-display text-3xl tabular-nums leading-none text-saffron-800 md:text-[2rem]">
                {price}
              </p>
              {unit ? (
                <p className="mt-1 font-sans text-sm text-clay-600">{unit}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
              <m.button
                type="button"
                className="focus-ring rounded-full border border-saffron-600/40 bg-white/90 px-4 py-2 font-sans text-xs font-semibold text-saffron-800 shadow-sm transition hover:bg-saffron-50"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  addItem(
                    { id, name, description, image, price, unit },
                    categoryLabel,
                    1,
                  )
                }
              >
                Add to cart
              </m.button>
              <m.a
                href="#contact"
                className="focus-ring rounded-full bg-gradient-to-r from-amber-800/95 to-saffron-700 px-4 py-2 font-sans text-xs font-semibold text-amber-50 shadow-md shadow-amber-900/20 transition hover:brightness-110"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                Enquire
              </m.a>
            </div>
          </motion.div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-saffron-300/60 to-transparent" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-saffron-700/80">
              Made in Telhara · {BRAND.company}
            </p>
          </div>
        </div>

        {/* Bottom edge glow */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] opacity-0 group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.article>
  );
});

function CategoryBlock({
  title,
  blurb,
  items,
  startIndex,
}: {
  title: string;
  blurb: string;
  items: readonly ProductItem[];
  startIndex: number;
}) {
  const blockRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = blockRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>("[data-gsap='cat']"), {
        y: 48,
        opacity: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={blockRef} className="scroll-mt-28">
      <div className="mb-10 md:mb-12">
        <motion.div
          data-gsap="cat"
          className="flex items-center gap-3"
        >
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-saffron-500 to-amber-400" />
          <h3 className="font-display text-3xl text-ink md:text-4xl">
            {title}
          </h3>
        </motion.div>
        <p
          data-gsap="cat"
          className="mt-3 max-w-2xl font-sans text-base text-clay-600 md:text-lg"
        >
          {blurb}
        </p>
        <div
          data-gsap="cat"
          className="mt-4 h-px max-w-md bg-gradient-to-r from-saffron-500/40 via-saffron-300/30 to-transparent"
        />
      </div>

      <div
        className={`grid gap-8 ${
          items.length === 1
            ? "md:max-w-md"
            : items.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            {...item}
            categoryLabel={title}
            index={startIndex + i}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductsSection() {
  const { categories, catalogReady, isLiveCatalog } = useCatalog();

  return (
    <section
      id="products"
      className="section-flow relative overflow-hidden bg-gradient-to-b from-clay-50 to-clay-100 py-28 md:py-36"
    >
      <InternetBackdrop imageSrc={SECTION_BACKGROUNDS.products} variant="mid" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-saffron-300/50 to-transparent" />

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={transitionSection}
          className="max-w-2xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <motion.p
              className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportReveal}
              transition={{ ...transitionSection, delay: 0.05 }}
            >
              Shop · MRP &amp; packs
            </motion.p>
            {catalogReady && isLiveCatalog ? (
              <motion.span
                className="rounded-full border border-emerald-500/25 bg-emerald-50/90 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-emerald-800"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Live catalog
              </motion.span>
            ) : null}
          </div>

          <h2
            className="mt-4 font-display text-4xl text-ink md:text-5xl"
            style={{ textShadow: "0 2px 24px rgba(180,83,9,0.14)" }}
          >
            Flavors that feel like home
          </h2>
          <p className="mt-4 font-sans text-base text-clay-600 md:text-lg">
            Shrikhand, achaar, chai masala, and aamchur — each listed separately
            with clear MRP by pack. Add to cart for checkout, or enquire for bulk
            and festive lots.
          </p>
          <p className="mt-3 font-sans text-sm text-clay-500">
            Prices shown are indicative; final rates may vary by batch size or
            delivery. Update{" "}
            <code className="rounded bg-clay-100 px-1 font-mono text-[11px] text-clay-700">
              public/data/catalog.json
            </code>{" "}
            on your host and refresh — visitors pick up new prices without a new
            build.
          </p>
        </motion.div>

        {!catalogReady ? (
          <div className="mt-16 md:mt-20" aria-busy aria-label="Loading catalog">
            <CatalogSkeleton rows={2} />
          </div>
        ) : (
          <m.div
            className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-28"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {categories.map((cat, catIdx) => {
              const startIndex = categories
                .slice(0, catIdx)
                .reduce((acc, c) => acc + c.items.length, 0);
              return (
                <CategoryBlock
                  key={cat.id}
                  title={cat.title}
                  blurb={cat.blurb}
                  items={cat.items}
                  startIndex={startIndex}
                />
              );
            })}
          </m.div>
        )}
      </div>
    </section>
  );
}
