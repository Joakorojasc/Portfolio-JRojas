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
// Opción A (local): pon tu foto en public/profile-image.jpg y deja publicId ""
// Opción B (Cloudinary): sube la foto y completa publicId ej. "portfolio-jrojas/profile"
export const PROFILE_PHOTO = {
  publicId: "",
  localSrc: "/profile-image.jpg",
  alt: "Joaquín Rojas · Content Specialist & Editor de Video",
};

// ─── REELS (videos verticales 9:16) ──────────────────────────────────────────
// Agrega los que quieras: el carrusel los muestra de a 3 con el del centro en foco.
// Opción A (local): pon los videos en public/reel-1.mp4, etc.
// Opción B (Cloudinary): completa publicId ej. "portfolio-jrojas/reel-1"
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
    accent: "#6D28D9",
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
    accent: "#7C3AED",
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
    accent: "#5B21B6",
    publicId: "reel1_optimizado_nldy8h",
    localSrc: "/reel-3.mp4",
    posterTime: 5,
  },
];

// ─── CARRUSELES (slides de Instagram) ────────────────────────────────────────
// Cada slide es una imagen. El visor las muestra de a 3 con la del centro en foco;
// al comienzo queda un espacio vacío a la izquierda y al final uno a la derecha.
// Completa publicId (Cloudinary) o localSrc (public/) para mostrar la foto real.
export const CAROUSEL_SLIDES: {
  index: string;
  caption: string;
  accent: string;
  publicId: string;
  localSrc: string;
}[] = [
  { index: "01", caption: "Slide 1", accent: "#6D28D9", publicId: "", localSrc: "/carruseles/carrusel-1.png" },
  { index: "02", caption: "Slide 2", accent: "#7C3AED", publicId: "", localSrc: "/carruseles/carrusel-2.png" },
  { index: "03", caption: "Slide 3", accent: "#5B21B6", publicId: "", localSrc: "/carruseles/carrusel-3.png" },
  { index: "04", caption: "Slide 4", accent: "#6D28D9", publicId: "", localSrc: "/carruseles/carrusel-4.png" },
  { index: "05", caption: "Slide 5", accent: "#7C3AED", publicId: "", localSrc: "/carruseles/carrusel-5.png" },
  { index: "06", caption: "Slide 6", accent: "#5B21B6", publicId: "", localSrc: "/carruseles/carrusel-6.png" },
];

// ─── YOUTUBE (portadas / miniaturas 16:9) ────────────────────────────────────
// SOLO PORTADAS: es una galería visual, no reproduce ni linkea a ningún lado.
// Para cada una pon:
//  - thumb:   imagen 16:9 en public/youtube/ (o URL completa de Cloudinary)
//  - title:   nombre real del video / episodio
//  - channel: cliente o canal para el que se hizo
// Mientras falte la imagen se muestra un placeholder sobrio (no se rompe nada).
export const YOUTUBE: {
  title: string;
  channel: string;
  thumb: string; // ej "/youtube/video-1.jpg"  o URL completa
}[] = [
  { title: "Título del video 1", channel: "Cliente / Canal", thumb: "/youtube/video-1.jpg" },
  { title: "Título del video 2", channel: "Cliente / Canal", thumb: "/youtube/video-2.jpg" },
  { title: "Título del video 3", channel: "Cliente / Canal", thumb: "/youtube/video-3.jpg" },
  { title: "Título del video 4", channel: "Cliente / Canal", thumb: "/youtube/video-4.jpg" },
];

// ─── CÓMO TRABAJO ────────────────────────────────────────────────────────────
// Párrafo en primera persona. Español de Chile, tuteo, sin modismos.
export const WORK_INTRO = [
  "Parto preguntando más de lo que probablemente esperas. Antes de abrir el proyecto quiero saber a quién le estás hablando, qué quieres que pase cuando terminen de ver, y qué cosas ya probaste que no funcionaron. Eso queda escrito, y es lo que después me permite tomar decisiones sin consultarte cada corte.",
  "Mientras edito te muestro avances por etapas, en vez de desaparecer y volver con un final. Si algo del material no está rindiendo te lo digo, aunque sea incómodo: prefiero discutir una idea a tiempo antes que entregar algo impecable que no mueve nada. Y cuando pido feedback, pido el específico, no el «me gusta».",
  "Planifico siempre con holgura (le llamo metodología colchón) porque los imprevistos no son una posibilidad, son parte del trabajo. Cuando el contenido sale, miro cómo rindió de verdad: qué retuvo, en qué segundo se cayó la gente, qué se compartió. Eso vuelve al proyecto siguiente.",
];

