import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PureVegMark } from "../brand/PureVegMark";
import { BRAND } from "../../data/brand";
import { useCart } from "../../context/CartContext";
import { useAppScroll } from "../../context/ScrollContext";
import { springSoft } from "../../lib/motion";

const links = [
  { to: "/",        label: "Home",    exact: true },
  { to: "/shop",    label: "Shop",    exact: false },
  { to: "/about",   label: "About",   exact: false },
  { to: "/journey", label: "Journey", exact: false },
  { to: "/contact", label: "Contact", exact: false },
];

export function AppHeader() {
  const { itemCount, openCart } = useCart();
  const { scroll } = useAppScroll();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const prevScroll = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scroll > 48;

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    if (reduceMotion) { setHidden(false); return; }
    const delta = scroll - prevScroll.current;
    if (scroll < 96) setHidden(false);
    else if (delta > 10) { setHidden(true); setMobileOpen(false); }
    else if (delta < -10) setHidden(false);
    prevScroll.current = scroll;
  }, [scroll, reduceMotion]);

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ease-out ${
          scrolled
            ? "border-clay-200/90 bg-clay-50/[0.97] shadow-[0_8px_28px_-12px_rgba(55,35,15,0.14)] backdrop-blur-2xl"
            : "border-clay-200/45 bg-clay-50/80 backdrop-blur-md"
        }`}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: reduceMotion ? 0 : hidden ? -80 : 0, opacity: 1 }}
        transition={springSoft}
      >
        {/* Top accent line */}
        {scrolled && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), rgba(180,83,9,0.8), rgba(245,158,11,0.6), transparent)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8 md:py-3.5 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
            <Link to="/" className="group flex min-w-0 flex-col focus:outline-none rounded-md">
              <span className="font-display text-lg tracking-[0.1em] text-ink transition duration-300 group-hover:text-saffron-600 md:text-xl">
                {BRAND.name}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[10px] font-sans font-light uppercase tracking-[0.35em] text-clay-500">{BRAND.company} · Telhara</span>
                <PureVegMark size="sm" className="scale-90" />
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.exact}
                className={({ isActive }) =>
                  `relative flex items-center rounded-lg px-3 py-2 font-sans text-sm font-medium transition duration-200 ${
                    isActive ? "text-saffron-600" : "text-clay-600 hover:text-saffron-600 hover:bg-saffron-50/60"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        className="absolute inset-x-2 bottom-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-saffron-500 to-amber-400"
                        layoutId="header-active-bar"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <motion.button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/90 bg-white/90 text-ink shadow-sm transition hover:border-saffron-400"
              onClick={openCart}
              aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
              whileHover={{ scale: 1.08, y: -1 }} whileTap={{ scale: 0.93 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h15l-1.5 9h-12L6 7zm0 0L5 3H2" />
                <circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
              </svg>
              {itemCount > 0 && (
                <motion.span
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-saffron-600 px-1 font-sans text-[10px] font-bold text-white"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                  {itemCount > 99 ? "99+" : itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Call us */}
            <motion.a
              href={`tel:+91${BRAND.phone}`}
              className="hidden rounded-full border border-saffron-500/35 bg-white/85 px-4 py-2 font-sans text-xs font-medium text-saffron-700 shadow-sm transition hover:bg-saffron-50 sm:inline-flex"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              Call us
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/80 bg-white/85 text-clay-600 md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              whileTap={{ scale: 0.93 }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <motion.div animate={mobileOpen ? "open" : "closed"} className="relative h-4 w-5">
                <motion.span className="absolute block h-[1.5px] w-5 rounded-full bg-current"
                  variants={{ closed: { top: 0, rotate: 0 }, open: { top: "50%", y: "-50%", rotate: 45 } }}
                  transition={{ duration: 0.25 }} />
                <motion.span className="absolute block h-[1.5px] rounded-full bg-current"
                  style={{ top: "50%", translateY: "-50%" }}
                  variants={{ closed: { width: "100%", opacity: 1 }, open: { width: 0, opacity: 0 } }}
                  transition={{ duration: 0.18 }} />
                <motion.span className="absolute block h-[1.5px] w-5 rounded-full bg-current"
                  variants={{ closed: { bottom: 0, rotate: 0 }, open: { bottom: "50%", y: "50%", rotate: -45 } }}
                  transition={{ duration: 0.25 }} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-x-0 top-[68px] z-40 border-b border-clay-200/80 bg-clay-50/97 px-5 py-4 shadow-xl backdrop-blur-xl md:hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04, duration: 0.25 }}>
                  <NavLink to={l.to} end={l.exact}
                    className={({ isActive }) =>
                      `flex items-center rounded-xl px-4 py-3 font-sans text-sm font-medium transition ${isActive ? "bg-saffron-50 text-saffron-600" : "text-clay-600 hover:bg-clay-100"}`
                    }
                    onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Keep backward-compat export for old imports
export { AppHeader as Header };
