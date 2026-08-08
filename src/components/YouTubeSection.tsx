"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film } from "lucide-react";
import { YOUTUBE } from "@/lib/media";
import FocusCarousel from "./FocusCarousel";

export default function YouTubeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
          <div className="w-2 h-2 rounded-full bg-[#6D28D9]" />
          <h3 className="text-xl md:text-2xl font-bold tracking-[0.04em] text-[#141210]">
            YouTube
          </h3>
        </div>
        <div className="h-px flex-1 bg-black/[0.10]" />
        <span className="text-xs text-[#6B655C] tracking-normal">
          Portadas · 16:9
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
          label="portada"
          aspect="16/9"
          sideScale={0.8}
          sideOpacity={0.3}
          renderItem={(video, isFocused) => (
            <div
              className="relative w-full rounded-2xl overflow-hidden border transition-colors duration-300"
              style={{
                aspectRatio: "16/9",
                borderColor: isFocused
                  ? "rgba(109,40,217,0.45)"
                  : "rgba(20,18,16,0.10)",
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
                    "linear-gradient(160deg, #EAE5DC 0%, #F1EDE6 60%, #F7F4EF 100%)",
                }}
              >
                <Film size={30} className="text-black/15" />
                <span className="text-[11px] tracking-[0.03em] text-black/25">
                  Portada de YouTube
                </span>
              </div>

              {/* Degradado inferior, solo lo suficiente para que se lea el título */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Info inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[11px] font-bold tracking-[0.03em] text-[#6D28D9] mb-1">
                  {video.channel}
                </p>
                <p className="text-base md:text-lg font-bold text-white leading-tight">
                  {video.title}
                </p>
              </div>
            </div>
          )}
        />
      </motion.div>
    </div>
  );
}
