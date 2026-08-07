import { motion } from "motion/react";
import { Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./ui/SectionHeader";
import { IframeContainer } from "./ui/IframeContainer";
import { Button } from "./ui/button";

interface VirtualTourSectionProps {
  showTour: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function VirtualTourSection({ showTour, onPlay, onStop }: VirtualTourSectionProps) {
  return (
    <section id="virtual-tour" className="py-24 relative bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12 text-center max-w-3xl">
        <SectionHeader
          title="Tham Quan Triển Lãm Ảo"
          subtitle="Trải Nghiệm Tương Tác"
          align="center"
          className="mb-6 text-white"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-secondary-foreground/80 text-lg">
            Bước vào không gian ảo đa chiều, nơi bạn có thể tự do di chuyển, phóng to các hiện vật và khám phá kiến trúc Hoàng thành Huế như đang đứng trực tiếp tại di tích.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <IframeContainer className="group">
          {showTour ? (
            <div className="relative w-full h-full">
              <iframe
                src=""
                className="w-full h-full border-0 bg-black"
                allowFullScreen
                allow="gyroscope; accelerometer; magnetometer; vr"
                title="Virtual Tour"
              />
              {/* Back to Preview Button */}
              <button
                onClick={onStop}
                className="absolute top-4 left-4 px-4 py-2 bg-black/60 hover:bg-black/90 text-white rounded-full text-xs font-medium border border-white/20 transition-all z-30 flex items-center gap-2 backdrop-blur-md"
              >
                <span>← Quay lại</span>
              </button>
            </div>
          ) : (
            // <div className="relative w-full h-full cursor-pointer" onClick={onPlay}></div>
            <div className="relative w-full h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1553851919-596510268b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIdWUlMjBWaWV0bmFtJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc4MTU4MTIwNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Virtual Tour Hue"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-10 opacity-100 transition-opacity">
                <Button size="lg" className="flex items-center gap-3">
                  <Eye size={20} />
                  Mở Tour
                </Button>
              </div>
            </div>
          )}
        </IframeContainer>
      </div>
    </section>
  );
}
