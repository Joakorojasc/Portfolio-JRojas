"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

const slides = [
  {
    slide: "01",
    headline: "El Hook",
    body: "La primera diapositiva que detiene el scroll. Composición visual centrada, tipografía bold y el problema en una sola línea.",
    tag: "Apertura",
    bg: "from-[#1A0A2E] via-[#0F1524] to-[#0B0F19]",
    accent: "#9B5CE5",
  },
  {
    slide: "02",
    headline: "El Problema",
    body: "Amplificamos el punto de dolor. El lector se identifica. La narración crea tensión antes de ofrecer la solución.",
    tag: "Contexto",
    bg: "from-[#0D1A2E] via-[#0F1524] to-[#0B0F19]",
    accent: "#4F7EFF",
  },
  {
    slide: "03",
    headline: "La Solución",
    body: "El giro narrativo. Revelamos el camino con estructura clara y jerarquía visual que guía sin esfuerzo al siguiente frame.",
    tag: "Desarrollo",
    bg: "from-[#1C140A] via-[#0F1524] to-[#0B0F19]",
    accent: "#C9A96E",
  },
  {
    slide: "04",
    headline: "La Prueba",
    body: "Datos, resultados y testimonios. El diseño habla de autoridad. Números grandes, layout limpio, credibilidad inmediata.",
    tag: "Evidencia",
    bg: "from-[#0A1C14] via-[#0F1524] to-[#0B0F19]",
    accent: "#4ADE80",
  },
  {
    slide: "05",
    headline: "El CTA",
    body: "El cierre que convierte. Un botón, una acción, un foco. Todo el carrusel converge en este punto de decisión.",
    tag: "Conversión",
    bg: "from-[#1C0A0A] via-[#0F1524] to-[#0B0F19]",
    accent: "#F87171",
  },
  {
    slide: "06",
    headline: "El Bonus",
    body: "La diapositiva extra que sorprende. Recurso descargable, tip adicional o invitación a guardar. Retención garantizada.",
    tag: "Fidelización",
    bg: "from-[#1A1A0A] via-[#0F1524] to-[#0B0F19]",
    accent: "#FACC15",
  },
];

export default function CarouselSection() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setActiveIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const CARD_W = 260;

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
          <div className="w-2 h-2 rounded-full bg-[#9B5CE5]" />
          <h3 className="text-lg font-semibold tracking-[0.06em] text-[#F0F2F5]">
            Carruseles de Instagram
          </h3>
        </div>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <div className="flex items-center gap-1.5 text-xs text-[#8892A4]">
          <LayoutGrid size={13} />
          <span className="tracking-widest uppercase">Swipeable</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-6 md:p-8"
      >
        {/* Instagram-style top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#9B5CE5] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#131929] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#C9A96E]">JR</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F0F2F5]">joaquin.rojas</p>
              <p className="text-[10px] text-[#8892A4]">Content Specialist</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Progress dots */}
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-4 h-1.5 bg-[#C9A96E]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Drag track */}
        <div className="relative overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{
              left: -(slides.length - 1) * (CARD_W + 16),
              right: 0,
            }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              const moved = info.offset.x;
              if (moved < -60) scrollTo(activeIndex + 1);
              else if (moved > 60) scrollTo(activeIndex - 1);
            }}
            style={{ touchAction: "pan-y" }}
          >
            {slides.map((slide, i) => (
              <motion.div
                key={slide.slide}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 relative rounded-2xl overflow-hidden bg-gradient-to-b ${slide.bg} cursor-pointer`}
                whileHover={{ scale: 1.03 }}
                animate={{
                  scale: i === activeIndex ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: CARD_W,
                  aspectRatio: "1/1",
                  border: `1px solid ${i === activeIndex ? slide.accent + "40" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                {/* Slide number */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-[10px] font-bold tracking-widest"
                    style={{ color: slide.accent }}
                  >
                    {slide.slide}/{slides.length}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold tracking-[0.12em] uppercase mb-3"
                      style={{
                        backgroundColor: `${slide.accent}20`,
                        color: slide.accent,
                      }}
                    >
                      {slide.tag}
                    </span>
                    <h4 className="text-lg font-bold text-[#F0F2F5] leading-tight mb-2">
                      {slide.headline}
                    </h4>
                  </div>
                  <p className="text-xs text-[#8892A4] leading-relaxed">
                    {slide.body}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl opacity-10"
                  style={{ background: slide.accent }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs text-[#8892A4]">
            Arrastrá o usá las flechas para navegar
          </p>
          <div className="flex gap-2">
            <motion.button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#8892A4] hover:text-[#F0F2F5] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === slides.length - 1}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#8892A4] hover:text-[#F0F2F5] disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
