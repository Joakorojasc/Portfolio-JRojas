"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Eye, Heart } from "lucide-react";

const reels = [
  {
    title: "Campaña de Marca",
    category: "Brand Story",
    duration: "0:30",
    views: "84K",
    likes: "6.2K",
    gradient: "from-[#1A0A2E] to-[#0B0F19]",
    accent: "#9B5CE5",
  },
  {
    title: "Lanzamiento de Producto",
    category: "Commercial",
    duration: "0:22",
    views: "112K",
    likes: "9.8K",
    gradient: "from-[#0D1F2D] to-[#0B0F19]",
    accent: "#4F7EFF",
  },
  {
    title: "Narrativa Personal",
    category: "Storytelling",
    duration: "0:58",
    views: "53K",
    likes: "4.1K",
    gradient: "from-[#1C120A] to-[#0B0F19]",
    accent: "#C9A96E",
  },
  {
    title: "Evento en Vivo",
    category: "Event Coverage",
    duration: "1:02",
    views: "37K",
    likes: "3.3K",
    gradient: "from-[#0A1C0D] to-[#0B0F19]",
    accent: "#4ADE80",
  },
];

export default function ReelsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="mb-28">
      {/* Sub-header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />
          <h3 className="text-lg font-semibold tracking-[0.06em] text-[#F0F2F5]">
            Reels Verticales
          </h3>
        </div>
        <div className="h-px flex-1 bg-white/[0.05]" />
        <span className="text-xs text-[#8892A4] tracking-widest uppercase">
          Formato 9:16
        </span>
      </motion.div>

      {/* Reels grid */}
      <motion.div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5"
      >
        {reels.map((reel, i) => (
          <motion.div
            key={reel.title}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.65,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative"
          >
            {/* Phone frame — 9:16 ratio */}
            <div
              className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-b ${reel.gradient} border border-white/[0.06] cursor-pointer`}
              style={{ aspectRatio: "9/16" }}
            >
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black/60 z-20" />

              {/* Content area */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Top: duration badge */}
                <div className="flex justify-end mt-6">
                  <div className="px-2 py-0.5 rounded-full glass text-[10px] font-medium text-[#F0F2F5]">
                    {reel.duration}
                  </div>
                </div>

                {/* Center: decorative waveform */}
                <div className="flex items-end justify-center gap-[3px] h-16 opacity-30">
                  {[...Array(16)].map((_, j) => (
                    <div
                      key={j}
                      className="w-[3px] rounded-full"
                      style={{
                        height: `${20 + Math.sin(j * 0.9) * 30 + Math.random() * 20}%`,
                        backgroundColor: reel.accent,
                        animationName: "wave-bar",
                        animationDuration: `${0.8 + (j % 4) * 0.2}s`,
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${j * 0.06}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Bottom: info */}
                <div>
                  {/* Category */}
                  <p
                    className="text-[9px] font-semibold tracking-[0.15em] uppercase mb-1"
                    style={{ color: reel.accent }}
                  >
                    {reel.category}
                  </p>
                  <p className="text-xs font-bold text-[#F0F2F5] leading-tight mb-3">
                    {reel.title}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye size={9} className="text-[#8892A4]" />
                      <span className="text-[9px] text-[#8892A4]">
                        {reel.views}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={9} className="text-[#8892A4]" />
                      <span className="text-[9px] text-[#8892A4]">
                        {reel.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover play button overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.45)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,169,110,0.9)" }}
                >
                  <Play size={22} fill="currentColor" className="text-[#0B0F19] ml-1" />
                </div>
              </motion.div>

              {/* Hover zoom effect via scale */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: `1px solid ${reel.accent}30`,
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Card shadow on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl -z-10 transition-all"
              style={{ background: reel.accent }}
              whileHover={{ opacity: 0.08, scale: 1.02, filter: "blur(20px)" }}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 text-xs text-[#8892A4] text-center leading-relaxed"
      >
        Producción end-to-end: concepto, rodaje, edición, motion y entrega optimizada para cada plataforma.
      </motion.p>
    </div>
  );
}
