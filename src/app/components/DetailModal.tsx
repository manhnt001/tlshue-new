import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Maximize, Minimize, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData } from "../data/exhibition";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  panelIndex: number;
}

export function DetailModal({ isOpen, onClose, panelIndex }: DetailModalProps) {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [scale, setScale] = useState(1);

  // Auto scroll thumbnail carousel when main image index changes
  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(currentGalleryIndex);
  }, [currentGalleryIndex, thumbApi]);

  // Reset scale when image changes
  useEffect(() => {
    setScale(1);
  }, [currentGalleryIndex]);

  useEffect(() => {
    if (isOpen) {
      setCurrentGalleryIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!isOpen) return null;

  const panel = exhibitionData[panelIndex];
  const gallery = panel.gallery;

  const nextImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const toggleFullscreen = async () => {
    if (!viewerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await viewerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#111111] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur z-20">
            <div>
              <span className="text-primary text-xs uppercase tracking-widest">{panel.group}</span>
              <h2 className="text-white text-xl md:text-2xl mt-1">{panel.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left: Large Image Viewer */}
            <div
              ref={viewerRef}
              className="flex-1 relative bg-black flex items-center justify-center group overflow-hidden"
            >
              <button
                onClick={prevImage}
                className="absolute left-4 z-20 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-white/10"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 z-20 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 border border-white/10"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <TransformWrapper
                key={currentGalleryIndex}
                initialScale={1}
                minScale={1}
                maxScale={8}
                centerOnInit={true}
                onTransform={(ref, state) => {
                  const currentScale = state.scale;
                  setScale((prev) => (prev !== currentScale ? currentScale : prev));
                }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Tools overlay */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => zoomIn()}
                        disabled={scale >= 8}
                        className={`p-2 rounded bg-black/50 backdrop-blur transition-colors ${scale >= 8
                          ? "text-white/30 cursor-not-allowed"
                          : "text-white hover:bg-black/80 cursor-pointer"
                          }`}
                        title="Phóng to"
                      >
                        <ZoomIn size={18} />
                      </button>
                      <button
                        onClick={() => zoomOut()}
                        disabled={scale <= 1}
                        className={`p-2 rounded bg-black/50 backdrop-blur transition-colors ${scale <= 1
                          ? "text-white/30 cursor-not-allowed"
                          : "text-white hover:bg-black/80 cursor-pointer"
                          }`}
                        title="Thu nhỏ"
                      >
                        <ZoomOut size={18} />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        disabled={scale <= 1}
                        className={`p-2 rounded bg-black/50 backdrop-blur transition-colors ${scale <= 1
                          ? "text-white/30 cursor-not-allowed"
                          : "text-white hover:bg-black/80 cursor-pointer"
                          }`}
                        title="Đặt lại"
                      >
                        <RotateCcw size={18} />
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded bg-black/50 text-white hover:bg-black/80 backdrop-blur transition-colors"
                        title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                      >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                      </button>
                    </div>

                    <TransformComponent
                      wrapperClass="!w-full !h-full"
                      contentClass="!w-full !h-full flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex items-center justify-center p-4 md:p-12 cursor-grab active:cursor-grabbing"
                      >
                        <ImageWithFallback
                          src={gallery[currentGalleryIndex]}
                          alt={`${panel.title} - Image ${currentGalleryIndex + 1}`}
                          className="max-w-full max-h-full object-contain drop-shadow-2xl select-none pointer-events-none"
                        />
                      </motion.div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>

            {/* Right: Info Panel */}
            <div className="w-full md:w-80 lg:w-96 bg-[#1A1A1A] border-l border-white/5 flex flex-col">
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="w-12 h-[2px] bg-primary mb-6"></div>
                <h3 className="text-white text-lg font-serif mb-4">Chi tiết nội dung</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {panel.description}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-primary">
                      <span className="font-number font-medium">0{currentGalleryIndex + 1}</span>
                    </div>
                    <span className="text-white/50 text-sm font-number">/ 0{gallery.length}</span>
                  </div>
                </div>
              </div>

              {/* Bottom: Horizontal Thumbnail Gallery */}
              <div className="p-4 border-t border-white/5 bg-black/20 h-[148px] shrink-0">
                <h4 className="text-xs uppercase tracking-widest text-white/50 mb-3 ml-2">Bộ sưu tập ({gallery.length})</h4>
                <Carousel
                  setApi={setThumbApi}
                  opts={{
                    align: "start",
                    dragFree: true,
                  }}
                  className="w-full px-2"
                >
                  <CarouselContent className="-ml-3">
                    {gallery.map((img, idx) => (
                      <CarouselItem
                        key={idx}
                        className="pl-3 basis-auto"
                      >
                        <button
                          onClick={() => setCurrentGalleryIndex(idx)}
                          className={`relative w-20 h-20 rounded-md transition-all p-[2px] flex items-center justify-center ${idx === currentGalleryIndex
                            ? "bg-primary opacity-100"
                            : "bg-transparent opacity-40 hover:opacity-100"
                            }`}
                        >
                          <div className="w-full h-full rounded-sm bg-[#1A1A1A] p-[2px]">
                            <div className="w-full h-full rounded-sm overflow-hidden">
                              <ImageWithFallback
                                src={img}
                                alt="thumbnail"
                                className="w-full h-full object-cover pointer-events-none"
                              />
                            </div>
                          </div>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
