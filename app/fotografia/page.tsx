"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Fotografia() {
  const categorias = [
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
  ];

  const [active, setActive] = useState(categorias[0]);
  const [imagenes, setImagenes] = useState<string[]>([]);

  const textos : Record<string, string[]> = {
    infantil: [
      "Naturales y espontáneas pensadas para capturar la esencia de cada etapa.", 
      "Más que una sesión, es un juego: los chicos no hacen lo que nosotros queremos, sino lo que sienten. Corren, exploran, se divierten y se expresan libremente. Están en su propio mundo, siendo simplemente niños. Yo solo los acompaño y los sigo con mi cámara."
    ],
    "recien-nacido": [
      "Capturá la intimidad de los primeros días con tu bebé a través de imágenes naturales y atemporales.",
      "Cada sesión se centra en el vínculo, las miradas y las emociones, sin poses (lifestyle), con luz natural y en un ambiente tranquilo, ya sea en estudio o en tu hogar.",
      "Un recuerdo único de una etapa que pasa muy rápido y merece ser guardada para siempre."
    ],
    familia: [
      "La espontaneidad y la naturalidad definen mis imágenes.",
      "En exteriores, los espacios abiertos permiten sentirse libres, relajarse y disfrutar.",
      "Saltar, correr, jugar y simplemente pasarlo bien.", 
      "Las mascotas también son bienvenidas."
    ],
    embarazo: [
      "Fotografías naturales y auténticas que capturan la esencia de este momento único.",
      "La belleza de la espera se refleja en imágenes íntimas y emocionales, pensadas para atesorar esta etapa para siempre.",
      "Se recomienda realizar la sesión entre la semana 28 y 34, aunque cada embarazo es distinto."
    ],
    parejas:  [
      "Conexión, complicidad y emociones."
    ],
    "15-anos": [
      "Un momento único que merece ser recordado para siempre."
    ],
    mascota: [
      "Ellos también son familia."
    ],
    evento: [
      "Cobertura natural de momentos únicos."
    ],
    producto: [
      "Pensadas para mostrar cada detalle de forma auténtica y atractiva, conectando con la esencia de tu marca."
    ],
    retrato: [
      "Fotografías personales pensadas para reflejar tu esencia de forma natural y profesional.",
      "También podés realizar fotos tipo carnet, cumpliendo con los requisitos necesarios para documentos o trámites."
    ],
  };

 // 🔥 FETCH AUTOMATICO DE IMAGENES
  useEffect(() => {
    fetch(`/api/imagenes?folder=${active.slug}`)
      .then((res) => res.json())
      .then((data) => setImagenes(data));
  }, [active.slug]);

  return (
    <section className="min-h-screen bg-white text-black px-6 pt-28 pb-16">

      {/* SUBMENU */}
      <div className="flex justify-center flex-wrap gap-6 md:gap-10 text-[11px] tracking-[0.3em] font-light mb-16">
        {categorias.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat)}
            className={`relative transition-all duration-300 ${
              active.slug === cat.slug
                ? "text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {cat.name}

            {active.slug === cat.slug && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 -bottom-2 w-full h-[1px] bg-black"
              />
            )}
          </button>
        ))}
      </div>

      {/* TITULO + TEXTO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-2xl md:text-4xl font-light mb-6 tracking-[0.2em]">
            {active.name}
          </h1>

          <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
            {textos[active.slug]?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* GALERIA */}
      <AnimatePresence mode="wait">
        <motion.div
  key={active.slug + "-gallery"}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
  className="columns-1 sm:columns-2 md:columns-3 gap-4 max-w-6xl mx-auto px-6"
>
  {imagenes.map((src, i) => (
    <motion.img
      key={i}
      src={src}
      alt=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
className="w-full mb-4  break-inside-avoid object-cover transition duration-500 hover:scale-[1.02]"    />
  ))}
</motion.div>
      </AnimatePresence>

    </section>
  );
}