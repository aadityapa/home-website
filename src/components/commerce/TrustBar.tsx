import { TRUST_BADGES } from "@/data/commerce";

export function TrustBar() {
  return (
    <section className="border-y border-white/8 bg-black/30 py-4" aria-label="Trust badges">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 md:gap-10 md:px-10">
        {TRUST_BADGES.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-noir-200">
            <span aria-hidden>{badge.icon}</span>
            {badge.label}
          </div>
        ))}
      </div>
    </section>
  );
}
