import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Unlock, 
  Battery, 
  Wifi, 
  Camera, 
  Volume2, 
  Sun,
  Flame,
  ChefHat,
  Map,
  ShoppingBag,
  Clock,
  Sparkles,
  ChevronUp
} from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  wallpaperUrl: string;
}

export default function LockScreen({ onUnlock, wallpaperUrl }: LockScreenProps) {
  const [time, setTime] = useState(new Date());
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date
  const formatTime = () => {
    return time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = () => {
    return time.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const handleUnlockClick = () => {
    setUnlocked(true);
    setTimeout(() => {
      onUnlock();
    }, 450);
  };

  return (
    <motion.div
      id="ios-lockscreen"
      initial={{ y: 0 }}
      animate={{ y: unlocked ? '-100%' : 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className="absolute inset-0 z-50 flex flex-col justify-between overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url(${wallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top Status Indicators */}
      <div className="flex items-center justify-between px-6 pt-4 text-xs font-medium">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 mr-1" />
          <span>7:06</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5" />
          <span className="text-[10px]">5G</span>
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">100%</span>
            <Battery className="w-[18px] h-[9px] fill-white" />
          </div>
        </div>
      </div>

      {/* Clock & Widgets Panel */}
      <div className="flex flex-col items-center mt-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-white/85"
        >
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>PORTFOLIO SECURE</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 text-7xl font-extralight tracking-tight font-display drop-shadow-md select-none"
        >
          {formatTime()}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base font-medium text-white/90 drop-shadow mt-1"
        >
          {formatDate()}
        </motion.p>

        {/* Lock Screen iOS Widgets Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mt-6 px-4 w-full max-w-sm justify-center"
        >
          {/* Weather Widget Mini */}
          <div className="flex flex-col items-center justify-center w-24 h-11 rounded-xl bg-black/25 backdrop-blur-md border border-white/10 p-1.5 text-center">
            <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Đà Lạt</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold">18°C</span>
            </div>
          </div>

          {/* Activity Widget Mini */}
          <div className="flex flex-col items-center justify-center w-24 h-11 rounded-xl bg-black/25 backdrop-blur-md border border-white/10 p-1.5 text-center">
            <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Dự án ngon</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className="text-xs font-bold">3 Sẵn Sàng</span>
            </div>
          </div>

          {/* Code Quality Mini */}
          <div className="flex flex-col items-center justify-center w-24 h-11 rounded-xl bg-black/25 backdrop-blur-md border border-white/10 p-1.5 text-center">
            <span className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">GitHub</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-bold">Verified</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Styled Notifications Push Center */}
      <div className="flex-1 flex flex-col justify-end gap-2.5 px-4 pb-24 mt-4 overflow-y-auto no-scrollbar max-w-md mx-auto w-full">
        <h3 className="text-[11px] font-bold tracking-wider text-white/60 uppercase ml-2 mb-1">
          Trung Tâm Thông Báo
        </h3>

        {/* Notif 1 - Cooking */}
        <motion.div 
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex items-start gap-3 p-3 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-lg text-white"
        >
          <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
            <ChefHat className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400">YumRecipe • Web Nấu Ăn</span>
              <span className="text-[9px] text-white/50">Hết tủ lạnh?</span>
            </div>
            <p className="text-xs font-medium text-white/95 mt-0.5 leading-snug">
              "Thử ngay gợi ý món Phở Bò ngon ngọt từ xương, chuẩn vị xưa chuẩn bị cho bữa sáng!" 🍜
            </p>
          </div>
        </motion.div>

        {/* Notif 2 - Crop Market */}
        <motion.div 
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex items-start gap-3 p-3 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-lg text-white"
        >
          <div className="p-2 rounded-xl bg-indigo-500 text-white shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-400">AgroFarm • Nông Sản Sạch</span>
              <span className="text-[9px] text-white/50">Có khuyến mại</span>
            </div>
            <p className="text-xs font-medium text-white/95 mt-0.5 leading-snug">
              "Dâu tây New Zealand Đà Lạt vừa hái xuống rẫy, giá cực ưu đãi chỉ hôm nay 🍓"
            </p>
          </div>
        </motion.div>

        {/* Notif 3 - Map */}
        <motion.div 
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="flex items-start gap-3 p-3 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-lg text-white"
        >
          <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0">
            <Map className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400">GeoMap • Bản Đồ Du Lịch</span>
              <span className="text-[9px] text-white/50">Lộ trình mới</span>
            </div>
            <p className="text-xs font-medium text-white/95 mt-0.5 leading-snug">
              "Khám phá 5 cung đường trekking và xe máy Đà Lạt - Tà Năng hoang sơ không thể bỏ qua!" 🏍️
            </p>
          </div>
        </motion.div>
      </div>

      {/* Swipe Bar & Quick Access Toggles */}
      <div className="flex flex-col items-center gap-6 px-6 pb-6">
        {/* Bottom Corner Actions buttons */}
        <div className="flex justify-between w-full max-w-sm px-4">
          <button 
            id="flashlight-button"
            onClick={() => setFlashlightOn(!flashlightOn)}
            className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-colors duration-200 ${
              flashlightOn ? 'bg-white text-black' : 'bg-black/35 backdrop-blur-md text-white border border-white/10'
            }`}
          >
            <Sun className={`w-5 h-5 ${flashlightOn ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>

          <button 
            id="camera-button"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-black/35 backdrop-blur-md text-white border border-white/10 cursor-pointer"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic sliding unlock action trigger */}
        <div className="flex flex-col items-center">
          <motion.button 
            id="slide-to-unlock-trigger"
            onClick={handleUnlockClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 cursor-pointer outline-none group pb-2"
          >
            <ChevronUp className="w-5 h-5 text-white/80 animate-bounce" />
            <span className="text-sm font-medium tracking-wide slider-glow text-white/90">
              Nhấp hoặc vuốt lên để mở khóa
            </span>
          </motion.button>
          
          <div className="w-36 h-1 bg-white/60 rounded-full mt-2 shrink-0"></div>
        </div>
      </div>
    </motion.div>
  );
}
