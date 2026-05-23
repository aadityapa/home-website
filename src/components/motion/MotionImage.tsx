"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionReady } from "../../hooks/useMotionReady";

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
  const { reduceMotion } = useMotionReady();
  const showImmediate = priority || reduceMotion;

  return (
    <motion.div
      className={`relative h-full w-full overflow-hidden ${className}`}
      initial={false}
      animate={showImmediate ? { opacity: 1, scale: 1 } : undefined}
      whileInView={
        showImmediate ? undefined : { opacity: 1, scale: 1 }
      }
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="h-full w-full">
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
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-white/0 to-amber-200/10"
        initial={{ x: "-120%" }}
        whileHover={reduceMotion ? undefined : { x: "120%" }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
