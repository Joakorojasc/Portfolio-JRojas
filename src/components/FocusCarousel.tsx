"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FocusCarouselProps<T> = {
  items: T[];
  /** ancho de cada ranura en px (define el tamaño del bloque) */
  slotWidth: number;
  /** separación entre bloques en px */
  gap?: number;
  /** índice enfocado inicial */
  initialIndex?: number;
  /** render de cada item: recibe si está enfocado (centro) y su índice */
  renderItem: (item: T, isFocused: boolean, index: number) => ReactNode;
  /** se dispara al hacer click en el bloque ya enfocado (centro) */
  onFocusedClick?: (index: number) => void;
  /** etiqueta de accesibilidad para las flechas */
  label?: string;
  /** aspect-ratio de los bloques (también del fantasma). Ej "9/16" o "1/1" */
  aspect?: string;
  /** escala de los bloques laterales (no enfocados) */
  sideScale?: number;
  /** opacidad de los bloques laterales (no enfocados) */
  sideOpacity?: number;
  /** grados de rotación 3D (coverflow) de los bloques laterales. 0 = sin 3D */
  tilt?: number;
};

export default function FocusCarousel<T>({
  items,
  slotWidth,
  gap = 24,
  initialIndex = 0,
  renderItem,
  onFocusedClick,
  label = "trabajos",
  aspect = "9/16",
  sideScale = 0.82,
  sideOpacity = 0.32,
  tilt = 0,
}: FocusCarouselProps<T>) {
  const [active, setActive] = useState(initialIndex);

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));
  const go = (dir: 1 | -1) => setActive((p) => clamp(p + dir));

  // El track lleva un bloque "fantasma" al inicio y al final, de modo que en el
  // primer slide quede un espacio vacío a la izquierda y en el último a la derecha.
  // Con el padding (50% - slotWidth/2) el primer elemento del track queda centrado
  // en x=0; para enfocar el item real `active` desplazamos su posición de track.
  const step = slotWidth + gap;
  const trackIndex = active + 1; // +1 por el fantasma inicial
  const sidePad = `calc(50% - ${slotWidth / 2}px)`;

  const ghost = (visible: boolean) => (
    <div style={{ width: slotWidth, flexShrink: 0 }} className="self-center">
      <div
        className="w-full rounded-2xl border border-dashed border-white/10 transition-opacity duration-500"
        style={{ aspectRatio: aspect, opacity: visible ? 0.5 : 0 }}
      />
    </div>
  );

  return (
    <div>
      <div
        className="relative overflow-hidden"
        style={tilt ? { perspective: 1400 } : undefined}
      >
        <motion.div
          className="flex items-center"
          style={{
            gap,
            paddingLeft: sidePad,
            paddingRight: sidePad,
            transformStyle: tilt ? "preserve-3d" : undefined,
          }}
          animate={{ x: -trackIndex * step }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
        >
          {ghost(active === 0)}

          {items.map((item, i) => {
            const isFocused = i === active;
            // Coverflow: los de la izquierda giran hacia adentro, los de la derecha al revés
            const rotateY = !isFocused && tilt ? (i < active ? tilt : -tilt) : 0;
            return (
              <motion.div
                key={i}
                style={{
                  width: slotWidth,
                  flexShrink: 0,
                  transformStyle: tilt ? "preserve-3d" : undefined,
                }}
                animate={{
                  opacity: isFocused ? 1 : sideOpacity,
                  scale: isFocused ? 1 : sideScale,
                  rotateY,
                  filter: isFocused ? "blur(0px)" : "blur(1.5px)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 32 }}
                onClick={() => (isFocused ? onFocusedClick?.(i) : setActive(i))}
                className="cursor-pointer"
              >
                {renderItem(item, isFocused, i)}
              </motion.div>
            );
          })}

          {ghost(active === items.length - 1)}
        </motion.div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-center gap-5 mt-8">
        <motion.button
          onClick={() => go(-1)}
          disabled={active === 0}
          whileTap={{ scale: 0.9 }}
          aria-label={`Anterior ${label}`}
          className="w-11 h-11 rounded-full glass flex items-center justify-center text-[#948BA8] hover:text-[#F2EEF8] disabled:opacity-25 transition-colors"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Puntos */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir a ${label} ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 22 : 7,
                height: 7,
                background: i === active ? "#9B5CE5" : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => go(1)}
          disabled={active === items.length - 1}
          whileTap={{ scale: 0.9 }}
          aria-label={`Siguiente ${label}`}
          className="w-11 h-11 rounded-full glass flex items-center justify-center text-[#948BA8] hover:text-[#F2EEF8] disabled:opacity-25 transition-colors"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
