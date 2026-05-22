"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { BuildingScene } from "./BuildingScene";
import { CinematicEffects } from "./CinematicEffects";
import { use3DQuality } from "../../../hooks/use3DQuality";

export function CinematicHeroCanvas() {
  const quality = use3DQuality();

  if (quality === "off") {
    return (
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 72% 42%, rgba(196,95,0,0.18), transparent 55%), #06060c",
        }}
      />
    );
  }

  const particles = quality === "full" ? 72 : 36;
  const dpr: [number, number] = quality === "full" ? [1, 1.35] : [1, 1.05];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        className="h-full w-full"
        shadows={quality === "full"}
        camera={{ position: [0.4, 1.1, 8.5], fov: 42, near: 0.1, far: 50 }}
        dpr={dpr}
        gl={{
          antialias: quality === "full",
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#06060c"]} />
        <Suspense fallback={null}>
          <BuildingScene particleCount={particles} />
        </Suspense>
        {quality === "full" && <CinematicEffects />}
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,6,12,0.92) 0%, rgba(6,6,12,0.55) 38%, rgba(6,6,12,0.15) 62%, transparent 78%), radial-gradient(ellipse 55% 45% at 78% 42%, rgba(245,158,11,0.2), transparent 72%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 cinematic-noise-mask opacity-40" />
    </div>
  );
}
