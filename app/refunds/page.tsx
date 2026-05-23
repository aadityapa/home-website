import type { Metadata } from "next";
import LegalPage from "@/views/LegalPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { LEGAL_PAGES } from "@/data/legal";

const page = LEGAL_PAGES.refunds;

export const metadata: Metadata = buildPageMetadata({
  title: `${page.title} | Uma Laghoo Udyog`,
  description: page.description,
  path: "/refunds",
});

export default function RefundsPage() {
  return (
    <LegalPage title={page.title} description={page.description} sections={page.sections} />
  );
}
