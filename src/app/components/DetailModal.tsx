import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Maximize, Minimize, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData, GallerySlide, SubImage } from "../data/exhibition";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  panelIndex: number;
}

export function DetailModal({ isOpen, onClose, panelIndex }: DetailModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [lightboxImage, setLightboxImage] = useState<SubImage | null>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const panel = exhibitionData[panelIndex];

  // Convert panel data to unified normalized slides format
  const slides: GallerySlide[] = useMemo(() => {
    if (!panel) return [];
    if (panel.slides && panel.slides.length > 0) {
      return panel.slides;
    }
    // Fallback: If no custom slides, create slides from gallery array
    return panel.gallery.map((url, idx) => ({
      id: `fallback-slide-${idx}`,
      thumbUrl: url,
      title: `${panel.title} - Hồ sơ ${idx + 1}`,
      leadText: idx === 0 ? panel.description : undefined,
      // bodyText: panel.description,
      images: [url]
    }));
  }, [panel]);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Normalize current sub-images
  const currentImagesList: SubImage[] = useMemo(() => {
    if (!currentSlide || !currentSlide.images) return [];
    return currentSlide.images.map((img, idx) => {
      if (typeof img === "string") {
        return { url: img, caption: `Hình ảnh tư liệu ${idx + 1}` };
      }
      return img;
    });
  }, [currentSlide]);

  // Auto scroll thumbnail carousel when slide index changes
  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(currentSlideIndex);
  }, [currentSlideIndex, thumbApi]);

  // Reset scroll position when slide changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isOpen) {
      setCurrentSlideIndex(0);
      setLightboxImage(null);
      document.body.style.overflow = "hidden";
      t = setTimeout(() => setIsReady(true), 150);
    } else {
      setIsReady(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(t);
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

  if (!isOpen || !panel) return null;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Cuộn ngang danh sách Thumbnail bằng con lăn chuột (Mouse Wheel)
  const handleThumbWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!thumbApi) return;
    if (e.deltaY > 0) {
      thumbApi.scrollNext();
    } else if (e.deltaY < 0) {
      thumbApi.scrollPrev();
    }
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 select-none font-sans text-white">
          {/* OVERLAY: Only fades opacity, NO scaling, to prevent massive GPU repaints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* MODAL WINDOW: Scales and fades, with Hardware Acceleration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl h-[88vh] max-h-[750px] flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-[#141414] text-white shadow-[0_25px_70px_rgba(0,0,0,0.85)] transform-gpu will-change-transform"
          >

            {/* Phủ hiệu ứng nền mờ nhẹ nhàng */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=1200')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] pointer-events-none" />

            {/* HEADER CỐ ĐỊNH: Viền mảnh 1px thanh lịch */}
            <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1A1A1A]/95 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] text-xs font-medium tracking-wide border border-[#C89B3C]/25">
                  {panel.group}
                </span>
                <h2 className="text-[#F7F3EB] text-sm sm:text-base font-serif font-semibold truncate max-w-md">
                  {panel.title}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-number text-white/60">
                  <strong className="text-[#C89B3C] font-semibold text-sm">{currentSlideIndex + 1}</strong> / {slides.length}
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer border border-white/10 hover:border-[#C89B3C]"
                  title="Đóng modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* MAIN STAGE CONTAINER (Bao gồm 2 nút Prev/Next THU NHỎ CỐ ĐỊNH + Khung cuộn nội dung) */}
            <div className="relative flex-1 flex flex-col min-h-0 z-20 overflow-hidden">

              {/* Nút Prev THU NHỎ GỌN NHẸ (w-9 h-9 sm:w-10 sm:h-10) VỚI VIỀN VÀNG HOÀNG GIA KHI HOVER */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1F1F1F] hover:bg-[#C89B3C] hover:text-black text-white/90 border border-white/15 hover:border-[#C89B3C] shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                title="Hồ sơ trước"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Nút Next THU NHỎ GỌN NHẸ (w-9 h-9 sm:w-10 sm:h-10) VỚI VIỀN VÀNG HOÀNG GIA KHI HOVER */}
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1F1F1F] hover:bg-[#C89B3C] hover:text-black text-white/90 border border-white/15 hover:border-[#C89B3C] shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                title="Hồ sơ tiếp theo"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* PHẦN NỘI DUNG CHÍNH: CÓ SCROLL ĐỨNG TỰ DO ĐỘC LẬP */}
              <div
                ref={scrollContainerRef}
                className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8 scroll-smooth transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
              >
                {isReady && (
                  <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 px-2 sm:px-4">

                    {/* Slide Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#C89B3C] leading-snug">
                      {currentSlide.title}
                    </h3>

                    {/* Lead Text / Description */}
                    {currentSlide.leadText && (
                      <div 
                        className="text-[#F7F3EB]/95 text-base sm:text-lg leading-relaxed font-normal html-content"
                        dangerouslySetInnerHTML={{ __html: currentSlide.leadText }}
                      />
                    )}

                    {/* Quote if exists */}
                    {currentSlide.quote && (
                      <blockquote className="border-l-3 border-[#C89B3C] pl-5 py-3 italic text-[#C89B3C] text-base sm:text-lg bg-[#C89B3C]/10 rounded-r-lg font-serif">
                        "{currentSlide.quote}"
                      </blockquote>
                    )}

                    {/* STACKED IMAGES LIST (Mảng các ảnh tư liệu xếp dải dọc) */}
                    {currentImagesList.length > 0 && (
                      <div className="space-y-6 pt-2">
                        {currentImagesList.map((img, idx) => (
                          <figure
                            key={idx}
                            onClick={() => setLightboxImage(img)}
                            className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C]"
                          >
                            <ImageWithFallback
                              src={img.url}
                              alt={img.caption || `Ảnh ${idx + 1}`}
                              className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-contain mx-auto rounded-lg"
                            />

                            {/* Zoom hint overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-4 py-2 rounded-full bg-[#C89B3C] text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                                <Maximize2 size={14} /> Bấm để soi ảnh phóng to
                              </span>
                            </div>

                            {/* Caption & Source under image */}
                            {(img.caption || img.source) && (
                              <figcaption className="p-3.5 bg-black/85 border-t border-white/10 text-xs sm:text-sm space-y-0.5">
                                {img.caption && <p className="text-white/95 font-medium">{img.caption}</p>}
                                {img.source && <p className="text-[#C89B3C]/70 italic">Nguồn: {img.source}</p>}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    )}

                    {/* Extra Sections if exists */}
                    {currentSlide.sections && currentSlide.sections.length > 0 && (
                      <div className="space-y-8 pt-6 border-t border-white/10">
                        {currentSlide.sections.map((sec, sIdx) => {
                          const secImages = (sec.images || []).map((img, iIdx) =>
                            typeof img === "string" ? { url: img, caption: `Hình ảnh ${sIdx + 1}.${iIdx + 1}` } : img
                          );
                          return (
                            <div key={sIdx} className="space-y-4">
                              {sec.title && (
                                <h4 className="text-lg sm:text-xl font-serif text-[#C89B3C] font-bold">
                                  {sec.title}
                                </h4>
                              )}
                              {sec.text && (
                                <div 
                                  className="text-[#F7F3EB]/90 text-base sm:text-lg leading-relaxed html-content"
                                  dangerouslySetInnerHTML={{ __html: sec.text }}
                                />
                              )}
                              {secImages.length > 0 && (
                                <div className="space-y-6 pt-2">
                                  {secImages.map((img, iIdx) => (
                                    <figure
                                      key={iIdx}
                                      onClick={() => setLightboxImage(img)}
                                      className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C]"
                                    >
                                      <ImageWithFallback
                                        src={img.url}
                                        alt={img.caption || `Hình ${sIdx + 1}.${iIdx + 1}`}
                                        className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-contain mx-auto rounded-lg"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="px-4 py-2 rounded-full bg-[#C89B3C] text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                                          <Maximize2 size={14} /> Bấm để soi ảnh phóng to
                                        </span>
                                      </div>
                                      {(img.caption || img.source) && (
                                        <figcaption className="p-3.5 bg-black/85 border-t border-white/10 text-xs sm:text-sm space-y-0.5">
                                          {img.caption && <p className="text-white/95 font-medium">{img.caption}</p>}
                                          {img.source && <p className="text-[#C89B3C]/70 italic">Nguồn: {img.source}</p>}
                                        </figcaption>
                                      )}
                                    </figure>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Body Text if exists */}
                    {currentSlide.bodyText && (
                      <div 
                        className="text-[#F7F3EB]/90 text-base sm:text-lg leading-relaxed pt-4 border-t border-white/10 html-content"
                        dangerouslySetInnerHTML={{ __html: currentSlide.bodyText }}
                      />
                    )}

                    {/* Footer Note / Nguồn note */}
                    {currentSlide.footerNote && (
                      <p className="text-xs sm:text-sm text-white/50 italic pt-3 border-t border-white/10">
                        {currentSlide.footerNote}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* THANH THUMBNAIL CỐ ĐỊNH ĐÁY */}
              <div
                onWheel={handleThumbWheel}
                className={`relative z-30 px-3 py-2 sm:py-3 bg-[#141414]/95 border-t border-white/10 shrink-0 select-none transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
              >
                {isReady && (
                  <Carousel
                    setApi={setThumbApi}
                    opts={{
                      align: "start",
                      dragFree: true,
                    }}
                    className="w-full max-w-3xl mx-auto"
                  >
                    <CarouselContent className="-ml-2 py-1">
                      {slides.map((slide, idx) => (
                        <CarouselItem
                          key={idx}
                          className="pl-2 basis-auto"
                        >
                          <button
                            onClick={() => setCurrentSlideIndex(idx)}
                            className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl p-[2px] transition-all cursor-pointer flex items-center justify-center overflow-hidden focus:outline-none ${idx === currentSlideIndex
                              ? "bg-[#C89B3C]"
                              : "bg-[#1A1A1A] opacity-40 hover:opacity-100 border border-white/15 hover:border-[#C89B3C]"
                              }`}
                          >
                            {/* Inner Image Frame: Bán kính đồng tâm toán học chính xác (16px - 2px = 14px) */}
                            <div className="w-full h-full rounded-[14px] bg-[#141414] overflow-hidden relative">
                              <ImageWithFallback
                                src={slide.thumbUrl}
                                alt={slide.title}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                              {slide.images && slide.images.length > 1 && (
                                <span className="absolute bottom-0.5 right-0.5 bg-black/90 text-[#C89B3C] text-[8px] px-1 rounded font-number font-medium border border-[#C89B3C]/30">
                                  +{slide.images.length}
                                </span>
                              )}
                            </div>
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
              </div>

            </div>

            {/* FULLSCREEN LIGHTBOX FOR ZOOMING/PANNING ANY IMAGE */}
            <AnimatePresence>
              {lightboxImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-xl font-sans"
                >
                  {/* Lightbox Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 z-30 shrink-0">
                    <div>
                      <span className="text-[#C89B3C] text-xs uppercase tracking-widest font-semibold">Chế độ soi ảnh nét cao</span>
                      <h3 className="text-white text-base font-serif mt-0.5">
                        {lightboxImage.caption || currentSlide.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setLightboxImage(null)}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10 hover:border-[#C89B3C]"
                      title="Thoát soi ảnh"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  {/* Lightbox Zoom Stage */}
                  <div
                    ref={viewerRef}
                    className="flex-1 relative bg-black flex items-center justify-center overflow-hidden"
                  >
                    <TransformWrapper
                      initialScale={1}
                      minScale={1}
                      maxScale={8}
                      centerOnInit={true}
                      onTransform={(_, state) => setScale(state.scale)}
                    >
                      {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                          {/* Floating Zoom Toolbar */}
                          <div className="absolute top-4 right-4 z-30 flex items-center gap-1 bg-black/90 p-1.5 rounded-xl border border-white/15 shadow-2xl">
                            <button
                              onClick={() => zoomIn()}
                              disabled={scale >= 8}
                              className={`p-2 rounded-lg transition-colors ${scale >= 8 ? "text-white/30" : "text-white hover:bg-white/15 cursor-pointer"
                                }`}
                              title="Phóng to"
                            >
                              <ZoomIn size={18} />
                            </button>
                            <button
                              onClick={() => zoomOut()}
                              disabled={scale <= 1}
                              className={`p-2 rounded-lg transition-colors ${scale <= 1 ? "text-white/30" : "text-white hover:bg-white/15 cursor-pointer"
                                }`}
                              title="Thu nhỏ"
                            >
                              <ZoomOut size={18} />
                            </button>
                            <button
                              onClick={() => resetTransform()}
                              disabled={scale <= 1}
                              className={`p-2 rounded-lg transition-colors ${scale <= 1 ? "text-white/30" : "text-white hover:bg-white/15 cursor-pointer"
                                }`}
                              title="Đặt lại zoom"
                            >
                              <RotateCcw size={18} />
                            </button>
                            <div className="w-[1px] h-5 bg-white/20 mx-1"></div>
                            <button
                              onClick={toggleFullscreen}
                              className="p-2 rounded-lg text-white hover:bg-white/15 transition-colors cursor-pointer"
                              title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                            >
                              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                            </button>
                          </div>

                          {/* Image canvas */}
                          <TransformComponent
                            wrapperClass="!w-full !h-full"
                            contentClass="!w-full !h-full flex items-center justify-center"
                          >
                            <div className="w-full h-full flex items-center justify-center p-4 md:p-12 cursor-grab active:cursor-grabbing">
                              <ImageWithFallback
                                src={lightboxImage.url}
                                alt={lightboxImage.caption || "Tư liệu sắc nét"}
                                className="max-w-full max-h-full object-contain drop-shadow-2xl select-none pointer-events-none"
                              />
                            </div>
                          </TransformComponent>
                        </>
                      )}
                    </TransformWrapper>

                    {/* Caption box inside Lightbox */}
                    {(lightboxImage.caption || lightboxImage.source) && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-black/95 px-6 py-3 rounded-2xl border border-white/15 text-center max-w-[90%] space-y-1">
                        {lightboxImage.caption && (
                          <p className="text-xs sm:text-sm text-white/90 font-medium">
                            {lightboxImage.caption}
                          </p>
                        )}
                        {lightboxImage.source && (
                          <p className="text-[11px] text-[#C89B3C]/70 italic">
                            Nguồn: {lightboxImage.source}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
