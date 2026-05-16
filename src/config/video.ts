/**
 * Brand film: `public/videos/kitchen-to-table.mp4` → URL `/videos/kitchen-to-table.mp4`
 * Optional WebM: add `kitchen-to-table.webm` in the same folder and a `<source>` in `VideoSection`.
 */
export const BRAND_STORY_VIDEO_FILE = "kitchen-to-table.mp4";

export const BRAND_STORY_POSTER = "/images/video-poster-from-kitchen-to-table.png";

export function brandStoryVideoSrc(): string {
  return `/videos/${BRAND_STORY_VIDEO_FILE}`;
}

/** Only if `VITE_VIDEO_ALLOW_FALLBACK=true` (e.g. local dev without the MP4 yet). */
export function remoteVideoFallbackUrl(): string | null {
  return import.meta.env.VITE_VIDEO_ALLOW_FALLBACK === "true"
    ? "https://videos.pexels.com/video-files/3191892/3191892-hd_1920_1080_25fps.mp4"
    : null;
}
