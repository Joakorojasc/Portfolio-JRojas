"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, ImageIcon } from "lucide-react";
import { CAROUSEL_SLIDES, cloudImage } from "@/lib/media";
import FocusCarousel from "./FocusCarousel";

export default function CarouselSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="mb-32" ref={ref}>
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
            Carruseles
          </h3>
        </div>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <div className="flex items-center gap-1.5 text-xs text-[#948BA8]">
          <LayoutGrid size={13} />
          <span className="tracking-widest uppercase">
            {CAROUSEL_SLIDES.length} slides
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <FocusCarousel
          items={CAROUSEL_SLIDES}
          slotWidth={330}
          gap={28}
          initialIndex={0}
          label="slide"
          aspect="3/4"
          renderItem={(slide, isFocused) => (
            <div className="relative">
              {/* Glow detrás del slide enfocado */}
              {isFocused && (
                <div
                  className="absolute inset-0 rounded-3xl -z-10 blur-2xl opacity-50"
                  style={{
                    background: slide.accent,
                    transform: "scale(0.85) translateY(16px)",
                  }}
                />
              )}

              <div
                className="relative w-full rounded-3xl overflow-hidden border transition-colors duration-300"
                style={{
                  aspectRatio: "3/4",
                  borderColor: isFocused
                    ? slide.accent + "55"
                    : "rgba(255,255,255,0.06)",
                }}
              >
                {slide.publicId || slide.localSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={
                      slide.publicId
                        ? cloudImage(slide.publicId, "f_auto,q_auto,w_800,ar_3:4,c_fill")
                        : slide.localSrc
                    }
                    alt={slide.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder mientras no haya foto cargada */
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{
                      background:
                        "linear-gradient(160deg, #18121F 0%, #120D1C 50%, #0A0711 100%)",
                    }}
                  >
                    <ImageIcon size={28} className="text-white/15" />
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/25">
                      {slide.caption}
                    </span>
                  </div>
                )}

                {/* Número de slide */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-bold tracking-widest px-2 py-1 rounded-full"
                    style={{
                      color: slide.accent,
                      background: "rgba(0,0,0,0.35)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {slide.index} / {String(CAROUSEL_SLIDES.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          )}
        />

        <p className="text-center text-xs text-[#948BA8] mt-6">
          Tocá una slide o usá las flechas — la del centro queda en foco, las de los
          costados se atenúan.
        </p>
      </motion.div>
    </div>
  );
}
