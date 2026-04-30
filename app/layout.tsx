import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tunafoto.com"),
  title: {
    default: "Tuna Fotografía",
    template: "%s | Tuna Fotografía",
  },
  description: "Fotografía y video profesional. Sesiones de familia, infantil, embarazo, recién nacido, parejas, retratos y eventos.",
  openGraph: {
    siteName: "Tuna Fotografía",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-svh`}>
      <Navbar />
      <main className="flex-1 relative overflow-hidden bg-white">
            {children}
      </main>
     <Footer />
     <ScrollToTop />
     </body>
    </html>
  );
}