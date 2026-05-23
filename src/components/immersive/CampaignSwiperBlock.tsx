"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { MotionImage } from "../motion/MotionImage";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
};

export function CampaignSwiperBlock({ products }: { products: Product[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      spaceBetween={18}
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 1.12 },
        640: { slidesPerView: 2.1 },
        1024: { slidesPerView: 3.15 },
      }}
      className="campaign-swiper pb-12"
    >
      {products.slice(0, 9).map((item, i) => (
        <SwiperSlide key={item.id}>
          <article className="group overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-black/30 p-4">
            <div className="h-56 overflow-hidden rounded-2xl md:h-64">
              <MotionImage
                src={item.image}
                alt={item.name}
                width={800}
                height={640}
                priority={i < 3}
              />
            </div>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-amber-400/80">
              {item.category}
            </p>
            <h4 className="mt-1 font-display text-2xl text-white transition group-hover:text-amber-300">
              {item.name}
            </h4>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display text-2xl text-amber-300">{item.price}</p>
              <Link
                href={`/shop/${item.id}`}
                className="rounded-full border border-white/[0.18] px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-white"
              >
                Quick buy
              </Link>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
