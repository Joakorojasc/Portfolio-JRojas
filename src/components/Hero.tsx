"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

const stats = [
  { value: "+5", label: "Años de experiencia" },
  { value: "+200", label: "Proyectos entregados" },
  { value: "4K", label: "Producción en ultra HD" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16 lg:px-24"
    >
      {/* Background ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-blob"
          style={{
            background:
              "radial-gradient(circle, rgba(79,126,255,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-15 animate-blob"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.35) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-28 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-16 lg:gap-8 items-center">
        {/* ── Left: Text Content ── */}
        <div className="flex flex-col">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 self-start mb-8 px-4 py-2 rounded-full glass-gold"
          >
            <Sparkles size={13} className="text-[#C9A96E]" />
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-[#C9A96E]">
              Disponible para proyectos
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.0] tracking-tight"
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeUp}
              custom={0.2}
              className="block text-[#F0F2F5]"
            >
              Joaquín
            </motion.span>
            <motion.span
              variants={fadeUp}
              custom={0.32}
              className="block gradient-text-gold"
            >
              Rojas
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={fadeUp}
            custom={0.44}
            initial="hidden"
            animate="show"
            className="mt-6 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#C9A96E]/50" />
            <p className="text-sm tracking-[0.2em] uppercase font-medium text-[#8892A4]">
              Content Specialist · Editor de Video
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={0.56}
            initial="hidden"
            animate="show"
            className="mt-7 text-[#8892A4] text-lg leading-relaxed max-w-lg"
          >
            Transformo ideas en narrativas visuales de alto impacto. Especialista
            en pacing cinematográfico, color grading y motion graphics que
            generan resultados reales para marcas que aspiran a lo extraordinario.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={0.68}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.a
              href="mailto:joaquinrojas.content@gmail.com"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#C9A96E] text-[#0B0F19] text-sm font-bold tracking-[0.08em] uppercase hover:bg-[#D4B87A] transition-all duration-300 glow-gold-strong"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Hablemos de tu proyecto
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.a>
            <motion.a
              href="#portfolio"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/10 text-[#F0F2F5] text-sm font-semibold tracking-[0.06em] hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play size={14} className="fill-current" />
              Ver trabajo
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={0.8}
            initial="hidden"
            animate="show"
            className="mt-16 flex gap-10 border-t border-white/[0.06] pt-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold gradient-text-gold leading-none">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs text-[#8892A4] leading-tight max-w-[90px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Portrait Placeholder ── */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[380px] h-[380px] xl:w-[430px] xl:h-[430px] rounded-full border border-[#C9A96E]/10 animate-slow-rotate"
              style={{ borderStyle: "dashed" }}
            />
          </div>

          {/* Portrait card */}
          <div className="animate-float relative w-[300px] md:w-[340px] xl:w-[380px]">
            {/* Ambient glow behind portrait */}
            <div
              className="absolute inset-0 rounded-3xl glow-gold opacity-70"
              style={{ transform: "scale(0.9) translateY(20px)" }}
            />

            {/* Portrait frame */}
            <div className="relative rounded-3xl overflow-hidden glass-gold aspect-[3/4]">
              {/* Inner gradient background for placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #151C2C 0%, #0F1524 40%, #0B0F19 100%)",
                }}
              />

              {/* Decorative lines */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-t border-white/20"
                    style={{ top: `${(i + 1) * 14}%` }}
                  />
                ))}
              </div>

              {/* Portrait icon placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-[#C9A96E]/30 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 text-[#C9A96E]/40"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <p className="text-xs text-[#C9A96E]/40 tracking-[0.15em] uppercase">
                  Foto de perfil
                </p>
              </div>

              {/* Bottom info strip */}
              <div className="absolute bottom-0 left-0 right-0 p-5 glass border-t border-white/[0.06]">
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#C9A96E]">
                  Joaquín Rojas
                </p>
                <p className="text-[11px] text-[#8892A4] mt-0.5">
                  Content Specialist & Editor
                </p>
              </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5, ease: "backOut" }}
              className="absolute -top-4 -right-4 glass-gold rounded-2xl px-4 py-3"
            >
              <p className="text-xs font-bold text-[#C9A96E]">✦ Premium</p>
              <p className="text-[10px] text-[#8892A4]">Post-producción</p>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5, ease: "backOut" }}
              className="absolute -bottom-4 -left-4 glass-gold rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs font-medium text-[#F0F2F5]">Disponible</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#8892A4]/60">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
