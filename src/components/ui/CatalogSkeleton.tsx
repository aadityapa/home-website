/** Skeleton rows while `/data/catalog.json` loads — enterprise-style shimmer. */
export function CatalogSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-20 md:gap-24" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-8">
          <div className="space-y-3">
            <div className="h-8 max-w-xs animate-pulse rounded-lg bg-clay-200/90 md:h-10" />
            <div className="h-4 max-w-2xl animate-pulse rounded bg-clay-200/60" />
            <div className="h-4 max-w-md animate-pulse rounded bg-clay-200/50" />
            <div className="h-px max-w-md bg-clay-200/40" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((__, j) => (
              <div
                key={j}
                className="overflow-hidden rounded-3xl border border-white/60 bg-white/50"
              >
                <div className="aspect-[4/3] animate-pulse bg-gradient-to-br from-clay-200/80 to-clay-100/60" />
                <div className="space-y-3 p-6">
                  <div className="h-4 animate-pulse rounded bg-clay-200/70" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-clay-200/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
