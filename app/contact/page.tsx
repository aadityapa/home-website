import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact ${BRAND.name} | Order & Support`,
  description: `Call ${BRAND.phoneDisplay} or WhatsApp ${BRAND.name} for orders, bulk enquiries, and delivery support in ${BRAND.location}.`,
  path: "/contact",
});

export default function ContactRoute() {
  return <ContactPage />;
}
