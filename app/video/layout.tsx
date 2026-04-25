import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video",
  description: "Historias en movimiento — video profesional de bodas y eventos.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
