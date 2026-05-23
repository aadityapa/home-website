"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { ProductItem } from "@/data/brand";
import { MotionImage } from "@/components/motion/MotionImage";
import "swiper/css";
import "swiper/css/pagination";

type ProductCampaignSwiperInnerProps = {
  items: ProductItem[];
};

export default function ProductCampaignSwiperInner({
  items,
}: ProductCampaignSwiperInnerProps) {
  return (
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
      {items.map((g) => (
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
  );
}
