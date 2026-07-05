import React from 'react';
import { 
  ChefHat,
  Map,
  ShoppingBag,
  Coins,
  Building2,
  ExternalLink,
  Heart, 
  Github, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const SITES = [
  {
    id: 'nauan',
    title: 'Web Nấu Ăn',
    subtitle: 'YumRecipe - Sổ tay hương vị Việt',
    url: 'https://trungdeveloper1993.github.io/webnauan/',
    bgColor: 'bg-amber-50 group-hover:bg-amber-100',
    iconColor: 'text-amber-600',
    description: 'Khám phá và lưu trữ tinh hoa ẩm thực truyền thống Việt Nam.',
    icon: ChefHat
  },
  {
    id: 'ando',
    title: 'Web Bản Đồ',
    subtitle: 'GeoMap Vina - Bản đồ du lịch thông minh',
    url: 'https://trungdeveloper1993.github.io/bandoviet/',
    bgColor: 'bg-emerald-50 group-hover:bg-emerald-100',
    iconColor: 'text-emerald-600',
    description: 'Chỉ đường lưu thông tối ưu và định vị địa điểm văn hóa đặc sắc.',
    icon: Map
  },
  {
    id: 'nongsan',
    title: 'Web Mua Bán Nông Sản',
    subtitle: 'AgroFarm - Chợ nông nghiệp hữu cơ',
    url: 'https://trungdeveloper1993.github.io/muabannongsan/',
    bgColor: 'bg-indigo-50 group-hover:bg-indigo-100',
    iconColor: 'text-indigo-600',
    description: 'Cửa hàng cung ứng thực phẩm sạch chuẩn VietGAP trực tiếp từ nông trại.',
    icon: ShoppingBag
  },
  {
    id: 'giavang',
    title: 'Nhật Kí Mua Vàng',
    subtitle: 'GoldDiary - Theo dõi giá & nhật ký tích lũy vàng',
    url: 'https://trungdeveloper1993.github.io/giavang/',
    bgColor: 'bg-yellow-50 group-hover:bg-yellow-100',
    iconColor: 'text-yellow-600',
    description: 'Ghi lại nhật ký mua vàng và theo dõi biến động giá vàng SJC, vàng nhẫn mới nhất.',
    icon: Coins
  },
  {
    id: 'bds',
    title: 'Hỗ Trợ BĐS',
    subtitle: 'RealEstate - Tư vấn & hỗ trợ bất động sản',
    url: 'https://trungdeveloper1993.github.io/bds/',
    bgColor: 'bg-sky-50 group-hover:bg-sky-100',
    iconColor: 'text-sky-600',
    description: 'Tra cứu, tư vấn và hỗ trợ giao dịch mua bán, cho thuê bất động sản.',
    icon: Building2
  }
];

export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-50/70 text-slate-900 flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans selection:bg-indigo-100">
      
      {/* Decorative Top Accent Line */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-500 z-50"></div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full pt-12 pb-16 flex-1 flex flex-col justify-center">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Developer Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Cổng Dự Án Cá Nhân
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Xin chân thành cảm ơn bạn đã ghé thăm các sản phẩm tâm huyết của tôi! Đây là phím tắt dẫn trực tiếp đến các trang web thực tế đã phát hành.
          </p>
        </div>

        {/* Shortcuts Streamlined Cards */}
        <div className="space-y-4">
          {SITES.map((site) => {
            const IconComponent = site.icon;
            return (
              <a
                key={site.id}
                id={`shortcut-link-${site.id}`}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="group flex items-center justify-between p-4 bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Icon Block */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${site.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${site.iconColor}`} />
                  </div>

                  {/* Title & Slug text */}
                  <div className="text-left min-w-0">
                    <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5 group-hover:text-slate-950 transition-colors">
                      {site.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium truncate">
                      {site.subtitle}
                    </p>
                  </div>
                </div>

                {/* Open/Launch visual indicator */}
                <div className="flex items-center gap-1 text-slate-300 group-hover:text-slate-600 transition-colors px-2">
                  <span className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 hidden sm:inline">
                    Ghé thăm
                  </span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Minimal Thank you statement badge */}
        <div className="mt-12 text-center p-4 rounded-2xl bg-white border border-slate-150/60 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>Chúc bạn một ngày làm việc tràn đầy năng lượng!</span>
          </div>
        </div>

      </div>

      {/* Footer Branding block */}
      <footer className="text-center py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 max-w-2xl mx-auto w-full">
        <div>
          <span>© 2026. Thiết kế tỉ mỉ bởi </span>
          <a
            href="https://github.com/trungdeveloper1993"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="font-bold hover:text-slate-600 underline transition"
          >
            Trung Developer
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/trungdeveloper1993"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="flex items-center gap-1 hover:text-slate-600 transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </footer>

    </div>
  );
}
