"use client";

import { HOME_FAQS } from "@/data/commerce";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";
import { SectionHeader } from "@/components/commerce/SectionHeader";

export default function FAQPage() {
  return (
    <ImmersivePageLayout className="pt-20">
      <div className="commerce-section mx-auto max-w-3xl">
        <SectionHeader
          id="faq-page"
          eyebrow="Help centre"
          title="Frequently asked questions"
          subtitle="Everything you need to know before you order."
        />
        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10">
          {HOME_FAQS.map((faq) => (
            <details key={faq.question} className="group px-6 py-5">
              <summary className="cursor-pointer list-none font-sans text-base font-medium text-white marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-amber-400 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 font-sans text-sm leading-relaxed text-noir-200">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </ImmersivePageLayout>
  );
}
