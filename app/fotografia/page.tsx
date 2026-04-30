"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { BATCH_SIZE, CATEGORIAS, TEXTOS_CATEGORIA, SCROLL_ROOT_MARGIN } from "@/lib/constants";
import CategoryMenu from "./components/CategoryMenu";
import Gallery from "./components/Gallery";

export default function Fotografia() {
  const [navHeight, setNavHeight] = useState(0);
  const [active, setActive] = useState<(typeof CATEGORIAS)[number]>(CATEGORIAS[0]);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [showSticky, setShowSticky] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const cache = useRef<Record<string, string[]>>({});

  // Track navbar height
  useEffect(() => {
    const nav = document.getElementById("main-navbar");
    if (!nav) return;

    const update = () => setNavHeight(nav.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(nav);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Sticky detection
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  // Load images on category change
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

  // Infinite scroll
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, imagenes.length));
  }, [imagenes.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: SCROLL_ROOT_MARGIN },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <section className="min-h-svh bg-white text-black px-4 sm:px-6 pt-24 sm:pt-28 pb-16">

      {/* Sticky trigger */}
      <div ref={triggerRef} />

      {/* Category menu */}
      <CategoryMenu
        id="main"
        active={active}
        onSelect={setActive}
        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] font-light mb-10 sm:mb-16"
      />

      {/* Sticky category menu */}
      <div
        style={{ top: navHeight }}
        className={`fixed left-0 w-full bg-white z-40 shadow-sm transition-all duration-300 ${
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-x-auto md:overflow-visible">
          <CategoryMenu
            id="sticky"
            active={active}
            onSelect={setActive}
            className="flex md:flex-wrap md:justify-center gap-6 md:gap-10 text-[10px] sm:text-[11px] tracking-[0.3em] font-light px-4 py-4 min-w-max md:min-w-0"
          />
        </div>
      </div>

      {/* Title + text */}
      <div key={`title-${active.slug}`} className="max-w-3xl mx-auto text-center mb-10 sm:mb-16 animate-fade-in-up">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-light mb-4 sm:mb-6 tracking-[0.15em] sm:tracking-[0.2em]">
          {active.name}
        </h1>

        <div className="space-y-3 sm:space-y-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed px-2 sm:px-0">
          {TEXTOS_CATEGORIA[active.slug]?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <Gallery key={`gallery-${active.slug}`} imagenes={imagenes} visibleCount={visibleCount} categoryName={active.name} />

      {/* Infinite scroll sentinel */}
      {visibleCount < imagenes.length && <div ref={sentinelRef} className="h-1" />}
    </section>
  );
}