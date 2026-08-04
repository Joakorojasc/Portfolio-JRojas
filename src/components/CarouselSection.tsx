"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
} from "lucide-react";
import { CAROUSELS } from "@/lib/media";
import FocusCarousel from "./FocusCarousel";

export default function CarouselSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /** Post abierto en el visor, y en qué slide va. */
  const [openPost, setOpenPost] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const post = openPost !== null ? CAROUSELS[openPost] : null;
  const close = () => setOpenPost(null);

  const open = (i: number) => {
    setOpenPost(i);
    setSlide(0);
  };

  const step = (dir: 1 | -1) => {
    if (!post) return;
    setSlide((s) => Math.min(Math.max(s + dir, 0), post.slides.length - 1));
  };

  // Teclado: Escape cierra, flechas pasan slides.
  useEffect(() => {
    if (openPost === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPost, post]);

  const totalSlides = CAROUSELS.reduce((a, c) => a + c.slides.length, 0);

  return (
    <>
      <div id="carruseles" className="mb-32 scroll-mt-28" ref={ref}>
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
              {CAROUSELS.length} posts · {totalSlides} slides
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <FocusCarousel
            items={CAROUSELS}
            slotWidth={330}
            gap={28}
            initialIndex={0}
            label="carrusel"
            aspect="3/4"
            onFocusedClick={open}
            renderItem={(item, isFocused) => (
              <div className="relative">
                {/* Glow detrás del enfocado */}
                {isFocused && (
                  <div
                    className="absolute inset-0 rounded-3xl -z-10 blur-2xl opacity-50"
                    style={{
                      background: item.accent,
                      transform: "scale(0.85) translateY(16px)",
                    }}
                  />
                )}

                <div
                  className="relative w-full rounded-3xl overflow-hidden border transition-colors duration-300"
                  style={{
                    aspectRatio: "3/4",
                    borderColor: isFocused
                      ? item.accent + "55"
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.slides[0]}
                    alt={item.title || `Carrusel de ${item.comments} comentarios`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Cuántas slides tiene el post */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full text-white bg-black/40 backdrop-blur-sm">
                      <LayoutGrid size={11} />
                      {item.slides.length}
                    </span>
                  </div>

                  {/* Degradado + dato real */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[26px] font-bold leading-none tabular-nums text-[#F2EEF8]">
                      {item.comments}
                    </p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.18em] uppercase text-[#948BA8]">
                      Comentarios
                    </p>
                    {item.title && (
                      <p className="mt-2.5 text-base font-semibold text-[#F2EEF8] leading-tight">
                        {item.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          />

          <p className="text-center text-xs text-[#948BA8] mt-6">
            Tocá el carrusel del centro para ver todas sus slides.
          </p>
        </motion.div>
      </div>

      {/* Visor de slides */}
      <AnimatePresence>
        {openPost !== null && post && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Carrusel con ${post.slides.length} slides`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
              className="relative flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative rounded-2xl overflow-hidden bg-black shadow-2xl"
                style={{ height: "78vh", aspectRatio: "3/4" }}
              >
                {/* La slide actual. `key` fuerza el fundido al cambiar. */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide}
                    src={post.slides[slide]}
                    alt={`Slide ${slide + 1} de ${post.slides.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Contador */}
                <div className="absolute top-4 left-4 text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full text-white bg-black/45 backdrop-blur-sm tabular-nums">
                  {slide + 1} / {post.slides.length}
                </div>

                {/* Puntos */}
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5">
                  {post.slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Ir a la slide ${i + 1}`}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === slide ? 18 : 6,
                        height: 6,
                        background:
                          i === slide ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => step(-1)}
                  disabled={slide === 0}
                  aria-label="Slide anterior"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={close}
                  aria-label="Cerrar"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <X size={18} />
                </button>
                <button
                  onClick={() => step(1)}
                  disabled={slide === post.slides.length - 1}
                  aria-label="Slide siguiente"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs tracking-[0.02em] text-white/55 hover:text-white transition-colors"
                >
                  Ver el post original
                  <ArrowUpRight
                    size={13}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
