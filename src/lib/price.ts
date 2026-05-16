/** Parse display strings like "₹ 420" or "₹420" into rupees (integer). */
export function parseInrRupees(display: string): number {
  const digits = display.replace(/[^\d]/g, "");
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : 0;
}

export function formatInr(amount: number): string {
  return `₹ ${amount.toLocaleString("en-IN")}`;
}
