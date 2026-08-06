"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowDown, Play, Mic, type LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  PROFILE_PHOTO,
  REELS,
  YOUTUBE,
  TOOLS,
  HEADLINE_STAT,
  HERO_TAGLINE,
  cloudImage,
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

// Tarjeta de trabajo que asoma junto a la foto (hover + lleva a su sección).
// La posición y el desplazamiento por scroll los pone el wrapper de afuera:
// acá adentro `y` ya lo usa la animación de entrada y el hover.
type PeekProps = {
  href: string;
  label: string;
  img: string;
  aspect: string;
  rotate: number;
  delay: number;
  Icon: LucideIcon;
};

function HeroPeek({ href, label, img, aspect, rotate, delay, Icon }: PeekProps) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24, rotate: rotate * 1.5 }}
      animate={{ opacity: 1, y: 0, rotate }}
      whileHover={{ scale: 1.07, rotate: rotate / 2, y: -5 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block w-full rounded-xl overflow-hidden shadow-2xl shadow-black/60 cursor-pointer"
      style={{ aspectRatio: aspect }}
    >
      {!failed && img ? (
        /* `object-contain`, no `cover`: acá la gracia es ver la portada
           entera. Con `cover`, cualquier diferencia entre el alto de la
           imagen y el de la caja se come un pedazo. El fondo oscuro hace que
           las bandas, si aparecen, se lean como parte del diseño. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={img}
          alt={label}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-contain bg-[#0A0711]"
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

      {/* Velo apenas insinuado: la portada tiene que poder leerse. */}
      <div className="absolute inset-0 bg-black/[0.08] group-hover:bg-transparent transition-colors duration-300" />

      {/* Botón chico y en una esquina. Centrado y a 36px tapaba justo el
          medio de la portada, que es donde vive el texto. */}
      <div className="absolute top-1.5 right-1.5">
        <div className="w-6 h-6 rounded-full bg-[#9B5CE5] flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <Icon size={11} fill="currentColor" className="text-white" />
        </div>
      </div>

      {/* Etiqueta */}
      <div className="absolute bottom-0 inset-x-0 px-2 pt-5 pb-1.5 bg-gradient-to-t from-black/85 to-transparent">
        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/90">
          {label}
        </span>
      </div>
    </motion.a>
  );
}

/** Envuelve un peek: lo posiciona y lo desplaza con el scroll. */
function PeekSlot({
  className,
  y,
  children,
}: {
  className: string;
  y: MotionValue<number> | undefined;
  children: React.ReactNode;
}) {
  return (
    <motion.div className={`absolute ${className}`} style={y ? { y } : undefined}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Profundidad al salir del hero: cada bloque se va a su velocidad en vez de
  // subir todo en bloque. El resorte es lo que lo hace sentir suave.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const textY = useTransform(p, [0, 1], [0, 70]); // se queda atrás
  const photoY = useTransform(p, [0, 1], [0, -60]); // se adelanta
  const reelY = useTransform(p, [0, 1], [0, -130]); // el que más
  const podcastY = useTransform(p, [0, 1], [0, 40]);
  const haloY = useTransform(p, [0, 1], [0, 110]);

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden px-5 md:px-10">
      {/* Halo violeta, respirando despacio */}
      <motion.div
        className="pointer-events-none absolute right-0 top-10 w-[640px] h-[640px] rounded-full opacity-[0.14] animate-float"
        style={{
          background:
            "radial-gradient(circle at center, rgba(155,92,229,0.55) 0%, transparent 70%)",
          ...(reduce ? null : { y: haloY }),
        }}
      />

      {/* Brasa cálida abajo a la izquierda: rompe el lavado violeta y le da
          contexto al dato en naranjo, que es lo único cálido del sitio. */}
      <motion.div
        className="pointer-events-none absolute -left-24 top-[46%] w-[520px] h-[520px] rounded-full opacity-[0.10] animate-float"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,107,26,0.6) 0%, transparent 68%)",
          animationDelay: "-3.5s",
          ...(reduce ? null : { y: haloY }),
        }}
      />

      <div className="relative z-10 max-w-[1180px] mx-auto w-full pt-32 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
        {/* ── Columna texto ── */}
        <motion.div
          className="text-center lg:text-left"
          style={reduce ? undefined : { y: textY }}
        >
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
            {HERO_TAGLINE}
          </motion.p>

          {/* El dato, en naranjo torino: es el único punto cálido de la página
              y por eso se lleva la mirada sin necesidad de agrandarlo más. */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate="show"
            className="relative mt-7 inline-flex items-center gap-3 justify-center lg:justify-start"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-4 w-[150px] h-[110px] rounded-full opacity-40 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,107,26,0.55) 0%, transparent 70%)",
              }}
            />
            <span className="relative text-4xl md:text-5xl font-bold gradient-text-torino leading-none">
              {HEADLINE_STAT.value}
            </span>
            <span className="relative text-left text-[13px] text-[#948BA8] leading-tight">
              {HEADLINE_STAT.line1}
              <br />
              {HEADLINE_STAT.line2}
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
        </motion.div>

        {/* ── Columna visual: foto + trabajo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-[360px]"
          style={reduce ? undefined : { y: photoY }}
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
            {/* Sin degradado inferior: Joaquín quiere la foto limpia, sin
                oscurecerle la zona de abajo. */}
          </div>

          {/* Los dos peeks se separan al scrollear (uno se adelanta, el otro
              se queda): es lo que da la sensación de capas y no de estampa. */}

          {/* Reel (vertical) → sección Reels */}
          <PeekSlot
            className="-left-4 bottom-6 w-[104px] sm:-left-7 sm:w-[126px]"
            y={reduce ? undefined : reelY}
          >
            <HeroPeek
              href="#reels"
              label="Reels"
              img={REELS[0]?.poster ?? ""}
              aspect="9/16"
              rotate={-7}
              delay={0.55}
              Icon={Play}
            />
          </PeekSlot>

          {/* Portada de podcast → sección YouTube.
              Va en 16:9 porque ese es el formato real de las portadas: estaba
              declarada 1/1 y `object-cover` recortaba casi la mitad a los
              costados, dejando ver solo una franja del centro.
              En mobile la columna mide ~350px y el padre solo tiene 20px de
              padding: si el peek se sale 40px, `overflow-x: hidden` le come el
              borde. Chico y pegado en mobile, grande y volado en desktop. */}
          <PeekSlot
            className="-right-4 top-6 w-[165px] sm:-right-10 sm:top-6 sm:w-[210px]"
            y={reduce ? undefined : podcastY}
          >
            <HeroPeek
              href="#youtube"
              label="Podcast"
              img={YOUTUBE[0]?.thumb ?? ""}
              aspect="16/9"
              rotate={6}
              delay={0.68}
              Icon={Mic}
            />
          </PeekSlot>
        </motion.div>
      </div>
    </section>
  );
}
