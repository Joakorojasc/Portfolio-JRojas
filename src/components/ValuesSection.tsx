"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WORK_INTRO } from "@/lib/media";

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="valores" className="paper">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 pt-20 pb-16" ref={ref}>
        {/* Etiqueta chica a la izquierda; el peso lo lleva el texto */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.28em] uppercase text-[#5C5468]"
          >
            Cómo trabajo
          </motion.span>

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
                    ? "text-xl md:text-[26px] leading-[1.5] tracking-[-0.01em] text-[#16111F]"
                    : "mt-6 text-base md:text-lg leading-[1.65] text-[#5C5468]"
                }
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
