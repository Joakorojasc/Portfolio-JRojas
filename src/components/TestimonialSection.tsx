"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { TESTIMONIAL } from "@/lib/media";
import Parallax from "./Parallax";

/** Segundos → "m:ss" */
function fmt(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hover, setHover] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    // El click es el gesto del usuario: acá el audio sí puede arrancar.
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seekTo = (time: number) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.min(Math.max(time, 0), v.duration);
  };

  const seekFromPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(((e.clientX - rect.left) / rect.width) * v.duration);
  };

  const seekFromKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const keys: Record<string, number> = {
      ArrowLeft: v.currentTime - 5,
      ArrowRight: v.currentTime + 5,
      Home: 0,
      End: v.duration,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    seekTo(keys[e.key]);
  };

  const progress = duration ? (current / duration) * 100 : 0;
  // Con el video andando los controles solo aparecen al pasar el mouse.
  const controlsVisible = !playing || hover;

  return (
    <section id="testimonio" className="paper scroll-mt-28">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 pb-20" ref={ref}>
        <div className="border-t border-[#16111F]/10 pt-14">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.28em] uppercase text-[#5C5468]"
            >
              Testimonio
            </motion.span>

            {/* El video es vertical: va acotado a un ancho chico y la
                atribución lo acompaña al costado en vez de quedar debajo. */}
            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-10">
              <Parallax distance={28} className="w-full max-w-[320px] shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="relative w-full rounded-2xl overflow-hidden bg-[#0A0711]"
                style={{
                  aspectRatio: "9/16",
                  boxShadow: "0 30px 60px -28px rgba(22,17,31,0.45)",
                }}
              >
                <video
                  ref={videoRef}
                  src={TESTIMONIAL.src}
                  poster={TESTIMONIAL.poster || undefined}
                  playsInline
                  preload="metadata"
                  aria-label={`Testimonio de ${TESTIMONIAL.name} — ${TESTIMONIAL.client}`}
                  onClick={toggle}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                />

                {/* Botón central: solo mientras está pausado */}
                {!playing && (
                  <button
                    onClick={toggle}
                    aria-label="Reproducir testimonio"
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition-colors duration-300 hover:bg-black/15 group"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#9B5CE5] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <Play size={24} className="ml-1" fill="currentColor" />
                    </span>
                  </button>
                )}

                {/* Barra de controles */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-20 transition-opacity duration-300 ${
                    controlsVisible
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="bg-gradient-to-t from-black/80 to-transparent pt-10 px-3 pb-3">
                    <div
                      role="slider"
                      tabIndex={0}
                      aria-label="Progreso del video"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                      aria-valuetext={`${fmt(current)} de ${fmt(duration)}`}
                      onClick={seekFromPointer}
                      onKeyDown={seekFromKey}
                      className="h-1 rounded-full bg-white/25 cursor-pointer mb-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#9B5CE5] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                    >
                      <div
                        className="h-full rounded-full bg-[#9B5CE5]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggle}
                        aria-label={playing ? "Pausar" : "Reproducir"}
                        className="text-white/85 hover:text-white transition-colors"
                      >
                        {playing ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={toggleMute}
                        aria-label={muted ? "Activar sonido" : "Silenciar"}
                        className="text-white/85 hover:text-white transition-colors"
                      >
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                      <span className="ml-auto text-[11px] tabular-nums text-white/70">
                        {fmt(current)} / {fmt(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              </Parallax>

              {/* Cita (si algún día se transcribe) + atribución */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="max-w-[46ch] md:pb-2"
              >
                {TESTIMONIAL.quote && (
                  <blockquote className="mb-6 text-xl md:text-[26px] leading-[1.5] tracking-[-0.01em] text-[#16111F]">
                    «{TESTIMONIAL.quote}»
                  </blockquote>
                )}

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {TESTIMONIAL.name && (
                    <span className="text-lg font-semibold text-[#16111F]">
                      {TESTIMONIAL.name}
                    </span>
                  )}
                  {TESTIMONIAL.role && (
                    <span className="text-[15px] text-[#5C5468]">
                      {TESTIMONIAL.role}
                    </span>
                  )}
                </div>

                {TESTIMONIAL.client && (
                  <p className="mt-2 text-[13px] tracking-[0.18em] uppercase text-[#9B5CE5]">
                    {TESTIMONIAL.client}
                  </p>
                )}
                {TESTIMONIAL.clientNote && (
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#5C5468]">
                    {TESTIMONIAL.clientNote}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
