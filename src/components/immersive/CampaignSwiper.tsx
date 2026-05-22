"use client";

import dynamic from "next/dynamic";

const SwiperBlock = dynamic(
  () =>
    import("./CampaignSwiperBlock").then((m) => m.CampaignSwiperBlock),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-3xl border border-white/[0.1] bg-white/[0.04]"
          />
        ))}
      </div>
    ),
  },
);

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
};

export function CampaignSwiper({ products }: { products: Product[] }) {
  return <SwiperBlock products={products} />;
}
