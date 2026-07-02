import { Play } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface VideoCardProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export function VideoCard({ src, alt, className, onClick }: VideoCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ willChange: "transform, opacity" }}
      className={cn("relative group rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3] cursor-pointer border-[8px] border-white dark:border-card", className)}
      onClick={onClick}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 backdrop-blur text-white flex items-center justify-center pl-1.5 transform group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(200,155,60,0.5)]">
          <Play size={32} fill="currentColor" className="sm:hidden" />
          <Play size={40} fill="currentColor" className="hidden sm:block" />
        </button>
      </div>
      {/* Decorative border frame */}
      <div className="absolute inset-4 border border-white/20 rounded-xl pointer-events-none hidden md:block"></div>
    </motion.div>
  );
}
