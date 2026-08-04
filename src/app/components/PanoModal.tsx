import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData } from "../data/exhibition";

interface PanoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

export function PanoModal({ isOpen, onClose, initialIndex }: PanoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  if (!isOpen) return null;

  const nextPanel = () => {
    setCurrentIndex((prev) => (prev + 1) % exhibitionData.length);
  };

  const prevPanel = () => {
    setCurrentIndex((prev) => (prev - 1 + exhibitionData.length) % exhibitionData.length);
  };

  const currentPanel = exhibitionData[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Navigation */}
          <button
            onClick={prevPanel}
            className="absolute left-4 md:left-12 z-50 p-2 md:p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
          >
            <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          <button
            onClick={nextPanel}
            className="absolute right-4 md:right-12 z-50 p-2 md:p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
          >
            <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
          </button>

          {/* Content */}
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-5xl flex flex-col items-center gap-6"
            >
              {/* Title block */}
              <div className="text-center">
                <span className="text-primary tracking-widest text-sm uppercase font-medium">{currentPanel.group}</span>
                <h3 className="text-white text-2xl md:text-3xl mt-1 drop-shadow-md font-semibold">{currentPanel.title}</h3>
              </div>

              {/* Image container */}
              <div className="relative w-full rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-transparent bg-black flex items-center justify-center max-h-[65vh] md:max-h-[70vh]">
                <ImageWithFallback
                  src={currentPanel.image}
                  alt={currentPanel.title}
                  className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain"
                />
              </div>

              {/* Pagination indicators */}
              <div className="flex justify-center gap-2">
                {exhibitionData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-primary w-6" : "bg-white/30 hover:bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
