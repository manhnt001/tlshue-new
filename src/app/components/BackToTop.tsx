import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Lắng nghe sự kiện scroll để hiển thị/ẩn nút
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Hàm cuộn mượt mà lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ 
            scale: 1.1
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary border border-white/20 backdrop-blur-xl transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
          title="Cuộn lên đầu trang"
          aria-label="Back to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
