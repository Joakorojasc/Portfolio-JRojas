"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Film } from "lucide-react";
import { YOUTUBE } from "@/lib/media";
import FocusCarousel from "./FocusCarousel";

export default function YouTubeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const open = (i: number) => {
    const url = YOUTUBE[i]?.url;
    if (url && url !== "#") window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="youtube" className="mb-32 scroll-mt-28" ref={ref}>
      {/* Sub-header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9B5CE5]" />
          <h3 className="text-xl md:text-2xl font-bold tracking-[0.04em] text-[#F2EEF8]">
            YouTube
          </h3>
        </div>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <span className="text-xs text-[#948BA8] tracking-widest uppercase">
          Formato 16:9
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <FocusCarousel
          items={YOUTUBE}
          slotWidth={620}
          gap={32}
          initialIndex={0}
          label="video"
          aspect="16/9"
          sideScale={0.8}
          sideOpacity={0.3}
          onFocusedClick={(i) => open(i)}
          renderItem={(video, isFocused) => (
            <div
              className="relative w-full rounded-2xl overflow-hidden border transition-colors duration-300"
              style={{
                aspectRatio: "16/9",
                borderColor: isFocused
                  ? "rgba(155,92,229,0.4)"
                  : "rgba(255,255,255,0.06)",
              }}
            >
              {video.thumb ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={video.thumb}
                  alt={video.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : null}

              {/* Placeholder de fondo (queda detrás si falta la imagen) */}
              <div
                className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3"
                style={{
                  background:
                    "linear-gradient(160deg, #18121F 0%, #120D1C 60%, #0A0711 100%)",
                }}
              >
                <Film size={30} className="text-white/15" />
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/25">
                  Portada de YouTube
                </span>
              </div>

              {/* Degradado inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />

              {/* Botón play (solo el enfocado) */}
              {isFocused && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(155,92,229,0.94)" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Play size={26} fill="currentColor" className="text-white ml-1" />
                  </motion.div>
                </div>
              )}

              {/* Info inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#9B5CE5] mb-1">
                  {video.channel}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-base md:text-lg font-bold text-[#F2EEF8] leading-tight">
                    {video.title}
                  </p>
                  {video.views && video.views !== "—" && (
                    <span className="flex-shrink-0 text-xs font-semibold text-white/80">
                      {video.views} vistas
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        />

        <p className="text-center text-xs text-[#948BA8] mt-6">
          Tocá la portada del centro para abrir el video en YouTube.
        </p>
      </motion.div>
    </div>
  );
}
