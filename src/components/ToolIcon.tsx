"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type ToolIconProps = {
  name: string;
  file: string;
  mono: string;
  color: string;
};

export default function ToolIcon({ name, file, mono, color }: ToolIconProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si el 404 ocurrió antes de hidratar, onError no dispara: lo chequeamos al montar.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const showImg = Boolean(file) && !failed;

  return (
    <motion.div
      title={name}
      whileHover={{ y: -3, scale: 1.06 }}
      className="w-11 h-11 rounded-2xl glass border border-white/[0.06] flex items-center justify-center hover:border-[#9B5CE5]/30 transition-colors duration-300"
    >
      {showImg ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={`/icons/${file}`}
          alt={name}
          onError={() => setFailed(true)}
          className="w-6 h-6 object-contain"
        />
      ) : (
        <span className="text-sm font-bold" style={{ color }}>
          {mono}
        </span>
      )}
    </motion.div>
  );
}
