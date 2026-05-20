"use client";

import { Component, type ReactNode, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { PavilionTower } from "./BuildingScene";

class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function GltfModel() {
  const { scene } = useGLTF("/models/pavilion.glb");
  const cloned = scene.clone();
  cloned.scale.setScalar(0.85);
  cloned.position.set(0, -0.5, 0);
  return <primitive object={cloned} />;
}

/** Uses `public/models/pavilion.glb` when available; procedural fallback otherwise */
export function GltfTower() {
  return (
    <ModelErrorBoundary fallback={<PavilionTower />}>
      <Suspense fallback={<PavilionTower />}>
        <GltfModel />
      </Suspense>
    </ModelErrorBoundary>
  );
}
