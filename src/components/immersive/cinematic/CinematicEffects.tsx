import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/** Lightweight post FX — avoids heavy DoF/tone-map that darkened the hero scene. */
export function CinematicEffects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.22}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.65}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0004, 0.0006]}
        radialModulation
        modulationOffset={0.35}
      />
      <Vignette eskil={false} offset={0.22} darkness={0.45} />
    </EffectComposer>
  );
}
