/// <reference path="../../types/react-responsive-masonry.d.ts" />
import { useState } from "react";
import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Maximize2, Info } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData } from "../data/exhibition";
import { PanoModal } from "./PanoModal";
import { DetailModal } from "./DetailModal";

const COLUMNS_BREAKPOINTS = { 350: 1, 768: 2, 1024: 3 };
const GUTTER_BREAKPOINTS = { 350: "20px", 768: "24px", 1024: "24px" };

function ExhibitionCard({ panel, index, onPanoClick, onDetailClick }: { panel: any; index: number; onPanoClick: () => void; onDetailClick: () => void }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      key={panel.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setIsActive(!isActive)}
      onMouseLeave={() => setIsActive(false)}
      className="relative group rounded-2xl overflow-hidden bg-card cursor-pointer isolate aspect-auto shadow-xl"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden transform-gpu">
        <ImageWithFallback
          src={panel.image}
          alt={panel.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out transform-gpu will-change-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
        />

        {/* Default overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 will-change-[opacity]"></div>

        {/* Default text */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-transform duration-300 ease-out transform-gpu will-change-transform ${isActive ? '-translate-y-4' : 'group-hover:-translate-y-4'}`}>
          <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2 block transition-colors">
            {panel.group}
          </span>
          <h3 className="text-white text-xl md:text-2xl font-serif">{panel.title}</h3>
        </div>

        {/* Hover Interaction: Dark overlay with 2 action buttons */}
        <div className={`absolute inset-0 bg-black/80 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20 will-change-[opacity] ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPanoClick();
            }}
            className={`w-[180px] py-3 px-6 rounded-full bg-primary text-black font-semibold hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 transform-gpu transition-all duration-200 shadow-md cursor-pointer ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}
          >
            <Maximize2 size={18} />
            Xem Pano
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailClick();
            }}
            className={`w-[180px] py-3 px-6 rounded-full bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 active:scale-95 flex items-center justify-center gap-2 transform-gpu transition-all duration-200 shadow-md cursor-pointer ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}
            style={{ transitionDelay: isActive ? '50ms' : '' }}
          >
            <Info size={18} />
            Xem Chi Tiết
          </button>
        </div>

        {/* Hover Border Overlay */}
        <div className={`absolute inset-0 border-2 border-white/40 transition-opacity duration-300 pointer-events-none z-30 rounded-2xl will-change-[opacity] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
      </div>
    </motion.div>
  );
}

export function ExhibitionSection() {
  const [activePanoIndex, setActivePanoIndex] = useState<number | null>(null);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

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
          columnsCountBreakPoints={COLUMNS_BREAKPOINTS}
          gutterBreakPoints={GUTTER_BREAKPOINTS}
        >
          <Masonry>
            {exhibitionData.map((panel, index) => (
              <ExhibitionCard
                key={panel.id}
                panel={panel}
                index={index}
                onPanoClick={() => setActivePanoIndex(index)}
                onDetailClick={() => setActiveDetailIndex(index)}
              />
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
