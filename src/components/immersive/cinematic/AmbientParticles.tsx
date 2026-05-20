import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { InstancedMesh } from "three";
import * as THREE from "three";

export function AmbientParticles({ count = 120 }: { count?: number }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr: { x: number; y: number; z: number; s: number; sp: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 8,
        s: 0.02 + Math.random() * 0.04,
        sp: 0.15 + Math.random() * 0.4,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.sp + i) * 0.2,
        p.y + Math.cos(t * p.sp * 0.8 + i) * 0.15,
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
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ffd899" transparent opacity={0.55} />
    </instancedMesh>
  );
}
