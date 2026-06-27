"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VALUES } from "@/lib/media";

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="valores" className="py-20 px-5 md:px-10">
      <div className="max-w-[1180px] mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9B5CE5]" />
            <h3 className="text-xl md:text-2xl font-bold tracking-[0.04em] text-[#F2EEF8]">
              Cómo trabajo
            </h3>
          </div>
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-xs text-[#948BA8] tracking-widest uppercase">
            Valores
          </span>
        </motion.div>

        {/* Lista compacta en un solo bloque */}
        <div className="glass rounded-3xl border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 divide-white/[0.05]">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="p-6 lg:border-l border-white/[0.05] first:border-l-0"
            >
              <span className="text-xs font-bold tracking-widest text-[#9B5CE5]/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 text-sm font-bold text-[#F2EEF8] leading-snug">
                {value.title}
              </h4>
              <p className="mt-1.5 text-[13px] text-[#948BA8] leading-relaxed">
                {value.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
