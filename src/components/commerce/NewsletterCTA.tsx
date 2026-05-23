"use client";

import { useState } from "react";
import { BRAND } from "@/data/brand";
import { SectionHeader } from "./SectionHeader";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className="commerce-section" aria-labelledby="newsletter">
      <div className="framer-surface commerce-banner rounded-2xl bg-gradient-to-br from-amber-500/15 via-transparent to-violet-900/10 p-4 md:rounded-3xl md:p-14">
        <SectionHeader
          id="newsletter"
          eyebrow="Stay in the loop"
          title="New drops, recipes & offers"
          subtitle={`Join the ${BRAND.name} list for launch alerts and kitchen stories.`}
        />
        {done ? (
          <p className="mt-4 font-sans text-xs text-amber-200 md:mt-6 md:text-sm">Thank you — you&apos;re on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex max-w-md flex-col gap-2 md:mt-8 md:gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-white/15 bg-black/30 px-4 py-2.5 font-sans text-xs text-white placeholder:text-noir-400 focus:border-amber-500/50 focus:outline-none md:px-5 md:py-3 md:text-sm"
            />
            <button type="submit" className="commerce-btn-primary rounded-full px-4 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] md:px-8 md:py-3 md:text-xs md:tracking-[0.2em]">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
