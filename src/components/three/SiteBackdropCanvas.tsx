import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { InstancedMesh } from "three";
import * as THREE from "three";
import { SceneCanvas } from "./shared/SceneCanvas";
import type { Quality3D } from "../../hooks/use3DQuality";

function SpiceField({ count }: { count: number }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr: { x: number; y: number; z: number; s: number; speed: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6 - 2,
        s: 0.04 + Math.random() * 0.08,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + i) * 0.15,
        p.y + Math.cos(t * p.speed * 0.7 + i) * 0.12,
        p.z,
      );
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#c45f00"
        roughness={0.4}
        metalness={0.2}
        emissive="#f59e0b"
        emissiveIntensity={0.12}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}

export function SiteBackdropCanvas({ quality }: { quality: Quality3D }) {
  const count = quality === "full" ? 48 : 24;

  return (
    <SceneCanvas
      quality="lite"
      camera={{ position: [0, 0, 6], fov: 55 }}
      background="transparent"
      className="h-full w-full"
    >
      <color attach="background" args={["#00000000"]} />
      <SpiceField count={count} />
      <Sparkles count={quality === "full" ? 30 : 12} scale={10} size={1.2} speed={0.2} color="#ffd899" opacity={0.35} />
    </SceneCanvas>
  );
}
