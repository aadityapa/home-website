"use client";

/** CSS-only hero atmosphere — no WebGL. */
export function HeroBackdrop2D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#06060c]" />
      <div className="hero-glow-orb absolute -right-[8%] top-[18%] h-[min(70vh,520px)] w-[min(70vw,520px)] rounded-full bg-amber-500/20 blur-[100px]" />
      <div className="hero-glow-orb absolute bottom-[8%] left-[20%] h-48 w-48 rounded-full bg-violet-600/15 blur-[80px] [animation-delay:2s]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,6,12,0.95) 0%, rgba(6,6,12,0.6) 42%, rgba(6,6,12,0.2) 68%, transparent 82%), radial-gradient(ellipse 50% 40% at 78% 42%, rgba(245,158,11,0.18), transparent 70%)",
        }}
      />
    </div>
  );
}
