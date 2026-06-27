<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Portfolio — Joaquín Rojas (Content Specialist & Editor de Video)

Sitio de una sola página (Next.js 16 + React 19 + Tailwind v4 + framer-motion + lucide-react)
para mostrar el trabajo de Joaquín y conseguir clientes.

## Estrategia / dirección de diseño

El objetivo es que se vea **profesional y de editor con experiencia, NO "hecho con IA"**.
Reglas que mantienen ese criterio (respetarlas en cualquier cambio):

- **El trabajo lidera, no la cara.** Nada de foto gigante de apertura. El hero combina
  persona + trabajo real arriba (foto + un reel + una portada).
- **Minimalismo y aire.** Mucho espacio negativo; layout compacto (no estirar a los lados).
  Contenedores `max-w-[1180px]`, padding lateral `px-5 md:px-10`.
- **Un solo acento (violeta) sobre negro.** Cero arcoíris, cero glows por todos lados.
  El color lo aporta el contenido (los thumbnails), no la decoración.
- **El dato convence.** Prueba social concreta: `+6M de views entre clientes` (inline en el
  hero, NO una sección entera de stats).
- **Evitar señales de IA:** métricas infladas, gradientes/blobs por todos lados, reproductores
  falsos. Si algo es decorativo y no aporta, va fuera.

## Paleta (negro + violeta, tinte berenjena)

Definida en `src/app/globals.css` (`@theme` + utilidades). Las clases CSS históricas se
llaman `*-gold` por legado pero **son violeta** (`gradient-text-gold`, `glass-gold`,
`glow-gold`, `divider-gold`).

| Rol | Color |
|-----|-------|
| Fondo base (berenjena oscuro) | `#0A0711` |
| Superficies | `#120D1C` / `#18121F` / `#221A2E` |
| Acento principal | `#9B5CE5` |
| Hover / brillo | `#B47CF0` |
| Violeta frío (secundario) | `#7C6CF0` |
| Gradiente dual-tono (nombre, números) | `#8B5CF6 → #C77DFF → #9B5CE5` |
| Texto | `#F2EEF8` · Muted lavanda `#948BA8` |

Botón primario único: `bg-[#9B5CE5] text-white hover:bg-[#B47CF0]`.

## Estructura de la página (`src/app/page.tsx`)

`Navigation → Hero → [#portfolio: Reels → YouTube → Carruseles] → Valores → Footer`

| Componente | Qué hace |
|-----------|----------|
| `Navigation.tsx` | Navbar fija con logo (anillo gradiente + "Joaquín Rojas"), nav en pill de cristal con **scrollspy** (indicador activo animado vía `layoutId`), CTA violeta, menú mobile. |
| `Hero.tsx` | 2 columnas. Izq: kicker, nombre (gradiente), frase, `+6M` inline, CTAs, herramientas. Der: foto (`/profile-image.jpg`) con 2 `HeroPeek`: 1 reel (9:16 → `#reels`) y 1 portada de podcast (1:1 → `#youtube`), con hover (rota a la mitad) y scroll al click. |
| `ReelsSection.tsx` | Portadas de reels en **coverflow 3D** (`FocusCarousel` con `tilt`). Click en la central abre **modal con reproducción real**: play/pausa (click en video o botón central), mute, fullscreen, anterior/siguiente, Escape. `id="reels"`. |
| `YouTubeSection.tsx` | Slider 16:9 de **portadas** (solo portada, no reproduce). Click abre `url` en pestaña nueva. `id="youtube"`. Placeholder sobrio si falta la imagen. |
| `CarouselSection.tsx` | Slides de Instagram (3:4) en `FocusCarousel`. |
| `ValuesSection.tsx` | "Cómo trabajo" — 5 valores en un bloque. `id="valores"`. |
| `Footer.tsx` | CTA de contacto, copiar email, disponibilidad, redes. `id="contacto"`. |
| `FocusCarousel.tsx` | Carrusel genérico reutilizable: bloque central en foco, laterales atenuados/escalados; prop `tilt` para efecto 3D coverflow; fantasmas a los lados. |
| `ToolIcon.tsx` | Chip de herramienta. Muestra el SVG de `public/icons/` si existe; si no, monograma (fallback robusto que detecta 404 pre-hidratación). |

## Datos — TODO vive en `src/lib/media.ts`

No hardcodear contenido en los componentes. Editar estos exports:

- `PROFILE_PHOTO` — foto (local `/profile-image.jpg` o Cloudinary).
- `REELS` — reels verticales (Cloudinary `publicId`, `posterTime`, `category`, `title`, `accent`).
- `CAROUSEL_SLIDES` — slides de carrusel (local en `public/carruseles/`).
- `YOUTUBE` — 4 portadas 16:9: `thumb` (`public/youtube/video-N.jpg`), `url`, `title`, `channel`, `views`.
- `VALUES` — valores de "Cómo trabajo".
- `TOOLS` — software del hero (`file` en `public/icons/`, `mono` de respaldo, `color`).

Helpers Cloudinary: `cloudImage`, `cloudVideo`, `cloudPoster` (CLOUD_NAME `de0rr5r0l`).

## Assets que faltan subir (no rompen nada, muestran placeholder)

- `public/icons/*.svg` — logos de apps (premiere, after-effects, canva, flow, claude, gemini, veo, notion). Fuente: simpleicons.org. Sin ellos se ve el monograma.
- `public/youtube/video-1..4.jpg` — portadas 16:9 + completar `url` en `YOUTUBE`.
- Verificar que las métricas/`views` de `REELS` y el `+6M` sean reales.
- Links de redes del Footer (hoy `#`).

## Dev

`npm run dev` (corre en `0.0.0.0:3000`). El script imprime un aviso de IP que puede fallar en
algunos sistemas — no afecta al server.
