import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MediaBar } from "@/components/sections/MediaBar";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MediaBar />
        <WhyUsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />
        <TestimonialsSection />
        <TrainingSection />
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
