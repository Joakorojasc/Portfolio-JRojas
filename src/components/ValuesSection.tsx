"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VALUES, WORK_INTRO } from "@/lib/media";

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="valores" className="paper">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 pt-24 pb-28" ref={ref}>
        {/* Encabezado: etiqueta chica a la izquierda, el peso lo lleva el texto */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="tick tabular-nums">02 · Cómo trabajo</span>
          </motion.div>

          {/* Párrafo en primera persona — reemplaza la grilla de tarjetas */}
          <div className="max-w-[62ch]">
            {WORK_INTRO.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  i === 0
                    ? "text-xl md:text-[26px] leading-[1.5] tracking-[-0.01em] text-[#141210]"
                    : "mt-6 text-base md:text-lg leading-[1.65] text-[#6B655C]"
                }
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Los valores, como pie de página del texto: lista fina, sin tarjetas ni 01-05 */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-20 lg:ml-[264px] grid sm:grid-cols-2 gap-x-14 gap-y-7 max-w-[62ch]"
        >
          {VALUES.map((value) => (
            <li key={value.title} className="border-t border-[#141210]/10 pt-4">
              <h4 className="text-[13px] font-semibold text-[#141210] tracking-[0.01em]">
                {value.title}
              </h4>
              <p className="mt-1 text-[13px] leading-relaxed text-[#6B655C]">
                {value.copy}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
