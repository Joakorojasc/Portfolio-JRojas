import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Una sola familia, a propósito. Se probó sumar una serif de display y no
// aportaba: el contraste tipográfico acá lo dan el PESO y el TAMAÑO, no una
// segunda tipografía. Geist va de 300 a 800, que es rango de sobra.
// La mono entra sólo en numeración y etiquetas — es mobiliario, no texto.
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Joaquín Rojas · Content Specialist & Editor de Video",
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
    title: "Joaquín Rojas · Content Specialist & Editor de Video",
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
    <html
      lang="es"
      className={`${geist.variable} ${geistMono.variable} h-full`}
    >
      <body className="grain min-h-full bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
