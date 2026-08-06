"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Quiebre negro → papel. Antes era un degradado lineal de 96px que se veía
 * sucio (el violeta oscuro fundiéndose en blanco pasa por un gris barroso).
 * Ahora el papel entra como una onda que "fluye" con el scroll: dos capas de
 * onda desfasadas se desplazan horizontalmente en sentidos opuestos mientras
 * el quiebre cruza el viewport. Los paths se dibujan más anchos que el
 * viewBox (-200 a 1640) para que el desplazamiento nunca muestre un borde.
 */
export default function PaperBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xFront = useTransform(scrollYProgress, [0, 1], [-70, 50]);
  const xBack = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden bg-[#0A0711]">
      <svg
        className="block w-full h-[90px] md:h-[130px]"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
      >
        {/* Onda trasera, apenas insinuada: da profundidad sin hacer ruido */}
        <motion.path
          style={{ x: xBack }}
          d="M-200,88 C160,42 500,118 820,86 C1140,54 1380,100 1640,74 L1640,130 L-200,130 Z"
          fill="#F7F5FA"
          opacity={0.18}
        />
        <motion.path
          style={{ x: xFront }}
          d="M-200,72 C120,120 460,26 760,54 C1060,82 1300,116 1640,60 L1640,130 L-200,130 Z"
          fill="#F7F5FA"
        />
      </svg>
    </div>
  );
}
