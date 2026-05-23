"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useCatalog } from "@/hooks/useCatalog";
import { getBestSellers, getTrendingProducts } from "@/lib/catalog-utils";
import { CommerceHero } from "@/components/commerce/CommerceHero";
import { UrgencyStrip } from "@/components/commerce/UrgencyStrip";
import { TrustBar } from "@/components/commerce/TrustBar";
import { FeaturedCollections } from "@/components/commerce/FeaturedCollections";
import { ProductGridSection } from "@/components/commerce/ProductGridSection";
import { ProductStorySection, LifestyleBanner } from "@/components/commerce/StorySections";
import {
  TestimonialsSection,
  BrandStorySection,
  FAQSection,
} from "@/components/commerce/TrustSections";
import { NewsletterCTA } from "@/components/commerce/NewsletterCTA";

export default function CommerceHomePage() {
  const { categories } = useCatalog();
  const bestSellers = getBestSellers(6);
  const trending = getTrendingProducts(4);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const glowDriftTop = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 150]);
  const glowDriftBottom = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -120]);

  return (
    <div className="theme-commerce relative overflow-hidden text-noir-50">
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{ y: glowDriftTop }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(72% 44% at 18% 10%, rgba(255,244,229,0.18), transparent 64%), radial-gradient(58% 35% at 84% 28%, rgba(255,183,77,0.22), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-75"
        style={{ y: glowDriftBottom }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 40% at 78% 72%, rgba(255,137,89,0.17), transparent 72%), radial-gradient(45% 34% at 20% 82%, rgba(255,209,129,0.13), transparent 72%)",
          }}
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-35"
        aria-hidden
        style={{
          background:
            "repeating-linear-gradient(128deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 13px)",
        }}
      />
      <div className="relative z-10">
      <CommerceHero />
      <UrgencyStrip />
      <TrustBar />
      <FeaturedCollections categories={categories} />
      <ProductGridSection
        id="best-sellers"
        eyebrow="Top picks"
        title="Best sellers"
        subtitle="Customer favourites flying off the shelf this week."
        products={bestSellers}
      />
      <ProductGridSection
        id="trending"
        eyebrow="Trending now"
        title="Trending products"
        subtitle="Fresh momentum — discover what shoppers are loving right now."
        products={trending}
      />
      <ProductStorySection />
      <LifestyleBanner />
      <TestimonialsSection />
      <BrandStorySection />
      <FAQSection />
      <NewsletterCTA />
      </div>
    </div>
  );
}
