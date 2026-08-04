"use client";

import { useEffect } from "react";

/**
 * Bloquea el scroll del fondo mientras hay un modal abierto. Sin esto la página
 * sigue desplazándose detrás del visor, que es de las cosas que más delatan que
 * el modal está mal hecho.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // Compensar el ancho de la barra de scroll evita que el contenido salte
    // hacia la derecha en el momento de abrir.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}
