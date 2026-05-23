import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useMotionReady } from "../../hooks/useMotionReady";
import { springSoft } from "../../lib/motion";

/** Thumb-reach cart access on small screens; header cart remains on all sizes. */
export function StickyCartFab() {
  const { itemCount, openCart, drawerOpen } = useCart();
  const { skipInitial, reduceMotion } = useMotionReady();

  if (drawerOpen) return null;

  return (
    <motion.button
      type="button"
      onClick={openCart}
      className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-3 z-[55] flex h-12 w-12 items-center justify-center rounded-full border border-saffron-500/30 bg-gradient-to-br from-saffron-600 to-amber-700 text-white shadow-[0_10px_30px_-10px_rgba(180,90,20,0.45)] md:hidden"
      aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
      initial={skipInitial ? false : { scale: 0.92, opacity: 0 }}
      animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      transition={springSoft}
    >
      <svg
        className="h-5 w-5 md:h-6 md:w-6"
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
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 font-sans text-[10px] font-bold tabular-nums text-saffron-800 shadow-md md:h-[22px] md:min-w-[22px] md:text-[11px]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </motion.button>
  );
}
