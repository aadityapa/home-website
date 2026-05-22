"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type MotionImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
};

/** Lightweight 2D product/hero image with hover + scroll reveal motion. */
export function MotionImage({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  width = 800,
  height = 800,
  priority = false,
  fill = false,
  sizes,
}: MotionImageProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative h-full w-full overflow-hidden ${className}`}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
            className={imageClassName}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`h-full w-full ${imageClassName}`}
            priority={priority}
          />
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-white/0 to-amber-200/10"
        initial={{ x: "-120%" }}
        whileHover={reduce ? undefined : { x: "120%" }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
