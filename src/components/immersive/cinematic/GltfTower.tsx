"use client";

import { Suspense, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { PavilionTower } from "./BuildingScene";

const MODEL_URL = "/models/pavilion.glb";

function GltfModel() {
  const { scene } = useGLTF(MODEL_URL);
  const cloned = scene.clone();
  cloned.scale.setScalar(0.85);
  cloned.position.set(0, -0.5, 0);
  return <primitive object={cloned} />;
}

/** Uses `public/models/pavilion.glb` when present; procedural fallback otherwise. */
export function GltfTower() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(MODEL_URL, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Never call useGLTF until the asset exists — avoids 404 runtime overlay.
  if (!available) {
    return <PavilionTower />;
  }

  return (
    <Suspense fallback={<PavilionTower />}>
      <GltfModel />
    </Suspense>
  );
}
