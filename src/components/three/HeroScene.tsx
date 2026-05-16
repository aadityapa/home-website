import { useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { useAppScroll } from "../../context/ScrollContext";
import { FloatingImagePlane } from "./shared/FloatingImagePlane";
import { TexturedJar3D } from "./shared/TexturedJar3D";
import { HERO_PRODUCT_IMAGES } from "../../lib/product3d";
import type { Quality3D } from "../../hooks/use3DQuality";

/** Product gallery — right side only, no frames */
const heroProducts: {
  url: string;
  position: [number, number, number];
  scale: number;
}[] = [
  { url: HERO_PRODUCT_IMAGES[0], position: [0.2, 0.55, 0.15], scale: 0.52 },
  { url: HERO_PRODUCT_IMAGES[2], position: [1.35, 0.15, -0.25], scale: 0.48 },
  { url: HERO_PRODUCT_IMAGES[3], position: [0.75, -0.55, 0.35], scale: 0.46 },
];

export function HeroScene({ quality }: { quality: Quality3D }) {
  const { progress } = useAppScroll();
  const stage = useRef<Group>(null);
  const { camera } = useThree();
  const sparkleCount = quality === "full" ? 35 : 18;

  const accentOrbs = useMemo(
    () => [
      { pos: [1.8, 0.9, 0.1] as [number, number, number], color: "#e6a01a" },
      { pos: [2.4, -0.15, -0.2] as [number, number, number], color: "#c45f00" },
    ],
    [],
  );

  useFrame(() => {
    const p = progress;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.8 - p * 2.5, 0.06);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.3 + p * 0.8, 0.05);
    if (stage.current) {
      stage.current.rotation.y = THREE.MathUtils.lerp(
        stage.current.rotation.y,
        p * 0.35,
        0.04,
      );
      stage.current.position.y = THREE.MathUtils.lerp(
        stage.current.position.y,
        -p * 0.25,
        0.05,
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.58} />
      <directionalLight
        castShadow
        position={[8, 10, 6]}
        intensity={1.25}
        color="#fff4e0"
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.002}
      />
      <pointLight position={[4, 2, 4]} intensity={0.45} color="#ffb347" />

      {/* Entire showcase shifted right — left side stays clear for headline */}
      <group ref={stage} position={[2.65, -0.05, 0]} scale={0.88}>
        {heroProducts.map((p) => (
          <FloatingImagePlane
            key={p.url}
            imageUrl={p.url}
            position={p.position}
            scale={p.scale}
            speed={0.7}
            framed={false}
          />
        ))}

        <group position={[0.55, -0.72, 0.2]}>
          <TexturedJar3D
            imageUrl={HERO_PRODUCT_IMAGES[1]}
            accent="#d97706"
            scale={0.62}
          />
        </group>

        {accentOrbs.map((s) => (
          <Float key={s.pos.join()} speed={0.9} floatIntensity={0.35}>
            <mesh position={s.pos} scale={0.14}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={s.color}
                roughness={0.35}
                metalness={0.25}
                emissive={s.color}
                emissiveIntensity={0.08}
              />
            </mesh>
          </Float>
        ))}

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.9, -1.2, 0]} receiveShadow>
          <circleGeometry args={[2.8, 32]} />
          <meshStandardMaterial color="#f5e6d3" roughness={0.92} />
        </mesh>

        <ContactShadows
          position={[0.9, -1.19, 0]}
          opacity={0.32}
          scale={5.5}
          blur={2.2}
          far={3.5}
          color="#4a3020"
        />
      </group>

      <Sparkles
        count={sparkleCount}
        scale={5}
        size={1.4}
        speed={0.3}
        color="#ffd899"
        position={[3, 0.3, 0]}
        opacity={0.45}
      />
    </>
  );
}
