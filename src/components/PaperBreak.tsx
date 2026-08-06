"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* Los paths se dibujan más anchos que el viewBox (-240 a 1680) y cierran muy
   abajo (y=520) para que ningún desplazamiento deje ver un borde. */
const BACK =
  "M-240,128 C120,168 500,74 820,124 C1140,174 1380,96 1680,120 L1680,520 L-240,520 Z";
const MID =
  "M-240,104 C180,44 520,140 840,100 C1160,60 1360,116 1680,86 L1680,520 L-240,520 Z";
const FRONT =
  "M-240,74 C140,132 470,26 780,58 C1090,90 1320,128 1680,62 L1680,520 L-240,520 Z";
/** El borde superior del frente, sin cerrar: es la línea que se dibuja. */
const FRONT_EDGE = "M-240,74 C140,132 470,26 780,58 C1090,90 1320,128 1680,62";

/**
 * Quiebre negro → papel. Antes era un degradado lineal que pasaba por un gris
 * barroso; ahora el papel entra como una marea de tres olas desfasadas.
 *
 * Todo está atado al scroll, no a un `once: true`: al bajar la cresta violeta
 * se dibuja de izquierda a derecha y el papel sube; al subir, el mismo
 * movimiento se deshace. Esa reversibilidad es la gracia del efecto.
 */
export default function PaperBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Sin el resorte el movimiento sigue al scroll a los saltos.
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.4,
  });

  // Cada capa a su propia velocidad y sentido: eso es lo que da profundidad.
  const xBack = useTransform(p, [0, 1], [-50, 95]);
  const xMid = useTransform(p, [0, 1], [80, -85]);
  const xFront = useTransform(p, [0, 1], [-95, 65]);
  // El frente además sube: el papel "inunda" la sección de abajo.
  const yFront = useTransform(p, [0, 1], [30, -14]);

  // La cresta se dibuja mientras el quiebre cruza la pantalla y se apaga en
  // los extremos, para que no quede una línea suelta ni al entrar ni al salir.
  const draw = useTransform(p, [0.08, 0.62], [0, 1]);
  const crestOpacity = useTransform(p, [0.05, 0.28, 0.72, 0.95], [0, 1, 1, 0]);
  const haloOpacity = useTransform(p, [0.1, 0.5, 0.9], [0, 0.42, 0]);

  return (
    <div ref={ref} aria-hidden className="relative overflow-hidden bg-[#0A0711]">
      <svg
        className="block w-full h-[110px] md:h-[170px]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        {/* Resplandor violeta que acompaña a la cresta */}
        <motion.ellipse
          cx="720"
          cy="86"
          rx="620"
          ry="54"
          fill="#9B5CE5"
          style={{
            filter: "blur(28px)",
            opacity: reduce ? 0.16 : haloOpacity,
          }}
        />

        {/* Las dos capas de atrás van teñidas de violeta, no blancas: el papel
            al 30% sobre negro da un gris sucio que se nota en los bordes. */}
        <motion.path
          d={BACK}
          fill="#C6B4E4"
          opacity={0.1}
          style={reduce ? undefined : { x: xBack }}
        />
        <motion.path
          d={MID}
          fill="#DFD6EF"
          opacity={0.2}
          style={reduce ? undefined : { x: xMid }}
        />
        <motion.path
          d={FRONT}
          fill="#F7F5FA"
          style={reduce ? undefined : { x: xFront, y: yFront }}
        />

        {/* La cresta: mismo borde que el frente, viajando con él */}
        <motion.path
          d={FRONT_EDGE}
          fill="none"
          stroke="#B47CF0"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={
            reduce
              ? { opacity: 0.5 }
              : { x: xFront, y: yFront, pathLength: draw, opacity: crestOpacity }
          }
        />
      </svg>
    </div>
  );
}
