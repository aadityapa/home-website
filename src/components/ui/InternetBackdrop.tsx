import { motion, useReducedMotion, type MotionValue } from "framer-motion";

const OVERLAY = {
  light:
    "absolute inset-0 bg-gradient-to-b from-clay-50/[0.94] via-clay-50/[0.88] to-clay-50/[0.96]",
  mid: "absolute inset-0 bg-gradient-to-b from-clay-50/[0.93] via-clay-100/[0.86] to-clay-100/[0.95]",
  soft: "absolute inset-0 bg-gradient-to-br from-saffron-50/88 via-amber-50/78 to-clay-50/92",
  dark: "absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/[0.84] to-ink/92",
  journeyStrip:
    "absolute inset-0 bg-gradient-to-r from-clay-100/88 via-clay-50/82 to-clay-100/88",
  /** Footer — barely visible texture */
  footer:
    "absolute inset-0 bg-gradient-to-b from-clay-100/[0.96] via-clay-100/[0.94] to-clay-100/[0.97]",
} as const;

export type BackdropVariant = keyof typeof OVERLAY;

type Props = {
  imageSrc: string;
  variant: BackdropVariant;
  parallaxY?: MotionValue<string>;
  expanded?: boolean;
  /** Very slow zoom for hero-style fallback */
  kenBurns?: boolean;
};

export function InternetBackdrop({
  imageSrc,
  variant,
  parallaxY,
  expanded = false,
  kenBurns = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const runKenBurns = kenBurns && !reduceMotion;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className={`absolute bg-cover bg-center will-change-transform ${
          expanded ? "inset-[-12%_-8%]" : "inset-0"
        }`}
        style={{
          backgroundImage: `url(${imageSrc})`,
          ...(parallaxY ? { y: parallaxY } : {}),
        }}
        animate={
          runKenBurns ? { scale: [1, 1.06, 1] } : undefined
        }
        transition={
          runKenBurns
            ? { duration: 32, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />
      <div className={OVERLAY[variant]} />
    </div>
  );
}
