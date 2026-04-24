"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname === "/") return null;

  return (
    <footer className="w-full py-10 text-center text-[8px] tracking-[0.3em] text-gray-300">
      DESARROLLADO POR LUPE HOLZMAN | 2026
    </footer>
  );
}