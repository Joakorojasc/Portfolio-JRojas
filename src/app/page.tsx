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
      <section id="portfolio" className="py-20 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
        <ReelsSection />
        <PodcastSection />
        <CarouselSection />
        <StoriesSection />
      </section>

      <Footer />
    </main>
  );
}
