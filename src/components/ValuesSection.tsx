"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Workflow } from "lucide-react";
import { WORK_INTRO, WORK_IMAGE } from "@/lib/media";
import Parallax from "./Parallax";

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="estrategia" className="paper scroll-mt-28">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 pt-20 pb-16" ref={ref}>
        {/* Etiqueta chica a la izquierda; el peso lo lleva el texto */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.28em] uppercase text-[#5C5468]"
          >
            Estrategia
          </motion.span>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-start">
            <div className="max-w-[58ch] flex-1">
              {/* Los dos párrafos van del mismo tamaño a propósito (pedido de
                  Joaquín). Entran con un barrido de izquierda a derecha, como
                  si el texto se revelara — acompaña la onda del quiebre. */}
              {WORK_INTRO.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  animate={
                    inView
                      ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                      : {}
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`${i > 0 ? "mt-6 " : ""}text-lg md:text-[22px] leading-[1.55] tracking-[-0.01em] text-[#16111F]`}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* La foto del escritorio. Va con parallax: sube un poco más
                lento que el texto mientras se pasa la sección. */}
            <Parallax distance={34} className="w-full lg:w-[35%] shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {WORK_IMAGE.src ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={WORK_IMAGE.src}
                    alt={WORK_IMAGE.alt}
                    loading="lazy"
                    className="w-full rounded-2xl border border-[#16111F]/[0.08]"
                    style={{ boxShadow: "0 24px 48px -24px rgba(22,17,31,0.35)" }}
                  />
                ) : (
                  <div
                    className="w-full rounded-2xl border border-dashed border-[#16111F]/15 bg-[#16111F]/[0.03] flex flex-col items-center justify-center gap-3"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Workflow size={26} className="text-[#16111F]/20" />
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#16111F]/30">
                      Flujo de trabajo
                    </span>
                  </div>
                )}
              </motion.div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