// Etiquetas cortas que acompañan al párrafo (sin tarjetas, sin numeritos).
export const VALUES: { title: string; copy: string }[] = [
  {
    title: "Me adapto a tu flujo",
    copy: "Trabajo con las herramientas y los tiempos que ya tienes. No te pido cambiar tu sistema para acomodarme.",
  },
  {
    title: "Proactivo",
    copy: "No espero el brief para proponer. Si veo algo que puede rendir, lo traigo yo.",
  },
  {
    title: "Flexible de registro",
    copy: "Puedo ir de lo dopamínico a lo minimalista. El estilo lo define la marca, no mi gusto.",
  },
  {
    title: "Comunicación clara",
    copy: "Hablamos derecho desde el brief. Todo queda escrito, sin malentendidos.",
  },
  {
    title: "Criterio, no solo manos",
    copy: "Si veo que algo no va a funcionar, lo digo antes de ejecutarlo.",
  },
  {
    title: "Metodología colchón",
    copy: "Planifico con holgura para absorber imprevistos y entregar siempre a tiempo.",
  },
];

// ─── HERRAMIENTAS / SOFTWARE (iconos del hero) ───────────────────────────────
// Para mostrar el ícono real de cada app, descarga el SVG/PNG y guárdalo en
// public/icons/ con el nombre indicado en `file`. Mientras no exista el archivo
// se muestra un monograma (no se rompe nada).
//
// Los monogramas van en TINTA, no en el color de cada marca: ocho colores de
// marca en fila son el "arcoíris" que la dirección de diseño prohíbe, y sobre
// papel los violetas claros de Adobe quedaban ilegibles. Cuando subas los SVG
// reales a public/icons/, ellos sí llevan su color propio.
export const TOOLS: {
  name: string;
  file: string; // archivo dentro de public/icons/  (ej "premiere.svg")
  mono: string; // texto de respaldo si falta el ícono
  color: string;
}[] = [
  { name: "Adobe Premiere Pro", file: "premiere.svg", mono: "Pr", color: "#141210" },
  { name: "After Effects", file: "after-effects.svg", mono: "Ae", color: "#141210" },
  { name: "Canva", file: "canva.svg", mono: "Cv", color: "#141210" },
  { name: "Flow", file: "flow.svg", mono: "Fl", color: "#141210" },
  { name: "Claude", file: "claude.svg", mono: "Cl", color: "#141210" },
  { name: "Gemini", file: "gemini.svg", mono: "Gm", color: "#141210" },
  { name: "Veo", file: "veo.svg", mono: "Ve", color: "#141210" },
  { name: "Notion", file: "notion.svg", mono: "No", color: "#141210" },
];

