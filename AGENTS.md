<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Portfolio — Joaquín Rojas (Content Specialist & Editor de Video)

Sitio de una sola página (Next.js 16 + React 19 + Tailwind v4 + framer-motion +
lucide-react) para mostrar el trabajo de Joaquín y conseguir clientes.

**La estrategia de negocio vive en `ESTRATEGIA.md`.** Este archivo es lo técnico.

## Estrategia / dirección de diseño

El objetivo es que se vea **profesional y de editor con experiencia, NO "hecho
con IA"**. Reglas que mantienen ese criterio (respetarlas en cualquier cambio):

- **El criterio lidera, no las piezas.** Los casos van arriba y se cuentan por
  la decisión que hubo detrás. Las galerías de piezas están en "Archivo", abajo:
  demuestran oficio pero no son el argumento de venta.
- **Papel de punta a punta.** Nada de fondo negro. Minimalismo y aire;
  contenedores `max-w-[1180px]`, padding lateral `px-5 md:px-10`.
- **Un solo acento (violeta) + el ámbar reservado a números.** Esa regla
  semántica no es negociable: si el ámbar aparece en algo que no es un dato,
  vuelve a ser decoración.
- **El dato convence.** `+6M de views` inline en el hero, y datos duros en cada
  caso. Si un dato no se puede sostener en una llamada, se saca.
- **Evitar señales de IA.** Antes de dar cualquier cambio visual por terminado,
  correr la auditoría de la skill `~/.claude/skills/landing-humana/`.

### Lo que ya se sacó por ser señal de IA — no reintroducir

- Gradientes de fondo y de texto (el nombre del hero era gradiente).
- Glows y halos radiales; glassmorphism con blur alto.
- Mayúsculas finas con tracking abierto (`uppercase tracking-[0.28em]`).
- La navbar de píldora flotante con blur + logo en anillo con gradiente.
- Colores de marca en los chips de herramientas (arcoíris de 8 colores).
- Em dashes en el copy visible.
- Filetes verticales de columna (probados y descartados por preferencia).
- Segunda familia tipográfica (probada con Instrument Serif y descartada: el
  contraste lo dan el peso y el tamaño, no otra fuente).

## Paleta

Definida en `src/app/globals.css` (`@theme` + utilidades). **Las clases CSS se
llaman `*-gold` por legado pero son VIOLETA** (`gradient-text-gold`,
`glass-gold`, `glow-gold`, `divider-gold`).

| Rol | Color |
|-----|-------|
| Papel (fondo base) | `#F7F4EF` |
| Papel hundido (secciones alternas) | `#F1EDE6` |
| Superficies / cards | `#EAE5DC` · `#DFD9CE` |
| Tinta (texto) | `#141210` · Apagado `#6B655C` |
| Acento principal | `#6D28D9` |
| Hover / profundo | `#5B21B6` · Brillante `#7C3AED` · Dim `#4C1D95` |
| **Ámbar — SOLO números** | `#C2410C` |

Botón primario: `bg-[#6D28D9] text-white hover:bg-[#5B21B6]`.

## Tipografía

Una sola familia: **Geist** (300–900). El contraste sale del peso y del tamaño.
**Geist Mono** entra sólo en numeración y etiquetas, vía la clase `.tick`.

## Mobiliario editorial

Utilidades en `globals.css` que le dan a la página el registro de imprenta:

| Clase | Qué hace |
|-------|----------|
| `.grain` | Ruido SVG inline fijo sobre toda la página (en `<body>`), multiply al 42%. Si se ve sucio bajar a 0.25; para más papel subir a 0.6. |
| `.tick` | Etiqueta en mono, 11px, caja normal. Folios, estados, referencias. |
| `.marginalia` | Nota al margen en mono, rotada −1.5°. |
| `.rule-ink` | Filete horizontal de tinta al 12%. |
| `.paper` / `.paper-sunk` | Bandas de fondo alternas. |

## Estructura de la página (`src/app/page.tsx`)

`Navigation → Hero → 01 Casos → 02 Cómo trabajo → 03 Método → 04 Archivo (Reels, YouTube, Carruseles) → 05 Lofi → Footer`

