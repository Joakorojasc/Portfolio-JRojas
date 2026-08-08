"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film } from "lucide-react";
import { YOUTUBE } from "@/lib/media";
import FocusCarousel from "./FocusCarousel";
import FadeImage from "./FadeImage";
import Parallax from "./Parallax";

export default function YouTubeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div id="youtube" className="mb-32 scroll-mt-28" ref={ref}>
      {/* Sub-header */}
      <Parallax distance={22}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9B5CE5]" />
            <h3 className="text-xl md:text-2xl font-bold tracking-[0.04em] text-[#F2EEF8]">
              Portadas de mis Podcasts · YouTube
            </h3>
          </div>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </motion.div>
      </Parallax>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <FocusCarousel
          items={YOUTUBE}
          slotWidth={840}
          gap={44}
          padY={40}
          // Igual que Carruseles: empieza en la segunda para que se vea una
          // portada a cada lado y no el hueco del fantasma. (Reels no: ahí
          // Joaquín quiere que se abra en el primero.)
          initialIndex={1}
          label="portada"
          aspect="16/9"
          sideScale={0.8}
          // Ahora que las portadas son imágenes reales conviene que las
          // laterales se lean: con 0.3 quedaban demasiado apagadas.
          sideOpacity={0.45}
          tilt={26}
          focusTilt={-9}
          renderItem={(video, isFocused, i, near) => (
            <div
              className="relative w-full rounded-2xl overflow-hidden border transition-all duration-300"
              style={{
                aspectRatio: "16/9",
                borderColor: isFocused
                  ? "rgba(155,92,229,0.4)"
                  : "rgba(255,255,255,0.06)",
                // La sombra cae hacia el lado contrario a la inclinación: es lo
                // que hace leer la portada como una placa apoyada en el espacio.
                boxShadow: isFocused
                  ? "34px 26px 60px -18px rgba(0,0,0,0.75), 0 0 0 1px rgba(155,92,229,0.10)"
                  : "none",
              }}
            >
              {video.thumb ? (
                <FadeImage
                  src={video.thumb}
                  alt={`Portada de podcast ${i + 1}`}
                  /* Las cercanas al foco van en `eager`: al saltar a un punto
                     lejano de la fila, la portada llegaba después y la tarjeta
                     se veía vacía. */
                  loading={near ? "eager" : "lazy"}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : null}

              {/* Fondo que asoma mientras la portada carga (y queda si falta).
                  Respira despacio para que se lea como "cargando" y no como
                  una tarjeta rota. */}
              <div
                className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3 animate-breathe"
                style={{
                  background:
                    "linear-gradient(160deg, #221A2E 0%, #18121F 55%, #120D1C 100%)",
                }}
              >
                <Film size={26} className="text-white/10" />
              </div>

              {/* Sin rótulo a propósito: la portada se muestra sola, limpia. */}
            </div>
          )}
        />
      </motion.div>
    </div>
  );
}
