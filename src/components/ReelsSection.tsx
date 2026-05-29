"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, X, Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { REELS, cloudVideo } from "@/lib/media";

const CLOUD_NAME = "de0rr5r0l";
const getPoster = (publicId: string, time: number) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_${time}/${publicId}.jpg`;

export default function ReelsSection() {
  const [activeReel, setActiveReel] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setActiveReel(null);
  const prev = () => setActiveReel((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () => setActiveReel((i) => (i !== null && i < REELS.length - 1 ? i + 1 : i));
  const fullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen();
  };

  useEffect(() => {
    if (activeReel !== null && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [activeReel]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const reel = activeReel !== null ? REELS[activeReel] : null;

  return (
    <>
      <div className="mb-28">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
            <h3 className="text-lg font-semibold tracking-[0.06em] text-[#F0F2F5]">Reels Verticales</h3>
          </div>
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-xs text-[#8892A4] tracking-widest uppercase">Formato 9:16</span>
        </div>

        {/* Grid — thumbnails only */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          {REELS.map((reel, i) => (
            <motion.div
              key={reel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActiveReel(i)}
              className="group relative cursor-pointer"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Glow behind card */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{ background: reel.accent, transform: "scale(0.85) translateY(12px)" }}
              />

              <div
                className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-white/20 transition-colors duration-300"
                style={{ aspectRatio: "9/16" }}
              >
                {reel.publicId ? (
                  <img
                    src={getPoster(reel.publicId, reel.posterTime)}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0F1524]" />
                )}

                {/* Overlay — darkens more on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

                {/* Play button — scales up on hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(201,169,110,0.92)", boxShadow: `0 0 30px ${reel.accent}60` }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Play size={22} fill="currentColor" className="text-[#0B0F19] ml-1" />
                  </motion.div>
                </div>

                {/* "Ver reel" label on hover */}
                <div className="absolute inset-0 flex items-center justify-center mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
                    Ver reel
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p
                    className="text-[9px] font-semibold tracking-[0.15em] uppercase mb-1"
                    style={{ color: reel.accent }}
                  >
                    {reel.category}
                  </p>
                  <p className="text-xs font-bold text-[#F0F2F5] leading-tight">{reel.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ height: "80vh", aspectRatio: "9/16" }}
              >
                <video
                  ref={videoRef}
                  key={activeReel}
                  src={cloudVideo(reel.publicId)}
                  muted={muted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Top controls */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <p className="text-sm font-semibold text-white/90">{reel.title}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMuted((m) => !m)}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      {muted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
                    </button>
                    <button
                      onClick={fullscreen}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <Maximize size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  disabled={activeReel === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={close}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <X size={18} />
                </button>

                <button
                  onClick={next}
                  disabled={activeReel === REELS.length - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReel(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeReel ? 20 : 6,
                      height: 6,
                      background: i === activeReel ? "#C9A96E" : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
