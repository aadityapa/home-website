/** Public site URL for SEO — set `VITE_SITE_URL` in `.env` / `.env.production` before deploy. */
export function getSiteOrigin(): string {
  const raw = import.meta.env.VITE_SITE_URL as string | undefined;
  if (raw?.trim()) return raw.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://www.example.com";
}

export const SITE_DEFAULT_DESCRIPTION =
  "Uma Laghoo Udyog by AAProduct — homemade vegetarian shrikhand, achaar, chai masala and aamchur from Telhara, Maharashtra. FSSAI licensed. Order wholesale or retail.";

export const SITE_TITLE =
  "Uma Laghoo Udyog · AAProduct | Authentic Taste of Tradition";

/** Path under site origin for Open Graph / Twitter images */
export const OG_IMAGE_PATH = "/images/chai-masala.png";
