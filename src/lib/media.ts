// ─── Cloudinary config ───────────────────────────────────────────────────────
export const CLOUD_NAME = "de0rr5r0l";

/** Optimized Cloudinary image URL */
export function cloudImage(publicId: string, opts = "f_auto,q_auto,w_800") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${opts}/${publicId}`;
}

/** Optimized Cloudinary video URL */
export function cloudVideo(publicId: string, opts = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${opts}/${publicId}.mp4`;
}

/** Poster (still frame) from a Cloudinary video */
export function cloudPoster(publicId: string, time = 0) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_${time}/${publicId}.jpg`;
}

// ─── PROFILE PHOTO ───────────────────────────────────────────────────────────
// Opción A (local): poné tu foto en public/profile-image.jpg y dejá publicId ""
// Opción B (Cloudinary): subí la foto y completá publicId ej. "portfolio-jrojas/profile"
export const PROFILE_PHOTO = {
  publicId: "",
  localSrc: "/profile-image.jpg",
  alt: "Joaquín Rojas — Content Specialist & Editor de Video",
};

// ─── REELS (videos verticales 9:16) ──────────────────────────────────────────
// Agregá los que quieras: el carrusel los muestra de a 3 con el del centro en foco.
// Opción A (local): poné los videos en public/reel-1.mp4, etc.
// Opción B (Cloudinary): completá publicId ej. "portfolio-jrojas/reel-1"
export const REELS: {
  title: string;
  category: string;
  views: string;
  likes: string;
  comments: string;
  accent: string;
  publicId: string;
  localSrc: string;
  posterTime: number; // segundo del video que se muestra como preview
}[] = [
  {
    title: "Campaña de Marca",
    category: "Brand Story",
    views: "84K",
    likes: "6.2K",
    comments: "312",
    accent: "#9B5CE5",
    publicId: "Reel_bb_vu4z7r",
    localSrc: "/reel-1.mp4",
    posterTime: 4,
  },
  {
    title: "Lanzamiento de Producto",
    category: "Commercial",
    views: "112K",
    likes: "9.8K",
    comments: "540",
    accent: "#7C6CF0",
    publicId: "reel_esqueletos_j77441",
    localSrc: "/reel-2.mp4",
    posterTime: 0,
  },
  {
    title: "Narrativa Personal",
    category: "Storytelling",
    views: "53K",
    likes: "4.1K",
    comments: "188",
    accent: "#B47CF0",
    publicId: "reel1_optimizado_nldy8h",
    localSrc: "/reel-3.mp4",
    posterTime: 5,
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
// Slider de portadas de YouTube. Para cada una poné:
//  - thumb: imagen 16:9 (localSrc en public/youtube/ o URL de Cloudinary)
//  - url:   link al video (se abre en pestaña nueva al hacer click)
// Mientras falte la imagen se muestra un placeholder sobrio (no se rompe nada).
export const YOUTUBE: {
  title: string;
  channel: string;
  views: string;
  thumb: string; // ej "/youtube/video-1.jpg"  o URL completa
  url: string;   // ej "https://youtu.be/XXXX"
}[] = [
  { title: "Título del video 1", channel: "Cliente / Canal", views: "—", thumb: "/youtube/video-1.jpg", url: "#" },
  { title: "Título del video 2", channel: "Cliente / Canal", views: "—", thumb: "/youtube/video-2.jpg", url: "#" },
  { title: "Título del video 3", channel: "Cliente / Canal", views: "—", thumb: "/youtube/video-3.jpg", url: "#" },
  { title: "Título del video 4", channel: "Cliente / Canal", views: "—", thumb: "/youtube/video-4.jpg", url: "#" },
];

// ─── VALORES ─────────────────────────────────────────────────────────────────
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
