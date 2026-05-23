"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/commerce/SectionHeader";

type LegalSection = { heading: string; body: string };

type LegalPageProps = {
  title: string;
  description: string;
  sections: readonly LegalSection[];
};

export default function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <div className="theme-commerce min-h-screen pt-24 text-noir-50">
      <div className="commerce-section">
        <SectionHeader id="legal-policy" eyebrow="Policies" title={title} subtitle={description} />
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <article key={section.heading} className="framer-surface rounded-2xl p-5 md:p-7">
              <h2 className="font-display text-xl text-white md:text-2xl">{section.heading}</h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-noir-200 md:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 font-sans text-sm text-noir-300">
          Questions?{" "}
          <Link href="/contact" className="text-amber-300 hover:underline">
            Contact our team
          </Link>{" "}
          or order on{" "}
          <a href="/shop" className="text-amber-300 hover:underline">
            Shop
          </a>
          .
        </p>
      </div>
    </div>
  );
}
