import FadeIn from "../components/FadeIn";
import VideoPlayer from "../components/VideoPlayer";
import { VIDEOS } from "@/lib/constants";

export default function Film() {
  return (
    <section className="min-h-svh bg-white text-black px-4 sm:px-6 pt-28 sm:pt-32 pb-20">

      {/* Header */}
      <FadeIn className="max-w-4xl mx-auto text-center mb-12 sm:mb-20">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-light tracking-[0.2em] mb-4 sm:mb-6">
          HISTORIAS EN MOVIMIENTO
        </h1>

        <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-xl mx-auto">
          Momentos que suceden sin intervenir,<br />
          donde cada gesto, cada mirada y cada emoción hablan por sí solas. <br />
          El video permite volver a ese instante y revivirlo una y otra vez.
        </p>
      </FadeIn>

      {/* Videos */}
      <div className="flex flex-col gap-12 sm:gap-16 max-w-6xl mx-auto">
        {VIDEOS.map((video, i) => (
          <FadeIn key={i} delay={i * 0.2}>
            <VideoPlayer
              src={video.src}
              titulo={video.titulo}
              descripcion={video.descripcion}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}