/** Public site URL for SEO — set `NEXT_PUBLIC_SITE_URL` before deploy. */
export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw?.trim()) return raw.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  // Stable dev fallback (must not differ between SSR and hydration paths).
  return "http://localhost:3000";
}

export const SITE_DEFAULT_DESCRIPTION =
  "Uma Laghoo Udyog by AAProduct — homemade vegetarian shrikhand, achaar, chai masala and aamchur from Telhara, Maharashtra. FSSAI licensed. Order wholesale or retail.";

export const SITE_TITLE =
  "Uma Laghoo Udyog · AAProduct | Authentic Taste of Tradition";

/** Path under site origin for Open Graph / Twitter images */
export const OG_IMAGE_PATH = "/images/chai-masala.png";
