"use client";

import dynamic from "next/dynamic";
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

const CommerceHomeAmbience = dynamic(
  () =>
    import("@/components/commerce/CommerceHomeAmbience").then((m) => ({
      default: m.CommerceHomeAmbience,
    })),
  { ssr: false },
);

export default function CommerceHomePage() {
  const { categories } = useCatalog();
  const bestSellers = getBestSellers(6);
  const trending = getTrendingProducts(4);

  return (
    <div className="theme-commerce relative overflow-hidden text-noir-50">
      <CommerceHomeAmbience />
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
        <ProductStorySection />
        <LifestyleBanner />
        <ProductGridSection
          id="trending"
          eyebrow="Trending now"
          title="Trending products"
          subtitle="Fresh momentum — discover what shoppers are loving right now."
          products={trending}
        />
        <TestimonialsSection />
        <BrandStorySection />
        <FAQSection />
        <NewsletterCTA />
      </div>
    </div>
  );
}
