import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact ${BRAND.name} | Order & Support`,
  description: `Call ${BRAND.phoneDisplay} or WhatsApp ${BRAND.name} for orders, bulk enquiries, and delivery support in ${BRAND.location}.`,
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPage />
    </>
  );
}
