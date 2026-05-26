"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];
import {
  Film,
  Layers,
  Palette,
  PenTool,
  Code2,
  Zap,
  Camera,
  TrendingUp,
} from "lucide-react";

const skills = [
  {
    icon: Film,
    name: "Adobe Premiere Pro",
    role: "Montaje & Narrativa",
    description:
      "Edición multicámara, corrección de audio y ensamblaje de secuencias que generan impacto emocional desde el primer frame.",
    color: "#9999FF",
    glow: "rgba(153,153,255,0.15)",
  },
  {
    icon: Zap,
    name: "After Effects",
    role: "Motion Graphics & VFX",
    description:
      "Animaciones fluidas, efectos visuales complejos y títulos cinéticos que elevan cualquier producción al siguiente nivel.",
    color: "#6699FF",
    glow: "rgba(102,153,255,0.15)",
  },
  {
    icon: Palette,
    name: "DaVinci Resolve",
    role: "Color Grading",
    description:
      "Tratamiento de color de nivel cinematográfico. Cada pieza tiene una identidad visual coherente y emocionalmente precisa.",
    color: "#FFB347",
    glow: "rgba(255,179,71,0.15)",
  },
  {
    icon: Layers,
    name: "Adobe Photoshop",
    role: "Composición & Retoque",
    description:
      "Thumbnails de alto CTR, composiciones de imagen y assets visuales diseñados para maximizar la atención en feed.",
    color: "#31AFFF",
    glow: "rgba(49,175,255,0.15)",
  },
  {
    icon: PenTool,
    name: "Canva Pro",
    role: "Diseño Rápido & Branding",
    description:
      "Templates personalizados, identidad de marca consistente y piezas para social media con turnaround ágil sin sacrificar calidad.",
    color: "#00C4CC",
    glow: "rgba(0,196,204,0.15)",
  },
  {
    icon: Camera,
    name: "Dirección Audiovisual",
    role: "Planificación & Concepto",
    description:
      "Storyboarding, dirección de rodaje y supervisión creativa. La visión artística que conecta el brief con el resultado final.",
    color: "#C9A96E",
    glow: "rgba(201,169,110,0.15)",
  },
  {
    icon: TrendingUp,
    name: "Estrategia de Contenido",
    role: "Growth & Métricas",
    description:
      "Calendarios editoriales, análisis de audiencia y narrativas que convierten seguidores en clientes con consistencia.",
    color: "#4ADE80",
    glow: "rgba(74,222,128,0.15)",
  },
  {
    icon: Code2,
    name: "Desarrollo Full Stack",
    role: "Tecnología & Automatización",
    description:
      "Integración digital, landing pages de alto rendimiento y automatizaciones que hacen que el contenido trabaje las 24 horas.",
    color: "#4F7EFF",
    glow: "rgba(79,126,255,0.15)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: BEZIER },
  },
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="habilidades"
      className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,169,110,0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: BEZIER }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-4 font-medium">
            Arsenal Creativo
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#F0F2F5]">
              Herramientas que{" "}
              <br className="hidden md:block" />
              <span className="gradient-text-gold">dominan la industria</span>
            </h2>
            <p className="text-[#8892A4] text-base leading-relaxed max-w-sm md:text-right">
              No uso software. Lo domino. Cada herramienta en mi flujo de trabajo
              está elegida con precisión para entregar resultados de nivel international.
            </p>
          </div>
          <div className="divider-gold mt-10 max-w-xs" />
        </motion.div>

        {/* Skills grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                className="group relative glass rounded-2xl p-6 cursor-default transition-all duration-400 skill-card-glow"
                style={{ "--glow-color": skill.glow } as React.CSSProperties}
                whileHover={{
                  y: -6,
                  backgroundColor: "rgba(26, 34, 53, 0.85)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: skill.glow }}
                  whileHover={{ rotate: [0, -6, 6, -3, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={20} style={{ color: skill.color }} />
                </motion.div>

                {/* Content */}
                <p
                  className="text-xs font-semibold tracking-[0.1em] uppercase mb-1"
                  style={{ color: skill.color }}
                >
                  {skill.role}
                </p>
                <h3 className="text-sm font-bold text-[#F0F2F5] mb-3 leading-snug">
                  {skill.name}
                </h3>
                <p className="text-xs text-[#8892A4] leading-relaxed">
                  {skill.description}
                </p>

                {/* Hover accent border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${skill.glow.replace("0.15", "0.4")}`,
                  }}
                />

                {/* Micro dot */}
                <div
                  className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: skill.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 overflow-hidden"
        >
          <div className="divider-gold mb-8" />
          <div className="flex gap-12 items-center text-[#8892A4]/30 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
            {[
              "Premiere Pro",
              "·",
              "After Effects",
              "·",
              "DaVinci Resolve",
              "·",
              "Photoshop",
              "·",
              "Canva Pro",
              "·",
              "Full Stack Dev",
              "·",
              "Estrategia de Contenido",
              "·",
              "Motion Graphics",
              "·",
              "Color Grading",
            ].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
