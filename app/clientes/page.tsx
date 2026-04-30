"use client";

import { useState } from "react";

export default function Clientes() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = codigo.trim().toLowerCase();
    if (!code) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/galeria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        setError(data.error || "Código incorrecto");
      }
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-svh bg-white text-black px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-xl w-full text-center">

        <h2 className="text-sm sm:text-[14px] md:text-2xl font-medium mb-8 sm:mb-10 tracking-[0.3em] sm:tracking-[0.4em]">
          ACCESO A TU GALERÍA
        </h2>

        <p className="text-gray-600 text-[15px] leading-relaxed mb-12">
          Descargá tus imágenes y elegí tus favoritas para imprimir en foto o fotolibro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor="gallery-code" className="sr-only">Código de galería</label>
          <input
            id="gallery-code"
            type="text"
            placeholder="INGRESÁ TU CÓDIGO"
            value={codigo}
            onChange={(e) => { setCodigo(e.target.value); setError(""); }}
            className={`w-full border-b outline-none text-center py-3 tracking-[0.3em] text-sm placeholder:text-gray-400 transition ${
              error ? "border-red-400" : "border-gray-300"
            }`}
          />

          {error && (
            <p className="text-xs text-red-400 tracking-wide animate-fade-in-up">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="uppercase tracking-[0.4em] text-[11px] text-black relative group mt-6 disabled:opacity-40"
          >
            {loading ? "VERIFICANDO..." : "INGRESAR"}
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full" />
          </button>
        </form>

        <p className="mt-10 text-xs text-gray-400">
          Si no tenés tu código, escribime y te lo envío.
        </p>
      </div>
    </section>
  );
}