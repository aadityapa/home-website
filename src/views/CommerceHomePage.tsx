"use client";

import dynamic from "next/dynamic";
import { useCatalog } from "@/hooks/useCatalog";
import { getBestSellers, getTrendingProducts } from "@/lib/catalog-utils";
import { CommerceHero } from "@/components/commerce/CommerceHero";
import { FeaturedCollections } from "@/components/commerce/FeaturedCollections";
import { ProductGridSection } from "@/components/commerce/ProductGridSection";
import { ProductStorySection, LifestyleBanner } from "@/components/commerce/StorySections";
import {
  TestimonialsSection,
  BrandStorySection,
  FAQSection,
} from "@/components/commerce/TrustSections";
import { TrustAuthoritySection } from "@/components/commerce/TrustAuthoritySection";
import { SeoContentHub } from "@/components/commerce/SeoContentHub";
import { NewsletterCTA } from "@/components/commerce/NewsletterCTA";
import { PageReveal } from "@/components/motion/PageReveal";

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
      <PageReveal className="relative z-10">
        {/* 1. Premium Hero Campaign */}
        <CommerceHero />
        {/* 2. Featured Categories */}
        <FeaturedCollections categories={categories} />
        {/* 3. Best Sellers */}
        <ProductGridSection
          id="best-sellers"
          eyebrow="Top picks"
          title="Best sellers"
          subtitle="Customer favourites flying off the shelf this week."
          products={bestSellers}
        />
        {/* 4. Trending Products */}
        <ProductGridSection
          id="trending"
          eyebrow="Trending now"
          title="Trending products"
          subtitle="Fresh momentum — discover what shoppers are loving right now."
          products={trending}
        />
        {/* 5. Product Storytelling */}
        <ProductStorySection />
        {/* 6. Lifestyle Campaign */}
        <LifestyleBanner />
        {/* Trust authority before social proof */}
        <TrustAuthoritySection />
        {/* 7. Customer Reviews */}
        <TestimonialsSection />
        {/* 8. Brand Story */}
        <BrandStorySection />
        {/* 9. FAQ */}
        <FAQSection />
        {/* SEO internal linking hub */}
        <SeoContentHub />
        {/* 10. Newsletter CTA */}
        <NewsletterCTA />
      </PageReveal>
    </div>
  );
}
