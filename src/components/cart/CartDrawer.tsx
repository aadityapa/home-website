import { AnimatePresence, m, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { BRAND } from "../../data/brand";
import {
  buildWhatsAppMessage,
  makeOrderId,
  whatsappUrl,
} from "../../lib/order";
import { formatInr } from "../../lib/price";
import { cartLine } from "../../lib/motion";
import { trackEvent } from "../../lib/analytics";

type Step = "cart" | "checkout" | "success";

const PAYMENT_OPTIONS = [
  {
    id: "cod" as const,
    label: "Cash on delivery",
    hint: "Pay when your order arrives.",
  },
  {
    id: "upi" as const,
    label: "UPI transfer",
    hint: "We’ll share UPI ID / QR after you confirm.",
  },
  {
    id: "online" as const,
    label: "Card / UPI (online)",
    hint: "Razorpay-ready flow — use demo checkout until keys are configured.",
  },
];

const FREE_DELIVERY_THRESHOLD = 1200;
const FAST_DISPATCH_THRESHOLD = 900;

export function CartDrawer() {
  const {
    lines,
    itemCount,
    subtotalRupees,
    drawerOpen,
    closeCart,
    setQuantity,
    removeLine,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] =
    useState<(typeof PAYMENT_OPTIONS)[number]["id"]>("cod");

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) {
      const t = window.setTimeout(() => {
        setStep("cart");
        setOrderId("");
      }, 320);
      return () => window.clearTimeout(t);
    }
  }, [drawerOpen]);

  const paymentLabel = useMemo(
    () => PAYMENT_OPTIONS.find((p) => p.id === payment)?.label ?? payment,
    [payment],
  );
  const freeDeliveryRemaining = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotalRupees,
    0,
  );
  const fastDispatchRemaining = Math.max(
    FAST_DISPATCH_THRESHOLD - subtotalRupees,
    0,
  );
  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotalRupees / FREE_DELIVERY_THRESHOLD) * 100),
  );

  const waLink = useMemo(() => {
    if (step !== "success" || !orderId || lines.length === 0) return null;
    const text = buildWhatsAppMessage({
      orderId,
      lines,
      subtotalRupees,
      paymentLabel,
      name: fullName.trim(),
      phone: phone.trim(),
      address: `${address.trim()}${pincode.trim() ? ` · ${pincode.trim()}` : ""}`,
      note,
    });
    return whatsappUrl(BRAND.whatsappE164, text);
  }, [
    step,
    orderId,
    lines,
    subtotalRupees,
    paymentLabel,
    fullName,
    phone,
    address,
    pincode,
    note,
  ]);

  const handleCheckoutClick = () => {
    if (lines.length === 0) return;
    trackEvent("checkout_started", {
      itemCount,
      subtotalRupees,
      lines: lines.length,
    });
    setStep("checkout");
  };

  const handlePlaceOrder = () => {
    if (!fullName.trim() || phone.replace(/\D/g, "").length < 10) return;
    if (!address.trim()) return;

    const id = makeOrderId();
    setOrderId(id);
    trackEvent("order_placed", {
      orderId: id,
      itemCount,
      subtotalRupees,
      payment,
    });

    if (payment === "online") {
      console.info(
        "[checkout] Online payment demo — wire Razorpay with server-created orders and VITE_RAZORPAY_KEY_ID.",
      );
    }

    setStep("success");
  };

  const handleDone = () => {
    trackEvent("cart_cleared_after_success");
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {drawerOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[60] bg-ink/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="fixed bottom-0 right-0 top-0 z-[61] flex w-full max-w-md flex-col border-l border-clay-200/80 bg-clay-50/96 shadow-2xl shadow-clay-900/15 backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <header className="flex items-start justify-between gap-3 border-b border-clay-200/70 px-4 pb-3 pt-4 md:gap-4 md:px-6 md:pb-4 md:pt-5">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-saffron-700">
                  Your basket
                </p>
                <h2 id="cart-drawer-title" className="mt-1 font-display text-xl text-ink md:text-2xl">
                  {step === "cart"
                    ? "Cart"
                    : step === "checkout"
                      ? "Checkout"
                      : "Order placed"}
                </h2>
                <p className="mt-1 font-sans text-[11px] text-clay-500 md:text-xs">
                  {itemCount > 0
                    ? `${itemCount} item${itemCount === 1 ? "" : "s"} · ${formatInr(subtotalRupees)}`
                    : "Add products from the catalogue"}
                </p>
              </div>
              <button
                type="button"
                className="focus-ring rounded-full border border-clay-200 bg-white/90 px-2.5 py-1 font-sans text-[11px] font-medium text-clay-600 transition hover:bg-white md:px-3 md:py-1.5 md:text-xs"
                onClick={closeCart}
              >
                Close
              </button>
            </header>

            <div className="border-b border-clay-200/50 bg-gradient-to-r from-white/90 via-saffron-50/35 to-amber-50/25 px-4 py-2 md:px-6 md:py-2.5">
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-clay-600">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600" aria-hidden>
                    ✓
                  </span>
                  {BRAND.certification}
                </li>
                <li className="hidden sm:list-item">Secure checkout flow</li>
                <li className="flex items-center gap-1.5">
                  <span className="text-saffron-600" aria-hidden>
                    ♦
                  </span>
                  Pure vegetarian
                </li>
              </ul>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 md:px-6 md:py-5">
              {step === "cart" ? (
                <>
                  {lines.length > 0 ? (
                    <div className="mb-3 rounded-xl border border-saffron-200/80 bg-gradient-to-r from-saffron-50/90 to-white/90 px-3 py-2.5 md:mb-4 md:rounded-2xl md:px-4 md:py-3">
                      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-clay-500">
                        Checkout motivator
                      </p>
                      <p className="mt-1 font-sans text-sm text-ink">
                        {freeDeliveryRemaining > 0
                          ? `Add ${formatInr(freeDeliveryRemaining)} more for free delivery.`
                          : "Free delivery unlocked for this cart."}
                      </p>
                      <p className="mt-1 font-sans text-xs text-clay-600">
                        {fastDispatchRemaining > 0
                          ? `Fast dispatch unlocks above ${formatInr(
                              FAST_DISPATCH_THRESHOLD,
                            )}.`
                          : "Priority dispatch unlocked."}
                      </p>
                    </div>
                  ) : null}
                  {lines.length === 0 ? (
                    <p className="font-sans text-sm text-clay-600">
                      Your cart is empty. Browse{" "}
                      <a
                        href="#products"
                        className="font-medium text-saffron-700 underline-offset-2 hover:underline"
                        onClick={closeCart}
                      >
                        Products
                      </a>{" "}
                      and tap Add to cart.
                    </p>
                  ) : (
                    <ul className="space-y-3 md:space-y-4">
                      <AnimatePresence mode="popLayout">
                        {lines.map((line) => (
                          <m.li
                            key={line.productId}
                            layout
                            variants={cartLine}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex gap-2.5 rounded-xl border border-white/70 bg-white/75 p-2.5 shadow-sm md:gap-3 md:rounded-2xl md:p-3"
                          >
                          <img
                            src={line.image}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-lg object-cover md:h-16 md:w-16 md:rounded-xl"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-base leading-tight text-ink md:text-lg">
                              {line.name}
                            </p>
                            <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-clay-500 md:text-[11px] md:tracking-wider">
                              {line.categoryLabel}
                              {line.unit ? ` · ${line.unit}` : ""}
                            </p>
                            <p className="mt-1 font-sans text-xs tabular-nums text-saffron-800 md:text-sm">
                              {line.priceLabel}{" "}
                              <span className="text-clay-500">
                                × {line.quantity}
                              </span>
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 md:mt-2 md:gap-2">
                              <div className="inline-flex items-center rounded-full border border-clay-200 bg-white/90">
                                <button
                                  type="button"
                                  className="px-2 py-0.5 font-sans text-xs text-clay-700 hover:bg-clay-50 md:px-2.5 md:py-1 md:text-sm"
                                  onClick={() =>
                                    setQuantity(
                                      line.productId,
                                      line.quantity - 1,
                                    )
                                  }
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="min-w-[1.75rem] text-center font-sans text-xs tabular-nums md:min-w-[2rem] md:text-sm">
                                  {line.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="px-2 py-0.5 font-sans text-xs text-clay-700 hover:bg-clay-50 md:px-2.5 md:py-1 md:text-sm"
                                  onClick={() =>
                                    setQuantity(
                                      line.productId,
                                      line.quantity + 1,
                                    )
                                  }
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                className="font-sans text-[11px] font-medium text-clay-500 underline-offset-2 hover:text-ink hover:underline md:text-xs"
                                onClick={() => removeLine(line.productId)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          </m.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </>
              ) : null}

              {step === "checkout" ? (
                <div className="space-y-3 md:space-y-4">
                    <div className="rounded-xl border border-saffron-200/80 bg-saffron-50/90 px-3 py-2.5 font-sans text-[11px] text-clay-700 md:rounded-2xl md:px-4 md:py-3 md:text-xs">
                    <p className="font-semibold text-ink">
                      Complete your order in under 60 seconds.
                    </p>
                    <p className="mt-1">
                      We reserve your selected items after order confirmation.
                    </p>
                  </div>
                  {payment === "online" ? (
                    <div className="rounded-xl border border-amber-200/80 bg-amber-50/90 px-3 py-2.5 font-sans text-[11px] leading-relaxed text-amber-950/90 md:rounded-2xl md:px-4 md:py-3 md:text-xs">
                      <strong className="font-semibold">Demo checkout:</strong>{" "}
                      Connect{" "}
                      <span className="font-mono text-[11px]">Razorpay</span>{" "}
                      with a backend order endpoint and set{" "}
                      <span className="font-mono text-[11px]">
                        VITE_RAZORPAY_KEY_ID
                      </span>{" "}
                      for live payments. Until then, we confirm by WhatsApp /
                      phone.
                    </div>
                  ) : null}

                  <label className="block">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-clay-500">
                      Full name
                    </span>
                    <input
                      className="focus-ring mt-1 w-full rounded-lg border border-clay-200 bg-white/95 px-3 py-2 font-sans text-sm text-ink shadow-inner shadow-white/40 md:rounded-xl md:py-2.5"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-clay-500">
                      Phone (WhatsApp preferred)
                    </span>
                    <input
                      className="focus-ring mt-1 w-full rounded-lg border border-clay-200 bg-white/95 px-3 py-2 font-sans text-sm text-ink shadow-inner shadow-white/40 md:rounded-xl md:py-2.5"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="+91 …"
                    />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-clay-500">
                      Delivery address
                    </span>
                    <textarea
                      className="focus-ring mt-1 min-h-[78px] w-full resize-y rounded-lg border border-clay-200 bg-white/95 px-3 py-2 font-sans text-sm text-ink shadow-inner shadow-white/40 md:min-h-[88px] md:rounded-xl md:py-2.5"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      autoComplete="street-address"
                    />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-clay-500">
                      PIN code
                    </span>
                    <input
                      className="focus-ring mt-1 w-full rounded-lg border border-clay-200 bg-white/95 px-3 py-2 font-sans text-sm text-ink shadow-inner shadow-white/40 md:rounded-xl md:py-2.5"
                      inputMode="numeric"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      autoComplete="postal-code"
                    />
                  </label>

                  <fieldset>
                    <legend className="font-sans text-[11px] font-semibold uppercase tracking-wide text-clay-500">
                      Payment
                    </legend>
                    <div className="mt-2 space-y-2">
                      {PAYMENT_OPTIONS.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex cursor-pointer gap-2.5 rounded-xl border px-3 py-2 font-sans text-xs transition md:gap-3 md:rounded-2xl md:py-2.5 md:text-sm ${
                            payment === opt.id
                              ? "border-saffron-400 bg-saffron-50/90 text-ink"
                              : "border-clay-200 bg-white/70 text-clay-700 hover:border-clay-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="pay"
                            className="mt-1"
                            checked={payment === opt.id}
                            onChange={() => setPayment(opt.id)}
                          />
                          <span>
                            <span className="block font-medium">{opt.label}</span>
                            <span className="mt-0.5 block text-xs text-clay-500">
                              {opt.hint}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="block">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-clay-500">
                      Note (optional)
                    </span>
                    <input
                      className="focus-ring mt-1 w-full rounded-lg border border-clay-200 bg-white/95 px-3 py-2 font-sans text-sm text-ink shadow-inner shadow-white/40 md:rounded-xl md:py-2.5"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Delivery window, batch preference…"
                    />
                  </label>
                </div>
              ) : null}

              {step === "success" ? (
                <div className="space-y-4">
                  <p className="font-sans text-sm leading-relaxed text-clay-700">
                    Thank you — reference{" "}
                    <span className="font-mono font-semibold text-ink">
                      {orderId}
                    </span>
                    . We’ll confirm availability and delivery on WhatsApp or
                    call. No payment is captured on this demo page until you
                    connect a gateway.
                  </p>
                  {waLink ? (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary w-full text-center"
                    >
                      Send order on WhatsApp
                    </a>
                  ) : null}
                  <a
                    href={`tel:+91${BRAND.phone}`}
                    className="btn-secondary block w-full text-center"
                  >
                    Or call {BRAND.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    className="focus-ring w-full rounded-full border border-transparent py-2 font-sans text-sm font-medium text-clay-600 underline-offset-2 hover:underline"
                    onClick={handleDone}
                  >
                    Clear cart &amp; continue
                  </button>
                </div>
              ) : null}
            </div>

            <footer className="border-t border-clay-200/80 bg-clay-50/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:px-6 md:py-4">
              {step === "cart" ? (
                <div className="flex flex-col gap-3">
                  {lines.length > 0 ? (
                    <div>
                      <div className="mb-1.5 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.22em] text-clay-500">
                        <span>Free delivery progress</span>
                        <span>{freeDeliveryProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-clay-200/70">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-saffron-600 transition-all duration-500"
                          style={{ width: `${freeDeliveryProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-clay-500">
                        Subtotal
                      </p>
                      <p className="font-display text-2xl tabular-nums text-ink md:text-3xl">
                        {formatInr(subtotalRupees)}
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className="focus-ring shrink-0 rounded-full border border-clay-300 bg-white/80 px-3 py-1.5 font-sans text-[11px] font-medium text-clay-700 transition hover:border-saffron-400 md:px-4 md:py-2 md:text-xs"
                      onClick={closeCart}
                    >
                      Enquire only
                    </a>
                  </div>
                  <button
                    type="button"
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={lines.length === 0}
                    onClick={handleCheckoutClick}
                  >
                    Proceed to checkout
                  </button>
                </div>
              ) : null}

              {step === "checkout" ? (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="btn-primary w-full disabled:opacity-50"
                    disabled={
                      !fullName.trim() ||
                      phone.replace(/\D/g, "").length < 10 ||
                      !address.trim()
                    }
                    onClick={handlePlaceOrder}
                  >
                    Place order
                  </button>
                  <button
                    type="button"
                    className="focus-ring rounded-full py-2 font-sans text-sm text-clay-600 hover:text-ink"
                    onClick={() => setStep("cart")}
                  >
                    Back to cart
                  </button>
                </div>
              ) : null}
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