// ─── CASOS ───────────────────────────────────────────────────────────────────
// Los dos casos que abren el sitio. Un caso NO es una pieza: es la decisión
// que hubo detrás. Esa es la parte que separa a un content specialist de un
// editor, y la única que un competidor no te puede copiar.
//
// `facts` son datos verificables, no métricas de vanidad. Si un dato no lo
// puedes sostener cuando alguien pregunte en una llamada, sácalo.
export const CASES: {
  client: string;
  role: string;
  period: string;
  body: string[];
  facts: { value: string; label: string }[];
  cover: string; // imagen en public/casos/ (opcional, hay fallback)
  coverHint: string; // qué mostrar en esa imagen, mientras no exista
}[] = [
  {
    client: "Barbertendence",
    role: "Edición y diseño de marca",
    period: "Colaboración continua",
    body: [
      "Me contrataron para editar. Terminé haciéndome cargo de cómo se veía la marca completa.",
      "Lo primero que hice no fue abrir Premiere. Fue entrar en su forma de trabajar: el equipo ya vivía en Notion y Drive, con sus tiempos y sus carpetas, y me adapté a eso en lugar de pedirles que se adaptaran a mí. Desde ahí empezaron a salir reels, podcasts, portadas, carruseles e historias, semana a semana.",
      "Cuando decidieron rehacer la marca, el trabajo cambió de escala. Entré en todo el rediseño: las portadas de Skool, las historias, y más de 80 portadas de YouTube rehechas una por una, para que el canal se leyera como una sola cosa y no como una carpeta de videos sueltos.",
      "Lo que rescato no es el volumen. Es que en todo ese tiempo no fallé una entrega, y que cuando algo no me convencía lo dije, en vez de entregarlo impecable y callado.",
    ],
    facts: [
      { value: "+80", label: "portadas de YouTube rehechas" },
      { value: "5", label: "formatos en paralelo" },
      { value: "0", label: "entregas fuera de plazo" },
    ],
    cover: "/casos/barbertendence.jpg",
    coverHint:
      "Grilla de 6 a 9 portadas de YouTube en dos filas: arriba las viejas, abajo las nuevas. El antes y después se explica solo, sin texto encima.",
  },
  {
    client: "Héctor Muerza",
    role: "Edición y motion graphics",
    period: "Proyecto de marca personal",
    body: [
      "Héctor necesitaba una edición bastante más dinámica de la que yo hacía en ese momento: After Effects, motion graphics, cosas que no dominaba.",
      "Podría haber dicho que no me daba. Preferí aprenderlo, con su proyecto como vara: si no llegaba al nivel que él necesitaba, no servía de nada. Llegué.",
      "De ahí salió la forma de trabajar que uso hoy: el estilo no lo pongo yo, lo pone la marca. Puedo ir de lo dopamínico y saturado a lo minimalista y quieto según a quién le estemos hablando. Y esa decisión se toma antes de editar, no en el timeline.",
    ],
    facts: [
      { value: "After Effects", label: "aprendido para llegar a la vara del proyecto" },
      { value: "2 registros", label: "del dopamínico al minimalista" },
    ],
    cover: "/casos/hector-muerza.jpg",
    coverHint:
      "Tres frames del mismo video, uno al lado del otro, donde se vea el motion graphics en movimiento. Mejor tres cuadros de una misma animación que tres videos distintos.",
  },
  {
    client: "Mariana",
    role: "Edición de video",
    period: "Anterior a los dos de arriba",
    body: [
      "Antes de Barbertendence y de Héctor estuvo Mariana, y fue donde vi por primera vez un número grande de verdad.",
      "Varios de los videos que edité pasaron el millón de visitas. La edición sola no hace ese número: lo hace el contenido. Pero sí decide si alguien se queda en los primeros tres segundos, y ahí es donde trabajé.",
      "Fue el proyecto que me enseñó a editar pensando en retención y no en que quedara lindo.",
    ],
    facts: [
      { value: "+1M", label: "de visitas en varios de los videos" },
    ],
    cover: "/casos/mariana.jpg",
    coverHint:
      "Captura del video con mejor rendimiento, con el contador de visitas visible. El número tiene que verse en la imagen, no solo estar escrito al lado.",
  },
];

