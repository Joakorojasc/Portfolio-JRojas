"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Film } from "lucide-react";
import { LOFI } from "@/lib/media";
import SectionHead from "./SectionHead";

/** Fotograma del video. Si falta el JPG, el hueco dice qué cuadro va ahí. */
function Still({ src, hint }: { src: string; hint: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-dashed border-[#6D28D9]/25 bg-[#EAE5DC]"
      style={{ aspectRatio: "16/9" }}
    >
      {!failed && src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={src}
          alt="Fotograma del video lofi de Puerto Varas"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 md:p-9">
          <div className="flex items-center gap-2 text-[#6D28D9]">
            <Film size={15} />
            <span className="text-[11px] font-bold tracking-[0.03em]">
              Falta el fotograma
            </span>
          </div>
          <p className="flex gap-2 text-[12px] md:text-[13px] text-[#6B655C] leading-relaxed max-w-[62ch]">
            <span className="text-[#6D28D9] font-bold shrink-0">*</span>
            <span>{hint}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function LofiSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="lofi"
      ref={ref}
      className="paper-sunk scroll-mt-28 py-28"
    >
      <div className="px-5 md:px-10 max-w-[1180px] mx-auto">
        <SectionHead
          folio="05"
          kicker={LOFI.kicker}
          title={LOFI.title}
          note="Música propia, visuales hechos a mano. La IA está en el proceso, no en el resultado."
          inView={inView}
        />

        <div className="grid lg:grid-cols-[0.55fr_0.45fr] gap-10 lg:gap-14 items-start">
          {/* Relato + fotograma */}
          <div>
            <div className="flex flex-col gap-4 max-w-[62ch]">
              {LOFI.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className={
                    i === 0
                      ? "text-lg md:text-xl text-[#141210] leading-relaxed font-medium"
                      : "text-[15px] text-[#6B655C] leading-relaxed"
                  }
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <Still src={LOFI.still} hint={LOFI.stillHint} />
            </motion.div>
          </div>

          {/* Catálogo de ciudades: el roadmap real, como índice de disco */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <span className="tick">Catálogo</span>
            <ol className="mt-4">
              {LOFI.cities.map((c, i) => (
                <li
                  key={c.name}
                  className="flex items-baseline gap-4 py-3 border-b border-[#141210]/[0.09] last:border-0"
                >
                  <span className="tick tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] text-[#141210]">
                    {c.name}
                  </span>
                  <span
                    className={`tick shrink-0 ${
                      i === 0 ? "text-[#C2410C]" : ""
                    }`}
                  >
                    {c.state}
                  </span>
                </li>
              ))}
            </ol>

            <p className="marginalia mt-6 max-w-[30ch]">
              Una ciudad por video, una hora cada uno. El orden puede cambiar
              según dónde consiga material propio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
