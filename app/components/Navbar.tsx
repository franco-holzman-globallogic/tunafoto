"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open || isHome) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [open, isHome]);

  const navbarStyle =
    isHome && !scrolled
      ? "bg-transparent text-white"
      : "bg-white text-black shadow-sm";

 const logoStyle =
  isHome && !scrolled ? "h-7" : "h-7 invert opacity-80";

  const links = [
    { name: "FOTOGRAFÍA", href: "/fotografia" },
    { name: "VIDEO", href: "/video" },
    { name: "CLIENTE", href: "/clientes" },
    { name: "CONTACTO", href: "/contacto" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
        ${navbarStyle}
        ${open ? "opacity-0 -translate-y-6 pointer-events-none" : ""}`}
      >
        <div
          className={`px-6 py-4 flex items-center 
          <div className="px-6 py-4 flex items-center justify-between">`}
        >
          {/* LOGO */}
          <div className={`${isHome && !scrolled ? "" : "flex justify-center"}`}>
            <Link href="/">
              <img
                src="/logo.svg"
                alt="Logo"
                className={`transition-all duration-500 ${logoStyle}`}
              />
            </Link>
          </div>

          {/* LINKS DESKTOP */}
<div className="hidden md:flex items-center justify-end ml-auto space-x-6 text-[11px] tracking-[0.25em] font-light">
  {links.map((link, i) => {
    const active = pathname === link.href;

    return (
      <div key={link.name} className="flex items-center space-x-6">
        
        <Link
          href={link.href}
          className={`transition-all duration-500
          ${isHome && !scrolled
            ? "text-white/70 hover:text-white"
            : "text-gray-600 hover:text-black"}
          ${active ? "opacity-100" : "opacity-70"}
          `}
        >
          {link.name}
        </Link>

        {i !== links.length - 1 && (
          <span className="text-gray-300 text-[10px]">•</span>
        )}
      </div>
    );
  })}

</div>

          {/* BOTÓN MOBILE */}
          <button
            className={`md:hidden absolute right-6 top-4 text-3xl z-50 transition-all
            ${isHome && !scrolled ? "text-white" : "text-black"}`}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <div
        className={`fixed inset-0 bg-white z-[60] flex flex-col transition-all duration-500
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        {/* LOGO */}
        <div className="absolute top-6 left-6">
          <Link href="/" onClick={() => setOpen(false)}>
            <img src="/logo.svg" className="h-7 invert opacity-70" />
          </Link>
        </div>

        {/* CLOSE */}
        <button
          className="absolute top-8 right-6 text-3xl"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* LINKS */}
        <div className="flex flex-1 flex-col items-center justify-center space-y-10 tracking-[0.2em] font-light text-gray-700">
          {links.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`transition-all duration-500 hover:text-gray-400
              ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}