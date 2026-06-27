"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Trabajos", href: "#portfolio", id: "portfolio" },
  { label: "Valores", href: "#valores", id: "valores" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#0A0711]/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#inicio"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
        >
          <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#9B5CE5] to-[#6D3FA8]">
            <span className="absolute inset-[2px] rounded-full bg-[#0A0711] flex items-center justify-center">
              <span className="text-[11px] font-bold text-[#C77DFF]">JR</span>
            </span>
          </span>
          <span className="hidden sm:block text-sm font-semibold tracking-[0.04em] text-[#F2EEF8] group-hover:text-[#C77DFF] transition-colors duration-300">
            Joaquín Rojas
          </span>
        </motion.a>

        {/* Desktop nav — pill */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm tracking-[0.02em] transition-colors duration-300 ${
                  isActive ? "text-[#F2EEF8]" : "text-[#948BA8] hover:text-[#F2EEF8]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[#9B5CE5]/15 border border-[#9B5CE5]/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <motion.a
          href="#contacto"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.1em] uppercase bg-[#9B5CE5] text-white hover:bg-[#B47CF0] transition-colors duration-300"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Trabajemos juntos
        </motion.a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#948BA8] hover:text-[#F2EEF8] transition-colors"
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mt-3 mx-5 rounded-2xl bg-[#120D1C]/95 backdrop-blur-xl border border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base tracking-wide transition-colors duration-200 ${
                    active === link.id ? "text-[#C77DFF]" : "text-[#948BA8] hover:text-[#F2EEF8]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-1 text-center px-5 py-3 rounded-full text-xs font-semibold tracking-[0.1em] uppercase bg-[#9B5CE5] text-white"
              >
                Trabajemos juntos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
