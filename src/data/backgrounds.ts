/**
 * Full-bleed section backgrounds — your product photography from `/public/images/`.
 * Swaps the old Unsplash set (including generic “plated food” stock) for on-brand, veg imagery.
 */
export const SECTION_BACKGROUNDS = {
  /** Hero + footer strip — chai masala (warm spices) */
  hero: "/images/chai-masala.png",
  /** About — shrikhand craft */
  about: "/images/shrikhand-kesar-ilaichi.png",
  /** Products — achaar / jars mood */
  products: "/images/aam-ka-achar.png",
  /** Contact — second shrikhand variant, warm & celebratory */
  contact: "/images/shrikhand-kaju-badam.png",
  /** Journey — kitchen to table (craft, spices, serve) */
  journey: "/images/kitchen-to-table.png",
  /** Video — aamchur powder (replaces non–on-brand stock food photography) */
  videoMood: "/images/aamchur-powder.png",
} as const;
