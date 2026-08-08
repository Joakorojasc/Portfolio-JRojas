"use client";

import { motion } from "framer-motion";

/**
 * Encabezado de sección con mobiliario de imprenta: filete superior, folio en
 * mono, título pesado y una nota al margen.
 *
 * Reemplaza al patrón anterior (puntito violeta + kicker), que era el mismo
 * encabezado que trae cualquier plantilla. El folio y la nota son lo que hace
 * que la página se lea compuesta y no generada.
 */
export default function SectionHead({
  folio,
  kicker,
  title,
  note,
  inView = true,
}: {
  folio: string;
  kicker: string;
  title: string;
  note?: string;
  inView?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14"
    >
      <div className="rule-ink" />

      <div className="flex items-baseline justify-between gap-6 pt-3">
        <span className="tick tabular-nums">{`${folio} · ${kicker}`}</span>
        {note && (
          <span className="marginalia hidden md:block text-right max-w-[22ch]">
            {note}
          </span>
        )}
      </div>

      <h2 className="mt-7 text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#141210] max-w-2xl leading-[1.02]">
        {title}
      </h2>
    </motion.div>
  );
}
