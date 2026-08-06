"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
} from "lucide-react";
import { CAROUSELS } from "@/lib/media";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import FocusCarousel from "./FocusCarousel";
import FadeImage from "./FadeImage";
import Parallax from "./Parallax";

export default function CarouselSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /** Post abierto en el visor, y en qué slide va. */
  const [openPost, setOpenPost] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const post = openPost !== null ? CAROUSELS[openPost] : null;
  const close = () => setOpenPost(null);
  const open = (i: number) => {
    setOpenPost(i);
    setSlide(0);
  };

  useLockBodyScroll(openPost !== null);

  const step = (dir: 1 | -1) => {
    if (!post) return;
    setSlide((s) => Math.min(Math.max(s + dir, 0), post.slides.length - 1));
  };

  // Precarga la slide anterior y la siguiente. Sin esto, al pasar de slide se
  // ve el hueco negro del visor mientras la imagen recién empieza a bajar.
  useEffect(() => {
    if (!post) return;
    for (const i of [slide + 1, slide - 1]) {
      const src = post.slides[i];
      if (src) new window.Image().src = src;
    }
  }, [post, slide]);

  // Teclado: Escape cierra, flechas pasan slides.
  useEffect(() => {
    if (openPost === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPost, post]);

  return (
    <>
      <div id="carruseles" className="mb-32 scroll-mt-28" ref={ref}>
        {/* Sub-header */}
        <Parallax distance={22}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#9B5CE5]" />
              <h3 className="text-xl md:text-2xl font-bold tracking-[0.04em] text-[#F2EEF8]">
                Carruseles
              </h3>
            </div>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </motion.div>
        </Parallax>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <FocusCarousel
            items={CAROUSELS}
            slotWidth={430}
            gap={52}
            // Extra respecto del reposo: en hover el mazo se abre y necesita
            // más aire, si no `overflow-hidden` le come el borde a las hojas.
            padY={48}
            // Arranca en el segundo: con el primero enfocado queda el hueco
            // del fantasma a la izquierda y la fila se ve desbalanceada.
            initialIndex={1}
            label="carrusel"
            aspect="3/4"
            // Un poco más de presencia en los laterales: con la opacidad por
            // defecto el mazo de las tarjetas de al lado casi no se leía.
            sideOpacity={0.42}
            onFocusedClick={open}
            renderItem={(item, isFocused, _i, near) => (
              /* `whileHover` con etiqueta propaga el estado a los hijos: al
                 pasar el mouse por la enfocada, el mazo se abre en abanico y
                 la portada se levanta. Refuerza que es un grupo justo en el
                 momento en que la persona está por abrirlo. */
              <motion.div
                className="relative group"
                initial="rest"
                animate="rest"
                whileHover={isFocused ? "hover" : undefined}
              >
                {/* Glow del enfocado. Va primero en el DOM para quedar al fondo
                    sin depender de z-index negativos dentro de la escena 3D. */}
                {isFocused && (
                  <div
                    className="absolute inset-0 rounded-3xl blur-2xl opacity-50"
                    style={{
                      background: item.accent,
                      transform: "scale(0.85) translateY(16px)",
                    }}
                  />
                )}

                {/* Las hojas de atrás son las slides 2 y 3 REALES, apenas
                    giradas y oscurecidas. Con rectángulos vacíos solo se
                    entendía "hay algo más"; con las imágenes se ve qué hay. */}
                {[
                  { src: item.slides[2], x: 26, y: 15, rot: 3.6, s: 0.94, dim: 0.62 },
                  { src: item.slides[1], x: 13, y: 8, rot: 1.8, s: 0.97, dim: 0.38 },
                ]
                  .filter((sheet) => sheet.src)
                  .map((sheet) => (
                    <motion.div
                      key={sheet.src}
                      className="absolute inset-0 rounded-3xl overflow-hidden border border-white/[0.08] transition-opacity duration-300"
                      style={{
                        opacity: isFocused ? 1 : 0.55,
                        boxShadow: "0 18px 40px -22px rgba(0,0,0,0.9)",
                      }}
                      variants={{
                        rest: {
                          x: sheet.x,
                          y: sheet.y,
                          rotate: sheet.rot,
                          scale: sheet.s,
                        },
                        hover: {
                          x: sheet.x * 1.55,
                          y: sheet.y * 1.45,
                          rotate: sheet.rot * 1.4,
                          scale: sheet.s,
                        },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    >
                      <FadeImage
                        src={sheet.src}
                        alt=""
                        aria-hidden
                        loading={near ? "eager" : "lazy"}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Oscurecer manda la hoja al fondo sin desenfocarla */}
                      <div
                        className="absolute inset-0 bg-[#0A0711]"
                        style={{ opacity: sheet.dim }}
                      />
                    </motion.div>
                  ))}

                {/* La portada */}
                <motion.div
                  className="relative w-full rounded-3xl overflow-hidden border transition-colors duration-300"
                  style={{
                    aspectRatio: "3/4",
                    borderColor: isFocused
                      ? item.accent + "55"
                      : "rgba(255,255,255,0.06)",
                  }}
                  variants={{ rest: { y: 0 }, hover: { y: -10 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                >
                  {/* Va primero en el DOM: la portada lo tapa al cargar. Sin
                      esto la tarjeta se ve vacía si se salta a un post lejano. */}
                  <div className="absolute inset-0 bg-[#18121F] animate-breathe" />

                  <FadeImage
                    src={item.slides[0]}
                    alt={
                      item.title ||
                      `Portada de un carrusel de ${item.slides.length} slides`
                    }
                    loading={near ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Cuántas slides — con la palabra, no solo el número */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide px-3 py-2 rounded-full text-white bg-black/60 backdrop-blur-sm">
                      <Layers size={14} />
                      {item.slides.length} slides
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[34px] font-bold leading-none tabular-nums text-[#F2EEF8]">
                        {item.comments}
                      </p>
                      <p className="mt-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[#948BA8]">
                        Comentarios
                      </p>
                      {item.title && (
                        <p className="mt-2.5 text-base font-semibold text-[#F2EEF8] leading-tight">
                          {item.title}
                        </p>
                      )}
                    </div>

                    {/* La acción, visible siempre en el enfocado: en touch no
                        hay hover, así que esconderla detrás del mouse la mataría. */}
                    {isFocused && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold px-4 py-2.5 rounded-full bg-white text-[#16111F] transition-colors duration-300 group-hover:bg-[#9B5CE5] group-hover:text-white">
                        Ver todas
                        <ChevronRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          />
        </motion.div>
      </div>

      {/* Visor de slides */}
      <AnimatePresence>
        {openPost !== null && post && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Carrusel de ${post.slides.length} slides`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
              className="relative flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-black shadow-2xl"
                style={{ height: "70vh", aspectRatio: "3/4" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1);
                  else if (info.offset.x > 60) step(-1);
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide}
                    src={post.slides[slide]}
                    alt={`Slide ${slide + 1} de ${post.slides.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                <div className="absolute top-4 left-4 text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full text-white bg-black/50 backdrop-blur-sm tabular-nums">
                  {slide + 1} / {post.slides.length}
                </div>

                {/* Flechas sobre la imagen: el camino corto para pasar
                    slides. El hover tiñe de violeta en vez de solo oscurecer
                    más el negro, para que no se sientan un control genérico. */}
                {slide > 0 && (
                  <button
                    onClick={() => step(-1)}
                    aria-label="Slide anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white bg-black/45 border border-transparent hover:bg-[#9B5CE5]/70 hover:border-[#9B5CE5]/60 hover:scale-110 active:scale-95 backdrop-blur-sm transition-all duration-300"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
                {slide < post.slides.length - 1 && (
                  <button
                    onClick={() => step(1)}
                    aria-label="Slide siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white bg-black/45 border border-transparent hover:bg-[#9B5CE5]/70 hover:border-[#9B5CE5]/60 hover:scale-110 active:scale-95 backdrop-blur-sm transition-all duration-300"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}
              </motion.div>

              {/* Tira de miniaturas: muestra de un vistazo que es un conjunto y
                  permite saltar a cualquier slide sin pasarlas una por una. */}
              <div className="flex items-center gap-2 max-w-[70vw] overflow-x-auto no-scrollbar py-1">
                {post.slides.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setSlide(i)}
                    aria-label={`Ir a la slide ${i + 1}`}
                    aria-current={i === slide}
                    className={`relative shrink-0 rounded-md overflow-hidden transition-all duration-200 hover:scale-105 ${
                      i === slide
                        ? "opacity-100"
                        : "opacity-[0.45] hover:opacity-90"
                    }`}
                    style={{
                      width: 40,
                      height: 53,
                      outline: i === slide ? "2px solid #9B5CE5" : "none",
                      outlineOffset: 2,
                    }}
                  >
                    <FadeImage
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-5 mt-1">
                <button
                  onClick={close}
                  aria-label="Cerrar"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 bg-white/10 border border-transparent hover:text-white hover:bg-[#9B5CE5]/30 hover:border-[#9B5CE5]/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <X size={18} />
                </button>

                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xs tracking-[0.02em] text-white/55 hover:text-white transition-colors"
                  >
                    Ver el post original
                    <ArrowUpRight
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
