"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * La regla CSS de `prefers-reduced-motion` no alcanza: framer-motion anima por
 * JS y se la saltea. Con `reducedMotion="user"` respeta la preferencia del
 * sistema en todo el sitio — desactiva desplazamientos y escalas, y deja solo
 * los fundidos de opacidad, que es lo que recomienda la propia librería.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
