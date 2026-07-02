import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { VisitorStats } from "./VisitorStats";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white/80 pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Left: Logo & Copyright Info */}
          <div className="flex flex-col">
            <a href="#hero" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-2xl shadow-[0_0_15px_rgba(200,155,60,0.5)]">
                H
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-white">
                Di Sản Huế
              </span>
            </a>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Dự án số hóa di sản văn hóa Huế, nhằm bảo tồn và lan tỏa giá trị lịch sử thông qua không gian triển lãm thực tế ảo tương tác.
            </p>
            <p className="text-xs text-white/40 mt-auto">
              © {new Date().getFullYear()} Triển Lãm Số Di Sản Huế.<br/>
              Bản quyền thuộc về Trung tâm Bảo tồn Di tích Cố đô Huế.
            </p>
          </div>

          {/* Center: Contact & Social */}
          <div className="flex flex-col">
            <h4 className="text-white font-serif font-medium mb-6 text-lg">Liên Hệ</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">Trung tâm Bảo tồn Di tích Cố đô Huế, Phường Thuận Hòa, TP. Huế, Việt Nam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm text-white/60">+84 234 352 3237</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm text-white/60">info@disanhue.vn</span>
              </li>
            </ul>
            
            <div className="flex items-center gap-4 mt-auto">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Right: Visitor Statistics */}
          <div className="flex flex-col justify-start">
            <VisitorStats />
          </div>
        </div>
      </div>
    </footer>
  );
}
