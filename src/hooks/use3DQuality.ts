export type Quality3D = "full" | "lite" | "off";

/** Site-wide 2D mode — disables WebGL scenes for faster load and stable scroll. */
export function use3DQuality(): Quality3D {
  return "off";
}
