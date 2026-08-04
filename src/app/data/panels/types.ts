export interface SubImage {
  url: string;
  caption?: string;
  source?: string;
}

export interface ContentSection {
  title?: string;
  text?: string;
  images?: (string | SubImage)[];
}

export interface GallerySlide {
  id: string;
  thumbUrl: string;
  title: string;
  leadText?: string;
  quote?: string;
  bodyText?: string;
  footerNote?: string;
  images?: (string | SubImage)[];
  sections?: ContentSection[];
}

export interface ExhibitionItem {
  id: string;
  group: string;
  title: string;
  image: string;
  description: string;
  gallery: string[];
  slides?: GallerySlide[];
}
