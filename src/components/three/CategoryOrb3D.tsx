import { lazy, Suspense } from "react";
import { use3DQuality } from "../../hooks/use3DQuality";

const CategoryOrbCanvas = lazy(() =>
  import("./CategoryOrbCanvas").then((m) => ({ default: m.CategoryOrbCanvas })),
);

export function CategoryOrb3D({
  image,
  label,
}: {
  image: string;
  label: string;
}) {
  const quality = use3DQuality();

  if (quality === "off") {
    return (
      <img
        src={image}
        alt={label}
        className="h-20 w-20 rounded-2xl object-cover shadow-md"
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
      <Suspense
        fallback={
          <img
            src={image}
            alt={label}
            className="h-full w-full rounded-2xl object-cover"
            loading="lazy"
          />
        }
      >
        <CategoryOrbCanvas imageUrl={image} quality={quality} />
      </Suspense>
    </div>
  );
}
