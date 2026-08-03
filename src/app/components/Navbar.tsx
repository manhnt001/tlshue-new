import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../img/logo.webp";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang Chủ", href: "#hero" },
    { name: "Phim Tài Liệu", href: "#documentary" },
    { name: "Khám Phá", href: "#exhibition" },
    { name: "Tham Quan Ảo", href: "#virtual-tour" },
    { name: "Hướng Dẫn", href: "#guide" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90"
                }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://thiduayeunuoc.langson.gov.vn/360/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Mở Tour
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className={`md:hidden p-2 rounded-md ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://thiduayeunuoc.langson.gov.vn/360/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-2 py-3 bg-primary text-primary-foreground rounded-full text-center text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Mở Tour
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
