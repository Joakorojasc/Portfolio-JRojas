"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const stories = [
  {
    step: 1,
    label: "Concepto",
    title: "El brief llega",
    copy: "Todo comienza con una idea. Escucho, analizo y convierto el objetivo del cliente en una dirección creativa con propósito.",
    icon: "💡",
    accent: "#C9A96E",
    bg: "radial-gradient(ellipse at top, #1C140A 0%, #0B0F19 80%)",
  },
  {
    step: 2,
    label: "Pre-producción",
    title: "El guión visual",
    copy: "Storyboard, selección de recursos, estructura de la narrativa. El 80% del éxito de un video se decide antes de editar el primer frame.",
    icon: "📋",
    accent: "#4F7EFF",
    bg: "radial-gradient(ellipse at top, #0D1A2E 0%, #0B0F19 80%)",
  },
  {
    step: 3,
    label: "Edición",
    title: "El ritmo nace",
    copy: "Cortes en el beat, transiciones orgánicas y pacing que genera tensión emocional. Premiere Pro como extensión del pensamiento creativo.",
    icon: "✂️",
    accent: "#9B5CE5",
    bg: "radial-gradient(ellipse at top, #1A0A2E 0%, #0B0F19 80%)",
  },
  {
    step: 4,
    label: "Motion",
    title: "Todo cobra vida",
    copy: "Títulos animados, lower thirds, efectos de sonido diseñados. After Effects transforma la edición en una experiencia cinematográfica.",
    icon: "⚡",
    accent: "#4ADE80",
    bg: "radial-gradient(ellipse at top, #0A1C0D 0%, #0B0F19 80%)",
  },
  {
    step: 5,
    label: "Color",
    title: "La emoción se pinta",
    copy: "DaVinci Resolve toma el control. Cada tono comunica. El color grading define el mood, la marca y la percepción de valor del contenido.",
    icon: "🎨",
    accent: "#F87171",
    bg: "radial-gradient(ellipse at top, #1C0A0A 0%, #0B0F19 80%)",
  },
  {
    step: 6,
    label: "Entrega",
    title: "El resultado final",
    copy: "Exportación optimizada por plataforma, revisión de métricas y briefing para el siguiente ciclo. Un proceso que nunca deja de mejorar.",
    icon: "🚀",
    accent: "#FACC15",
    bg: "radial-gradient(ellipse at top, #1C1A0A 0%, #0B0F19 80%)",
  },
];

const STORY_DURATION = 4000;

export default function StoriesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const go = (dir: 1 | -1) => {
    setActive((p) => Math.max(0, Math.min(stories.length - 1, p + dir)));
    setKey((k) => k + 1);
  };

  useEffect(() => {
    if (!inView || paused) return;
    const timer = setTimeout(() => {
      if (active < stories.length - 1) {
        setActive((p) => p + 1);
        setKey((k) => k + 1);
      }
    }, STORY_DURATION);
    return () => clearTimeout(timer);
  }, [active, paused, key, inView]);

  const story = stories[active];

  return (
    <div className="mb-16" ref={ref}>
      {/* Sub-header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#F87171]" />
          <h3 className="text-lg font-semibold tracking-[0.06em] text-[#F0F2F5]">
            Proceso Creativo
          </h3>
        </div>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <div className="flex items-center gap-1.5 text-xs text-[#8892A4]">
          <Clock size={12} />
          <span className="tracking-widest uppercase">Narrativa Secuencial</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
      >
        {/* ── Main story view ── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ minHeight: 400 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Background */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{ background: story.bg }}
            />
          </AnimatePresence>

          {/* Border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700"
            style={{ boxShadow: `inset 0 0 0 1px ${story.accent}20` }}
          />

          {/* Progress bars */}
          <div className="absolute top-5 left-5 right-5 flex gap-1.5 z-20">
            {stories.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  setKey((k) => k + 1);
                }}
                className="flex-1 h-[3px] rounded-full bg-white/15 overflow-hidden"
              >
                {i < active ? (
                  <div className="h-full w-full" style={{ backgroundColor: story.accent }} />
                ) : i === active ? (
                  <motion.div
                    key={key}
                    className="h-full rounded-full"
                    style={{ backgroundColor: story.accent }}
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? undefined : "100%" }}
                    transition={{
                      duration: STORY_DURATION / 1000,
                      ease: "linear",
                    }}
                  />
                ) : null}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-8 pt-16" style={{ minHeight: 400 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col justify-center"
              >
                {/* Icon */}
                <div className="text-5xl mb-6">{story.icon}</div>

                {/* Step label */}
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ color: story.accent }}
                >
                  Paso {story.step} · {story.label}
                </p>

                {/* Title */}
                <h4 className="text-3xl md:text-4xl font-bold text-[#F0F2F5] leading-tight mb-4">
                  {story.title}
                </h4>

                {/* Copy */}
                <p className="text-[#8892A4] text-base leading-relaxed max-w-lg">
                  {story.copy}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation overlay areas */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => go(-1)}
                disabled={active === 0}
                className="flex items-center gap-2 text-sm text-[#8892A4] hover:text-[#F0F2F5] disabled:opacity-20 transition-colors duration-200"
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              <button
                onClick={() => go(1)}
                disabled={active === stories.length - 1}
                className="flex items-center gap-2 text-sm hover:text-[#F0F2F5] disabled:opacity-20 transition-colors duration-200"
                style={{ color: active === stories.length - 1 ? "#8892A4" : story.accent }}
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Hover: show pause indicator */}
          {paused && (
            <div className="absolute top-5 right-5 z-30">
              <div className="w-7 h-7 rounded-full glass flex items-center justify-center">
                <div className="flex gap-[3px]">
                  <div className="w-[3px] h-3 rounded-full bg-white/60" />
                  <div className="w-[3px] h-3 rounded-full bg-white/60" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Step list ── */}
        <div className="flex flex-col gap-2">
          {stories.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setActive(i);
                setKey((k) => k + 1);
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className={`text-left flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                i === active
                  ? "glass-gold border border-[#C9A96E]/20"
                  : "glass hover:border-white/[0.08] border border-transparent"
              }`}
            >
              {/* Step indicator */}
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < active
                    ? "bg-[#C9A96E]/20 text-[#C9A96E]"
                    : i === active
                    ? "text-[#0B0F19]"
                    : "bg-white/5 text-[#8892A4]"
                }`}
                style={i === active ? { backgroundColor: s.accent } : {}}
              >
                {i < active ? "✓" : s.step}
              </div>

              <div>
                <p
                  className={`text-xs font-bold tracking-widest uppercase mb-0.5 ${
                    i === active ? "text-[#C9A96E]" : "text-[#8892A4]"
                  }`}
                >
                  {s.label}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    i === active ? "text-[#F0F2F5]" : "text-[#8892A4]"
                  }`}
                >
                  {s.title}
                </p>
              </div>

              {/* Active progress indicator */}
              {i === active && (
                <motion.div
                  key={key}
                  className="ml-auto w-8 h-8 rounded-full relative flex-shrink-0"
                  style={{
                    background: `conic-gradient(${s.accent} 0%, transparent 0%)`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${s.accent} var(--p), transparent var(--p))`,
                    }}
                    animate={{ "--p": paused ? undefined : "100%" } as { "--p"?: string }}
                    initial={{ "--p": "0%" } as { "--p": string }}
                    transition={{ duration: STORY_DURATION / 1000, ease: "linear" }}
                  >
                    <div className="absolute inset-[3px] rounded-full bg-[#131929]" />
                  </motion.div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
