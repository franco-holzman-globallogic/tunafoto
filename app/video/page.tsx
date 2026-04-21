export default function Film() {
  const videos = [
  {
    src: "/videos/1.mp4",
    titulo: "BODA",
    descripcion: "20-11-22"
  },
  {
    src: "/videos/incendios.mp4",
    titulo: "PEGATINA",
    descripcion: "25-07-21"
  }
];

  return (
    <section className="min-h-screen bg-white text-black px-6 py-20">

      <div className="max-w-4xl mx-auto text-center mb-16">

        {/*  <h1 className="text-2xl md:text-4xl font-light tracking-[0.4em] mb-6">
          FILM
        </h1>*/}

        <p className="text-lg md:text-xl font-light leading-relaxed tracking-[0.4em] mb-6 ">
          HISTORIAS EN MOVIMIENTO
        </p>

        <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl mx-auto">
          Momentos que suceden sin intervenir,<br />
          donde cada gesto, cada mirada y cada emoción hablan por sí solas. <br />
          El video permite volver a ese instante y revivirlo una y otra vez.
        </p>

      </div>

      

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
  {videos.map((video, i) => (
    <div key={i}>
      
      <video
        src={video.src}
          controls
          autoPlay
          loop
          muted
          playsInline
        className="w-full object-cover"
      />

      <div className="mt-4 text-center space-y-1">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
          {video.titulo}
        </p>

        <p className="text-xs uppercase text-gray-500">
          {video.descripcion}
        </p>
      </div>

    </div>
  ))}
</div>


      {/* VIDEOS 
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        <video
          src="/video/AyG.mp4"
          controls
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover"
        />

        <video
          src="/video/incendios.mp4"
          controls
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover"
        />

      </div>*/}

    </section>
  );
}