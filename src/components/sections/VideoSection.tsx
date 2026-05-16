import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION_BACKGROUNDS } from "../../data/backgrounds";
import {
  BRAND_STORY_POSTER,
  brandStoryVideoSrc,
  remoteVideoFallbackUrl,
} from "../../config/video";
import { BRAND } from "../../data/brand";
import { InternetBackdrop } from "../ui/InternetBackdrop";
import { easeOut, transitionSection, viewportReveal } from "../../lib/motion";

export function VideoSection() {
  const reduceMotion = useReducedMotion();
  const primarySrc = brandStoryVideoSrc();
  const fallbackRemote = remoteVideoFallbackUrl();
  const [videoSrc, setVideoSrc] = useState(primarySrc);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const onVideoError = useCallback(() => {
    if (fallbackRemote && videoSrc === primarySrc) {
      setVideoSrc(fallbackRemote);
      setPhase("loading");
      return;
    }
    setPhase("error");
  }, [fallbackRemote, videoSrc, primarySrc]);

  const onCanPlay = useCallback(() => {
    setPhase("ready");
  }, []);

  const usingRemote =
    Boolean(fallbackRemote) && videoSrc === fallbackRemote;

  return (
    <section
      className="relative overflow-hidden bg-ink py-20 text-clay-50 sm:py-24 md:py-32"
      aria-labelledby="video-section-title"
    >
      <InternetBackdrop
        imageSrc={SECTION_BACKGROUNDS.videoMood}
        variant="dark"
      />
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-saffron-500/25 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-amber-500/18 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={transitionSection}
          className="max-w-2xl"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-200">
            In the making
          </p>
          <h2
            id="video-section-title"
            className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl"
          >
            From kitchen to table
          </h2>
          <p className="mt-4 font-sans text-base text-clay-200 md:text-lg">
            A quiet look at craft, color, and care — the same attention we bring
            to every batch from Telhara.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-black/30 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:mt-12 sm:rounded-[1.75rem] md:rounded-[2rem]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={{ ...transitionSection, duration: 0.82, ease: easeOut }}
        >
          <div className="relative aspect-video bg-ink">
            {phase === "error" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink p-6 text-center">
                <img
                  src={BRAND_STORY_POSTER}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
                <div className="relative z-[1] max-w-md space-y-2">
                  <p className="font-display text-xl text-white">
                    Story film unavailable
                  </p>
                  <p className="font-sans text-sm text-clay-300">
                    Place{" "}
                    <code className="rounded bg-white/10 px-1 font-mono text-xs">
                      kitchen-to-table.mp4
                    </code>{" "}
                    in{" "}
                    <code className="rounded bg-white/10 px-1 font-mono text-xs">
                      public/videos/
                    </code>
                    .
                  </p>
                </div>
              </div>
            ) : (
              <>
                <video
                  key={videoSrc}
                  className={`h-full w-full object-cover transition-opacity duration-700 ${
                    phase === "ready" ? "opacity-100" : "opacity-0"
                  }`}
                  poster={BRAND_STORY_POSTER}
                  playsInline
                  preload="auto"
                  muted
                  loop
                  autoPlay={!reduceMotion}
                  controls={reduceMotion ? true : false}
                  onError={onVideoError}
                  onCanPlay={onCanPlay}
                  aria-label={`Brand film — ${BRAND.name}, Telhara`}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>

                {phase === "loading" ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/90 backdrop-blur-[2px]"
                    aria-busy
                  >
                    <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-saffron-400" />
                    <p className="font-sans text-sm text-clay-400">
                      Loading film…
                    </p>
                  </div>
                ) : null}

                {!reduceMotion && phase === "ready" ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pb-4 pt-16 sm:pb-5">
                    <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-3 px-4 font-sans text-[11px] uppercase tracking-[0.2em] text-white/70 sm:px-6 sm:text-xs">
                      <span>{BRAND.name}</span>
                      <span className="text-saffron-200/90">Telhara · MH</span>
                    </div>
                  </div>
                ) : null}

                {reduceMotion && phase === "ready" ? (
                  <p className="sr-only">
                    Video — use on-screen controls to play (reduced motion).
                  </p>
                ) : null}
              </>
            )}
          </div>

          <div className="border-t border-white/10 bg-black/25 px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p className="font-sans text-xs text-clay-400">
                {usingRemote ? (
                  <>
                    Development sample (set{" "}
                    <code className="font-mono text-[11px] text-clay-300">
                      VITE_VIDEO_ALLOW_FALLBACK=false
                    </code>{" "}
                    and add your MP4 in production).
                  </>
                ) : (
                  <>
                    <span className="text-clay-300">Primary source · </span>
                    <code className="font-mono text-[11px] text-saffron-200/90">
                      /videos/kitchen-to-table.mp4
                    </code>
                  </>
                )}
              </p>
              <p className="font-sans text-[11px] text-clay-500">
                {BRAND.certification} · Homemade · 100% vegetarian
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
