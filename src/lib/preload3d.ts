import { useTexture } from "@react-three/drei";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { HERO_PRODUCT_IMAGES, SHOP_BANNER_IMAGES } from "./product3d";

const SCENE_IMAGES = [
  "/images/kitchen-to-table.png",
  "/images/video-poster-from-kitchen-to-table.png",
] as const;

/** Preload WebGL textures during the loading screen for snappier 3D mounts */
export function preload3DAssets(): void {
  const productImages = PRODUCT_CATEGORIES.flatMap((c) =>
    c.items.map((i) => i.image),
  );
  const all = [
    ...new Set([
      ...productImages,
      ...HERO_PRODUCT_IMAGES,
      ...SHOP_BANNER_IMAGES,
      ...SCENE_IMAGES,
    ]),
  ];

  for (const url of all) {
    try {
      useTexture.preload(url);
    } catch {
      /* ignore — preload is best-effort */
    }
  }
}
