import { m, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  scaleIn,
  transitionSection,
  viewportReveal,
} from "../../lib/motion";

type Variant = "fadeUp" | "scaleIn" | "fadeIn";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
};

const variants = {
  fadeUp,
  scaleIn,
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitionSection },
  },
};

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  ...rest
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
      variants={variants[variant]}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
