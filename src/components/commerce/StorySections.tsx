import Image from "next/image";
import Link from "next/link";
import { PRODUCT_STORY, LIFESTYLE_CAMPAIGN } from "@/data/commerce";
import { SectionHeader } from "./SectionHeader";

export function ProductStorySection() {
  return (
    <section className="commerce-section" aria-labelledby="product-story">
      <div className="commerce-split">
        <div>
          <SectionHeader
            id="product-story"
            eyebrow={PRODUCT_STORY.eyebrow}
            title={PRODUCT_STORY.headline}
          />
          <ul className="mt-4 space-y-2.5 md:mt-8 md:space-y-4">
            {PRODUCT_STORY.points.map((point) => (
              <li key={point} className="flex gap-2.5 font-sans text-xs leading-relaxed text-noir-100/90 md:gap-3 md:text-base">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="framer-surface relative aspect-[4/2.6] overflow-hidden rounded-xl md:aspect-[4/3] md:rounded-2xl">
          <Image
            src="/images/aam-ka-achar.png"
            alt="Handcrafted achaar"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function LifestyleBanner() {
  return (
    <section className="commerce-section" aria-label="Campaign banner">
      <div className="framer-surface commerce-banner relative overflow-hidden rounded-2xl md:rounded-3xl">
        <Image
          src={LIFESTYLE_CAMPAIGN.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-black/34 to-transparent" />
        <div className="relative z-10 flex max-w-xl flex-col gap-2.5 p-4 md:gap-4 md:p-14">
          <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-amber-300/90 md:text-[11px] md:tracking-[0.38em]">
            {LIFESTYLE_CAMPAIGN.eyebrow}
          </p>
          <h2 className="font-display text-2xl text-white md:text-5xl">{LIFESTYLE_CAMPAIGN.headline}</h2>
          <p className="font-sans text-xs leading-relaxed text-noir-100/90 md:text-base">{LIFESTYLE_CAMPAIGN.body}</p>
          <Link href={LIFESTYLE_CAMPAIGN.href} className="commerce-btn-primary mt-1 w-fit rounded-full px-4 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] md:mt-2 md:px-8 md:py-3.5 md:text-xs md:tracking-[0.2em]">
            {LIFESTYLE_CAMPAIGN.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
