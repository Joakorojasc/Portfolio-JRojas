"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Mide el ancho disponible para que los bloques nunca excedan la pantalla. */
function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}

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
  /**
   * Grados de rotación 3D constante del bloque enfocado, para que quede
   * apoyado hacia un lado en vez de plano de frente. Negativo = girado hacia
   * la izquierda. 0 = de frente (comportamiento por defecto).
   */
  focusTilt?: number;
  /**
   * Aire vertical dentro del contenedor, en px. El wrapper recorta con
   * `overflow-hidden`, así que lo que un item dibuje fuera de su caja (sombras
   * grandes, hojas apiladas, rotaciones) se corta si no se le hace lugar.
   */
  padY?: number;
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
  focusTilt = 0,
  padY = 0,
}: FocusCarouselProps<T>) {
  const [active, setActive] = useState(initialIndex);
  const [wrapRef, wrapWidth] = useContainerWidth<HTMLDivElement>();
  const activeDotRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Cuando hay muchos items (la galería de portadas tiene 29) la fila de
  // puntos no entra entera en una pantalla chica. En vez de envolver a una
  // segunda línea (quedaba desprolijo, 2 puntos huérfanos abajo) se desliza:
  // una sola fila que scrollea, y el punto activo se centra solo.
  //
  // OJO: acá NO va `scrollIntoView`. Al montar, los puntos están abajo del
  // fold, así que traerlos "a la vista" scrolleaba la PÁGINA hasta la galería
  // — se entraba al sitio y saltaba solo a Trabajos. Movemos el contenedor a
  // mano, que es lo único que queremos mover.
  useEffect(() => {
    const dot = activeDotRef.current;
    const row = dotsRef.current;
    if (!dot || !row) return;
    row.scrollTo({
      left: dot.offsetLeft - row.clientWidth / 2 + dot.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  // `slotWidth` es el ancho deseado en desktop; en pantallas chicas se achica
  // para que el bloque enfocado entre completo y asome algo de los laterales.
  const effectiveSlot = wrapWidth
    ? Math.min(slotWidth, Math.max(200, wrapWidth - 56))
    : slotWidth;

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));
  const go = (dir: 1 | -1) => setActive((p) => clamp(p + dir));

  // El track lleva un bloque "fantasma" al inicio y al final, de modo que en el
  // primer slide quede un espacio vacío a la izquierda y en el último a la derecha.
  // Con el padding (50% - slotWidth/2) el primer elemento del track queda centrado
  // en x=0; para enfocar el item real `active` desplazamos su posición de track.
  const step = effectiveSlot + gap;
  const trackIndex = active + 1; // +1 por el fantasma inicial
  const sidePad = `calc(50% - ${effectiveSlot / 2}px)`;

  // Hay escena 3D si giran los laterales (coverflow) o si el central va inclinado.
  const is3D = Boolean(tilt || focusTilt);

  const ghost = (visible: boolean) => (
    <div style={{ width: effectiveSlot, flexShrink: 0 }} className="self-center">
      <div
        className="w-full rounded-2xl border border-dashed border-white/10 transition-opacity duration-500"
        style={{ aspectRatio: aspect, opacity: visible ? 0.5 : 0 }}
      />
    </div>
  );

  // Teclado: flechas para moverse, Home/End a los extremos y Enter/espacio
  // para activar el bloque enfocado (el equivalente al click del centro).
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(items.length - 1);
    else if ((e.key === "Enter" || e.key === " ") && onFocusedClick)
      onFocusedClick(active);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Galería de ${label}: ${active + 1} de ${items.length}`}
        onKeyDown={onKeyDown}
        className="relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#9B5CE5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0711]"
        style={{
          ...(is3D ? { perspective: 1400 } : null),
          // `overflow-hidden` recorta en la caja de padding, así que este aire
          // es lo que deja ver sombras y hojas apiladas fuera del item.
          ...(padY ? { paddingTop: padY, paddingBottom: padY } : null),
        }}
      >
        <motion.div
          className="flex items-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
          style={{
            gap,
            paddingLeft: sidePad,
            paddingRight: sidePad,
            transformStyle: is3D ? "preserve-3d" : undefined,
          }}
          animate={{ x: -trackIndex * step }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
        >
          {ghost(active === 0)}

          {items.map((item, i) => {
            const isFocused = i === active;
            // Coverflow: los de la izquierda giran hacia adentro, los de la derecha al revés.
            // El enfocado queda con `focusTilt` (0 = de frente, como siempre).
            const rotateY = isFocused
              ? focusTilt
              : tilt
                ? i < active
                  ? tilt
                  : -tilt
                : 0;
            return (
              <motion.div
                key={i}
                style={{
                  width: effectiveSlot,
                  flexShrink: 0,
                  transformStyle: is3D ? "preserve-3d" : undefined,
                }}
                animate={{
                  opacity: isFocused ? 1 : sideOpacity,
                  scale: isFocused ? 1 : sideScale,
                  rotateY,
                  filter: isFocused ? "blur(0px)" : "blur(1.5px)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 32 }}
                /* Los laterales se clickean para traerlos al centro, pero no
                   daban ninguna señal: al pasar el mouse se aclaran y crecen
                   un poco. El enfocado no lleva hover acá — cada sección
                   define el suyo, que depende de lo que hace al clickearlo. */
                whileHover={
                  isFocused
                    ? undefined
                    : {
                        opacity: Math.min(sideOpacity + 0.3, 1),
                        scale: sideScale + 0.035,
                        filter: "blur(0px)",
                      }
                }
                onClick={() => (isFocused ? onFocusedClick?.(i) : setActive(i))}
                /* El cursor no debe prometer un click que no existe: el
                   enfocado solo es interactivo si hay `onFocusedClick`. */
                className={
                  isFocused && !onFocusedClick ? "cursor-default" : "cursor-pointer"
                }
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
          className="w-11 h-11 rounded-full glass border border-transparent flex items-center justify-center text-[#948BA8] hover:text-[#F2EEF8] hover:bg-[#9B5CE5]/[0.16] hover:border-[#9B5CE5]/40 hover:scale-105 disabled:opacity-25 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:hover:border-transparent transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#9B5CE5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0711]"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Puntos: una sola fila que scrollea en vez de envolver. Con pocos
            items entra entero y no se nota; con muchos (29 en YouTube) el
            punto activo se trae solo a la vista al cambiar. */}
        <div
          ref={dotsRef}
          className="flex items-center gap-2 min-w-0 max-w-full overflow-x-auto no-scrollbar py-1"
        >
          {items.map((_, i) => (
            <button
              key={i}
              ref={i === active ? activeDotRef : undefined}
              onClick={() => setActive(i)}
              aria-label={`Ir a ${label} ${i + 1}`}
              aria-current={i === active}
              /* El punto mide 7px pero el botón ocupa 20px de alto: el área
                 clickeable no puede ser del tamaño del dibujo. shrink-0 para
                 que no se aplasten al desbordar la fila. */
              className="group h-5 shrink-0 flex items-center outline-none"
            >
              <span
                className="block rounded-full transition-all duration-300 group-hover:bg-white/60 group-focus-visible:ring-2 group-focus-visible:ring-[#9B5CE5]"
                style={{
                  width: i === active ? 22 : 7,
                  height: 7,
                  background: i === active ? "#9B5CE5" : "rgba(255,255,255,0.22)",
                }}
              />
            </button>
          ))}
        </div>

        <motion.button
          onClick={() => go(1)}
          disabled={active === items.length - 1}
          whileTap={{ scale: 0.9 }}
          aria-label={`Siguiente ${label}`}
          className="w-11 h-11 rounded-full glass border border-transparent flex items-center justify-center text-[#948BA8] hover:text-[#F2EEF8] hover:bg-[#9B5CE5]/[0.16] hover:border-[#9B5CE5]/40 hover:scale-105 disabled:opacity-25 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:hover:border-transparent transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#9B5CE5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0711]"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
