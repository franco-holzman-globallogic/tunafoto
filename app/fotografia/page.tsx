"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BATCH_SIZE, CATEGORIAS, TEXTOS_CATEGORIA, SCROLL_ROOT_MARGIN } from "@/lib/constants";

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <div ref={ref} className="mb-4">
      <motion.img
        src={src.replace("/upload/", "/upload/w_800/")}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 1, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full object-cover hover:scale-[1.02] transition-transform duration-500"
      />
    </div>
  );
}

function useColumns(count: number) {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 768) setCols(count);
      else if (window.innerWidth >= 640) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [count]);
  return cols;
}

export default function Fotografia() {
  const [navHeight, setNavHeight] = useState(0);
  const [active, setActive] = useState<{ name: string; slug: string }>(CATEGORIAS[0]);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [showSticky, setShowSticky] = useState(false);

  const cache = useRef<Record<string, string[]>>({});

  useEffect(() => {
  const updateHeight = () => {
    const nav = document.getElementById("main-navbar");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  };

  updateHeight();
  window.addEventListener("resize", updateHeight);

  return () => window.removeEventListener("resize", updateHeight);
}, []);

  useEffect(() => {
  const observer = new ResizeObserver(() => {
    const nav = document.getElementById("main-navbar");
    if (nav) setNavHeight(nav.offsetHeight);
  });

  const nav = document.getElementById("main-navbar");
  if (nav) observer.observe(nav);

  return () => observer.disconnect();
}, []);

  // 🔥 STICKY DETECTION
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, []);

  // 📸 CARGA DE IMÁGENES
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (cache.current[active.slug]) {
      setImagenes(cache.current[active.slug]);
      return;
    }

    setImagenes([]);

    fetch(`/api/imagenes?folder=${active.slug}`)
      .then((res) => res.json())
      .then((data) => {
        cache.current[active.slug] = data;
        setImagenes(data);
      });
  }, [active.slug]);

  // 📜 INFINITE SCROLL
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, imagenes.length));
  }, [imagenes.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: SCROLL_ROOT_MARGIN }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <section className="min-h-screen bg-white text-black px-4 sm:px-6 pt-24 sm:pt-28 pb-16">

      {/* TRIGGER */}
      <div ref={triggerRef} />

      {/* SUBMENU NORMAL */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] font-light mb-10 sm:mb-16">

        {CATEGORIAS.map((cat) => (
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

      {/* SUBMENU STICKY */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            style={{ top: navHeight }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 w-full bg-white z-40 shadow-sm"
          >
            <div className="overflow-x-auto md:overflow-visible">
              <div className="flex md:flex-wrap md:justify-center gap-6 md:gap-10 text-[10px] sm:text-[11px] tracking-[0.3em] font-light px-4 py-4 min-w-max md:min-w-0">

                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActive(cat)}
                    className={`relative whitespace-nowrap ${
                      active.slug === cat.slug
                        ? "text-black"
                        : "text-gray-400"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TITULO + TEXTO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-16"
        >
          <h1 className="text-xl sm:text-2xl md:text-4xl font-light mb-4 sm:mb-6 tracking-[0.15em] sm:tracking-[0.2em]">
            {active.name}
          </h1>

          <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-[15px] leading-relaxed px-2 sm:px-0">
            {TEXTOS_CATEGORIA[active.slug]?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* GALERIA */}
      <Gallery
        key={active.slug}
        imagenes={imagenes}
        visibleCount={visibleCount}
        categoryName={active.name}
      />

      {/* INFINITE SCROLL */}
      {visibleCount < imagenes.length && (
        <div ref={sentinelRef} className="h-1" />
      )}

    </section>
  );
}

function Gallery({ imagenes, visibleCount, categoryName }: { imagenes: string[]; visibleCount: number; categoryName: string }) {
  const colCount = useColumns(3);
  const visible = imagenes.slice(0, visibleCount);

  const columns = useMemo(() => {
    const cols: string[][] = Array.from({ length: colCount }, () => []);
    visible.forEach((src, i) => {
      cols[i % colCount].push(src);
    });
    return cols;
  }, [visible, colCount]);

  return (
    <div className="flex gap-4 max-w-6xl mx-auto px-4 sm:px-6">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 min-w-0">
          {col.map((src, i) => (
            <GalleryImage
              key={src}
              src={src}
              alt={`${categoryName} — foto ${i + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}