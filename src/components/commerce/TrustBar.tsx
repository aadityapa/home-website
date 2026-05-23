import { TRUST_BADGES } from "@/data/commerce";

export function TrustBar() {
  return (
    <section className="border-y border-white/8 bg-black/30 py-2.5 md:py-4" aria-label="Trust badges">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 md:gap-10 md:px-10">
        {TRUST_BADGES.map((badge) => (
          <div key={badge.label} className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.1em] text-noir-200 md:gap-2 md:text-xs md:tracking-[0.2em]">
            <span aria-hidden>{badge.icon}</span>
            {badge.label}
          </div>
        ))}
      </div>
    </section>
  );
}
