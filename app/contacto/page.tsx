"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Contacto() {
  return (
    <section className="min-h-screen bg-white text-black px-4 sm:px-6 pt-24 sm:pt-28 pb-16 flex items-start">
      
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
      >

        {/* FOTO */}       
        <motion.div
          initial={{ opacity: 1, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-[300px] md:h-[520px] overflow-hidden"
        >
          <Image
            src="/luppe.jpg"
            alt="Fotógrafa"
            width={600}
            height={800}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
          />  
        </motion.div>
        
        {/* CONTENIDO */}
        <motion.div
          initial={{ opacity: 1, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center md:text-left max-w-md mx-auto md:mx-0"
        >

          {/* TITULO */}
          <h2 className="text-xl md:text-3xl font-light leading-relaxed mb-8">
            Cada historia es única.
            <br />Y merece ser contada con sensibilidad.
          </h2>

          {/* SOBRE VOS */}
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed mb-12 font-light">
            ¡Hola! Soy Lupe. Estudié Audiovisuales. Me gusta captar, capturar,
              lo natural y simple de los momentos.
              <br />
              <br />
              TUNA representa la creación de recuerdos e imágenes que perduran en el tiempo, desde una mirada auténtica y cuidada. Ya sea una historia familiar, un momento especial, un retrato personal o una marca, busco siempre mostrar la esencia de cada uno de forma real.
              <br />
              <br />
              Las fotos son una forma de viajar en el tiempo. Gracias a mis papás, cada uno de mis hermanos tiene uno o dos álbumes, algo que valoro profundamente. Esas imágenes nos permiten revivir emociones, ver cómo cambiamos, recordar a personas que ya no están y volver a momentos que, sin ese registro, quizás se perderían.
              <br/>
              Por eso es tan importante guardar estos instantes.
              <br />
              <br />
              Si te gusta mi trabajo y sentís que conecta con lo que estás buscando, escribime y vemos juntos cómo puedo ayudarte.
          </p>

          {/* CTA */}
          <p className="text-[11px] tracking-[0.3em] text-gray-400 mb-6">
            CONTACTAME
          </p>

          {/* REDES (PASO 4 ANIMADO) */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-4 text-[11px] tracking-[0.3em] text-gray-600"
          >

            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition duration-500">
              INSTAGRAM
            </a>

            <span className="hidden md:inline text-gray-300">•</span>

            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-black transition duration-500">
              WHATSAPP
            </a>

            <span className="hidden md:inline text-gray-300">•</span>

            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-black transition duration-500">
              FACEBOOK
            </a>

          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}