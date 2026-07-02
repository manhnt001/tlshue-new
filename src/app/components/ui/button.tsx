import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(200,155,60,0.39)] hover:shadow-[0_6px_20px_rgba(200,155,60,0.23)]",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      outline: "border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };
    
    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-10 px-6 py-2.5 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
