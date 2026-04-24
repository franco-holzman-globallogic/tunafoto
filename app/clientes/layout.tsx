import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cliente",
  description: "Accedé a tu galería privada con tu código personal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
