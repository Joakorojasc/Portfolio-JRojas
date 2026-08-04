// ─── Cloudinary config ───────────────────────────────────────────────────────
export const CLOUD_NAME = "de0rr5r0l";

/** Optimized Cloudinary image URL */
export function cloudImage(publicId: string, opts = "f_auto,q_auto,w_800") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${opts}/${publicId}`;
}

// Los videos ya no se sirven desde Cloudinary: reels y testimonio son archivos
// locales en public/. Solo queda `cloudImage`, que usan la foto de perfil y los
// carruseles como alternativa a la copia local.

// ─── PROFILE PHOTO ───────────────────────────────────────────────────────────
// Opción A (local): poné tu foto en public/profile-image.jpg y dejá publicId ""
// Opción B (Cloudinary): subí la foto y completá publicId ej. "portfolio-jrojas/profile"
export const PROFILE_PHOTO = {
  publicId: "",
  localSrc: "/profile-image.jpg",
  alt: "Joaquín Rojas — Content Specialist & Editor de Video",
};

// ─── DATO DEL HERO ───────────────────────────────────────────────────────────
// REVISAR: los 4 reels de abajo suman 2,28M de views (1.1M + 987K + 188K + 5K).
// Si el "+6M" incluye carruseles, podcasts y otro trabajo de clientes, está bien
// como está; si no, conviene bajarlo al número que se pueda sostener. El
// AGENTS.md es explícito en no inflar métricas.
export const HEADLINE_STAT = {
  value: "+6M",
  line1: "de views generadas",
  line2: "entre mis clientes",
};

// ─── REELS (videos verticales 9:16) ──────────────────────────────────────────
// Videos propios en public/reels/, bajados de los posts originales, con el
// poster ya extraído al lado. `url` es el post de Instagram (se abre al hacer
// click en "Ver en Instagram" dentro del modal) y `views` es el número real.
//
// `title` y `category` van vacíos a propósito: la prueba es la métrica, no un
// rótulo inventado. Si algún día se completan, la tarjeta los muestra sola.
// Ordenados de más a menos views.
export const REELS: {
  views: string;
  url: string;
  src: string;
  poster: string;
  accent: string;
  title: string;
  category: string;
}[] = [
  {
    views: "1.1M",
    url: "https://www.instagram.com/reel/DVtN8xojWVH/",
    src: "/reels/reel-1.mp4",
    poster: "/reels/reel-1.webp",
    accent: "#9B5CE5",
    title: "",
    category: "",
  },
  {
    views: "987K",
    url: "https://www.instagram.com/reel/DW1NGVGEYev/",
    src: "/reels/reel-4.mp4",
    poster: "/reels/reel-4.webp",
    accent: "#7C6CF0",
    title: "",
    category: "",
  },
  {
    views: "188K",
    url: "https://www.instagram.com/reel/DV9QircmZ5I/",
    src: "/reels/reel-2.mp4",
    poster: "/reels/reel-2.webp",
    accent: "#B47CF0",
    title: "",
    category: "",
  },
  {
    views: "5K",
    url: "https://www.instagram.com/reel/DW1Nwn1ke5-/",
    src: "/reels/reel-3.mp4",
    poster: "/reels/reel-3.webp",
    accent: "#9B5CE5",
    title: "",
    category: "",
  },
];

// ─── CARRUSELES (slides de Instagram) ────────────────────────────────────────
// Cada slide es una imagen. El visor las muestra de a 3 con la del centro en foco;
// al comienzo queda un espacio vacío a la izquierda y al final uno a la derecha.
// Completá publicId (Cloudinary) o localSrc (public/) para mostrar la foto real.
export const CAROUSEL_SLIDES: {
  index: string;
  caption: string;
  accent: string;
  publicId: string;
  localSrc: string;
}[] = [
  { index: "01", caption: "Slide 1", accent: "#9B5CE5", publicId: "", localSrc: "/carruseles/carrusel-1.png" },
  { index: "02", caption: "Slide 2", accent: "#7C6CF0", publicId: "", localSrc: "/carruseles/carrusel-2.png" },
  { index: "03", caption: "Slide 3", accent: "#B47CF0", publicId: "", localSrc: "/carruseles/carrusel-3.png" },
  { index: "04", caption: "Slide 4", accent: "#9B5CE5", publicId: "", localSrc: "/carruseles/carrusel-4.png" },
  { index: "05", caption: "Slide 5", accent: "#7C6CF0", publicId: "", localSrc: "/carruseles/carrusel-5.png" },
  { index: "06", caption: "Slide 6", accent: "#B47CF0", publicId: "", localSrc: "/carruseles/carrusel-6.png" },
];

// ─── YOUTUBE (portadas / miniaturas 16:9) ────────────────────────────────────
// SOLO LA PORTADA, a propósito: sin título, sin canal, sin texto encima y sin
// link. Es una galería visual — el diseño de la portada es el trabajo que se
// muestra. No agregar rótulos acá.
export const YOUTUBE: { thumb: string }[] = [
  { thumb: "/youtube/video-1.webp" },
  { thumb: "/youtube/video-2.webp" },
  { thumb: "/youtube/video-3.webp" },
  { thumb: "/youtube/video-4.webp" },
];

// ─── TESTIMONIO (sección clara, abajo) ───────────────────────────────────────
// Video horizontal 16:9 en public/testimonio/. Se reproduce inline, con sonido
// al darle play (arranca en silencio para no asustar a nadie).
//
// `quote` va vacío a propósito: el testimonio es el video, no una frase suelta.
// Si algún día se transcribe una cita, se muestra automáticamente arriba.
// OJO: el video es VERTICAL 9:16 (576x1024). El original venía con la rotación
// en metadatos (1024x576 + displaymatrix -90°); se regrabó derecho para que no
// dependa de cómo interprete cada navegador esa rotación.
export const TESTIMONIAL = {
  src: "/testimonio/barbertendence.mp4",
  /** Frame extraído del propio video (9:16). */
  poster: "/testimonio/poster.webp",
  client: "BarberTendence",
  /** Qué es el cliente, para que el testimonio tenga peso. */
  clientNote: "Consultora n°1 de Latinoamérica de dueños de barberías",
  quote: "",
  name: "Emmanuel",
  role: "Operator",
};

// ─── CÓMO TRABAJO ────────────────────────────────────────────────────────────
// Párrafo en primera persona (reemplaza la vieja grilla de 5 tarjetas 01-05).
// BORRADOR: revisalo y corregí lo que no sea verdad.
export const WORK_INTRO = [
  "Arranco preguntando más de lo que probablemente esperás. Antes de abrir el proyecto quiero saber a quién le hablás, qué querés que pase después de que terminen de ver, y qué cosas ya probaste que no funcionaron. Eso queda por escrito, y es lo que después me deja tomar decisiones sin tener que consultarte cada corte.",
  "Durante la edición te muestro avances en etapas en vez de desaparecer y reaparecer con un final. Si algo del material no está rindiendo te lo digo, aunque sea incómodo: prefiero discutir una idea a tiempo que entregar algo prolijo que no mueve la aguja. Cuando pido feedback pido el específico, no el «me gusta».",
  "Planifico siempre con margen de sobra —le digo metodología colchón— porque los imprevistos no son una posibilidad, son parte del trabajo. Y cuando el contenido sale, miro cómo rindió de verdad: qué retuvo, dónde se cayó la gente, qué se compartió. Eso vuelve al proyecto siguiente.",
];

// Etiquetas cortas que acompañan al párrafo (sin tarjetas, sin numeritos).
export const VALUES: { title: string; copy: string }[] = [
  {
    title: "Comunicación efectiva",
    copy: "Hablamos claro desde el brief. Todo queda por escrito, sin malentendidos.",
  },
  {
    title: "Alineación continua",
    copy: "Reviso la dirección en cada etapa para entregar justo lo que la marca necesita.",
  },
  {
    title: "Feedback valioso",
    copy: "Aporto criterio editorial: cada cambio suma y el contenido rinde más.",
  },
  {
    title: "Mejora continua",
    copy: "Mido resultados y aplico cada aprendizaje al siguiente proyecto.",
  },
  {
    title: "Metodología colchón",
    copy: "Planifico con margen para absorber imprevistos y entregar siempre a tiempo.",
  },
];

// ─── HERRAMIENTAS / SOFTWARE (iconos del hero) ───────────────────────────────
// Para mostrar el ícono real de cada app, descargá el SVG/PNG y guardalo en
// public/icons/ con el nombre indicado en `file`. Mientras no exista el archivo
// se muestra un monograma con el color de la marca (no se rompe nada).
export const TOOLS: {
  name: string;
  file: string; // archivo dentro de public/icons/  (ej "premiere.svg")
  mono: string; // texto de respaldo si falta el ícono
  color: string;
}[] = [
  { name: "Adobe Premiere Pro", file: "premiere.svg", mono: "Pr", color: "#9999FF" },
  { name: "After Effects", file: "after-effects.svg", mono: "Ae", color: "#C9A0FF" },
  { name: "Canva", file: "canva.svg", mono: "Cv", color: "#9B5CE5" },
  { name: "Flow", file: "flow.svg", mono: "Fl", color: "#7C6CF0" },
  { name: "Claude", file: "claude.svg", mono: "Cl", color: "#B47CF0" },
  { name: "Gemini", file: "gemini.svg", mono: "Gm", color: "#7C6CF0" },
  { name: "Veo", file: "veo.svg", mono: "Ve", color: "#A78BFA" },
  { name: "Notion", file: "notion.svg", mono: "No", color: "#F0F2F5" },
];
