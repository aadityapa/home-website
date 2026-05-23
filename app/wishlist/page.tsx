import type { Metadata } from "next";
import WishlistPage from "@/views/WishlistPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Wishlist | Uma Laghoo Udyog",
  description: "Save your favourite shrikhand, achaar, and pantry picks for quick ordering later.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistRoute() {
  return <WishlistPage />;
}
