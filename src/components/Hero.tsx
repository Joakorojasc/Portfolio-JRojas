"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Play, Mic, type LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  PROFILE_PHOTO,
  REELS,
  YOUTUBE,
  TOOLS,
  cloudImage,
  cloudPoster,
} from "@/lib/media";
import ToolIcon from "./ToolIcon";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

const photoSrc = PROFILE_PHOTO.publicId
  ? cloudImage(PROFILE_PHOTO.publicId, "f_auto,q_auto,w_900,ar_3:4,c_fill,g_face")
  : PROFILE_PHOTO.localSrc;

// Tarjeta de trabajo que asoma junto a la foto (hover + lleva a su sección)
type PeekProps = {
  href: string;
  label: string;
  img: string;
  aspect: string;
  posClass: string;
  rotate: number;
  delay: number;
  Icon: LucideIcon;
};

function HeroPeek({ href, label, img, aspect, posClass, rotate, delay, Icon }: PeekProps) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24, rotate: rotate * 1.5 }}
      animate={{ opacity: 1, y: 0, rotate }}
      whileHover={{ scale: 1.07, rotate: rotate / 2, y: -5 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group absolute ${posClass} rounded-xl overflow-hidden shadow-2xl shadow-black/60 cursor-pointer`}
      style={{ aspectRatio: aspect }}
    >
      {!failed && img ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={img}
          alt={label}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(155deg, #221A2E 0%, #18121F 60%, #120D1C 100%)",
          }}
        >
          <Icon size={22} className="text-white/25" />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />

      {/* Botón */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-9 h-9 rounded-full bg-[#9B5CE5]/95 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
          <Icon size={15} fill="currentColor" className="text-white" />
        </div>
      </div>

      {/* Etiqueta */}
      <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/90">
          {label}
        </span>
      </div>
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden px-5 md:px-10">
      {/* Halo violeta único, sutil */}
      <div
        className="pointer-events-none absolute right-0 top-10 w-[640px] h-[640px] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(155,92,229,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto w-full pt-32 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
        {/* ── Columna texto ── */}
        <div className="text-center lg:text-left">
          <motion.span
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="show"
            className="text-[11px] tracking-[0.28em] uppercase text-[#948BA8]"
          >
            Content Specialist · Editor de Video
          </motion.span>

          <motion.h1
            className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight"
            initial="hidden"
            animate="show"
          >
            <motion.span variants={fadeUp} custom={0.1} className="block text-[#F2EEF8]">
              Joaquín
            </motion.span>
            <motion.span variants={fadeUp} custom={0.18} className="block gradient-text-gold">
              Rojas
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md mx-auto lg:mx-0 text-base md:text-lg text-[#948BA8] leading-relaxed"
          >
            Convierto horas de material en contenido que la gente termina de ver,
            comparte y recuerda.
          </motion.p>

          {/* +6M inline */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate="show"
            className="mt-7 inline-flex items-center gap-3 justify-center lg:justify-start"
          >
            <span className="text-3xl md:text-4xl font-bold gradient-text-gold leading-none">
              +6M
            </span>
            <span className="text-left text-[13px] text-[#948BA8] leading-tight">
              de views generadas
              <br />
              entre mis clientes
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#9B5CE5] text-white text-sm font-bold tracking-[0.06em] uppercase hover:bg-[#B47CF0] transition-colors duration-300"
            >
              Ver trabajos
              <ArrowDown
                size={16}
                className="group-hover:translate-y-1 transition-transform duration-300"
              />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center px-6 py-3.5 rounded-full border border-white/12 text-sm font-semibold tracking-[0.06em] uppercase text-[#F2EEF8] hover:border-[#9B5CE5]/50 transition-colors duration-300"
            >
              Trabajemos juntos
            </a>
          </motion.div>

          {/* Software */}
          <motion.div
            variants={fadeUp}
            custom={0.62}
            initial="hidden"
            animate="show"
            className="mt-12"
          >
            <p className="text-[10px] tracking-[0.26em] uppercase text-[#948BA8] mb-4">
              Herramientas
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              {TOOLS.map((tool) => (
                <ToolIcon key={tool.name} {...tool} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Columna visual: foto + trabajo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-[360px]"
        >
          {/* Foto */}
          <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-white/[0.08]">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={PROFILE_PHOTO.alt}
                fill
                priority
                sizes="360px"
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 bg-[#18121F]" />
            )}
            {/* Degradado para integrar con el fondo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0711] via-transparent to-transparent" />
          </div>

          {/* Reel (vertical) → sección Reels */}
          <HeroPeek
            href="#reels"
            label="Reels"
            img={cloudPoster(REELS[0].publicId, REELS[0].posterTime)}
            aspect="9/16"
            posClass="-left-7 bottom-6 w-[116px]"
            rotate={-7}
            delay={0.55}
            Icon={Play}
          />

          {/* Portada de podcast (cuadrada) → sección YouTube */}
          <HeroPeek
            href="#youtube"
            label="Podcast"
            img={YOUTUBE[0]?.thumb ?? ""}
            aspect="1/1"
            posClass="-right-7 top-8 w-[140px]"
            rotate={6}
            delay={0.68}
            Icon={Mic}
          />
        </motion.div>
      </div>
    </section>
  );
}
