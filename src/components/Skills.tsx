"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Zap, Smartphone, LayoutGrid, Bot, Sparkles } from "lucide-react";

const tools = [
  { name: "Adobe Premiere", icon: Film, color: "#9999FF" },
  { name: "After Effects", icon: Zap, color: "#6699FF" },
  { name: "CapCut", icon: Smartphone, color: "#4ADE80" },
  { name: "Canva", icon: LayoutGrid, color: "#00C4CC" },
  { name: "Claude", icon: Bot, color: "#C9A96E" },
  { name: "Gemini", icon: Sparkles, color: "#4F7EFF" },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="habilidades" className="py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-8 font-medium">
          Herramientas
        </p>
        <motion.div
          ref={ref}
          className="flex flex-wrap gap-3"
        >
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass border border-white/[0.06]"
              >
                <Icon size={15} style={{ color: tool.color }} />
                <span className="text-sm font-medium text-[#F0F2F5]">{tool.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
