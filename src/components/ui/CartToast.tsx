import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { formatInr } from "../../lib/price";

const FREE_DELIVERY_THRESHOLD = 1200;

export function CartToast() {
  const { cartToast, dismissCartToast, subtotalRupees } = useCart();
  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotalRupees, 0);

  return (
    <AnimatePresence>
      {cartToast ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="fixed bottom-[5.5rem] left-1/2 z-[58] w-[min(100%-2rem,22rem)] -translate-x-1/2 sm:bottom-8 md:bottom-6"
        >
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-saffron-200/50 bg-white/95 px-4 py-3 shadow-xl shadow-clay-900/15 backdrop-blur-md">
            <div>
              <p className="font-sans text-sm font-medium text-ink">{cartToast}</p>
              {remaining > 0 ? (
                <p className="mt-0.5 font-sans text-[11px] text-clay-600">
                  Add {formatInr(remaining)} more for free delivery.
                </p>
              ) : (
                <p className="mt-0.5 font-sans text-[11px] text-emerald-700">
                  Free delivery unlocked.
                </p>
              )}
            </div>
            <button
              type="button"
              className="focus-ring shrink-0 rounded-lg px-2 py-1 font-sans text-xs font-semibold text-saffron-700 hover:bg-saffron-50"
              onClick={dismissCartToast}
            >
              OK
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
