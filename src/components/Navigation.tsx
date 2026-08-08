"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Casos", href: "#casos", id: "casos" },
  { label: "Cómo trabajo", href: "#valores", id: "valores" },
  { label: "Archivo", href: "#portfolio", id: "portfolio" },
  { label: "Lofi", href: "#lofi", id: "lofi" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

/**
 * Cabecera de diario, no navbar de SaaS.
 *
 * Lo que se sacó, porque es el trío que trae por defecto toda IA: la píldora
 * flotante de cristal con blur, el logo en anillo con gradiente y el botón
 * uppercase de esquinas redondas. Lo que entra en su lugar: un logotipo de
 * texto, un folio en mono que dice en qué sección estás, enlaces planos con
 * subrayado, y un filete al pie. Nada flota; la cabecera es parte de la hoja.
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: resalta la sección visible
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const activeIndex = navLinks.findIndex((l) => l.id === active);
  const folio = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    navLinks.length
  ).padStart(2, "0")}`;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#F7F4EF] border-b border-[#141210]/12"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-5 md:px-10">
        <div className="flex items-baseline justify-between py-4">
          {/* Logotipo: texto, tipografía apretada, sin anillo ni gradiente */}
          <a href="#inicio" className="group flex items-baseline gap-3">
            <span className="text-[15px] font-extrabold tracking-[-0.03em] text-[#141210]">
              Joaquín Rojas
            </span>
            <span className="hidden sm:block tick text-[#6B655C]/70">
              Content Specialist
            </span>
          </a>

          {/* Folio: en qué sección vas. Detalle de imprenta, no de dashboard. */}
          <span className="hidden lg:block tick tabular-nums">{folio}</span>

          {/* Enlaces planos. El activo lleva subrayado, no una cápsula. */}
          <nav className="hidden md:flex items-baseline gap-7">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-[13px] transition-colors duration-200 ${
                    isActive
                      ? "text-[#141210] font-medium"
                      : "text-[#6B655C] hover:text-[#141210]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#6D28D9]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Menú mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden -mb-1 text-[#141210]"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#F7F4EF] border-t border-[#141210]/10 overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-2.5 border-b border-[#141210]/[0.07] last:border-0"
                >
                  <span className="tick tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[15px] ${
                      active === link.id
                        ? "text-[#6D28D9] font-medium"
                        : "text-[#141210]"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
