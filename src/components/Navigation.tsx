"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/[0.05] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#inicio"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-full border border-[#C9A96E]/40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A96E]" />
          </div>
          <span className="text-sm font-semibold tracking-[0.12em] uppercase text-[#F0F2F5] group-hover:text-[#C9A96E] transition-colors duration-300">
            JR
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              className="relative text-sm tracking-[0.08em] text-[#8892A4] hover:text-[#F0F2F5] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.a
          href="mailto:joaquinrojas.content@gmail.com"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.1em] uppercase border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E]/10 hover:border-[#C9A96E]/70 transition-all duration-300"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Trabajemos juntos
        </motion.a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#8892A4] hover:text-[#F0F2F5] transition-colors"
          aria-label="Toggle menu"
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
            className="md:hidden glass border-t border-white/[0.05] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#8892A4] hover:text-[#C9A96E] text-base tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:joaquinrojas.content@gmail.com"
                className="mt-2 text-center px-5 py-3 rounded-full text-xs font-semibold tracking-[0.1em] uppercase border border-[#C9A96E]/40 text-[#C9A96E]"
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
