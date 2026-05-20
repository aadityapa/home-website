import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { useAppScroll } from "../../../context/ScrollContext";
import { useMouseParallax } from "../../../hooks/useMouseParallax";
import { AmbientParticles } from "./AmbientParticles";
import { GltfTower } from "./GltfTower";

/** Futuristic pavilion tower — Lusion-style hero centerpiece */
export function PavilionTower() {
  const group = useRef<Group>(null);

  const floors = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        w: 1.35 - i * 0.08,
        h: 0.42,
        y: i * 0.44,
        emissive: i % 2 === 0 ? "#f59e0b" : "#1a1a2e",
      })),
    [],
  );

  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={group} position={[0, -1.1, 0]}>
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.2, 32]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.6} roughness={0.35} />
      </mesh>

      {floors.map((f, i) => (
        <mesh key={i} position={[0, f.y, 0]} castShadow receiveShadow>
          <boxGeometry args={[f.w, f.h, f.w * 0.85]} />
          <meshStandardMaterial
            color="#14141f"
            metalness={0.75}
            roughness={0.22}
            emissive={f.emissive}
            emissiveIntensity={i % 2 === 0 ? 0.35 : 0.08}
          />
        </mesh>
      ))}

      <mesh position={[0, 3.6, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <MeshDistortMaterial
          color="#c45f00"
          emissive="#7a3000"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.15}
          distort={0.28}
          speed={1.5}
        />
      </mesh>

      <pointLight position={[0, 2.5, 1.2]} intensity={2} color="#ffb347" distance={8} />
      <pointLight position={[-2, 1, -1]} intensity={0.8} color="#6366f1" distance={6} />
    </group>
  );
}

export function BuildingScene({ particleCount = 100 }: { particleCount?: number }) {
  const { progress } = useAppScroll();
  const { nx, ny } = useMouseParallax();
  const rig = useRef<Group>(null);

  useFrame((state) => {
    const cam = state.camera;
    const p = progress;
    const targetZ = THREE.MathUtils.lerp(9, 5.2, p);
    const targetY = THREE.MathUtils.lerp(0.8, 2.2, p);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.05);
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, nx * 0.65, 0.06);
    cam.lookAt(0, THREE.MathUtils.lerp(0.5, 1.8, p), 0);

    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, nx * 0.18, 0.04);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, ny * 0.06, 0.04);
      const scale = THREE.MathUtils.lerp(1, 1.08, p * 0.5);
      rig.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={rig}>
      <fog attach="fog" args={["#06060c", 8, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 12, 4]}
        intensity={1.8}
        color="#fff0d8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, 4, -4]} intensity={0.5} color="#818cf8" />

      <Float speed={0.5} rotationIntensity={0.08} floatIntensity={0.15}>
        <GltfTower />
      </Float>

      <AmbientParticles count={particleCount} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#08080f" metalness={0.9} roughness={0.4} />
      </mesh>
    </group>
  );
}
