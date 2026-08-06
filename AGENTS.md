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
  falsos. Si algo es decorativo y no aporta, va fuera. También cuenta como señal de IA la
  **prosa genérica**: listas de virtudes abstractas ("comunicación efectiva", "mejora
  continua"), párrafos parejos y largos, y texto que explica lo que el diseño ya muestra.
  Menos texto y más concreto siempre gana.
- **La acción tiene que ser evidente sin hover.** Buena parte del tráfico es táctil: si una
  tarjeta se abre, el botón que lo dice va visible, no escondido detrás del mouse.
- **El hover confirma, no informa.** Todo lo interactivo responde al mouse, y responde en el
  elemento entero (si la tarjeta es clickeable, el botón de adentro reacciona al hover de la
  tarjeta, no solo del círculo). Al revés también vale: **lo que no hace nada no lleva
  `cursor-pointer` ni hover** — prometer un click que no existe es peor que no dar feedback.
- **Nada aparece de golpe.** Imágenes con `FadeImage`, cambios de estado con `transition`, y
  los movimientos con el mismo resorte (`stiffness: 300, damping: 26`) o el easing de entrada
  `[0.22, 1, 0.36, 1]`. Consistencia antes que variedad.

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

`Navigation → Hero → [#portfolio: Reels → YouTube → Carruseles] → Valores → Testimonio → Footer`

Del quiebre `PaperBreak` para abajo el sitio es claro: Valores, Testimonio y Footer
comparten la clase `paper`. El quiebre es una onda SVG de dos capas con parallax de
scroll (`PaperBreak.tsx`) — reemplazó a un degradado lineal que se veía barroso.

| Componente | Qué hace |
|-----------|----------|
| `Navigation.tsx` | Navbar fija con logo (anillo gradiente + "Joaquín Rojas"), nav en pill de cristal con **scrollspy** (indicador activo animado vía `layoutId`), CTA violeta, menú mobile. |
| `Hero.tsx` | 2 columnas. Izq: kicker, nombre (gradiente), `HEADLINE_STAT` inline, CTAs, herramientas. Der: foto (`/profile-image.jpg`) con 2 `HeroPeek`: 1 reel (9:16 → `#reels`) y 1 portada de podcast (**16:9** → `#youtube`). El `aspect` de cada peek tiene que coincidir con el de su imagen: la portada estaba en 1:1 y `object-cover` recortaba media imagen. Los dos son responsive porque se salen de la columna de 360px y en mobile `overflow-x: hidden` les come el borde. |
| `ReelsSection.tsx` | Portadas de reels en **coverflow 3D** (`FocusCarousel` con `tilt`). La tarjeta lleva las **reproducciones reales** como dato principal (el título solo aparece si se carga). Click en la central abre **modal con reproducción real** desde el mp4 local: play/pausa, mute, fullscreen, anterior/siguiente, Escape y link al post original. `id="reels"`. |
| `YouTubeSection.tsx` | Galería 16:9 de **portadas** en coverflow 3D (`tilt` en laterales + `focusTilt` en la central, que queda inclinada hacia la izquierda con sombra direccional). No reproduce ni linkea. `id="youtube"`. El rótulo (canal + título) **solo se dibuja si hay datos reales** en `YOUTUBE`; vacío = portada limpia. Placeholder sobrio si falta la imagen. |
| `CarouselSection.tsx` | Un item = un **post** de Instagram. Para que se lea como un grupo y no como una foto suelta, la tarjeta se dibuja como un **mazo**: detrás de la portada asoman las **slides 2 y 3 reales** (giradas, offset y oscurecidas — no rectángulos vacíos, así se ve *qué* hay adentro y no solo que hay algo), badge "N slides" (con la palabra, no solo el número) y un botón "Ver todas" siempre visible en la enfocada — en touch no hay hover, así que no puede depender del mouse. El visor pasa las slides con flechas sobre la imagen, **tira de miniaturas**, arrastre, teclado y Escape. `id="carruseles"`. |
| `ValuesSection.tsx` | "Cómo trabajo" — 2 párrafos en primera persona (mismo tamaño los dos, pedido de Joaquín) que entran con un barrido de clip-path, más un espacio del 35% a la derecha para el diagrama de flujo (`WORK_IMAGE` en media.ts; placeholder sobrio mientras esté vacío). `id="valores"`. |
| `TestimonialSection.tsx` | Testimonio de cliente en la zona clara. Video **vertical 9:16** acotado a 320px con la atribución al costado. Reproductor propio: play/pausa, mute, barra de progreso accesible (`role="slider"`, flechas/Home/End) y tiempo. Cita, nombre y cargo se renderizan solo si están cargados. `id="testimonio"`. |
| `Footer.tsx` | CTA de contacto: WhatsApp (botón primario, con el glifo oficial inline) + email + copiar. Cierra con "¡Trabajemos juntos!" centrado — sin © ni cargo, a pedido de Joaquín. `id="contacto"`. **No lleva iconos de redes**: Joaquín no tiene perfiles propios que mostrar, el trabajo vive en las cuentas de los clientes. No volver a agregarlos. |
| `FocusCarousel.tsx` | Carrusel genérico reutilizable: bloque central en foco, laterales atenuados/escalados; fantasmas a los lados. `tilt` = grados de giro 3D de los laterales (coverflow); `focusTilt` = giro constante del bloque central (0 por defecto, así Reels y Carruseles quedan de frente). Es **focusable y navegable con teclado** (flechas, Home/End, Enter/espacio dispara `onFocusedClick`). `padY` = aire vertical dentro del wrapper: como recorta con `overflow-hidden`, sin eso se cortan las sombras grandes y las hojas apiladas que dibujan los items fuera de su caja. |
| `ToolIcon.tsx` | Chip de herramienta. Muestra el SVG de `public/icons/` si existe; si no, monograma (fallback robusto que detecta 404 pre-hidratación). |
| `MotionProvider.tsx` | Envuelve la app en `MotionConfig reducedMotion="user"`. La regla CSS de `prefers-reduced-motion` no alcanza sola porque framer-motion anima por JS. |
| `FadeImage.tsx` | `<img>` que entra con un fundido en vez de saltar. Reemplaza al `<img>` crudo en las galerías. Contempla el caso de la imagen cacheada (si `load` disparó antes de hidratar, se quedaría invisible). No es `next/image` porque las galerías dependen de `onError` para caer a su placeholder. |

Helper: `src/lib/useLockBodyScroll.ts` — bloquea el scroll del fondo con un modal
abierto y compensa el ancho de la barra para que la página no salte. Lo usan los
visores de Reels y Carruseles.

## Datos — TODO vive en `src/lib/media.ts`

No hardcodear contenido en los componentes. Editar estos exports:

- `PROFILE_PHOTO` — foto (local `/profile-image.jpg` o Cloudinary).
- `HEADLINE_STAT` — el dato grande del hero (`+6M`). Ver la nota del archivo antes de tocarlo.
- `REELS` — reels verticales: `src` y `poster` locales (`public/reels/`), `url` del post original, `views` real, `accent`. `title`/`category` vacíos = tarjeta sin rótulo.
- `CAROUSELS` — un objeto por **post**: `url`, `comments` real, `accent`, `title` (vacío = sin rótulo) y `slides` (rutas a `public/carruseles/cN-MM.webp`, generadas con el helper `slidesOf`).
- `YOUTUBE` — solo `thumb`. Sin título, sin canal, sin link: **es a propósito**, la portada se muestra sola.
- `TESTIMONIAL` — testimonio: `src`, `poster`, `client`, `clientNote`, `quote`, `name`, `role`.
- `WORK_INTRO` — los 2 párrafos de "Cómo trabajo". Es la voz de Joaquín: no inflarlo ni volver a agregarle una grilla de valores abstractos.
- `TOOLS` — software del hero (`file` en `public/icons/`, `mono` de respaldo, `color`).

**Los videos ya no van por Cloudinary**: reels y testimonio son archivos locales en
`public/`. Del módulo solo sobrevive `cloudImage`, que usan la foto de perfil y los
carruseles como alternativa a la copia local.

## Imágenes: optimizar antes de subir

`sharp` ya viene con Next. Las portadas se sirven con `<img>` plano (no `next/image`,
porque el fallback a placeholder depende de `onError`), así que **el archivo tiene que
venir liviano de origen**. Receta usada para las portadas de YouTube — WebP, 1600px de
ancho, `quality: 82` (7,3 MB de PNG → 378 KB en total):

```js
sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out)
```

## Bajar material nuevo

`yt-dlp` y `ffmpeg` se instalan con pip: `pip install yt-dlp imageio-ffmpeg`
(el binario de ffmpeg queda en `site-packages/imageio_ffmpeg/binaries/`).

1. **Reel de Instagram** — anda sin cookies:
   `python -m yt_dlp -o "public/reels/reel-N.%(ext)s" <url-del-post>`
1b. **Slides de un carrusel** — `gallery-dl` rebota al login, así que no sirve. Lo que
   funciona es usar yt-dlp como lector de metadata y bajar las imágenes a mano:
   `python -m yt_dlp -J --ignore-no-formats-error <url>` devuelve un `entries[]` con una
   entrada por slide; el **último** `thumbnails[]` de cada una es el original sin recortar
   (1080x1440). Descargar esas URLs y pasarlas por sharp a WebP (ancho 1000, `quality: 80`).
2. **Poster del video** — `ffmpeg -ss 1 -i video.mp4 -frames:v 1 tmp.png` y después
   pasarlo por sharp a WebP. Conviene chequear que el frame no salga casi negro.
3. **Rotación de los verticales** — las dimensiones crudas mienten. El testimonio venía
   `1024x576` + `displaymatrix: -90°`, o sea vertical. Verificar siempre con `ffmpeg -i`;
   si hay rotación en metadatos, regrabar derecho para no depender del navegador:
   `ffmpeg -i in.mp4 -c:v libx264 -crf 24 -movflags +faststart out.mp4`

## Pendientes

- `public/icons/*.svg` — logos de apps (premiere, after-effects, canva, flow, claude, gemini, veo, notion). Fuente: simpleicons.org. Sin ellos se ve el monograma.
- Revisar `HEADLINE_STAT`: los 4 reels suman 2,28M de views, no 6M.
- Peso versionado: `public/reels/` (18,8 MB) + `public/testimonio/` (11,7 MB) ≈ 30 MB de video en git. Si molesta, mover a un CDN o a Git LFS.

## Dev

`npm run dev` (corre en `0.0.0.0:3000`). El script imprime un aviso de IP que puede fallar en
algunos sistemas — no afecta al server.
