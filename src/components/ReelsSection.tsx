"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react";
import { REELS, cloudVideo, cloudPoster } from "@/lib/media";
import FocusCarousel from "./FocusCarousel";

export default function ReelsSection() {
  const [activeReel, setActiveReel] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setActiveReel(null);
  const prev = () => setActiveReel((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () =>
    setActiveReel((i) => (i !== null && i < REELS.length - 1 ? i + 1 : i));

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const fullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen();
  };

  // Al abrir/cambiar de reel, intenta reproducir
  useEffect(() => {
    if (activeReel !== null && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [activeReel]);

  // Escape para cerrar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const reel = activeReel !== null ? REELS[activeReel] : null;

  return (
    <>
      <div id="reels" className="mb-32 scroll-mt-28">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9B5CE5]" />
            <h3 className="text-xl md:text-2xl font-bold tracking-[0.04em] text-[#F2EEF8]">
              Reels Verticales
            </h3>
          </div>
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-xs text-[#948BA8] tracking-widest uppercase">
            Formato 9:16
          </span>
        </div>

        <FocusCarousel
          items={REELS}
          slotWidth={400}
          gap={36}
          initialIndex={1}
          label="reel"
          aspect="9/16"
          sideScale={0.74}
          sideOpacity={0.4}
          tilt={32}
          onFocusedClick={(i) => setActiveReel(i)}
          renderItem={(reel, isFocused) => (
            <motion.div
              className="relative"
              whileHover={isFocused ? { scale: 1.02 } : undefined}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {/* Glow detrás del bloque enfocado */}
              {isFocused && (
                <div
                  className="absolute inset-0 rounded-[1.4rem] -z-10 blur-3xl opacity-50"
                  style={{
                    background: reel.accent,
                    transform: "scale(0.85) translateY(20px)",
                  }}
                />
              )}

              <div
                className="relative w-full rounded-[1.4rem] overflow-hidden border transition-colors duration-300"
                style={{
                  aspectRatio: "9/16",
                  borderColor: isFocused
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(255,255,255,0.06)",
                  boxShadow: isFocused
                    ? "0 40px 80px -20px rgba(0,0,0,0.8)"
                    : "none",
                }}
              >
                {reel.publicId ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={cloudPoster(reel.publicId, reel.posterTime)}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#120D1C]" />
                )}

                {/* Degradado inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

                {/* Botón play (solo el enfocado) */}
                {isFocused && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center border border-white/25 bg-black/25 backdrop-blur-sm"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Play size={24} fill="currentColor" className="text-white ml-1" />
                    </motion.div>
                  </div>
                )}

                {/* Categoría */}
                <div className="absolute top-0 left-0 right-0 p-5">
                  <p
                    className="text-[10px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: reel.accent }}
                  >
                    {reel.category}
                  </p>
                </div>

                {/* Título */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-lg font-bold text-[#F2EEF8] leading-tight">
                    {reel.title}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        />
      </div>

      {/* Modal de reproducción */}
      <AnimatePresence>
        {activeReel !== null && reel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
              className="relative flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video */}
              <div
                ref={containerRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
                style={{ height: "80vh", aspectRatio: "9/16" }}
              >
                <video
                  ref={videoRef}
                  key={activeReel}
                  src={cloudVideo(reel.publicId)}
                  poster={cloudPoster(reel.publicId, reel.posterTime)}
                  muted={muted}
                  loop
                  playsInline
                  onClick={togglePlay}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Overlay play/pause central */}
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pausar" : "Reproducir"}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <span
                    className={`w-16 h-16 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                      playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    }`}
                  >
                    {playing ? (
                      <Pause size={26} fill="currentColor" className="text-white" />
                    ) : (
                      <Play size={26} fill="currentColor" className="text-white ml-1" />
                    )}
                  </span>
                </button>

                {/* Controles superiores */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                  <p className="text-sm font-semibold text-white/90">{reel.title}</p>
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={() => setMuted((m) => !m)}
                      aria-label={muted ? "Activar sonido" : "Silenciar"}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      {muted ? (
                        <VolumeX size={14} className="text-white" />
                      ) : (
                        <Volume2 size={14} className="text-white" />
                      )}
                    </button>
                    <button
                      onClick={fullscreen}
                      aria-label="Pantalla completa"
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <Maximize size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navegación */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  disabled={activeReel === 0}
                  aria-label="Reel anterior"
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
                  onClick={next}
                  disabled={activeReel === REELS.length - 1}
                  aria-label="Reel siguiente"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
