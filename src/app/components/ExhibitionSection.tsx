/// <reference path="../../types/react-responsive-masonry.d.ts" />
import { useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Info } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData } from "../data/exhibition";
import { PanoModal } from "./PanoModal";
import { DetailModal } from "./DetailModal";

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
function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-12 mb-6 first:mt-0">
      <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-primary/50"></div>
      <h3 className="text-primary font-serif text-lg md:text-xl tracking-[0.15em] uppercase text-center">
        {title}
      </h3>
      <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-primary/50"></div>
    </div>
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

        <div className="flex flex-col gap-8 md:gap-12">

          <div>
            <SectionDivider title="Khu Vực Mở Đầu" />
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {exhibitionData.slice(0, 2).map((panel, i) => {
                const index = i;
                return (
                  <div key={panel.id} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-24px)]">
                    <ExhibitionCard
                      panel={panel}
                      index={index}
                      onPanoClick={() => setActivePanoIndex(index)}
                      onDetailClick={() => setActiveDetailIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <SectionDivider title="Phần I" />
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {exhibitionData.slice(2, 5).map((panel, i) => {
                const index = i + 2;
                return (
                  <div key={panel.id} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-24px)]">
                    <ExhibitionCard
                      panel={panel}
                      index={index}
                      onPanoClick={() => setActivePanoIndex(index)}
                      onDetailClick={() => setActiveDetailIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <SectionDivider title="Phần II" />
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {exhibitionData.slice(5, 9).map((panel, i) => {
                const index = i + 5;
                return (
                  <div key={panel.id} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-24px)]">
                    <ExhibitionCard
                      panel={panel}
                      index={index}
                      onPanoClick={() => setActivePanoIndex(index)}
                      onDetailClick={() => setActiveDetailIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <SectionDivider title="Phần III" />
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {exhibitionData.slice(9, 13).map((panel, i) => {
                const index = i + 9;
                return (
                  <div key={panel.id} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-24px)]">
                    <ExhibitionCard
                      panel={panel}
                      index={index}
                      onPanoClick={() => setActivePanoIndex(index)}
                      onDetailClick={() => setActiveDetailIndex(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
