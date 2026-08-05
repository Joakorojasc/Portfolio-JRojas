"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * `<img>` que aparece con un fundido en vez de saltar a la pantalla. Con las
 * imágenes en `loading="lazy"` el salto se nota bastante al scrollear.
 *
 * No usa `next/image` a propósito: las galerías dependen de `onError` para caer
 * a su placeholder, y ese contrato se pierde con el componente de Next.
 */
export default function FadeImage({
  className = "",
  onLoad,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Si la imagen ya estaba en caché, `load` puede haber disparado antes de que
  // React hidratara. Sin este chequeo se quedaría invisible para siempre.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      {...rest}
      ref={ref}
      alt={rest.alt ?? ""}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${className} transition-opacity duration-500 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
