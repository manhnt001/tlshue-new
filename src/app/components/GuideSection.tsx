import { motion } from "motion/react";
import { PlayCircle, Compass, MousePointerClick } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./ui/SectionHeader";

interface GuideSectionProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function GuideSection({ isPlaying, onPlay, onStop }: GuideSectionProps) {
  const steps = [
    {
      icon: <PlayCircle size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />,
      title: "1. Xem phim tài liệu",
      description: "Bắt đầu với thước phim ngắn để nắm bắt tổng quan về lịch sử và bối cảnh không gian triển lãm.",
    },
    {
      icon: <Compass size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />,
      title: "2. Khám phá các pano triển lãm",
      description: "Hệ thống pano được trưng bày dưới dạng danh sách, hiển thị tất cả các nội dung quan trọng.",
    },
    {
      icon: <MousePointerClick size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />,
      title: "3. Trải nghiệm không gian ảo",
      description: "Sử dụng chuột hoặc thao tác vuốt trên điện thoại để xoay góc nhìn, di chuyển qua các điểm tham quan ảo.",
    },
    {
      icon: <MousePointerClick size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />,
      title: "4. Tìm hiểu nội dung chi tiết",
      description: "Nhấn vào Xem Chi Tiết trên mỗi Pano để hiển thị bộ sưu tập ảnh và thông tin mở rộng.",
    }
  ];

  return (
    <section id="guide" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Hướng Dẫn Trải Nghiệm"
          subtitle="Các Bước"
          align="center"
          className="mb-16"
        />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ willChange: "transform, opacity" }}
          className="text-center max-w-2xl mx-auto -mt-12 mb-16"
        >
          <p className="text-muted-foreground text-lg">
            Ba bước đơn giản để có một chuyến tham quan kỹ thuật số trọn vẹn và chân thực nhất.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Steps Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ willChange: "transform, opacity" }}
                className="bg-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border flex gap-5 group"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h4 className="mb-2 font-serif font-semibold">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Embedded Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="lg:col-span-7"
          >
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group border-[8px] border-white dark:border-card cursor-pointer">
              {isPlaying ? (
                <div className="relative w-full h-full">
                  <iframe
                    src=""
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video hướng dẫn trải nghiệm"
                  />
                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStop();
                    }}
                    className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 hover:bg-black/90 text-white rounded-full text-xs font-medium border border-white/20 transition-all z-10 flex items-center gap-1.5 backdrop-blur-md"
                  >
                    <span>← Đóng</span>
                  </button>
                </div>
              ) : (
                // <div className="w-full h-full relative" onClick={onPlay}>
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBleGhpYml0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3ODE1ODEyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Video hướng dẫn"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-colors group-hover:bg-black/40">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                      <PlayCircle size={40} className="sm:hidden" />
                      <PlayCircle size={48} className="hidden sm:block" />
                    </div>
                    <p className="text-white mt-4 font-medium tracking-wide drop-shadow-md">Xem video hướng dẫn</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
