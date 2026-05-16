/** Shared easing / timing for one cohesive feel across Framer + UI */
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 320,
  damping: 36,
  mass: 0.85,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.75,
};

export const viewportReveal = {
  once: true as const,
  amount: 0.22,
  margin: "0px 0px -10% 0px",
};

export const viewportRevealTight = {
  once: true as const,
  amount: 0.35,
  margin: "0px 0px -6% 0px",
};

export const transitionHero = {
  duration: 1,
  ease: easeOut,
};

export const transitionSection = {
  duration: 0.75,
  ease: easeOut,
};

export const transitionFast = {
  duration: 0.45,
  ease: easeOut,
};

/** Scroll-reveal: fade + rise */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSection,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionSection,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.78, ease: easeOut },
  },
};

/** Parent for staggered children (nav, form fields, product grid) */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOut },
  },
};

export const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.15,
    },
  },
};

export const heroItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

/** Cart line enter/exit */
export const cartLine = {
  hidden: { opacity: 0, x: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: springSoft,
  },
  exit: {
    opacity: 0,
    x: -12,
    scale: 0.98,
    transition: transitionFast,
  },
};
