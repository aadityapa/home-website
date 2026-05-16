import { lazy, Suspense } from "react";
import { use3DQuality } from "../../hooks/use3DQuality";

const ProductCardCanvas = lazy(() =>
  import("./ProductCardCanvas").then((m) => ({ default: m.ProductCardCanvas })),
);

type ProductCard3DProps = {
  image: string;
  alt: string;
  className?: string;
};

export function ProductCard3D({ image, alt, className = "" }: ProductCard3DProps) {
  const quality = use3DQuality();

  if (quality === "off") {
    return (
      <img
        src={image}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`relative h-full w-full bg-gradient-to-br from-amber-50 to-orange-50 ${className}`}>
      <Suspense
        fallback={
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover opacity-80"
            loading="lazy"
          />
        }
      >
        <ProductCardCanvas imageUrl={image} quality={quality} />
      </Suspense>
    </div>
  );
}
