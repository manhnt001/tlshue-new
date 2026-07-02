import { useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { DocumentarySection } from "../components/DocumentarySection";
import { VirtualTourSection } from "../components/VirtualTourSection";
import { ExhibitionSection } from "../components/ExhibitionSection";
import { GuideSection } from "../components/GuideSection";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { BackToTop } from "../components/BackToTop";

export function LandingPage() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <DocumentarySection
          isPlaying={activeMedia === "documentary"}
          onPlay={() => setActiveMedia("documentary")}
          onStop={() => setActiveMedia(null)}
        />
        <ExhibitionSection />
        <VirtualTourSection
          showTour={activeMedia === "tour"}
          onPlay={() => setActiveMedia("tour")}
          onStop={() => setActiveMedia(null)}
        />
        <GuideSection
          isPlaying={activeMedia === "guide"}
          onPlay={() => setActiveMedia("guide")}
          onStop={() => setActiveMedia(null)}
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
