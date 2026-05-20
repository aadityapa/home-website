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
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(196,95,0,0.15), transparent), #06060c",
        }}
      />
    );
  }

  const particles = quality === "full" ? 140 : 60;
  const dpr: [number, number] = quality === "full" ? [1, 1.75] : [1, 1.25];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        className="h-full w-full"
        shadows
        camera={{ position: [0, 0.8, 9], fov: 38, near: 0.1, far: 50 }}
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
            "linear-gradient(105deg, #06060c 0%, #06060c 34%, rgba(6,6,12,0.78) 52%, transparent 80%), radial-gradient(ellipse 60% 35% at 72% 38%, rgba(245,158,11,0.16), transparent 75%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 cinematic-noise-mask" />
    </div>
  );
}
