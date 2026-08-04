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

`Navigation → Hero → [#portfolio: Reels → YouTube → Carruseles] → Valores → Testimonio → Footer`

Del quiebre `paper-fade` para abajo el sitio es claro: Valores, Testimonio y Footer
comparten la clase `paper`.

| Componente | Qué hace |
|-----------|----------|
| `Navigation.tsx` | Navbar fija con logo (anillo gradiente + "Joaquín Rojas"), nav en pill de cristal con **scrollspy** (indicador activo animado vía `layoutId`), CTA violeta, menú mobile. |
| `Hero.tsx` | 2 columnas. Izq: kicker, nombre (gradiente), frase, `+6M` inline, CTAs, herramientas. Der: foto (`/profile-image.jpg`) con 2 `HeroPeek`: 1 reel (9:16 → `#reels`) y 1 portada de podcast (1:1 → `#youtube`), con hover (rota a la mitad) y scroll al click. |
| `ReelsSection.tsx` | Portadas de reels en **coverflow 3D** (`FocusCarousel` con `tilt`). La tarjeta lleva las **reproducciones reales** como dato principal (el título solo aparece si se carga). Click en la central abre **modal con reproducción real** desde el mp4 local: play/pausa, mute, fullscreen, anterior/siguiente, Escape y link al post original. `id="reels"`. |
| `YouTubeSection.tsx` | Galería 16:9 de **portadas** en coverflow 3D (`tilt` en laterales + `focusTilt` en la central, que queda inclinada hacia la izquierda con sombra direccional). No reproduce ni linkea. `id="youtube"`. El rótulo (canal + título) **solo se dibuja si hay datos reales** en `YOUTUBE`; vacío = portada limpia. Placeholder sobrio si falta la imagen. |
| `CarouselSection.tsx` | Slides de Instagram (3:4) en `FocusCarousel`. |
| `ValuesSection.tsx` | "Cómo trabajo" — 5 valores en un bloque. `id="valores"`. |
| `TestimonialSection.tsx` | Testimonio de cliente en la zona clara. Video 16:9 con reproductor propio: play/pausa, mute, barra de progreso accesible (`role="slider"`, flechas/Home/End) y tiempo. Sin `poster` usa el fragmento `#t=` para evitar el primer frame negro, y al primer play vuelve a 0. Cita, nombre y cargo se renderizan solo si están cargados. `id="testimonio"`. |
| `Footer.tsx` | CTA de contacto y copiar email. `id="contacto"`. **No lleva iconos de redes**: Joaquín no tiene perfiles propios que mostrar, el trabajo vive en las cuentas de los clientes. No volver a agregarlos. |
| `FocusCarousel.tsx` | Carrusel genérico reutilizable: bloque central en foco, laterales atenuados/escalados; fantasmas a los lados. `tilt` = grados de giro 3D de los laterales (coverflow); `focusTilt` = giro constante del bloque central (0 por defecto, así Reels y Carruseles quedan de frente). |
| `ToolIcon.tsx` | Chip de herramienta. Muestra el SVG de `public/icons/` si existe; si no, monograma (fallback robusto que detecta 404 pre-hidratación). |

## Datos — TODO vive en `src/lib/media.ts`

No hardcodear contenido en los componentes. Editar estos exports:

- `PROFILE_PHOTO` — foto (local `/profile-image.jpg` o Cloudinary).
- `HEADLINE_STAT` — el dato grande del hero (`+6M`). Ver la nota del archivo antes de tocarlo.
- `REELS` — reels verticales: `src` y `poster` locales (`public/reels/`), `url` del post original, `views` real, `accent`. `title`/`category` vacíos = tarjeta sin rótulo.
- `CAROUSEL_SLIDES` — slides de carrusel (local en `public/carruseles/`).
- `YOUTUBE` — solo `thumb`. Sin título, sin canal, sin link: **es a propósito**, la portada se muestra sola.
- `TESTIMONIAL` — testimonio: `src`, `poster`, `client`, `clientNote`, `quote`, `name`, `role`.
- `VALUES` — valores de "Cómo trabajo".
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
2. **Poster del video** — `ffmpeg -ss 1 -i video.mp4 -frames:v 1 tmp.png` y después
   pasarlo por sharp a WebP. Conviene chequear que el frame no salga casi negro.
3. **Rotación de los verticales** — las dimensiones crudas mienten. El testimonio venía
   `1024x576` + `displaymatrix: -90°`, o sea vertical. Verificar siempre con `ffmpeg -i`;
   si hay rotación en metadatos, regrabar derecho para no depender del navegador:
   `ffmpeg -i in.mp4 -c:v libx264 -crf 24 -movflags +faststart out.mp4`

## Pendientes

- `public/icons/*.svg` — logos de apps (premiere, after-effects, canva, flow, claude, gemini, veo, notion). Fuente: simpleicons.org. Sin ellos se ve el monograma.
- Revisar `HEADLINE_STAT`: los 4 reels suman 2,28M de views, no 6M.
- Carruseles: hay 6 imágenes en `public/carruseles/` pero el material de origen trae 5 posts. Falta una o sobra.
- Peso versionado: `public/reels/` (18,8 MB) + `public/testimonio/` (11,7 MB) ≈ 30 MB de video en git. Si molesta, mover a un CDN o a Git LFS.

## Dev

`npm run dev` (corre en `0.0.0.0:3000`). El script imprime un aviso de IP que puede fallar en
algunos sistemas — no afecta al server.
