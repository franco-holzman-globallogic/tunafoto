"use client";

import { useRef, useState, useEffect } from "react";

export default function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-4">
      <img
        src={src.replace("/upload/", "/upload/w_800/")}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover hover:scale-[1.02] transition-all duration-400 ease-out ${
          inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
        }`}
      />
    </div>
  );
}
