import { motion } from "motion/react";
import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import bannerHero from "../../img/banner-hero.jpg";

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={bannerHero}
          alt="Hue Imperial Citadel"
          /* Thêm thuộc tính object-bottom để căn chỉnh hình ảnh hiển thị phần dưới cùng, phù hợp với bố cục phần chân trang */
          className="w-full h-full object-cover object-bottom"
        />
        <div className="hidden absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
      </div>

      <div className="hidden container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/30 bg-black/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-white tracking-widest uppercase">Trải nghiệm kỹ thuật số</span>
          </div>

          <h1 className="text-white mb-6 drop-shadow-lg">
            Triển Lãm Số <br />
            <span className="text-primary">Di Sản Huế</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            Khám phá di sản Huế bằng công nghệ số. Chạm vào quá khứ, cảm nhận không gian văn hóa Hoàng cung một cách sống động chưa từng có.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="#virtual-tour">Bắt Đầu Trải Nghiệm</a>
            </Button>

            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2" asChild>
              <a href="#documentary">
                <Play size={18} />
                Phim Tài Liệu
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hidden absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-white text-xs font-medium uppercase tracking-widest">
          Cuộn xuống
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
}
