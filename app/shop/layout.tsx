import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Shop all products | Uma Laghoo Udyog",
  description:
    "Shop shrikhand, achaar, chai masala and aamchur — FSSAI licensed vegetarian products from Telhara, Maharashtra.",
  path: "/shop",
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
