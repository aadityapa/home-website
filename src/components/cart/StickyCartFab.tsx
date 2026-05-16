import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { springSoft } from "../../lib/motion";

/** Thumb-reach cart access on small screens; header cart remains on all sizes. */
export function StickyCartFab() {
  const { itemCount, openCart, drawerOpen } = useCart();
  const reduce = useReducedMotion();

  if (drawerOpen) return null;

  return (
    <motion.button
      type="button"
      onClick={openCart}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[55] flex h-14 w-14 items-center justify-center rounded-full border border-saffron-500/30 bg-gradient-to-br from-saffron-600 to-amber-700 text-white shadow-[0_12px_40px_-8px_rgba(180,90,20,0.45)] md:hidden"
      aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
      initial={reduce ? false : { scale: 0.92, opacity: 0 }}
      animate={reduce ? undefined : { scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={springSoft}
    >
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7h15l-1.5 9h-12L6 7zm0 0L5 3H2"
        />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1 font-sans text-[11px] font-bold tabular-nums text-saffron-800 shadow-md">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </motion.button>
  );
}
