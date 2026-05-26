"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic } from "lucide-react";

const episodes = [
  {
    number: "EP 01",
    title: "La psicología detrás de un buen gancho",
    guest: "Edición de Entrevista",
    duration: "42:18",
    description:
      "Cómo los primeros 3 segundos determinan si tu audiencia se queda o se va. Técnicas de apertura que generan retención inmediata.",
  },
  {
    number: "EP 02",
    title: "Color grading para construir emociones",
    guest: "Masterclass Visual",
    duration: "38:55",
    description:
      "El lenguaje del color en post-producción. Cómo la paleta cromática comunica antes de que el espectador procese el contenido.",
  },
  {
    number: "EP 03",
    title: "Estrategia de contenido para marcas de lujo",
    guest: "Branding Premium",
    duration: "51:30",
    description:
      "Por qué menos es más en el contenido de alto valor. Principios de edición y cadencia que posicionan marcas en el segmento premium.",
  },
];

const WAVEFORM_BARS = 60;
const heights = Array.from({ length: WAVEFORM_BARS }, (_, i) =>
  Math.round(15 + Math.abs(Math.sin(i * 0.45) * 60) + Math.abs(Math.cos(i * 0.9) * 25))
);

export default function PodcastSection() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="mb-28" ref={ref}>
      {/* Sub-header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4F7EFF]" />
          <h3 className="text-lg font-semibold tracking-[0.06em] text-[#F0F2F5]">
            Producción Podcast
          </h3>
        </div>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <span className="text-xs text-[#8892A4] tracking-widest uppercase">
          Audio · Video
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4"
      >
        {/* ── Main player card ── */}
        <div className="glass-gold rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[380px]">
          {/* Top: Episode info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Cover art placeholder */}
              <div className="w-16 h-16 rounded-2xl mb-5 flex items-center justify-center glass-gold border border-[#C9A96E]/20">
                <Mic size={24} className="text-[#C9A96E]" />
              </div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#C9A96E] mb-1">
                {episodes[activeEpisode].number} · {episodes[activeEpisode].guest}
              </p>
              <h4 className="text-xl md:text-2xl font-bold text-[#F0F2F5] leading-snug max-w-lg">
                {episodes[activeEpisode].title}
              </h4>
              <p className="mt-3 text-sm text-[#8892A4] leading-relaxed max-w-md">
                {episodes[activeEpisode].description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-[#8892A4]">Duración</p>
              <p className="text-lg font-bold text-[#F0F2F5] font-mono">
                {episodes[activeEpisode].duration}
              </p>
            </div>
          </div>

          {/* Waveform */}
          <div className="mt-8 mb-4">
            <div className="relative flex items-end gap-[2px] h-14 cursor-pointer group">
              {heights.map((h, i) => {
                const filled = (i / WAVEFORM_BARS) * 100 <= progress;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-150"
                    style={{
                      height: `${h}%`,
                      backgroundColor: filled
                        ? "#C9A96E"
                        : "rgba(255,255,255,0.08)",
                      ...(playing && filled && {
                        animationName: "wave-bar",
                        animationDuration: `${0.6 + (i % 5) * 0.12}s`,
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.02}s`,
                      }),
                    }}
                  />
                );
              })}
              {/* Scrubber overlay */}
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Time labels */}
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-[#8892A4] font-mono">
                {Math.floor((progress / 100) * 42)}:
                {String(Math.floor(((progress / 100) * 42 * 60) % 60)).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-[#8892A4] font-mono">
                {episodes[activeEpisode].duration}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Volume2 size={16} className="text-[#8892A4]" />
              <div className="w-20 h-1 rounded-full bg-white/10">
                <div className="w-3/4 h-full rounded-full bg-[#C9A96E]/60" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-[#8892A4] hover:text-[#F0F2F5] transition-colors">
                <SkipBack size={20} />
              </button>
              <motion.button
                onClick={() => setPlaying(!playing)}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.06 }}
                className="w-12 h-12 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#0B0F19] glow-gold-strong"
              >
                <AnimatePresence mode="wait">
                  {playing ? (
                    <motion.span
                      key="pause"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Pause size={18} fill="currentColor" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="play"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button className="text-[#8892A4] hover:text-[#F0F2F5] transition-colors">
                <SkipForward size={20} />
              </button>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#8892A4] uppercase tracking-widest">
                1x
              </span>
            </div>
          </div>
        </div>

        {/* ── Episode list ── */}
        <div className="flex flex-col gap-3">
          {episodes.map((ep, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setActiveEpisode(i);
                setProgress(0);
                setPlaying(false);
              }}
              className={`text-left rounded-2xl p-5 transition-all duration-300 ${
                activeEpisode === i
                  ? "glass-gold border border-[#C9A96E]/25"
                  : "glass hover:border-white/10 border border-transparent"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <p
                  className={`text-[10px] font-bold tracking-widest uppercase ${
                    activeEpisode === i ? "text-[#C9A96E]" : "text-[#8892A4]"
                  }`}
                >
                  {ep.number}
                </p>
                <p className="text-[10px] text-[#8892A4] font-mono flex-shrink-0">
                  {ep.duration}
                </p>
              </div>
              <p
                className={`text-sm font-semibold leading-snug ${
                  activeEpisode === i ? "text-[#F0F2F5]" : "text-[#8892A4]"
                }`}
              >
                {ep.title}
              </p>
              {activeEpisode === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="w-0.5 h-3 rounded-full bg-[#C9A96E]"
                          style={{
                            animationName: playing ? "wave-bar" : "none",
                            animationDuration: `${0.5 + j * 0.15}s`,
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-[#C9A96E]">
                      {playing ? "Reproduciendo" : "Seleccionado"}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
