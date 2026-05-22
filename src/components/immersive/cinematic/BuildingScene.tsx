import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, ShaderMaterial } from "three";
import * as THREE from "three";
import { useAppScroll } from "../../../context/ScrollContext";
import { useMouseParallax } from "../../../hooks/useMouseParallax";
import { AmbientParticles } from "./AmbientParticles";

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
    <group ref={group} position={[1.2, -0.85, 0]}>
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.2, 32]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.6} roughness={0.35} />
      </mesh>

      {floors.map((f, i) => (
        <mesh key={i} position={[0, f.y, 0]} castShadow receiveShadow>
          <boxGeometry args={[f.w, f.h, f.w * 0.85]} />
          <meshStandardMaterial
            color="#1c1c28"
            metalness={0.75}
            roughness={0.22}
            emissive={f.emissive}
            emissiveIntensity={i % 2 === 0 ? 0.45 : 0.12}
          />
        </mesh>
      ))}

      <mesh position={[0, 3.6, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <MeshDistortMaterial
          color="#c45f00"
          emissive="#7a3000"
          emissiveIntensity={0.55}
          metalness={0.8}
          roughness={0.15}
          distort={0.28}
          speed={1.5}
        />
      </mesh>

      <pointLight position={[0, 2.5, 1.2]} intensity={2.4} color="#ffb347" distance={10} />
      <pointLight position={[-2, 1, -1]} intensity={1} color="#6366f1" distance={8} />
    </group>
  );
}

export function BuildingScene({ particleCount = 100 }: { particleCount?: number }) {
  const { progress } = useAppScroll();
  const { nx, ny } = useMouseParallax();
  const rig = useRef<Group>(null);
  const shaderRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGlow: { value: 0.22 },
      uColorA: { value: new THREE.Color("#1a0f08") },
      uColorB: { value: new THREE.Color("#f59e0b") },
    }),
    [],
  );

  useFrame((state) => {
    const cam = state.camera;
    const p = progress;
    const targetZ = THREE.MathUtils.lerp(8.5, 6.2, p);
    const targetY = THREE.MathUtils.lerp(1.1, 1.8, p);
    const targetX = THREE.MathUtils.lerp(0.4, 1.1, p) + nx * 0.35;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.05);
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetX, 0.06);
    cam.lookAt(1.1, THREE.MathUtils.lerp(1.2, 2, p), 0);

    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, nx * 0.12, 0.04);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, ny * 0.04, 0.04);
    }

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      shaderRef.current.uniforms.uGlow.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uGlow.value,
        0.18 + p * 0.28,
        0.08,
      );
    }
  });

  return (
    <group ref={rig}>
      <fog attach="fog" args={["#06060c", 10, 32]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight intensity={0.35} color="#fff4e0" groundColor="#0a0a12" />
      <directionalLight
        position={[6, 12, 4]}
        intensity={2.4}
        color="#fff0d8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, 4, -4]} intensity={0.7} color="#818cf8" />
      <spotLight
        position={[3.5, 5.5, 3]}
        angle={0.5}
        penumbra={0.7}
        distance={16}
        intensity={3}
        color="#fcd19b"
      />
      <spotLight
        position={[-2, 3.5, 2]}
        angle={0.45}
        penumbra={0.8}
        distance={14}
        intensity={1.6}
        color="#8b5cf6"
      />

      <Float speed={0.45} rotationIntensity={0.06} floatIntensity={0.12}>
        <PavilionTower />
      </Float>

      {/* Subtle backdrop glow — kept behind tower, low opacity */}
      <mesh position={[1.2, 1.6, -5.5]} rotation={[-0.04, 0.12, 0]}>
        <planeGeometry args={[7, 5, 1, 1]} />
        <shaderMaterial
          ref={shaderRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uTime;
            uniform float uGlow;
            void main() {
              float sweep = sin((vUv.x * 6.0) - (uTime * 0.7)) * 0.5 + 0.5;
              float vignette = smoothstep(0.95, 0.2, distance(vUv, vec2(0.5)));
              vec3 c = mix(uColorA, uColorB, sweep * 0.55);
              float alpha = vignette * uGlow * 0.22;
              gl_FragColor = vec4(c, alpha);
            }
          `}
        />
      </mesh>

      <AmbientParticles count={particleCount} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#05050a" metalness={0.85} roughness={0.5} />
      </mesh>
    </group>
  );
}
