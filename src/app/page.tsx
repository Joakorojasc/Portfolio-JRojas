import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ReelsSection from "@/components/ReelsSection";
import PodcastSection from "@/components/PodcastSection";
import CarouselSection from "@/components/CarouselSection";
import StoriesSection from "@/components/StoriesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Skills />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
        <div className="mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-4 font-medium">
            Trabajo Selecto
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F0F2F5] leading-tight">
            Producción que{" "}
            <span className="gradient-text-gold">habla por sí sola</span>
          </h2>
          <p className="mt-5 text-[#8892A4] text-lg max-w-xl leading-relaxed">
            Cada pieza es el resultado de una visión editorial precisa, ritmo cinematográfico y
            dominio técnico de las herramientas más exigentes de la industria.
          </p>
          <div className="divider-gold mt-10 max-w-md" />
        </div>

        <ReelsSection />
        <PodcastSection />
        <CarouselSection />
        <StoriesSection />
      </section>

      <Footer />
    </main>
  );
}
