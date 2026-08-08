import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CasesSection from "@/components/CasesSection";
import ValuesSection from "@/components/ValuesSection";
import ProcessSection from "@/components/ProcessSection";
import ReelsSection from "@/components/ReelsSection";
import YouTubeSection from "@/components/YouTubeSection";
import CarouselSection from "@/components/CarouselSection";
import LofiSection from "@/components/LofiSection";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />

      {/* Los casos van primero: prueban criterio, no sólo ejecución. */}
      <CasesSection />

      {/* Cómo trabajo (texto) + Método (los tableros de Miro), juntos. */}
      <ValuesSection />
      <ProcessSection />

      {/* Archivo — las piezas sueltas, por formato. Van abajo a propósito:
          demuestran oficio, pero no son el argumento de venta. */}
      <section
        id="portfolio"
        className="scroll-mt-28 pt-28 pb-20 px-5 md:px-10 max-w-[1180px] mx-auto"
      >
        <SectionHead
          folio="04"
          kicker="Archivo"
          title="Piezas sueltas, por formato"
          note="Van abajo a propósito: prueban oficio, no son el argumento."
        />

        <ReelsSection />
        <YouTubeSection />
        <CarouselSection />
      </section>

      {/* Proyecto personal. Va después del archivo y antes del contacto:
          cierra mostrando criterio propio, no encargo de nadie. */}
      <LofiSection />

      <Footer />
    </main>
  );
}
