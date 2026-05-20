"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PureVegMark } from "../brand/PureVegMark";
import { BRAND } from "../../data/brand";
import { useCart } from "../../context/CartContext";
import { useAppScroll } from "../../context/ScrollContext";
import { springSoft } from "../../lib/motion";
import { FullscreenMenu } from "../immersive/FullscreenMenu";

const links = [
  { href: "/", label: "Home", exact: true },
  { href: "/shop", label: "Shop", exact: false },
  { href: "/about", label: "About", exact: false },
  { href: "/journey", label: "Journey", exact: false },
  { href: "/contact", label: "Contact", exact: false },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return href !== "/" && pathname.startsWith(href);
}

export function AppHeader() {
  const { itemCount, openCart } = useCart();
  const { scroll } = useAppScroll();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const prevScroll = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolled = scroll > 48;
  const immersive = pathname === "/" || pathname.startsWith("/shop") || pathname.startsWith("/about") || pathname.startsWith("/journey") || pathname.startsWith("/contact");

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (reduceMotion) {
      setHidden(false);
      return;
    }
    const delta = scroll - prevScroll.current;
    if (scroll < 96) setHidden(false);
    else if (delta > 10) {
      setHidden(true);
      setMenuOpen(false);
    } else if (delta < -10) setHidden(false);
    prevScroll.current = scroll;
  }, [scroll, reduceMotion]);

  const headerClass = immersive
    ? scrolled
      ? "border-white/[0.08] bg-noir-950/85 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      : "border-transparent bg-transparent backdrop-blur-sm"
    : scrolled
      ? "border-white/[0.08] bg-noir-950/90 backdrop-blur-2xl"
      : "border-white/[0.06] bg-noir-950/70 backdrop-blur-md";

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ease-out ${headerClass}`}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: reduceMotion ? 0 : hidden ? -80 : 0, opacity: 1 }}
        transition={springSoft}
      >
        {scrolled && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), rgba(180,83,9,0.8), rgba(245,158,11,0.6), transparent)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8 md:py-3.5">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
            <Link href="/" className="group flex min-w-0 flex-col rounded-md focus:outline-none">
              <span className="font-display text-lg tracking-[0.1em] text-white transition duration-300 group-hover:text-amber-400 md:text-xl">
                {BRAND.name}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[10px] font-sans font-light uppercase tracking-[0.35em] text-noir-300">
                  {BRAND.company} · Telhara
                </span>
                <PureVegMark size="sm" className="scale-90" />
              </span>
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = isActive(pathname, l.href, l.exact);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-lg px-3 py-2 font-sans text-sm font-medium transition duration-200 ${
                    active
                      ? "text-amber-400"
                      : "text-noir-200 hover:bg-white/5 hover:text-amber-300"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      className="absolute inset-x-2 bottom-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                      layoutId="header-active-bar"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-amber-500/40"
              onClick={openCart}
              aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.93 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h15l-1.5 9h-12L6 7zm0 0L5 3H2" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 font-sans text-[10px] font-bold text-noir-950">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </motion.button>

            <motion.a
              href={`tel:+91${BRAND.phone}`}
              className="hidden rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 font-sans text-xs font-medium text-amber-200 sm:inline-flex"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Call us
            </motion.a>

            <motion.button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 font-sans text-xs font-medium uppercase tracking-wider text-noir-100 lg:px-4"
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.93 }}
              aria-label="Open menu"
            >
              <span className="hidden sm:inline">Menu</span>
              <span className="flex flex-col gap-1" aria-hidden>
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export { AppHeader as Header };
