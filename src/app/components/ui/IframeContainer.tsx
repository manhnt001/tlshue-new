import { cn } from "../../lib/utils";
import { ReactNode } from "react";
import { motion } from "motion/react";

interface IframeContainerProps {
  children: ReactNode;
  className?: string;
}

export function IframeContainer({ children, className }: IframeContainerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ willChange: "transform, opacity" }}
      className={cn("relative w-full aspect-video md:aspect-[21/9] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10", className)}
    >
      {children}
    </motion.div>
  );
}
