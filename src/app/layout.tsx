import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Joaquín Rojas — Content Specialist & Editor de Video",
  description:
    "Portfolio de Joaquín Rojas: especialista en contenido premium, edición de video, motion graphics y estrategia audiovisual para marcas de alto nivel.",
  keywords: [
    "editor de video",
    "content specialist",
    "motion graphics",
    "after effects",
    "premiere pro",
    "color grading",
    "reels",
    "podcast",
  ],
  authors: [{ name: "Joaquín Rojas" }],
  openGraph: {
    title: "Joaquín Rojas — Content Specialist & Editor de Video",
    description:
      "Contenido que conecta. Historias que convierten. Producción audiovisual de alto nivel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-obsidian text-[#F0F2F5] antialiased">
        {children}
      </body>
    </html>
  );
}
