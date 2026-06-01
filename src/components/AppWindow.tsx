import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Search, 
  MapPin, 
  Navigation, 
  Compass, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Heart, 
  ChefHat, 
  Map, 
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Link2,
  FileCode,
  Info
} from 'lucide-react';
import { AppProject } from '../types';

interface AppWindowProps {
  project: AppProject;
  onClose: () => void;
  githubPagesUrl: string;
  onUrlChange: (newUrl: string) => void;
}

export default function AppWindow({ project, onClose, githubPagesUrl, onUrlChange }: AppWindowProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'docs'>('overview');
  
  // States for simulators
  // 1. Cooking simulator
  const [cookingSearch, setCookingSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

  // 2. Map simulator
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [mapDistance, setMapDistance] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);

  // 3. Trade/Produce simulator
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showInvoice, setShowInvoice] = useState(false);

  const getIconComponent = (name: string) => {
    switch (name) {
      case 'ChefHat': return <ChefHat className="w-5 h-5" />;
      case 'Map': return <Map className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Cooking sim logic
  const filteredRecipes = project.simulatedData.items.filter(item => 
    item.title.toLowerCase().includes(cookingSearch.toLowerCase()) || 
    item.desc.toLowerCase().includes(cookingSearch.toLowerCase())
  );

  const toggleLikeRecipe = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter(r => r !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };

  // Map sim logic
  const handleSelectLocation = (loc: any) => {
    setSelectedLocation(loc);
    setIsRouting(true);
    setMapDistance('Calculating...');
    setTimeout(() => {
      // Calculate mock distance based on location ID
      const dists: { [key: string]: string } = {
        'map-1': '241 km',
        'map-2': '513 km',
        'map-3': '118 km',
        'map-4': '356 km'
      };
      setMapDistance(dists[loc.id] || '150 km');
      setIsRouting(false);
    }, 800);
  };

  // AgroFarm sim logic
  const updateCart = (id: string, delta: number) => {
    const current = cart[id] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) {
      const copy = { ...cart };
      delete copy[id];
      setCart(copy);
    } else {
      setCart({ ...cart, [id]: next });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    project.simulatedData.items.forEach(item => {
      const qty = cart[item.id] || 0;
      if (qty > 0 && item.price) {
        // Extract numeric price from format '185.000 đ/Hộp' -> 185000
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
        total += priceNum * qty;
      }
    });
    return total;
  };

  const totalCartCount: number = Object.keys(cart).reduce((total: number, key: string) => total + (cart[key] || 0), 0);

  return (
    <motion.div
      id={`ios-app-window-${project.id}`}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-40 bg-gray-50 flex flex-col overflow-hidden text-gray-900 border-t border-white/20 select-text"
    >
      {/* Top Simulated App Navigation Header */}
      <div className={`px-4 py-3 text-white flex items-center justify-between shadow px-4 ${project.iconBgColor}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            {getIconComponent(project.iconName)}
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold truncate max-w-[180px] sm:max-w-xs">{project.shortTitle}</h2>
            <p className="text-[10px] text-white/75 truncate max-w-[180px] sm:max-w-xs">{project.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick External launch */}
          <a
            id={`launch-app-external-${project.id}`}
            href={githubPagesUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition shadow-sm"
          >
            <span>Live Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Close button */}
          <button 
            id={`close-app-window-${project.id}`}
            onClick={onClose} 
            className="p-1.5 rounded-full bg-black/15 hover:bg-black/25 text-white cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Styled iOS Tab Switcher Bar */}
      <div className="flex bg-white border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 text-center text-xs font-semibold border-b-2 transition ${
            activeTab === 'overview' 
              ? 'text-gray-900 border-gray-900 bg-gray-50/50' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Tổng Quan Dự Án
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 py-3 text-center text-xs font-semibold border-b-2 transition ${
            activeTab === 'simulator' 
              ? 'text-gray-900 border-gray-900 bg-gray-50/50' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Trình Giả Lập App
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex-1 py-3 text-center text-xs font-semibold border-b-2 transition ${
            activeTab === 'docs' 
              ? 'text-gray-900 border-gray-900 bg-gray-50/50' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Cài Đặt & Cấu Hình
        </button>
      </div>

      {/* Main Body Content with scroll */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-50">
        
        {/* TỔNG QUAN TAB */}
        {activeTab === 'overview' && (
          <div className="p-4 space-y-5 max-w-2xl mx-auto">
            {/* Banner block representing app */}
            <div className={`p-5 rounded-2xl text-white ${project.iconBgColor} shadow-md overflow-hidden relative`}>
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 scale-150">
                {getIconComponent(project.iconName)}
              </div>
              <span className="bg-white/20 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                GitHub Pages Portfolio
              </span>
              <h1 className="text-xl font-bold mt-2 font-display">{project.title}</h1>
              <p className="text-xs text-white/95 mt-1">{project.subtitle}</p>
              
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] bg-black/20 px-2 py-1 rounded-md font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                Giới thiệu dự án
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Core Features */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Các tính năng đột phá
              </h3>
              <div className="space-y-2.5">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links Block */}
            <div className="grid grid-cols-2 gap-3 pb-6">
              <a
                id={`direct-github-pages-link-${project.id}`}
                href={githubPagesUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 p-3 bg-gray-900 text-white rounded-xl font-semibold text-xs hover:bg-gray-850 transition shadow-sm"
              >
                <span>Xem GitHub Pages</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                id={`direct-github-repo-link-${project.id}`}
                href={project.githubRepoUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 p-3 bg-white text-gray-800 border border-gray-300 rounded-xl font-semibold text-xs hover:bg-gray-50 transition shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Mã nguồn GitHub</span>
              </a>
            </div>
          </div>
        )}

        {/* GIẢ LẬP APP TAB (INTERACTIVE SIMULATORS) */}
        {activeTab === 'simulator' && (
          <div className="p-4 max-w-md mx-auto h-full">

            {/* COOKING RECIPES SIMULATOR */}
            {project.id === 'cooking_app' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col pb-4 h-full">
                {/* Simulated search bar */}
                <div className="p-3 bg-amber-500/5 border-b border-amber-500/10">
                  <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider block mb-1">
                    Trực quan hóa YumRecipe OS
                  </span>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm món ngon Việt Nam (nem, phở, bún...)"
                      value={cookingSearch}
                      onChange={(e) => setCookingSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-900 border-none placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Main list or Selected recipe detail view */}
                {!selectedRecipe ? (
                  <div className="p-3 space-y-3 max-h-[360px] overflow-y-auto no-scrollbar">
                    {filteredRecipes.length > 0 ? (
                      filteredRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          onClick={() => setSelectedRecipe(recipe)}
                          className="p-3 rounded-xl border border-gray-100 bg-amber-50/20 hover:bg-amber-50/50 cursor-pointer transition flex justify-between items-start"
                        >
                          <div className="min-w-0 pr-2">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{recipe.title}</h4>
                            <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{recipe.desc}</p>
                            <span className="inline-block text-[9px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full mt-1.5">
                              {recipe.extra}
                            </span>
                          </div>
                          <button
                            onClick={(e) => toggleLikeRecipe(recipe.id, e)}
                            className="p-1 rounded-full hover:bg-gray-100 text-rose-500 shrink-0 transition"
                          >
                            <Heart className={`w-4 h-4 ${likedRecipes.includes(recipe.id) ? 'fill-rose-500' : ''}`} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-xs text-gray-500 py-6">Không tìm thấy món đặc sản nào khớp!</p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-white space-y-3">
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="text-xs text-amber-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      ← Trở lại danh sách
                    </button>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{selectedRecipe.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{selectedRecipe.desc}</p>
                    </div>

                    {/* Step simulation walkthrough content */}
                    <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100 space-y-2">
                      <span className="text-[9px] font-bold text-orange-700 uppercase tracking-widest block">
                        Các bước chế biến cơ bản
                      </span>
                      <ol className="text-xs text-gray-700 space-y-1.5 list-decimal pl-4 leading-normal">
                        <li>Chuẩn bị nguyên liệu sạch, ninh xương sườn lấy nước dùng ngọt thơm tự nhiên.</li>
                        <li>Trần bún/bánh phở, cho vào bát sứ cùng hành lá tươi thái mỏng, rau mùi ngọt ngào.</li>
                        <li>Trần sơ thịt bò hoặc bày biện món chính lên trên mặt bún thật gọn gàng, đẹp mắt.</li>
                        <li>Chan nước dùng nóng hổi, kẹo thơm ngào ngạt và thưởng thức khi còn đang ngút khói!</li>
                      </ol>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-150">
                      <span className="text-[10px] text-gray-500">{selectedRecipe.rating}</span>
                      <button
                        onClick={(e) => toggleLikeRecipe(selectedRecipe.id, e)}
                        className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[10px] cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Yêu Thích</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MAP NAVIGATION SIMULATOR */}
            {project.id === 'maps_app' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col pb-4 h-full">
                {/* Simulated search and instructions */}
                <div className="p-3 bg-emerald-500/5 border-b border-emerald-500/10">
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block mb-0.5">
                    Định vị vệ tinh GeoMap
                  </span>
                  <p className="text-[11px] text-gray-600 leading-normal">
                    Chọn một danh thắng Việt Nam để mô phỏng tính toán lộ trình di chuyển tối ưu trên nền bản đồ:
                  </p>
                </div>

                {/* Map graphics canvas simulation */}
                <div className="relative h-44 bg-blue-100/70 border-b border-slate-200 flex items-center justify-center p-3 select-none">
                  {/* Grid lines simulating coordinates */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  
                  {/* Decorative map tracks */}
                  <svg className="absolute inset-0 w-full h-full text-emerald-400 stroke-2 fill-none stroke-dasharray">
                    <path d="M 30,50 Q 80,120 180,40 T 320,110 stroke-dasharray" />
                    <path d="M 50,150 Q 180,90 280,140 stroke-dasharray" className="stroke-blue-400" />
                  </svg>

                  {/* Vietnam Map Marker Pins */}
                  <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                    <MapPin className="w-5 h-5 text-red-500 animate-bounce" />
                    <span className="text-[8px] font-bold bg-white/95 px-1 rounded shadow text-gray-900">Vị Trí Của Bạn (Hanoi)</span>
                  </div>

                  {selectedLocation && (
                    <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
                      <MapPin className="w-6 h-6 text-emerald-600 animate-pulse" />
                      <span className="text-[8px] font-bold bg-emerald-600 text-white px-1 py-0.5 rounded shadow whitespace-nowrap">
                        {selectedLocation.title}
                      </span>
                    </div>
                  )}

                  {!selectedLocation ? (
                    <div className="text-center z-10 bg-white/85 p-2 rounded-xl border border-gray-200">
                      <Navigation className="w-5 h-5 text-indigo-500 mx-auto animate-bounce" />
                      <p className="text-[10px] font-semibold text-gray-700 mt-1">Sẵn sàng điều hướng GPS</p>
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 z-10 bg-white/90 p-2 rounded-lg border border-gray-200 text-left min-w-[120px]">
                      <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-bold">Lộ trình GPS</span>
                      <p className="text-[10px] font-bold text-gray-800">{selectedLocation.title}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">
                        {isRouting ? 'Đang quy hoạch đường...' : `Khoảng cách: ${mapDistance}`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Destination locations list */}
                <div className="p-3 space-y-2 max-h-[160px] overflow-y-auto no-scrollbar">
                  {project.simulatedData.items.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className={`w-full p-2.5 rounded-xl border text-left flex justify-between items-center transition cursor-pointer ${
                        selectedLocation?.id === loc.id 
                          ? 'border-emerald-500 bg-emerald-50/50' 
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{loc.title}</h4>
                        <p className="text-[9px] text-gray-500 truncate mt-0.5">{loc.desc}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full block">
                          {loc.extra.split(' • ')[1]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AGRICULTURE SHOPPING SIMULATOR */}
            {project.id === 'agriculture_app' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col pb-4 h-full">
                {/* Header Shopping Info */}
                <div className="p-3 bg-indigo-500/5 border-b border-indigo-500/10 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">
                      Hợp Tác Xã AgroFarm
                    </span>
                    <span className="text-[11px] text-gray-600">Nông sản sạch vận chuyển nguyên chất từ rẫy</span>
                  </div>
                  <div className="relative p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                    <ShoppingCart className="w-4 h-4" />
                    {totalCartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                        {totalCartCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="p-3 space-y-3 max-h-[220px] overflow-y-auto no-scrollbar">
                  {project.simulatedData.items.map((farmItem) => {
                    const qty = cart[farmItem.id] || 0;
                    return (
                      <div key={farmItem.id} className="p-2.5 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div className="min-w-0 pr-2 flex-1">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{farmItem.title}</h4>
                          <span className="text-[10px] font-bold text-indigo-600 block mt-0.5">{farmItem.price}</span>
                          <span className="text-[9px] text-gray-400 block truncate">{farmItem.extra}</span>
                        </div>

                        {/* Plus / Minus Counter interface */}
                        <div className="flex items-center gap-2 shrink-0 bg-gray-50 border border-gray-200 rounded-lg p-1">
                          {qty > 0 ? (
                            <>
                              <button 
                                onClick={() => updateCart(farmItem.id, -1)}
                                className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer"
                              >
                                <Minus className="w-3 h-3 text-gray-600" />
                              </button>
                              <span className="text-xs font-bold text-gray-800 px-1 w-4 text-center">{qty}</span>
                            </>
                          ) : null}
                          <button 
                            onClick={() => updateCart(farmItem.id, 1)}
                            className="p-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Invoice & Total computation */}
                <div className="mt-auto px-3 pt-3 border-t border-gray-100 bg-slate-50/50">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Tổng hóa đơn hữu cơ</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {calculateTotal().toLocaleString('vi-VN')} đ
                    </span>
                  </div>

                  <button
                    disabled={totalCartCount === 0}
                    onClick={() => setShowInvoice(true)}
                    className={`w-full mt-2.5 py-2 rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 transition ${
                      totalCartCount > 0 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Tiến Hành Đặt Mua Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Simulated checkout receipt modal overlay */}
                {showInvoice && (
                  <div className="absolute inset-x-2 bottom-2 z-20 p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xl space-y-3 animate-fade-in">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1.5">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-gray-900">Đặt hàng nông nghiệp thành công!</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Hóa đơn chuẩn VietGAP hỗ trợ thu COD tận nhà</p>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-xl text-left space-y-1 text-[11px] text-gray-700 font-mono">
                      <div className="flex justify-between border-b border-gray-150 pb-1 mb-1">
                        <span>Đơn Hàng:</span>
                        <span>AGRO_{Math.floor(Math.random() * 90000) + 10000}</span>
                      </div>
                      {project.simulatedData.items.map((item) => {
                        const q = cart[item.id] || 0;
                        if (q > 0) {
                          return (
                            <div key={item.id} className="flex justify-between">
                              <span className="truncate max-w-[150px]">{item.title}</span>
                              <span>x{q}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                      <div className="flex justify-between border-t border-dashed border-gray-300 pt-1.5 mt-1.5 font-bold text-gray-900">
                        <span>Tổng Thanh Toán:</span>
                        <span>{calculateTotal().toLocaleString('vi-VN')} đ</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setCart({});
                          setShowInvoice(false);
                        }}
                        className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-[10px] cursor-pointer"
                      >
                        Quay lại Chợ
                      </button>
                      <a
                        href={githubPagesUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] text-center cursor-pointer"
                      >
                        Xem Trang Live ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* CÀI ĐẶT & CONFIG TAB */}
        {activeTab === 'docs' && (
          <div className="p-4 space-y-4 max-w-2xl mx-auto text-left">
            {/* Live Link config card */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-gray-400" />
                Đường dẫn liên kết GitHub Pages
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Một tính năng nâng cao vô cùng trực quan: Bạn có thể đổi đường dẫn URL đích này thành link chứa trang web thực tế của bạn đã triển khai để hệ thống trỏ chính xác khi mở ứng dụng!
              </p>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-700 uppercase">Liên kết trang web bạn đã tạo</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={githubPagesUrl}
                    onChange={(e) => onUrlChange(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none font-mono text-gray-700"
                    placeholder="https://tên-github.github.io/tên-dự-án"
                  />
                  <button
                    onClick={() => {
                      onUrlChange(project.defaultGithubUrl);
                    }}
                    className="px-2.5 py-1 text-[10px] border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-xl transition cursor-pointer"
                    title="Đặt lại về mặc định"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Steps instruction to publish */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-gray-400" />
                Làm thế nào để tạo trang này trên GitHub?
              </h3>
              
              <div className="space-y-3.5 text-xs text-gray-700 leading-relaxed">
                <div>
                  <span className="font-bold text-gray-900 block mb-0.5">Bước 1: Khởi tạo Project</span>
                  <span>Tải code dự án của bạn (Web nấu ăn, Bản đồ, hay Nông sản) lên một repository mới trên tài khoản GitHub cá nhân.</span>
                </div>

                <div>
                  <span className="font-bold text-gray-900 block mb-0.5">Bước 2: Triển khai GitHub Pages</span>
                  <span>Đi tới tab <strong>Settings</strong> của repository, trỏ đến cài đặt <strong>Pages</strong> bên thanh menu trái. Chọn nguồn (Build and deployment) là <strong>Deploy from a branch</strong>, chọn branch <strong>main</strong> và lưu lại. Đợi 1 phút, GitHub sẽ xuất bản thành công đường dẫn web của bạn!</span>
                </div>

                <div>
                  <span className="font-bold text-gray-900 block mb-0.5">Bước 3: Nhúng liên kết ở đây</span>
                  <span>Coppy đường dẫn mà GitHub cung cấp, paste vào ô cài đặt URL bên trên, hệ thống sẽ đồng bộ hóa để cổng thông tin này sẵn sàng chuyển hướng đẹp mắt đến website thực của bạn!</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