| Componente | Qué hace |
|-----------|----------|
| `Navigation.tsx` | Cabecera de diario: logotipo de texto, folio `NN / 06` de sección activa, enlaces planos con subrayado animado (`layoutId`), fondo sólido + filete al hacer scroll. Nada flota. |
| `Hero.tsx` | 2 columnas. Izq: kicker, nombre en `font-extrabold`, frase, `+6M` en ámbar, CTAs, herramientas. Der: foto con 2 `HeroPeek` (un reel y una portada) que llevan a su sección. |
| `SectionHead.tsx` | Encabezado compartido: filete, folio en mono, título pesado y nota al margen. Usarlo para cualquier sección nueva. |
| `CasesSection.tsx` | `id="casos"`. Los 3 casos: meta + datos en ámbar a la izquierda, relato y portada a la derecha. |
| `ValuesSection.tsx` | `id="valores"`. `WORK_INTRO` en primera persona + las etiquetas de `VALUES`. |
| `ProcessSection.tsx` | `id="proceso"`. Los tableros de Miro con placeholder instructivo. Uno grande arriba y dos abajo. |
| `ReelsSection.tsx` | Coverflow 3D (`FocusCarousel` con `tilt`). Click en el central abre modal con reproducción real. `id="reels"`. |
| `YouTubeSection.tsx` | Slider 16:9 de portadas. `id="youtube"`. |
| `CarouselSection.tsx` | Slides de Instagram (3:4) en `FocusCarousel`. |
| `LofiSection.tsx` | `id="lofi"`. Proyecto personal: relato, fotograma y catálogo de ciudades. |
| `Footer.tsx` | `id="contacto"`. CTA, copiar email, redes. |
| `FocusCarousel.tsx` | Carrusel genérico: bloque central en foco, laterales atenuados; prop `tilt` para coverflow. |
| `ToolIcon.tsx` | Chip de herramienta. SVG de `public/icons/` si existe; si no, monograma en tinta. |

## Datos — TODO vive en `src/lib/media.ts`

No hardcodear contenido en los componentes. Exports: `PROFILE_PHOTO`, `REELS`,
`CAROUSEL_SLIDES`, `YOUTUBE`, `WORK_INTRO`, `VALUES`, `TOOLS`, `CASES`,
`DIAGRAMS`, `LOFI`.

Helpers Cloudinary: `cloudImage`, `cloudVideo`, `cloudPoster` (CLOUD_NAME `de0rr5r0l`).

### Patrón de placeholder instructivo

Cuando falta una imagen, el hueco **dice qué imagen va ahí** (borde punteado
violeta + rótulo + ideas con asterisco). Los campos `hints` / `coverHint` /
`stillHint` existen para eso. Mantener el patrón en cualquier imagen nueva.

La detección de imagen faltante usa `onError` **más** un `useEffect` que
chequea `img.complete && img.naturalWidth === 0`, porque si el 404 ocurre antes
de hidratar `onError` no dispara. El placeholder es client-side: no aparece en
el HTML del servidor.

## Voz del copy

Español de Chile, tuteo. Nada de voseo argentino (`tenés`, `poné`, `prolijo`).
Sin em dashes en texto visible. Sin adjetivos sueltos: las cualidades se
muestran con una conducta concreta, no se declaran.

## Assets que faltan (no rompen nada, muestran placeholder)

- `public/casos/` — `barbertendence.jpg`, `hector-muerza.jpg`, `mariana.jpg`
- `public/diagramas/` — `4p.jpg`, `hook-body-cta.jpg`, `ciclo-14-dias.jpg`
- `public/lofi/` — `puerto-varas.jpg`
- `public/youtube/` — `video-1..4.jpg` + completar títulos reales en `YOUTUBE`
- `public/icons/` — logos de apps (simpleicons.org)
- Links de redes del Footer (hoy `#`)
- **Verificar que el `+6M` y las views de `REELS` sean reales.**

## Dev

`npm run dev` (corre en `0.0.0.0:3000`).

**Aviso:** con `WATCHPACK_POLLING=true` el watcher a veces no rebuildea
`globals.css`; si una utilidad nueva no aparece, `rm -rf .next` y reiniciar.
