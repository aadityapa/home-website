export const LEGAL_PAGES = {
  privacy: {
    title: "Privacy Policy",
    description:
      "How Uma Laghoo Udyog collects, uses, and protects your personal information when you shop with us.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect contact details (name, phone, address) when you place an order via WhatsApp or phone, and basic analytics to improve our website experience.",
      },
      {
        heading: "How we use your data",
        body: "Order information is used only to fulfil purchases, communicate delivery updates, and provide customer support. We do not sell your personal data.",
      },
      {
        heading: "Data retention",
        body: "Order records are retained as required for accounting and customer service. You may request deletion of non-essential data by contacting us.",
      },
    ],
  },
  shipping: {
    title: "Shipping Policy",
    description:
      "Delivery timelines, packaging standards, and shipping coverage for Uma Laghoo Udyog orders across India.",
    sections: [
      {
        heading: "Delivery coverage",
        body: "We ship pan-India via trusted courier partners. Remote pin codes may require additional transit time.",
      },
      {
        heading: "Processing time",
        body: "Orders are packed within 24–48 hours on business days. You receive WhatsApp confirmation once dispatched.",
      },
      {
        heading: "Estimated timelines",
        body: "Metro cities: 3–5 business days. Other regions: 5–7 business days. Festive seasons may add 1–2 days.",
      },
    ],
  },
  refunds: {
    title: "Returns & Refunds",
    description:
      "Our quality guarantee and refund process for damaged or incorrect orders from Uma Laghoo Udyog.",
    sections: [
      {
        heading: "Quality promise",
        body: "Every batch is prepared in small quantities with FSSAI-licensed standards. If you receive a damaged or incorrect item, contact us within 48 hours of delivery.",
      },
      {
        heading: "Eligible issues",
        body: "Leaked packaging, wrong product, or quality concerns reported with photos are reviewed promptly. Perishable opened products may have limited eligibility.",
      },
      {
        heading: "Resolution",
        body: "Approved cases receive replacement or refund via UPI/bank transfer within 5–7 business days after verification.",
      },
    ],
  },
} as const;
