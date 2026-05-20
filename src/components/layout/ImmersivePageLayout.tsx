import type { ReactNode } from "react";

/** Dark cinematic wrapper for inner pages */
export function ImmersivePageLayout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`theme-immersive relative min-h-screen bg-noir-950 text-noir-50 ${className}`}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(196,95,0,0.08), transparent), #06060c",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
