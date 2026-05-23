export const BRAND = {
  name: "Uma Laghoo Udyog",
  company: "AAProduct",
  tagline: "Authentic Taste of Tradition",
  /** Short line for badges / hero — 100% vegetarian, homemade. */
  promise: "Homemade · 100% vegetarian",
  phone: "9423431674",
  phoneDisplay: "+91 94234 31674",
  /** WhatsApp `wa.me` number without + prefix (country + national digits). */
  whatsappE164: "919423431674",
  location: "Telhara, Maharashtra, India",
  certification: "FSSAI Licensed",
} as const;

export type ProductItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Display price in INR (edit to match your labels). */
  price: string;
  /** Pack size or weight, e.g. "500 g jar". */
  unit?: string;
  /** Shopify product handle (when using Storefront API). */
  handle?: string;
  /** Shopify Storefront variant GID for checkout. */
  variantId?: string;
  /** Live availability from commerce backend. */
  availableForSale?: boolean;
  /** Live inventory when exposed by Shopify. */
  inventoryQuantity?: number | null;
};

export type ProductCategory = {
  id: string;
  title: string;
  blurb: string;
  items: readonly ProductItem[];
};

/**
 * Embedded fallback catalog (also shipped as `public/data/catalog.json` for dynamic loads).
 * Images live under `/public/images/`.
 */
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    id: "shrikhand",
    title: "Shrikhand",
    blurb:
      "Thick, hung curd finished in small batches — saffron, cardamom, and dry fruit notes in every spoon.",
    items: [
      {
        id: "kesar-ilaichi",
        name: "Kesar Ilaichi",
        description:
          "Saffron threads and green cardamom folded into silken shrikhand — celebratory and aromatic.",
        image: "/images/shrikhand-kesar-ilaichi.png",
        price: "₹ 420",
        unit: "500 g",
      },
      {
        id: "kaju-badam",
        name: "Kaju Badam",
        description:
          "Crunch of cashew and almond with a mellow sweetness — made to share at the table.",
        image: "/images/shrikhand-kaju-badam.png",
        price: "₹ 450",
        unit: "500 g",
      },
    ],
  },
  {
    id: "achaar",
    title: "Achaar",
    blurb:
      "Sun‑matured pickles with bold masala and homestyle care — the taste of Telhara in every jar.",
    items: [
      {
        id: "aam-ka-achar",
        name: "Aam ka Achar",
        description:
          "Classic raw mango pickle with a sharp, tangy heat — a monsoon memory, year round.",
        image: "/images/aam-ka-achar.png",
        price: "₹ 280",
        unit: "400 g",
      },
      {
        id: "laswe-ka-achar",
        name: "Laswe ka Achar",
        description:
          "Whole laswa (gunda) berries in a bold, slow-cured masala — regional character in every bite.",
        image: "/images/laswe-ka-achar.png",
        price: "₹ 300",
        unit: "400 g",
      },
      {
        id: "kair-ka-achar",
        name: "Kair ka Achar",
        description:
          "Whole desert kair berries in a bold masala — robust, earthy, and perfect with everyday meals.",
        image: "/images/kair-ka-achar.png",
        price: "₹ 320",
        unit: "400 g",
      },
    ],
  },
  {
    id: "chai-masala",
    title: "Chai Masala",
    blurb:
      "Whole spices roasted and stone‑ground for daily chai — cardamom, clove, ginger notes in balance. Separate from our aamchur line.",
    items: [
      {
        id: "chai-masala-blend",
        name: "Chai Masala",
        description:
          "Our signature tea blend: warming spices, measured heat — one pinch per cup for kadak or mild chai.",
        image: "/images/chai-masala.png",
        price: "₹ 220",
        unit: "100 g",
      },
    ],
  },
  {
    id: "aamchur",
    title: "Aamchur",
    blurb:
      "Dry mango powder — tangy, fruity acidity for chaat, gravies, chutneys, and marinades. Not mixed into chai masala; sold as its own pack.",
    items: [
      {
        id: "aamchur-powder",
        name: "Aamchur",
        description:
          "Sun‑dried raw mango, finely ground — adds sour brightness without vinegar. Ideal for raita, dal, and street‑style chaat.",
        image: "/images/aamchur-powder.png",
        price: "₹ 180",
        unit: "100 g",
      },
    ],
  },
] as const;
