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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 md:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-amber-100">
            {URGENCY_BANNER.title} · {URGENCY_BANNER.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="rounded-full border border-amber-300/40 bg-black/30 px-3 py-1 font-sans text-xs uppercase tracking-[0.2em] text-amber-200">
            Ends in {countdown}
          </p>
          <Link href={URGENCY_BANNER.href} className="font-sans text-xs uppercase tracking-[0.2em] text-white hover:text-amber-200">
            {URGENCY_BANNER.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
