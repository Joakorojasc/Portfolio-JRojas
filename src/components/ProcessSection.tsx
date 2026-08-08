"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PenLine } from "lucide-react";
import { DIAGRAMS } from "@/lib/media";
import SectionHead from "./SectionHead";

/**
 * Tablero de Miro exportado. Mientras el JPG no exista, el placeholder no se
 * queda mudo: muestra el nombre del tablero y las tres ideas de cómo dibujarlo,
 * así el hueco funciona como instrucción de trabajo.
 */
function DiagramFrame({
  src,
  title,
  ratio,
  hints,
}: {
  src: string;
  title: string;
  ratio: string;
  hints: string[];
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-dashed border-[#6D28D9]/25 bg-[#EAE5DC]"
      style={{ aspectRatio: ratio }}
    >
      {!failed && src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={src}
          alt={title}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 md:p-9 overflow-auto">
          <div className="flex items-center gap-2 text-[#6D28D9]">
            <PenLine size={15} />
            <span className="text-[11px] font-bold tracking-[0.02em]">
              Por dibujar en Miro
            </span>
          </div>

          <p className="text-base md:text-xl font-bold text-[#141210] leading-tight">
            {title}
          </p>

          <ul className="flex flex-col gap-2 max-w-[70ch]">
            {hints.map((h) => (
              <li
                key={h}
                className="flex gap-2 text-[12px] md:text-[13px] text-[#6B655C] leading-relaxed"
              >
                <span className="text-[#6D28D9] font-bold shrink-0">*</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [lead, ...rest] = DIAGRAMS;

  return (
    <section
      id="proceso"
      ref={ref}
      className="paper-sunk scroll-mt-28 py-28"
    >
      <div className="px-5 md:px-10 max-w-[1180px] mx-auto">
        <SectionHead
          folio="03"
          kicker="Método"
          title="Los tableros con los que pienso una cuenta"
          note="Marcos propios, dibujados a mano. No son plantillas descargadas."
          inView={inView}
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="-mt-8 mb-14 max-w-[62ch] text-[15px] text-[#6B655C] leading-relaxed"
        >
          Antes de tocar el timeline, un proyecto pasa por estos tres marcos.
          Con ellos decido qué se publica, en qué orden y por qué. Son los
          mismos que te voy a mostrar cuando hablemos de tu cuenta.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="tick -mt-10 mb-14 max-w-[62ch]"
        >
          Salen de formación pagada en Skool (programas de content specialist y
          de ghostwriting) más lo que fui corrigiendo en cuentas reales.
        </motion.p>

        {/* Diagrama principal */}
        {lead && (
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <DiagramFrame
              src={lead.src}
              title={lead.title}
              ratio={lead.ratio}
              hints={lead.hints}
            />
            <figcaption className="mt-4 max-w-[62ch]">
              <span className="block text-sm font-bold text-[#141210]">
                {lead.title}
              </span>
              <span className="mt-1 block text-[13px] text-[#6B655C] leading-relaxed">
                {lead.caption}
              </span>
            </figcaption>
          </motion.figure>
        )}

        {/* Secundarios */}
        <div className="grid md:grid-cols-2 gap-10">
          {rest.map((d, i) => (
            <motion.figure
              key={d.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <DiagramFrame src={d.src} title={d.title} ratio={d.ratio} hints={d.hints} />
              <figcaption className="mt-4">
                <span className="block text-sm font-bold text-[#141210]">
                  {d.title}
                </span>
                <span className="mt-1 block text-[13px] text-[#6B655C] leading-relaxed">
                  {d.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
