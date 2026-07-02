import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, align = "left", className, ...props }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ willChange: "transform, opacity" }}
      className={cn("mb-12", align === "center" ? "text-center mx-auto" : "text-left", className)} 
      {...props}
    >
      <div className={cn("inline-flex items-center gap-4 mb-4", align === "center" && "justify-center")}>
        <div className="w-8 h-[1px] bg-primary"></div>
        <span className="text-primary font-medium tracking-widest uppercase text-sm">{subtitle}</span>
        {align === "center" && <div className="w-8 h-[1px] bg-primary"></div>}
      </div>
      <h2>{title}</h2>
    </motion.div>
  );
}
