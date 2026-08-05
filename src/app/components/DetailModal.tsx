import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Maximize, Minimize, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { exhibitionData, GallerySlide, SubImage } from "../data/exhibition";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";
import { parseMarkdown } from "../../utils/parseMarkdown";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  panelIndex: number;
}

function getSlideThumbUrl(slide: GallerySlide): string {
  // 1. Explicit thumbUrl
  if (slide.thumbUrl) {
    if (typeof slide.thumbUrl === "string") return slide.thumbUrl;
    if (Array.isArray(slide.thumbUrl) && slide.thumbUrl.length > 0) return slide.thumbUrl[0];
  }

  // 2. Auto-extract from blocks
  if (slide.blocks && slide.blocks.length > 0) {
    for (const block of slide.blocks) {
      if (block.type === "image_block" && block.image) {
        if (typeof block.image === "string") return block.image;
        if (Array.isArray(block.image)) {
          return typeof block.image[0] === "string" ? block.image[0] : (block.image[0] as any)?.url || "";
        }
        if ((block.image as any).url) return (block.image as any).url;
      }

      if ((block.type === "gallery_block" || block.type === "section_block") && block.images && block.images.length > 0) {
        const firstImg = block.images[0];
        return typeof firstImg === "string" ? firstImg : firstImg.url;
      }

      if (block.type === "text_block" && block.content) {
        const match = block.content.match(/!\[.*?\]\(\s*([^)"\s]+)/);
        if (match && match[1]) return match[1];
      }
    }
  }

  // 3. Fallback
  return "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=400";
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

  // In the new Blocks schema, we don't have a flat currentImagesList easily.
  // We don't need it because gallery_blocks will render their own images,
  // but we might need all images for the thumbnail badge count if we want it.
  // Let's compute it just for the thumbnail count (done below inside the render).

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

  const handleHtmlClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const figure = target.closest('figure');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) {
        setLightboxImage({
          url: img.src,
          caption: img.alt || undefined,
          source: img.title || undefined
        });
      }
    }
  };

  const renderMarkdownWithImages = (content: string) => {
    if (!content) return null;
    const parts = content.split(/(!\[.*?\]\(\s*\S+?(?:\s+["'].*?["'])?\s*\))/g);

    return (
      <div className="space-y-4">
        {parts.map((part, pIdx) => {
          if (part.startsWith('![')) {
            const match = part.match(/!\[(.*?)\]\(\s*(\S+?)(?:\s+["'](.*?)["'])?\s*\)/);
            if (match) {
              const alt = match[1];
              const url = match[2];
              const title = match[3];

              const imgObj = { url, caption: alt, source: title };
              return (
                <figure
                  key={pIdx}
                  onClick={() => setLightboxImage(imgObj as SubImage)}
                  className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C] pt-2 my-6"
                >
                  <ImageWithFallback
                    src={url}
                    alt={alt || `Ảnh chi tiết`}
                    className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-contain mx-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-[#C89B3C] text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                      <Maximize2 size={14} /> Bấm để soi ảnh phóng to
                    </span>
                  </div>
                  {(alt || title) && (
                    <figcaption className="p-3.5 bg-black/85 border-t border-white/10 text-xs sm:text-sm space-y-0.5 mt-0">
                      {alt && <p className="text-white/95 font-medium">{alt}</p>}
                      {title && <p className="text-[#C89B3C]/70 italic">{title}</p>}
                    </figcaption>
                  )}
                </figure>
              );
            }
          }

          if (!part.trim()) return null;

          return (
            <div
              key={pIdx}
              className="text-[#F7F3EB]/95 text-base sm:text-lg leading-relaxed font-normal html-content"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(part) }}
              onClick={handleHtmlClick}
            />
          );
        })}
      </div>
    );
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
                    {currentSlide.title && (
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#C89B3C] leading-snug">
                        {currentSlide.title}
                      </h3>
                    )}

                    {/* Render Blocks */}
                    {currentSlide.blocks && currentSlide.blocks.length > 0 && (
                      <div className="space-y-6 sm:space-y-8">
                        {currentSlide.blocks.map((block, bIdx) => {
                          switch (block.type) {
                            case "text_block":
                              return renderMarkdownWithImages(block.content || "");

                            case "quote_block":
                              return block.quote ? (
                                <blockquote key={bIdx} className="border-l-3 border-[#C89B3C] pl-5 py-3 italic text-[#C89B3C] text-base sm:text-lg bg-[#C89B3C]/10 rounded-r-lg font-serif">
                                  "{block.quote}"
                                  {block.source && <span className="block mt-2 text-sm text-[#C89B3C]/70 not-italic font-sans">- {block.source}</span>}
                                </blockquote>
                              ) : null;

                            case "gallery_block":
                              return block.images && block.images.length > 0 ? (
                                <div key={bIdx} className="space-y-6 pt-2">
                                  {block.images.map((imgItem, iIdx) => {
                                    const img = typeof imgItem === "string" ? { url: imgItem, caption: `Hình ảnh ${iIdx + 1}` } : imgItem;
                                    return (
                                      <figure
                                        key={iIdx}
                                        onClick={() => setLightboxImage(img as SubImage)}
                                        className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C]"
                                      >
                                        <ImageWithFallback
                                          src={img.url}
                                          alt={img.caption || `Ảnh ${iIdx + 1}`}
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
                                            {img.source && <p className="text-[#C89B3C]/70 italic">{img.source}</p>}
                                          </figcaption>
                                        )}
                                      </figure>
                                    );
                                  })}
                                </div>
                              ) : null;

                            case "image_block":
                              if (!block.image) return null;

                              let singleImgUrl = "";
                              if (typeof block.image === "string") {
                                singleImgUrl = block.image;
                              } else if (Array.isArray(block.image)) {
                                singleImgUrl = typeof block.image[0] === "string" ? block.image[0] : block.image[0]?.url || "";
                              } else if ((block.image as any).url) {
                                singleImgUrl = (block.image as any).url;
                              }
                              if (!singleImgUrl) return null;

                              const singleImgObj = { url: singleImgUrl, caption: block.caption, source: block.source };
                              return (
                                <figure
                                  key={bIdx}
                                  onClick={() => setLightboxImage(singleImgObj as SubImage)}
                                  className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C] pt-2"
                                >
                                  <ImageWithFallback
                                    src={singleImgUrl}
                                    alt={block.caption || `Ảnh chi tiết`}
                                    className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-contain mx-auto rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-4 py-2 rounded-full bg-[#C89B3C] text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                                      <Maximize2 size={14} /> Bấm để soi ảnh phóng to
                                    </span>
                                  </div>
                                  {(block.caption || block.source) && (
                                    <figcaption className="p-3.5 bg-black/85 border-t border-white/10 text-xs sm:text-sm space-y-0.5">
                                      {block.caption && <p className="text-white/95 font-medium">{block.caption}</p>}
                                      {block.source && <p className="text-[#C89B3C]/70 italic">{block.source}</p>}
                                    </figcaption>
                                  )}
                                </figure>
                              );

                            case "section_block":
                              return (
                                <div key={bIdx} className="space-y-4">
                                  {block.title && (
                                    <h4 className="text-lg sm:text-xl font-serif text-[#C89B3C] font-bold">
                                      {block.title}
                                    </h4>
                                  )}
                                  {block.content && renderMarkdownWithImages(block.content)}
                                  {block.images && block.images.length > 0 && (
                                    <div className="space-y-6 pt-2">
                                      {block.images.map((imgItem, iIdx) => {
                                        const img = typeof imgItem === "string" ? { url: imgItem, caption: `Hình ${iIdx + 1}` } : imgItem;
                                        return (
                                          <figure
                                            key={iIdx}
                                            onClick={() => setLightboxImage(img as SubImage)}
                                            className="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C]"
                                          >
                                            <ImageWithFallback
                                              src={img.url}
                                              alt={img.caption || `Hình ${iIdx + 1}`}
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
                                                {img.source && <p className="text-[#C89B3C]/70 italic">{img.source}</p>}
                                              </figcaption>
                                            )}
                                          </figure>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
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
                                src={getSlideThumbUrl(slide)}
                                alt={slide.title || `Slide ${idx + 1}`}
                                className="w-full h-full object-cover pointer-events-none"
                              />
                              {(() => {
                                let imageCount = 0;
                                if (slide.blocks) {
                                  slide.blocks.forEach(b => {
                                    if (b.type === 'gallery_block' || b.type === 'section_block') {
                                      if (b.images) imageCount += b.images.length;
                                    }
                                  });
                                }
                                return imageCount > 0 ? (
                                  <span className="absolute bottom-0.5 right-0.5 bg-black/90 text-[#C89B3C] text-[8px] px-1 rounded font-number font-medium border border-[#C89B3C]/30">
                                    +{imageCount}
                                  </span>
                                ) : null;
                              })()}
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
                      {currentSlide.title && (
                        <h3 className="text-white text-base font-serif mt-0.5">
                          {currentSlide.title}
                        </h3>
                      )}
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
                    className="flex-1 relative bg-black flex flex-col overflow-hidden min-h-0"
                  >
                    <div className="flex-1 relative w-full flex items-center justify-center overflow-hidden min-h-0">
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
                    </div>

                    {/* Caption Footer */}
                    {(lightboxImage.caption || lightboxImage.source) && (
                      <div className="w-full bg-black/95 border-t border-white/10 px-6 py-4 text-center shrink-0 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                        {lightboxImage.caption && (
                          <p className="text-sm sm:text-base text-white/90 font-medium max-w-4xl mx-auto">
                            {lightboxImage.caption}
                          </p>
                        )}
                        {lightboxImage.source && (
                          <p className="text-xs sm:text-sm text-[#C89B3C]/70 italic mt-1.5 max-w-4xl mx-auto">
                            {lightboxImage.source}
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
