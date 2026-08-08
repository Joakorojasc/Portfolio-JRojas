"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { CASES } from "@/lib/media";
import SectionHead from "./SectionHead";

/**
 * Portada del caso. Si el JPG todavía no existe, el hueco explica qué imagen
 * va ahí en vez de mostrar un cuadro vacío.
 */
function CaseCover({
  src,
  alt,
  hint,
}: {
  src: string;
  alt: string;
  hint: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si el 404 ocurrió antes de hidratar, onError no dispara: lo chequeamos al montar.
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
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 md:p-9">
          <div className="flex items-center gap-2 text-[#6D28D9]">
            <ImagePlus size={15} />
            <span className="text-[11px] font-bold tracking-[0.02em]">
              Falta la portada
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

export default function CasesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="casos"
      ref={ref}
      className="scroll-mt-28 px-5 md:px-10 max-w-[1180px] mx-auto pt-28 pb-24"
    >
      <SectionHead
        folio="01"
        kicker="Casos"
        title="Con quiénes he trabajado"
        note="Nombres reales. Los números de al lado se pueden preguntar en una llamada."
        inView={inView}
      />

      <div className="flex flex-col gap-24">
        {CASES.map((c, i) => (
          <motion.article
            key={c.client}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.12 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="rule-ink mb-8" />

            <div className="grid lg:grid-cols-[0.38fr_0.62fr] gap-8 lg:gap-14">
              {/* Meta */}
              <div>
                <span className="block text-[11px] font-mono text-[#6B655C] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-[#141210] leading-none">
                  {c.client}
                </h3>
                <p className="mt-2 text-sm text-[#6D28D9] font-semibold">
                  {c.role}
                </p>
                <p className="mt-1 text-xs tracking-[0.01em] text-[#6B655C]">
                  {c.period}
                </p>

                {/* Datos */}
                <dl className="mt-8 flex flex-col gap-4">
                  {c.facts.map((f) => (
                    <div key={f.label} className="flex items-baseline gap-3">
                      <dt className="text-xl md:text-2xl font-bold text-[#C2410C] leading-none shrink-0">
                        {f.value}
                      </dt>
                      <dd className="text-[13px] text-[#6B655C] leading-snug">
                        {f.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Relato + portada */}
              <div>
                <div className="flex flex-col gap-4 max-w-[64ch]">
                  {c.body.map((p, j) => (
                    <p
                      key={j}
                      className={
                        j === 0
                          ? "text-lg md:text-xl text-[#141210] leading-relaxed font-medium"
                          : "text-[15px] text-[#6B655C] leading-relaxed"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <CaseCover src={c.cover} alt={c.client} hint={c.coverHint} />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
