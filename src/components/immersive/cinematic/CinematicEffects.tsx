import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function CinematicEffects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0006, 0.0009]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.2} darkness={0.65} />
    </EffectComposer>
  );
}
