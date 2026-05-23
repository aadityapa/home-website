import { Suspense } from "react";
import type { Metadata } from "next";
import ShopPage from "@/views/ShopPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = buildPageMetadata({
  title: `Shop All Products | ${BRAND.name}`,
  description: `Browse premium shrikhand, achaar, chai masala, and pantry essentials from ${BRAND.name}. ${BRAND.certification}. Fast WhatsApp checkout.`,
  path: "/shop",
});

export default function ShopRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-noir-950 pt-32 text-center text-noir-300">
          Loading shop…
        </div>
      }
    >
      <ShopPage />
    </Suspense>
  );
}
