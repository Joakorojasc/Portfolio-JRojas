import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ReelsSection from "@/components/ReelsSection";
import YouTubeSection from "@/components/YouTubeSection";
import CarouselSection from "@/components/CarouselSection";
import ValuesSection from "@/components/ValuesSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />

      {/* Portfolio — el trabajo, grande y arriba */}
      <section id="portfolio" className="pt-24 pb-20 px-5 md:px-10 max-w-[1180px] mx-auto">
        <ReelsSection />
        <YouTubeSection />
        <CarouselSection />
      </section>

      {/* Quiebre negro → papel: de acá para abajo el sitio es claro */}
      <div className="paper-fade" aria-hidden />

      <ValuesSection />
      <TestimonialSection />

      <Footer />
    </main>
  );
}
