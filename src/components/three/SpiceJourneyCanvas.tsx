import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SpiceJourneyScrollScene } from "./SpiceJourneyScene";

export default function SpiceJourneyCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [0, 0.2, 4.4], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#f8f0e4"]} />
      <fog attach="fog" args={["#f8f0e4", 4, 14]} />
      <Suspense fallback={null}>
        <SpiceJourneyScrollScene />
      </Suspense>
    </Canvas>
  );
}
