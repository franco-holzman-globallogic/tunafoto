"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALERIAS } from "@/lib/constants";

export default function Clientes() {
  const [codigo, setCodigo] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const key = codigo.trim().toLowerCase();
    const url = GALERIAS[key];

    if (url) {
      setError("");
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setError("Código incorrecto");
    }
  };

  return (
    <section className="min-h-screen bg-white text-black px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-xl w-full text-center">

        {/* TÍTULO */}
        <h2 className="text-sm sm:text-[14px] md:text-2xl font-medium mb-8 sm:mb-10 tracking-[0.3em] sm:tracking-[0.4em]">
          ACCESO A TU GALERÍA
        </h2>

        {/* TEXTO */}
        <p className="text-gray-600 text-[15px] leading-relaxed mb-12">
          Descargá tus imágenes y elegí tus favoritas para imprimir en foto o fotolibro.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INPUT */}
          <label htmlFor="gallery-code" className="sr-only">Código de galería</label>
          <input
            id="gallery-code"
            type="text"
            placeholder="INGRESÁ TU CÓDIGO"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
              setError("");
            }}
            className={`w-full border-b outline-none text-center py-3 tracking-[0.3em] text-sm placeholder:text-gray-400 transition
            ${error ? "border-red-400" : "border-gray-300"}`}
          />

          {/* ERROR */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-red-400 tracking-wide"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* BOTÓN */}
          <button
            type="submit"
            className="uppercase tracking-[0.4em] text-[11px] text-black relative group mt-6"
          >
            INGRESAR

            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full"></span>
          </button>

        </form>

        {/* TEXTO EXTRA */}
        <p className="mt-10 text-xs text-gray-400">
          Si no tenés tu código, escribime y te lo envío.
        </p>

      </div>
    </section>
  );
}