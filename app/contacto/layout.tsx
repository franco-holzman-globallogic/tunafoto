import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactá a Tuna Fotografía — Instagram, WhatsApp y Facebook.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
