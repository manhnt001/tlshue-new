import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { VisitorStats } from "./VisitorStats";
const logoImg = "/img/logo-FT2.png";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white/80 pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 mb-12 md:mb-16">

          {/* Left: Logo & Copyright Info */}
          <div className="flex flex-col">
            <a href="#hero" className="flex items-center gap-2 mb-6 inline-flex group">
              <img src={logoImg} alt="Logo" className="h-16 w-auto object-contain" />
            </a>
            {/* <div className="mb-8 flex flex-col gap-1.5">
              <span className="text-xs font-medium tracking-[0.2em] text-[#C89B3C] uppercase">
                Triển lãm trực tuyến
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-white/95 uppercase tracking-widest">
                Thành phố Huế
              </span>
              <span className="text-sm sm:text-base font-serif italic text-white/60">
                Qua tài liệu lưu trữ
              </span>
            </div> */}

            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Triển lãm trực tuyến thành phố Huế <br />
              Qua tài liệu lưu trữ
            </p>
          </div>

          {/* Center: Contact & Social */}
          <div className="flex flex-col">
            <h4 className="text-white font-serif font-medium mb-6 text-lg">Liên Hệ</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">Trung tâm Lưu trữ thành phố Huế</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm text-white/60">02343.845894</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm text-white/60">ttlt@hue.gov.vn</span>
              </li>
            </ul>

            {/* <div className="flex items-center gap-4 mt-auto">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div> */}
          </div>

          {/* Right: Visitor Statistics */}
          <div className="flex flex-col justify-start">
            <VisitorStats />
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bản quyền thuộc Sở Nội vụ Thành phố Huế.<br className="md:hidden" /> Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
