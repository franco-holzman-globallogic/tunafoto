import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotografía",
  description: "Galería de fotografía profesional: infantil, familia, embarazo, recién nacido, parejas, retratos, eventos y más.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
