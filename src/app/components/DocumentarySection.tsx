import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./ui/SectionHeader";
import { VideoCard } from "./ui/VideoCard";
import { motion } from "motion/react";

interface DocumentarySectionProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function DocumentarySection({ isPlaying, onPlay, onStop }: DocumentarySectionProps) {
  return (
    <section id="documentary" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Video Thumbnail or Iframe */}
          <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white dark:border-card bg-black">
            {isPlaying ? (
              <div className="relative w-full h-full">
                <iframe
                  src="https://www.youtube.com/embed/wIGVtOk950w?autoplay=1"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Phim Tài Liệu Văn Hóa Huế"
                />
                {/* Close/Back Button */}
                <button
                  onClick={onStop}
                  className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 hover:bg-black/90 text-white rounded-full text-xs font-medium border border-white/20 transition-all z-10 flex items-center gap-1.5 backdrop-blur-md"
                >
                  <span>← Đóng</span>
                </button>
              </div>
            ) : (
              <VideoCard
                src="https://images.unsplash.com/photo-1616438096679-620332ede3a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc4MTU4MTIwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Phim Tài Liệu Văn Hóa Huế"
                className="w-full h-full border-0 rounded-none shadow-none"
                onClick={onPlay}
              />
            )}
          </div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col"
          >
            <SectionHeader
              title="Phim Tài Liệu"
              subtitle="Câu Chuyện"
              className="mb-6"
            />

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Hành trình ngược dòng thời gian để tìm hiểu về lịch sử, văn hóa và những giá trị di sản vô giá của Cố đô Huế. Qua những thước phim tư liệu chân thực, bạn sẽ hiểu rõ hơn về kiến trúc cung đình, đời sống hoàng tộc và tinh hoa văn hóa dân tộc.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tác phẩm được thực hiện với sự tham gia của các nhà nghiên cứu lịch sử hàng đầu, mang đến góc nhìn sâu sắc và toàn diện về một thời kỳ vàng son.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border text-center lg:text-left">
              <div>
                <p className="text-3xl font-number text-primary mb-1">143</p>
                <p className="text-sm text-muted-foreground">Năm lịch sử triều Nguyễn</p>
              </div>
              <div>
                <p className="text-3xl font-number text-primary mb-1">4K</p>
                <p className="text-sm text-muted-foreground">Chất lượng hình ảnh</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
