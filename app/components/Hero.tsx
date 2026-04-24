"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  useEffect(() => {
  document.body.style.overflow = "hidden";

  const timer = setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 1200); 

  return () => clearTimeout(timer);
}, []);
  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Portada">
      
      {/* Imagen de fondo */}
      <div className="
          absolute inset-0 
          bg-[url('/emmaa.jpg')] 
          bg-cover 
          bg-[40%_center] 
          md:bg-[center_20%]" 
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6"
      >
        <p className="uppercase tracking-[0.2em] text-sm mb-4 ">
          Fotografía & Video
        </p>

        <h1 className="text-4xl md:text-6xl font-light tracking-wide leading-tight max-w-4xl">
          Momentos únicos<br />para toda la vida
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-200 tracking-[0.4em]">
          Registrando momentos.
        </p>

      </motion.div>
    </section>
  );
}