import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function PostEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.35}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.12} darkness={0.45} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
