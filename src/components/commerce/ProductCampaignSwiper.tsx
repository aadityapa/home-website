"use client";

import dynamic from "next/dynamic";
import type { ProductItem } from "@/data/brand";

const SwiperGallery = dynamic(() => import("./ProductCampaignSwiperInner"), {
  ssr: false,
  loading: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-52 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
        />
      ))}
    </div>
  ),
});

type ProductCampaignSwiperProps = {
  items: ProductItem[];
};

export function ProductCampaignSwiper({ items }: ProductCampaignSwiperProps) {
  return <SwiperGallery items={items} />;
}
