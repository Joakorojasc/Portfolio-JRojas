"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Cuánto se desplaza, en px, entre que entra y sale de la pantalla.
   * Positivo = arranca abajo y sube (va más lento que el scroll);
   * negativo = arranca arriba y baja (va más rápido).
   */
  distance?: number;
  className?: string;
};

/**
 * Desplaza a sus hijos con el scroll para dar profundidad: los bloques no
 * llegan todos a la misma velocidad. El `useSpring` es lo que lo hace sentir
 * suave — atado directo al scroll, el movimiento se ve escalonado con la
 * rueda del mouse.
 *
 * Respeta `prefers-reduced-motion`: quien pide menos movimiento no se come el
 * desplazamiento (MotionConfig no alcanza acá, porque esto no es un `animate`
 * sino un valor atado al scroll).
 */
export default function Parallax({
  children,
  distance = 60,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const y = useTransform(smooth, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
