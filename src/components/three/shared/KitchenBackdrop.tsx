import { useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function BackdropPlane({ imageUrl, opacity = 0.42 }: { imageUrl: string; opacity?: number }) {
  const map = useTexture(imageUrl);
  map.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={[0, 0.2, -5.5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[18, 10]} />
      <meshBasicMaterial map={map} transparent opacity={opacity} toneMapped={false} />
    </mesh>
  );
}

/** Kitchen-to-table photo as immersive 3D environment plate */
export function KitchenBackdrop({
  imageUrl = "/images/kitchen-to-table.png",
  opacity = 0.42,
}: {
  imageUrl?: string;
  opacity?: number;
}) {
  return (
    <Suspense fallback={null}>
      <BackdropPlane imageUrl={imageUrl} opacity={opacity} />
    </Suspense>
  );
}
