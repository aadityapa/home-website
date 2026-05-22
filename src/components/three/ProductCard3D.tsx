"use client";

import { MotionImage } from "../motion/MotionImage";

type ProductCard3DProps = {
  image: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** 2D motion image card (legacy name kept for imports). */
export function ProductCard3D({
  image,
  alt,
  className = "",
  priority = false,
}: ProductCard3DProps) {
  return (
    <MotionImage
      src={image}
      alt={alt}
      className={className}
      priority={priority}
      imageClassName="object-cover"
    />
  );
}
