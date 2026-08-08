"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";

const EMAIL = "joaquinrojas.content@gmail.com";

// lucide v1 ya no incluye logos de marca, así que van como SVG inline
// (paths de simpleicons.org).
type BrandProps = { size?: number };

const Brand = ({ size = 16, d }: BrandProps & { d: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const InstagramIcon = ({ size }: BrandProps) => (
  <Brand
    size={size}
    d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"
  />
);

const LinkedInIcon = ({ size }: BrandProps) => (
  <Brand
    size={size}
    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  />
);

const YouTubeIcon = ({ size }: BrandProps) => (
  <Brand
    size={size}
    d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  />
);

// TODO: completar con los perfiles reales antes de publicar.
const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: YouTubeIcon, label: "YouTube", href: "#" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contacto" className="paper border-t border-[#141210]/[0.07]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10 pt-24 pb-14">
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <span className="text-[11px] tracking-[0.02em] text-[#6B655C]">
            Contacto
          </span>

          <div className="max-w-[62ch]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.02] text-[#141210]"
            >
              Cuéntame qué estás
              <br />
              tratando de lograr.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-5 text-base md:text-lg leading-[1.65] text-[#6B655C]"
            >
              No necesitas tener el brief listo ni saber exactamente qué formato
              te sirve. Escríbeme con el problema y lo pensamos juntos. Y si no
              soy la persona indicada para resolverlo, te lo digo.
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
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#141210] text-white text-sm font-semibold tracking-[0.02em] hover:bg-[#6D28D9] transition-colors duration-300"
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#141210]/15 text-[#6B655C] hover:text-[#141210] hover:border-[#141210]/35 text-sm font-medium transition-colors duration-300"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-[#6D28D9]" />
                    <span className="text-[#6D28D9]">Copiado</span>
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
        <div className="mt-24 pt-8 border-t border-[#141210]/[0.09] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[#141210] tracking-[0.01em]">
              Joaquín Rojas
            </p>
            <p className="text-[11px] text-[#6B655C] tracking-[0.01em] mt-0.5">
              Content Specialist &amp; Editor de Video
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[#141210]/12 flex items-center justify-center text-[#6B655C] hover:text-[#6D28D9] hover:border-[#6D28D9]/40 transition-colors duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-[11px] text-[#6B655C] tracking-wide">
            © {new Date().getFullYear()} Joaquín Rojas
          </p>
        </div>
      </div>
    </footer>
  );
}
