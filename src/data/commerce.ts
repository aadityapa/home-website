import { BRAND } from "./brand";

export const TRUST_BADGES = [
  { label: "FSSAI Licensed", icon: "✓" },
  { label: "100% Vegetarian", icon: "🌿" },
  { label: "Homemade batches", icon: "🏠" },
  { label: "Pan-India shipping", icon: "📦" },
] as const;

export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "The Kesar Ilaichi shrikhand tastes like celebration in a bowl — rich, fresh, and perfectly balanced.",
    name: "Priya S.",
    location: "Pune",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Aam ka Achar has that authentic Telhara punch. We reorder every month for the whole family.",
    name: "Rahul M.",
    location: "Nagpur",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Chai masala is our morning ritual now. One pinch and the aroma fills the kitchen.",
    name: "Anita K.",
    location: "Mumbai",
    rating: 5,
  },
] as const;

export const HOME_FAQS = [
  {
    question: "How do I place an order?",
    answer:
      "Add products to your cart, complete checkout details, and confirm via WhatsApp. Our team confirms availability and delivery timeline.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes. We ship pan-India with careful packaging. Delivery timelines depend on your pincode and courier partner.",
  },
  {
    question: "Are all products vegetarian?",
    answer: `Yes. ${BRAND.name} is 100% vegetarian and ${BRAND.certification}.`,
  },
  {
    question: "What is the shelf life of pickles and shrikhand?",
    answer:
      "Pickles and shrikhand are best consumed within the date on the pack. Store refrigerated after opening.",
  },
  {
    question: "Can I order wholesale?",
    answer:
      `Call ${BRAND.phoneDisplay} or WhatsApp us for bulk and wholesale pricing.`,
  },
] as const;

export const BRAND_STORY = {
  headline: "Crafted in Telhara. Loved across India.",
  body: `${BRAND.name} brings homestyle vegetarian food to modern tables — slow-crafted shrikhand, bold achaar, and spice blends ground in small batches. Every jar carries the warmth of Maharashtra and the discipline of ${BRAND.certification}.`,
  cta: "Discover our story",
  href: "/about",
} as const;

export const LIFESTYLE_CAMPAIGN = {
  eyebrow: "Limited kitchen drop",
  headline: "Taste that travels from our kitchen to your table",
  body: "Editorial campaigns, seasonal drops, and pantry essentials — built for everyday indulgence and gifting.",
  cta: "Shop the drop",
  href: "/shop?campaign=seasonal",
  image: "/images/chai-masala.png",
} as const;

export const PRODUCT_STORY = {
  eyebrow: "Product craftsmanship",
  headline: "Small batches. Bold flavour. Zero shortcuts.",
  points: [
    "Ingredients sourced with care and prepared in controlled batches.",
    "Recipes rooted in Telhara tradition, refined for modern pantries.",
    "Packaged fresh with clear labelling and vegetarian certification.",
  ],
} as const;

export const BLOG_POSTS = [
  {
    slug: "how-to-choose-chai-masala",
    title: "How to Choose the Right Chai Masala",
    excerpt: "A buying guide for aroma, heat, and daily chai rituals.",
    date: "2026-03-01",
    readMinutes: 5,
  },
  {
    slug: "achar-storage-guide",
    title: "Achaar Storage Guide for Maximum Freshness",
    excerpt: "Keep your pickles vibrant with these simple pantry rules.",
    date: "2026-02-15",
    readMinutes: 4,
  },
  {
    slug: "shrikhand-serving-ideas",
    title: "5 Ways to Serve Shrikhand at Home",
    excerpt: "From festive thalis to modern dessert plates.",
    date: "2026-01-28",
    readMinutes: 6,
  },
] as const;
