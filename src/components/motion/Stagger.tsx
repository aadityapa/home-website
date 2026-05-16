import { m, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  viewportReveal,
} from "../../lib/motion";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  slow?: boolean;
  className?: string;
};

export function Stagger({
  children,
  slow = false,
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
      variants={slow ? staggerContainerSlow : staggerContainer}
      {...rest}
    >
      {children}
    </m.div>
  );
}

type ItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className, ...rest }: ItemProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div className={className} variants={staggerItem} {...rest}>
      {children}
    </m.div>
  );
}
