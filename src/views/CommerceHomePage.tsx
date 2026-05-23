"use client";

import { useCatalog } from "@/hooks/useCatalog";
import { getBestSellers, getTrendingProducts } from "@/lib/catalog-utils";
import { CommerceHero } from "@/components/commerce/CommerceHero";
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
    <div className="theme-commerce bg-noir-950 text-noir-50">
      <CommerceHero />
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
  );
}
