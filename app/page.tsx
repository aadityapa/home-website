import type { Metadata } from "next";
import CommerceHomePage from "@/views/CommerceHomePage";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHomeMetadata();

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <CommerceHomePage />
    </>
  );
}
