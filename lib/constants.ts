// Gallery
export const BATCH_SIZE = 9;
export const SCROLL_ROOT_MARGIN = "200px";

export const CATEGORIAS = [
  { name: "INFANTIL", slug: "infantil" },
  { name: "RECIÉN NACIDO", slug: "recien-nacido" },
  { name: "FAMILIA", slug: "familia" },
  { name: "EMBARAZO", slug: "embarazo" },
  { name: "PAREJAS", slug: "parejas" },
  { name: "RETRATO", slug: "retrato" },
  { name: "15 AÑOS", slug: "15-anos" },
  { name: "MASCOTA", slug: "mascota" },
  { name: "EVENTO", slug: "evento" },
  { name: "PRODUCTO", slug: "producto" },
] as const;

export const TEXTOS_CATEGORIA: Record<string, string[]> = {
  infantil: [
    "Naturales y espontáneas pensadas para capturar la esencia de cada etapa.",
    "Más que una sesión, es un juego: los chicos no hacen lo que nosotros queremos, sino lo que sienten. Corren, exploran, se divierten y se expresan libremente. Están en su propio mundo, siendo simplemente niños. Yo solo los acompaño y los sigo con mi cámara.",
  ],
  "recien-nacido": [
    "Capturá la intimidad de los primeros días con tu bebé a través de imágenes naturales y atemporales.",
    "Cada sesión se centra en el vínculo, las miradas y las emociones, sin poses (lifestyle), con luz natural y en un ambiente tranquilo, ya sea en estudio o en tu hogar.",
    "Un recuerdo único de una etapa que pasa muy rápido y merece ser guardada para siempre.",
  ],
  familia: [
    "La espontaneidad y la naturalidad definen mis imágenes.",
    "En exteriores, los espacios abiertos permiten sentirse libres, relajarse y disfrutar.",
    "Saltar, correr, jugar y simplemente pasarlo bien.",
    "Las mascotas también son bienvenidas.",
  ],
  embarazo: [
    "Fotografías naturales y auténticas que capturan la esencia de este momento único.",
    "La belleza de la espera se refleja en imágenes íntimas y emocionales, pensadas para atesorar esta etapa para siempre.",
    "Se recomienda realizar la sesión entre la semana 28 y 34, aunque cada embarazo es distinto.",
  ],
  parejas: ["Conexión, complicidad y emociones."],
  "15-anos": ["Un momento único que merece ser recordado para siempre."],
  mascota: ["Ellos también son familia."],
  evento: ["Cobertura natural de momentos únicos."],
  producto: [
    "Pensadas para mostrar cada detalle de forma auténtica y atractiva, conectando con la esencia de tu marca.",
  ],
  retrato: [
    "Fotografías personales pensadas para reflejar tu esencia de forma natural y profesional.",
    "También podés realizar fotos tipo carnet, cumpliendo con los requisitos necesarios para documentos o trámites.",
  ],
};

// Videos
export const VIDEOS = [
  {
    src: process.env.NEXT_PUBLIC_VIDEO_BODA_URL ?? "https://res.cloudinary.com/dj2q45vvk/video/upload/f_auto,q_auto/v1776784730/1_qx961j.mp4",
    titulo: "BODA",
    descripcion: "20-11-22",
  },
  {
    src: process.env.NEXT_PUBLIC_VIDEO_PEGATINA_URL ?? "https://res.cloudinary.com/dj2q45vvk/video/upload/f_auto,q_auto/v1776784760/incendios_rztv0r.mp4",
    titulo: "PEGATINA",
    descripcion: "25-07-21",
  },
];

// Client galleries
export const GALERIAS: Record<string, string> = {
  emma: process.env.NEXT_PUBLIC_GALLERY_EMMA_URL ?? "",
  sample: process.env.NEXT_PUBLIC_GALLERY_SAMPLE_URL ?? "",
  evento: process.env.NEXT_PUBLIC_GALLERY_EVENTO_URL ?? "",
};

// Social links
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/tuna_foto/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/542954545210",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/tunafoto/",
};

// Navigation
export const NAV_LINKS = [
  { name: "FOTOGRAFÍA", href: "/fotografia" },
  { name: "VIDEO", href: "/video" },
  { name: "CLIENTE", href: "/clientes" },
  { name: "CONTACTO", href: "/contacto" },
];
