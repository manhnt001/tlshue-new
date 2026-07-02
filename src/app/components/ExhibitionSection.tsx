import { useState } from "react";
import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Maximize2, Info } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData } from "../data/exhibition";
import { PanoModal } from "./PanoModal";
import { DetailModal } from "./DetailModal";
import { cn } from "../lib/utils";

export function ExhibitionSection() {
  const [activePanoIndex, setActivePanoIndex] = useState<number | null>(null);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  return (
    <section id="exhibition" className="py-24 bg-[#111111] relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Không Gian Triển Lãm"
          subtitle="Khám Phá Các Pano"
          align="center"
          className="mb-16 text-white"
        />

        <ResponsiveMasonry 
          columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}
          gutterBreakPoints={{ 350: "20px", 768: "24px", 1024: "24px" }}
        >
          <Masonry>
            {exhibitionData.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ willChange: "transform, opacity" }}
                onClick={() => setSelectedCardIndex(prev => prev === index ? null : index)}
                className="relative group rounded-xl overflow-hidden bg-card cursor-pointer isolate aspect-auto"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <ImageWithFallback
                    src={panel.image}
                    alt={panel.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                      selectedCardIndex === index && "scale-110"
                    )}
                  />

                  {/* Default overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Default text */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-300 group-hover:-translate-y-4",
                    selectedCardIndex === index && "-translate-y-4"
                  )}>
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2 block">
                      {panel.group}
                    </span>
                    <h3 className="text-white text-xl md:text-2xl">{panel.title}</h3>
                  </div>

                  {/* Hover & Click Interaction: Dark overlay with 2 action buttons */}
                  <div className={cn(
                    "absolute inset-0 bg-black/80 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20 backdrop-blur-sm",
                    selectedCardIndex === index
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                  )}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePanoIndex(index);
                        setSelectedCardIndex(null);
                      }}
                      className={cn(
                        "w-[180px] py-3 px-6 rounded-full bg-primary text-white font-medium hover:bg-primary/90 flex items-center justify-center gap-2 transform transition-all duration-300 shadow-[0_4px_14px_0_rgba(200,155,60,0.39)]",
                        selectedCardIndex === index ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
                      )}
                    >
                      <Maximize2 size={18} />
                      Xem Pano
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDetailIndex(index);
                        setSelectedCardIndex(null);
                      }}
                      className={cn(
                        "w-[180px] py-3 px-6 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 flex items-center justify-center gap-2 transform transition-all duration-300 delay-75 border border-white/20",
                        selectedCardIndex === index ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
                      )}
                    >
                      <Info size={18} />
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Modals */}
      {activePanoIndex !== null && (
        <PanoModal
          isOpen={true}
          onClose={() => setActivePanoIndex(null)}
          initialIndex={activePanoIndex}
        />
      )}

      {activeDetailIndex !== null && (
        <DetailModal
          isOpen={true}
          onClose={() => setActiveDetailIndex(null)}
          panelIndex={activeDetailIndex}
        />
      )}
    </section>
  );
}