// ─── DIAGRAMAS (los tableros de Miro) ────────────────────────────────────────
// Exporta cada tablero como JPG y déjalo en public/diagramas/ con el nombre de
// `src`. Mientras el archivo no exista, el placeholder muestra el título y las
// tres ideas de `hints` — o sea, la sección nunca se ve rota y además te va
// recordando qué falta dibujar.
//
// Estos tres son los frameworks con más conexiones de tu grafo (los god nodes
// de ~/cerebro/grafos/growing-content). No son adorno: son la única prueba de
// criterio que el archivo de piezas no puede dar.
//
// Cómo dibujarlos para que se lean a Miro real y no a plantilla comprada:
// post-its levemente rotados, flechas a mano alzada, alguna anotación al
// margen con letra manuscrita, y algo tachado y corregido. Numera los bloques:
// el tablero tiene que guiar la mirada, no dejarla suelta.
export const DIAGRAMS: {
  title: string;
  caption: string;
  hints: string[]; // qué dibujar; se muestran si todavía no hay JPG
  src: string; // ej "/diagramas/4p.jpg"
  ratio: string; // aspect-ratio del export de Miro
}[] = [
  {
    title: "Las 4 P's del contenido",
    caption:
      "Pre, Producción, Post y Publicación. Dónde se decide cada cosa, y por qué la mayor parte del resultado ya está jugada antes de grabar.",
    hints: [
      "Cuatro columnas en fila (Pre, Producción, Post, Publicación) y bajo cada una tres post-its con lo que se decide ahí.",
      "Encima, una barra de peso que se vea gruesa en Pre y delgada en Post: es el argumento visual de que casi todo se define antes de grabar.",
      "Una flecha de retorno desde Publicación hasta Pre, escrita a mano: «lo que midió vuelve acá».",
    ],
    src: "/diagramas/4p.jpg",
    ratio: "16/9",
  },
  {
    title: "Hook · Body · CTA",
    caption:
      "Un reel abierto en sus tres tramos, con la curva de retención encima. Sirve para discutir qué arreglar sin caer en gustos personales.",
    hints: [
      "El reel como una tira horizontal cortada en tres tramos de distinto largo: Hook corto, Body largo, CTA corto.",
      "La curva de retención cayendo sobre la tira, con un círculo marcando el segundo exacto donde se cae la gente.",
      "Al costado, tres post-its con la pregunta que responde cada tramo: «¿por qué me quedo?», «¿qué me llevo?», «¿qué hago ahora?».",
    ],
    src: "/diagramas/hook-body-cta.jpg",
    ratio: "16/9",
  },
  {
    title: "Ciclo de promoción de 14 días",
    caption:
      "El calendario de un mini-lanzamiento: qué se publica cada día, y qué tiene que haber pasado en la cabeza del que mira antes de que aparezca la oferta.",
    hints: [
      "Una grilla de 14 casillas numeradas, dibujada a mano como calendario.",
      "Los días pintados por función: conexión, autoridad, prueba y oferta, con la leyenda al costado.",
      "Una línea de temperatura que sube a lo largo de los 14 días, y un post-it en el día donde recién aparece el precio.",
    ],
    src: "/diagramas/ciclo-14-dias.jpg",
    ratio: "16/9",
  },
];

// ─── LOFI CHILE (proyecto personal) ──────────────────────────────────────────
// El canal de YouTube con videos lofi de una hora, uno por ciudad de Chile.
// Proyecto real: ~/Projects/LoFi Chile (piloto Puerto Varas).
//
// Va en el portfolio no como pasatiempo suelto, sino porque su regla de oro es
// la misma que Joaquín vende: la IA puede estar en el proceso, pero el
// resultado no se puede ver hecho con IA. Es la prueba de criterio propio
// aplicada a algo donde nadie le paga por tenerlo.
export const LOFI = {
  kicker: "Proyecto personal",
  title: "Lofi de las ciudades de Chile",
  body: [
    "Un canal de YouTube con videos de una hora, uno por cada ciudad del país. La música la genero yo, y los visuales los ilustro y los animo a mano, cuadro por cuadro.",
    "Lo pongo acá porque no es solo un hobby. Las granjas de lofi que inundan YouTube usan el mismo stack que yo y se nota a un segundo de verlas: por eso el trabajo está en la capa humana, que es exactamente lo que le vendo a un cliente. Acá lo pruebo sin que nadie me pague por hacerlo.",
  ],
  // Estado real del roadmap. Actualizar a medida que salgan.
  cities: [
    { name: "Puerto Varas", state: "Piloto, en producción" },
    { name: "Valparaíso", state: "Siguiente" },
    { name: "Valdivia", state: "Planificada" },
    { name: "Chiloé", state: "Planificada" },
    { name: "San Pedro de Atacama", state: "Planificada" },
    { name: "Punta Arenas", state: "Planificada" },
  ],
  still: "/lofi/puerto-varas.jpg",
  stillHint:
    "Un fotograma del video de Puerto Varas: el lago Llanquihue en primer plano y el Osorno al fondo, con el grano y la luz cálida ya aplicados. Que se vea el cuadro terminado, no la ilustración limpia.",
  channelUrl: "", // completar cuando el canal esté público
};
