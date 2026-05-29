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

// ─── PROFILE PHOTO ───────────────────────────────────────────────────────────
// Opción A (local): poné tu foto en public/profile-image.jpg y dejá publicId ""
// Opción B (Cloudinary): subí la foto y completá publicId ej. "portfolio-jrojas/profile"
export const PROFILE_PHOTO = {
  publicId: "",
  localSrc: "/profile-image.jpg",
  alt: "Joaquín Rojas — Content Specialist & Editor de Video",
};

// ─── REELS (3 videos verticales 9:16) ────────────────────────────────────────
// Opción A (local): poné los videos en public/reel-1.mp4, reel-2.mp4, reel-3.mp4
// Opción B (Cloudinary): completá publicId ej. "portfolio-jrojas/reel-1"
export const REELS: {
  title: string;
  category: string;
  views: string;
  likes: string;
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
    accent: "#4F7EFF",
    publicId: "reel_esqueletos_j77441",
    localSrc: "/reel-2.mp4",
    posterTime: 0,
  },
  {
    title: "Narrativa Personal",
    category: "Storytelling",
    views: "53K",
    likes: "4.1K",
    accent: "#C9A96E",
    publicId: "reel1_optimizado_nldy8h",
    localSrc: "/reel-3.mp4",
    posterTime: 5,
  },
];

// ─── PODCAST ─────────────────────────────────────────────────────────────────
export const PODCAST_VIDEO = {
  publicId: "", // ← e.g. "portfolio-jrojas/podcast-ep1"
  title: "La psicología detrás de un buen gancho",
  subtitle: "EP 01 · Masterclass",
  duration: "42:18",
};
