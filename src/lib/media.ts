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

// ─── HERO ────────────────────────────────────────────────────────────────────
/** La línea que va debajo del nombre. Es la promesa, no un currículum. */
export const HERO_TAGLINE =
  "Te ayudo a crear el contenido que tu marca necesita";

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
// `category` lleva el nombre del cliente (dato real, no rótulo inventado);
// `title` sigue vacío a propósito: la prueba es la métrica.
//
// El orden intercala clientes a propósito: la vista inicial del carrusel
// (initialIndex 1 → se ven los items 0-2) muestra un reel de cada cliente,
// no tres del mismo. Dentro de ese intercalado van de más a menos views.
// El accent es fijo por cliente, así el rótulo de color agrupa solo.
//
// `likes`/`comments` son opcionales: si están, la tarjeta los muestra en una
// fila chica con iconos debajo de las reproducciones. Solo cargarlos donde el
// dato sume (el reel de Héctor Muerza destaca por interacción, no por views).
export const REELS: {
  views: string;
  url: string;
  src: string;
  poster: string;
  accent: string;
  title: string;
  category: string;
  likes?: string;
  comments?: string;
}[] = [
  {
    // Re-encodeado del export original (109 MB, 1080x1920) a 720p/crf 24:
    // Instagram no lo sirve sin login, así que este vino del archivo fuente.
    views: "25K",
    url: "https://www.instagram.com/reel/DYmbsSZpkU8/",
    src: "/reels/reel-5.mp4",
    poster: "/reels/reel-5.webp",
    accent: "#B47CF0",
    title: "",
    category: "Héctor Muerza",
    likes: "848",
    comments: "725",
  },
  {
    views: "1.1M",
    url: "https://www.instagram.com/reel/DVtN8xojWVH/",
    src: "/reels/reel-1.mp4",
    poster: "/reels/reel-1.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
  {
    views: "801K",
    url: "https://www.instagram.com/p/DK--lb4NPbV/",
    src: "/reels/reel-6.mp4",
    poster: "/reels/reel-6.webp",
    accent: "#7C6CF0",
    title: "",
    category: "Mariana Bennet",
  },
  {
    views: "987K",
    url: "https://www.instagram.com/reel/DW1NGVGEYev/",
    src: "/reels/reel-4.mp4",
    poster: "/reels/reel-4.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
  {
    views: "300K",
    url: "https://www.instagram.com/reel/DK03EPWtWyT/",
    src: "/reels/reel-7.mp4",
    poster: "/reels/reel-7.webp",
    accent: "#7C6CF0",
    title: "",
    category: "Mariana Bennet",
  },
  {
    views: "279K",
    url: "https://www.instagram.com/reel/DWoYFcQEbCA/",
    src: "/reels/reel-11.mp4",
    poster: "/reels/reel-11.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
  {
    views: "30K",
    url: "https://www.instagram.com/reel/DLIKQOSs9CI/",
    src: "/reels/reel-8.mp4",
    poster: "/reels/reel-8.webp",
    accent: "#7C6CF0",
    title: "",
    category: "Mariana Bennet",
  },
  {
    views: "188K",
    url: "https://www.instagram.com/reel/DV9QircmZ5I/",
    src: "/reels/reel-2.mp4",
    poster: "/reels/reel-2.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
  {
    views: "7K",
    url: "https://www.instagram.com/p/DWRsGumj-H8/",
    src: "/reels/reel-9.mp4",
    poster: "/reels/reel-9.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
  {
    views: "5.5K",
    url: "https://www.instagram.com/reel/DWTv0whEaI5/",
    src: "/reels/reel-10.mp4",
    poster: "/reels/reel-10.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
  {
    views: "5K",
    url: "https://www.instagram.com/reel/DW1Nwn1ke5-/",
    src: "/reels/reel-3.mp4",
    poster: "/reels/reel-3.webp",
    accent: "#9B5CE5",
    title: "",
    category: "Barbertendence",
  },
];

// ─── CARRUSELES (posts de Instagram) ─────────────────────────────────────────
// Un item = un POST, con todas sus slides. La galería muestra la portada (la
// primera slide) de cada post en coverflow; al hacer click en la del centro se
// abre el visor y se pasan las slides de ese post.
//
// Las imágenes salen de public/carruseles/, nombradas cN-MM.webp (N = post en
// el orden de abajo, MM = slide dentro del post). Ver AGENTS.md para bajarlas.
//
// `comments` es el dato real del post. `title` va vacío a propósito, igual que
// en REELS: si se completa, la tarjeta lo muestra.
const slidesOf = (post: number, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `/carruseles/c${post}-${String(i + 1).padStart(2, "0")}.webp`
  );

export const CAROUSELS: {
  url: string;
  comments: string;
  accent: string;
  title: string;
  slides: string[];
}[] = [
  {
    url: "https://www.instagram.com/p/DYXEujtkXko/",
    comments: "90",
    accent: "#9B5CE5",
    title: "",
    slides: slidesOf(1, 8),
  },
  {
    url: "https://www.instagram.com/p/DXW9afwEc2t/",
    comments: "308",
    accent: "#7C6CF0",
    title: "",
    slides: slidesOf(2, 7),
  },
  {
    url: "https://www.instagram.com/p/DYha0ztEXXg/",
    comments: "56",
    accent: "#B47CF0",
    title: "",
    slides: slidesOf(3, 5),
  },
  {
    url: "https://www.instagram.com/p/DW6S-CHkV0v/",
    comments: "147",
    accent: "#9B5CE5",
    title: "",
    slides: slidesOf(4, 5),
  },
  {
    url: "https://www.instagram.com/p/DYFPysKkUP1/",
    comments: "82",
    accent: "#7C6CF0",
    title: "",
    slides: slidesOf(5, 6),
  },
];

// ─── YOUTUBE (portadas / miniaturas 16:9) ────────────────────────────────────
// SOLO LA PORTADA, a propósito: sin título, sin canal, sin texto encima y sin
// link. Es una galería visual — el diseño de la portada es el trabajo que se
// muestra. No agregar rótulos acá.
//
// 26 portadas (video-1 a video-26). El orden está barajado a propósito para
// que al pasar la galería se alternen poses y composiciones distintas en vez
// de verse seguidas las que se parecen — no "ordenar" por número de archivo.
export const YOUTUBE: { thumb: string }[] = [
  // Estas 3 (otro estilo) van primero a pedido de Joaquín.
  { thumb: "/youtube/video-27.webp" },
  { thumb: "/youtube/video-28.webp" },
  { thumb: "/youtube/video-29.webp" },
  { thumb: "/youtube/video-21.webp" },
  { thumb: "/youtube/video-18.webp" },
  { thumb: "/youtube/video-22.webp" },
  { thumb: "/youtube/video-4.webp" },
  { thumb: "/youtube/video-2.webp" },
  { thumb: "/youtube/video-17.webp" },
  { thumb: "/youtube/video-12.webp" },
  { thumb: "/youtube/video-9.webp" },
  { thumb: "/youtube/video-7.webp" },
  { thumb: "/youtube/video-24.webp" },
  { thumb: "/youtube/video-26.webp" },
  { thumb: "/youtube/video-5.webp" },
  { thumb: "/youtube/video-11.webp" },
  { thumb: "/youtube/video-3.webp" },
  { thumb: "/youtube/video-8.webp" },
  { thumb: "/youtube/video-19.webp" },
  { thumb: "/youtube/video-15.webp" },
  { thumb: "/youtube/video-14.webp" },
  { thumb: "/youtube/video-6.webp" },
  { thumb: "/youtube/video-16.webp" },
  { thumb: "/youtube/video-23.webp" },
  { thumb: "/youtube/video-1.webp" },
  { thumb: "/youtube/video-20.webp" },
  { thumb: "/youtube/video-25.webp" },
  { thumb: "/youtube/video-13.webp" },
  { thumb: "/youtube/video-10.webp" },
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
// Dos párrafos en primera persona, texto dictado por Joaquín (agosto 2026).
// Los dos se muestran del mismo tamaño, a pedido suyo.
export const WORK_INTRO = [
  "Me gusta trabajar con personas motivadas, entendiendo bien sus necesidades y siendo un estratega proactivo del equipo. Trabajo con entrega anticipada y soy flexible a lo que necesites.",
  "Entiendo profundamente tus requerimientos, para minimizar al máximo el tiempo que le dediques a revisión, solicito feedback constante en una etapa inicial. Mis entregas las hago con entrega anticipada, le digo la metodología colchón. Trabajo solamente con gente que sé que podré ayudar.",
];

// Foto que acompaña a esos párrafos, a la derecha. Es el escritorio real de
// Joaquín editando — vale más que un diagrama genérico. Si se reemplaza,
// dejar el archivo en public/work/ y actualizar `src`; vacío = placeholder.
export const WORK_IMAGE = {
  src: "/work/foto-trabajo.webp",
  alt: "El escritorio de Joaquín: monitor con una pieza en edición, notebook y teclado",
};

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
