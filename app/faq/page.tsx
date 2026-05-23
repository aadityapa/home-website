import type { Metadata } from "next";
import FAQPage from "@/views/FAQPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ | Uma Laghoo Udyog",
  description:
    "Answers about ordering, shipping, vegetarian certification, shelf life, and wholesale for Uma Laghoo Udyog products.",
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <FAQPage />
    </>
  );
}
