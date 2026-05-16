import type { CartLine } from "../context/CartContext";
import { BRAND } from "../data/brand";
import { formatInr } from "./price";

export function makeOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}

export function buildWhatsAppMessage(params: {
  orderId: string;
  lines: CartLine[];
  subtotalRupees: number;
  paymentLabel: string;
  name: string;
  phone: string;
  address: string;
  note?: string;
}): string {
  const lines = params.lines
    .map(
      (l) =>
        `• ${l.name} ×${l.quantity} — ${l.priceLabel} each · ${formatInr(l.priceRupees * l.quantity)}`,
    )
    .join("\n");

  const note = params.note?.trim()
    ? `\n\nNote: ${params.note.trim()}`
    : "";

  return [
    `*Order ${params.orderId}* — ${BRAND.name}`,
    `Payment: ${params.paymentLabel}`,
    "",
    "Items:",
    lines,
    "",
    `Subtotal: ${formatInr(params.subtotalRupees)}`,
    "",
    "Delivery details:",
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    `Address: ${params.address}`,
    note,
  ]
    .filter(Boolean)
    .join("\n");
}

export function whatsappUrl(e164WithoutPlus: string, text: string): string {
  const q = encodeURIComponent(text);
  return `https://wa.me/${e164WithoutPlus}?text=${q}`;
}
