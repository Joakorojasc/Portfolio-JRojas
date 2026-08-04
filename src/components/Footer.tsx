"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";

const EMAIL = "joaquinrojas.content@gmail.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contacto" className="paper border-t border-[#16111F]/[0.07]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 pt-24 pb-14">
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <span className="text-[11px] tracking-[0.28em] uppercase text-[#5C5468]">
            Contacto
          </span>

          <div className="max-w-[62ch]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-[42px] font-bold tracking-[-0.02em] leading-[1.12] text-[#16111F]"
            >
              Contame qué estás
              <br />
              tratando de lograr.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-5 text-base md:text-lg leading-[1.65] text-[#5C5468]"
            >
              No hace falta que tengas el brief armado ni que sepas exactamente qué
              formato necesitás. Escribime con el problema y lo pensamos juntos —
              si no soy la persona indicada para eso, te lo digo.
            </motion.p>

            {/* Email — sin tarjeta de cristal, sin glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#16111F] text-white text-sm font-semibold tracking-[0.02em] hover:bg-[#9B5CE5] transition-colors duration-300"
              >
                <Mail size={15} />
                {EMAIL}
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </a>

              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#16111F]/15 text-[#5C5468] hover:text-[#16111F] hover:border-[#16111F]/35 text-sm font-medium transition-colors duration-300"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#9B5CE5]" />
                    <span className="text-[#9B5CE5]">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copiar
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-24 pt-8 border-t border-[#16111F]/[0.09] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[#16111F] tracking-[0.01em]">
              Joaquín Rojas
            </p>
            <p className="text-[11px] text-[#5C5468] tracking-[0.14em] uppercase mt-0.5">
              Content Specialist &amp; Editor de Video
            </p>
          </div>

          <p className="text-[11px] text-[#5C5468] tracking-wide">
            © {new Date().getFullYear()} Joaquín Rojas
          </p>
        </div>
      </div>
    </footer>
  );
}
