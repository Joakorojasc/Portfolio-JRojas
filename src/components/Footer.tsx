"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight, Globe, Link2, Video } from "lucide-react";

const EMAIL = "joaquinrojas.content@gmail.com";

const socialLinks = [
  { icon: Globe, label: "Instagram", href: "#" },
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: Video, label: "YouTube", href: "#" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contacto" className="relative overflow-hidden">
      {/* Top divider */}
      <div className="divider-gold" />

      {/* Background blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,169,110,1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-28">
        {/* Main CTA block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-4 font-medium">
              Empecemos
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F0F2F5] leading-tight">
              Tu próximo{" "}
              <span className="gradient-text-gold">proyecto</span>
              <br />
              merece lo mejor
            </h2>
            <p className="mt-6 text-[#8892A4] text-lg leading-relaxed max-w-md">
              Ya sea un reel que rompa el algoritmo, un podcast que posicione tu autoridad,
              o una estrategia de contenido completa — estoy listo para construirlo contigo.
            </p>
          </motion.div>

          {/* Right: Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Email card */}
            <div className="glass-gold rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center">
                  <Mail size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-xs text-[#8892A4] tracking-widest uppercase">
                    Email de contacto
                  </p>
                  <p className="text-sm font-semibold text-[#F0F2F5]">
                    Respuesta en menos de 24h
                  </p>
                </div>
              </div>

              <p className="text-lg md:text-xl font-bold text-[#F0F2F5] mb-6 break-all">
                {EMAIL}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary CTA */}
                <motion.a
                  href={`mailto:${EMAIL}`}
                  className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A96E] text-[#0B0F19] text-sm font-bold tracking-[0.06em] uppercase hover:bg-[#D4B87A] transition-all duration-300 glow-gold-strong"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Enviar email
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                </motion.a>

                {/* Copy button */}
                <motion.button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/10 text-[#8892A4] hover:text-[#F0F2F5] hover:border-white/20 text-sm font-medium transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copiar
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Availability card */}
            <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F0F2F5]">
                    Disponible para proyectos
                  </p>
                  <p className="text-xs text-[#8892A4]">
                    Tomando clientes · Mayo 2026
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-[#8892A4]">Entrega estimada</p>
                <p className="text-sm font-bold text-[#C9A96E]">5–10 días</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C9A96E]/30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C9A96E]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#F0F2F5] tracking-[0.06em]">
                Joaquín Rojas
              </p>
              <p className="text-[10px] text-[#8892A4] tracking-widest uppercase">
                Content Specialist & Editor
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#8892A4] hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-[#8892A4]/50 tracking-wider">
            © {new Date().getFullYear()} Joaquín Rojas · Todos los derechos reservados
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
