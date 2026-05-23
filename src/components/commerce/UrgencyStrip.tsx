"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { URGENCY_BANNER } from "@/data/commerce";

function getSecondsToMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}

function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function UrgencyStrip() {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    setSecondsLeft(getSecondsToMidnight());
    const timer = window.setInterval(() => {
      setSecondsLeft(getSecondsToMidnight());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(() => formatCountdown(secondsLeft), [secondsLeft]);

  return (
    <section className="border-y border-amber-500/30 bg-amber-500/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 md:px-10 md:py-3 lg:px-14">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 md:h-2.5 md:w-2.5" aria-hidden />
          <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-amber-100 md:text-xs md:tracking-[0.2em]">
            {URGENCY_BANNER.title} · {URGENCY_BANNER.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="rounded-full border border-amber-300/40 bg-black/30 px-2.5 py-0.5 font-sans text-[10px] uppercase tracking-[0.12em] text-amber-200 md:px-3 md:py-1 md:text-xs md:tracking-[0.2em]">
            Ends in {countdown}
          </p>
          <Link href={URGENCY_BANNER.href} className="font-sans text-[10px] uppercase tracking-[0.12em] text-white hover:text-amber-200 md:text-xs md:tracking-[0.2em]">
            {URGENCY_BANNER.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
