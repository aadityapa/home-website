"use client";

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

  return (
    <div className="theme-commerce relative overflow-hidden text-noir-50">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 45% at 20% 12%, rgba(255,255,255,0.06), transparent 65%), radial-gradient(60% 38% at 88% 34%, rgba(251,191,36,0.08), transparent 70%)",
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
