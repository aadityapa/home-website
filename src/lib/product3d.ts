/** Accent tint per SKU for glass / fill when texture is loading */
export const PRODUCT_ACCENT: Record<string, string> = {
  "kesar-ilaichi": "#f59e0b",
  "kaju-badam": "#d97706",
  "aam-ka-achar": "#84cc16",
  "laswe-ka-achar": "#65a30d",
  "kair-ka-achar": "#4d7c0f",
  "chai-masala-blend": "#b45309",
  "aamchur-powder": "#a3e635",
};

export function productAccent(id: string): string {
  return PRODUCT_ACCENT[id] ?? "#d97706";
}

/** Hero orbit — showcase product stills in 3D space */
export const HERO_PRODUCT_IMAGES = [
  "/images/chai-masala.png",
  "/images/shrikhand-kesar-ilaichi.png",
  "/images/aamchur-powder.png",
  "/images/aam-ka-achar.png",
] as const;

export const SHOP_BANNER_IMAGES = [
  "/images/shrikhand-kaju-badam.png",
  "/images/chai-masala.png",
  "/images/kair-ka-achar.png",
  "/images/aamchur-powder.png",
  "/images/laswe-ka-achar.png",
] as const;
