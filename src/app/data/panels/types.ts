export interface SubImage {
  url: string;
  caption?: string;
  source?: string;
}

export interface SlideBlock {
  type: "text_block" | "quote_block" | "gallery_block" | "section_block" | "image_block";
  content?: string;
  quote?: string;
  source?: string;
  images?: (string | SubImage)[];
  image?: string | SubImage;
  caption?: string;
  title?: string;
}

export interface GallerySlide {
  id?: string;
  thumbUrl: string;
  title?: string;
  blocks?: SlideBlock[];
}

export interface ExhibitionItem {
  id: string;
  group: string;
  title: string;
  image: string;
  description?: string;
  gallery: string[];
  slides?: GallerySlide[];
}
