import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
  DepthOfField,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function CinematicEffects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={1.05}
        luminanceThreshold={0.14}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.88}
      />
      <DepthOfField
        focusDistance={0.014}
        focalLength={0.024}
        bokehScale={1.8}
        height={480}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0009, 0.0013]}
        radialModulation
        modulationOffset={0.48}
      />
      <ToneMapping adaptive mode={2} />
      <Noise opacity={0.042} blendFunction={BlendFunction.SOFT_LIGHT} />
      <Vignette eskil={false} offset={0.14} darkness={0.75} />
    </EffectComposer>
  );
}
