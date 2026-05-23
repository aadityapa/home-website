"use client";

import { TRUST_COUNTERS, MEDIA_MENTIONS, TRUST_BADGES } from "@/data/commerce";
import { SectionHeader } from "./SectionHeader";

export function TrustAuthoritySection() {
  return (
    <section className="commerce-section border-y border-white/[0.06] bg-white/[0.02]" aria-labelledby="trust-authority">
      <SectionHeader
        id="trust-authority"
        eyebrow="Why shoppers trust us"
        title="Built for premium pantry confidence"
        subtitle="Enterprise-grade quality signals — the same trust layer used by global DTC brands."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {TRUST_COUNTERS.map((stat) => (
          <div key={stat.label} className="framer-surface rounded-xl p-4 text-center md:rounded-2xl md:p-6">
            <p className="font-display text-2xl text-amber-300 md:text-4xl">{stat.value}</p>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-noir-300 md:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
        {TRUST_BADGES.map((b) => (
          <span
            key={b.label}
            className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-noir-200 md:text-xs"
          >
            {b.icon} {b.label}
          </span>
        ))}
      </div>
      <ul className="mt-6 space-y-2 md:mt-8">
        {MEDIA_MENTIONS.map((line) => (
          <li key={line} className="font-sans text-xs text-noir-300 md:text-sm">
            ◆ {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
