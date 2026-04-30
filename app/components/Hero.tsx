import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden" aria-label="Portada">

      {/* Imagen de fondo (optimized by Next.js) */}
      <Image
        src="/emmaa.jpg"
        alt="Portada Tuna Fotografía"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[40%_center] md:object-[center_20%]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
        <p className="uppercase tracking-[0.2em] text-sm mb-4">
          Fotografía & Video
        </p>

        <h1 className="text-4xl md:text-6xl font-light tracking-wide leading-tight max-w-4xl">
          Momentos únicos<br />para toda la vida
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-200 tracking-[0.4em]">
          Registrando momentos.
        </p>
      </div>
    </section>
  );
}