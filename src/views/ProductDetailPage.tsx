"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useCatalog } from "../hooks/useCatalog";
import { TRUST_BADGES, HOME_FAQS } from "../data/commerce";
import { useCart } from "../context/CartContext";
import { transitionSection } from "../lib/motion";
import { MotionImage } from "../components/motion/MotionImage";
import { ProductCard3D } from "../components/three/ProductCard3D";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { Magnetic } from "../components/immersive/Magnetic";
import { useWishlistStore } from "../stores/wishlist";
import { mapRecentlyViewedProducts, useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { RecentlyViewedSection } from "../components/commerce/RecentlyViewedSection";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const hasWish = useWishlistStore((s) => s.has);

  const { categories } = useCatalog();

  const { item, category } = useMemo(() => {
    for (const cat of categories) {
      const found = cat.items.find((i) => i.id === id);
      if (found) return { item: found, category: cat };
    }
    return { item: null, category: null };
  }, [id, categories]);

  if (!item || !category) {
    return (
      <ImmersivePageLayout className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24">
        <p className="font-display text-2xl text-white">Product not found</p>
        <Link href="/shop" className="glass-btn-primary rounded-full px-8 py-3">
          Back to shop
        </Link>
      </ImmersivePageLayout>
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
  const priceRaw = parseInt(item.price.replace(/\D/g, ""), 10) || 0;
  const totalPrice = (priceRaw * qty).toLocaleString("en-IN");
  const galleryItems = [item, ...related.slice(0, 4)];
  const recentIds = useRecentlyViewed(item.id);
  const recentlyViewed = useMemo(
    () => mapRecentlyViewedProducts(categories, recentIds, item.id),
    [categories, recentIds, item.id],
  );
  const stockLeft = 4 + (item.id.length % 9);

  return (
    <ImmersivePageLayout className="pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-6 sm:py-4 md:px-10">
        <nav className="flex items-center gap-2 font-sans text-xs text-noir-400">
          <Link href="/" className="transition hover:text-amber-300">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition hover:text-amber-300">
            Shop
          </Link>
          <span>/</span>
          <span className="text-noir-100">{item.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-6xl gap-7 px-3 pb-12 sm:px-6 sm:pb-20 md:grid-cols-2 md:items-start md:gap-16 md:px-10 md:pb-24">
        <motion.div
          className="sticky top-20 md:top-24"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transitionSection}
        >
          <div className="relative h-72 overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-br from-[#1f1110] via-[#0e1019] to-[#09090f] shadow-2xl shadow-black/45 sm:h-80 md:h-[520px] md:rounded-3xl">
            <MotionImage
              src={item.image}
              alt={item.name}
              width={1200}
              height={900}
              priority
              imageClassName="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transitionSection, delay: 0.1 }}
        >
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/90 md:text-xs md:tracking-[0.4em]">
            {category.title}
          </p>
          <h1
            className="mt-1 font-display text-2xl text-white sm:text-3xl md:mt-2 md:text-5xl"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
          >
            {item.name}
          </h1>
          <p className="mt-2 font-sans text-sm leading-relaxed text-noir-300 md:mt-4 md:text-base">
            {item.description}
          </p>
          <p className="mt-3 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-amber-200">
            Only {stockLeft} units left in this batch
          </p>

          <div className="mt-5 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 md:mt-8 md:p-5">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-noir-400">
              MRP (incl. taxes)
            </p>
            <p className="mt-1 font-display text-3xl tabular-nums text-amber-300 md:text-4xl">
              {item.price}
            </p>
            {item.unit && (
              <p className="mt-1 font-sans text-sm text-noir-300">{item.unit}</p>
            )}
            <p className="mt-3 font-sans text-xs uppercase tracking-[0.22em] text-noir-400">
              Total for {qty} · Rs {totalPrice}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3 md:mt-6 md:gap-4">
            <p className="font-sans text-xs text-noir-300 md:text-sm">Quantity</p>
            <div className="flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.04]">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full font-sans text-base text-noir-100 hover:bg-white/[0.09] md:h-9 md:w-9 md:text-lg"
              >
                −
              </button>
              <span className="w-7 text-center font-display text-base text-white md:w-8 md:text-lg">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full font-sans text-base text-noir-100 hover:bg-white/[0.09] md:h-9 md:w-9 md:text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
            <Magnetic>
              <motion.button
                type="button"
                onClick={handleAdd}
                className="glass-btn-primary flex-1 rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-noir-950 md:px-8 md:py-3.5 md:text-sm md:tracking-[0.18em]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {added ? "Added to cart" : "Add to cart"}
              </motion.button>
            </Magnetic>
            <Magnetic strength={0.22}>
              <motion.button
                type="button"
                onClick={() => toggleWish(item.id)}
                className={`rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] md:px-8 md:py-3.5 md:text-sm md:tracking-[0.18em] ${
                  hasWish(item.id)
                    ? "border border-pink-400/80 bg-pink-500/20 text-pink-200"
                    : "glass-btn-ghost text-white"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {hasWish(item.id) ? "Wishlisted" : "Add wishlist"}
              </motion.button>
            </Magnetic>
            <Magnetic strength={0.24}>
              <motion.a
                href={`https://wa.me/91${process.env.NEXT_PUBLIC_PHONE ?? "9423431674"}?text=Hi, I want to order ${qty}x ${item.name}`}
                target="_blank"
                rel="noreferrer"
                className="glass-btn-ghost flex-1 rounded-full px-5 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white md:px-8 md:py-3.5 md:text-sm md:tracking-[0.18em]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                WhatsApp order
              </motion.a>
            </Magnetic>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 md:mt-8">
            {TRUST_BADGES.map((b) => (
              <span
                key={b.label}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-noir-200"
              >
                {b.icon} {b.label}
              </span>
            ))}
          </div>
          <details className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 md:mt-8 md:px-5 md:py-4">
            <summary className="cursor-pointer font-sans text-sm font-medium text-white">
              Shipping &amp; returns
            </summary>
            <p className="mt-3 font-sans text-sm text-noir-300">
              Pan-India shipping with careful packaging. Contact us on WhatsApp for delivery timelines to your pincode.
            </p>
          </details>
          <div className="mt-4 space-y-2 md:mt-6 md:space-y-3">
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-noir-400">Quick answers</p>
            {HOME_FAQS.slice(0, 2).map((f) => (
              <div key={f.question}>
                <p className="font-sans text-sm font-medium text-white">{f.question}</p>
                <p className="mt-1 font-sans text-sm text-noir-300">{f.answer}</p>
              </div>
            ))}
            <Link href="/faq" className="font-sans text-xs uppercase tracking-[0.2em] text-amber-300 hover:underline">
              View all FAQs →
            </Link>
          </div>
        </motion.div>
      </div>

      <section className="mx-auto max-w-6xl px-3 pb-10 sm:px-6 sm:pb-16 md:px-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-xl text-white sm:text-2xl md:text-3xl">Swipe campaign gallery</h2>
          <p className="font-sans text-xs uppercase tracking-[0.26em] text-noir-400">
            Mobile-first storytelling
          </p>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.1 },
          }}
          className="campaign-swiper pb-10"
        >
          {galleryItems.map((g) => (
            <SwiperSlide key={g.id}>
              <article className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] p-2.5 md:p-3">
                <div className="h-44 overflow-hidden rounded-xl sm:h-52 md:h-64">
                  <MotionImage src={g.image} alt={g.name} width={900} height={900} />
                </div>
                <p className="mt-2 font-display text-xl text-white md:mt-3 md:text-2xl">{g.name}</p>
                <p className="font-sans text-xs text-amber-300 md:text-sm">{g.price}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/[0.08] bg-white/[0.02] py-10 md:py-16">
          <div className="mx-auto max-w-6xl px-3 sm:px-6 md:px-10">
            <h2 className="mb-5 font-display text-xl text-white md:mb-8 md:text-2xl">
              More from {category.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <motion.div key={r.id} whileHover={{ y: -4 }}>
                  <Link
                    href={`/shop/${r.id}`}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-2xl shadow-black/30"
                  >
                    <motion.div className="h-48">
                      <ProductCard3D image={r.image} alt={r.name} />
                    </motion.div>
                    <div className="p-4">
                      <p className="font-display text-lg text-white">{r.name}</p>
                      <p className="mt-1 font-display text-xl text-amber-300">
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

      <RecentlyViewedSection products={recentlyViewed} />

      <div className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/[0.14] bg-noir-950/92 p-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.2] text-white"
          >
            −
          </button>
          <span className="w-7 text-center font-display text-lg text-white">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.2] text-white"
          >
            +
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-xl text-amber-300">Rs {totalPrice}</p>
            <p className="truncate font-sans text-[11px] uppercase tracking-[0.22em] text-noir-300">
              {item.name}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="glass-btn-primary rounded-full px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-noir-950"
          >
            Add
          </button>
        </div>
      </div>
    </ImmersivePageLayout>
  );
}
