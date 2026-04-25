"use client";

import { motion } from "framer-motion";
import VideoPlayer from "../components/VideoPlayer";
import { VIDEOS } from "@/lib/constants";

export default function Film() {
  return (
    <section className="min-h-screen bg-white text-black px-4 sm:px-6 pt-28 sm:pt-32 pb-20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-12 sm:mb-20"
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl font-light tracking-[0.2em] mb-4 sm:mb-6">
          HISTORIAS EN MOVIMIENTO
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-xl mx-auto"
        >
          Momentos que suceden sin intervenir,<br />
          donde cada gesto, cada mirada y cada emoción hablan por sí solas. <br />
          El video permite volver a ese instante y revivirlo una y otra vez.
        </motion.p>
      </motion.div>

      {/* VIDEOS */}
      <div className="flex flex-col gap-12 sm:gap-16 max-w-6xl mx-auto">
        {VIDEOS.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <VideoPlayer
              src={video.src}
              titulo={video.titulo}
              descripcion={video.descripcion}
            />
          </motion.div>
        ))}
      </div>

    </section>
  );
}