import React from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Lock, 
  Palette, 
  X,
  Sliders,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { SystemPreferences } from '../types';

interface ControlCenterProps {
  preferences: SystemPreferences;
  onUpdatePreferences: (prefs: Partial<SystemPreferences>) => void;
  onClose: () => void;
  onLock: () => void;
  isOpen: boolean;
}

const WALLPAPERS = [
  { name: 'Cosmic Slate', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Aurora Glow', url: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sunset Dream', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Neon Cyber', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80' }
];

export default function ControlCenter({ 
  preferences, 
  onUpdatePreferences, 
  onClose, 
  onLock, 
  isOpen 
}: ControlCenterProps) {
  
  if (!isOpen) return null;

  return (
    <motion.div
      id="ios-control-center-panel"
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      className="absolute top-0 inset-x-0 z-40 bg-zinc-900/90 backdrop-blur-3xl text-white p-5 rounded-b-3xl border-b border-white/10 shadow-2xl flex flex-col gap-5 max-w-md mx-auto w-full select-none"
    >
      {/* Control Center header with gesture bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Trung Tâm Điều Khiển</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main control layout block */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dark theme card setup */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between h-24">
          <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Chế độ giao diện</span>
          <div className="flex gap-2.5 mt-2">
            <button
              onClick={() => onUpdatePreferences({ themeMode: 'light' })}
              className={`flex-1 p-2 rounded-xl text-center text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition ${
                preferences.themeMode === 'light' ? 'bg-amber-500 text-white' : 'bg-white/5 border border-white/10 text-white/80'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Sáng</span>
            </button>
            <button
              onClick={() => onUpdatePreferences({ themeMode: 'dark' })}
              className={`flex-1 p-2 rounded-xl text-center text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition ${
                preferences.themeMode === 'dark' ? 'bg-indigo-600 text-white' : 'bg-white/5 border border-white/10 text-white/80'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Tối</span>
            </button>
          </div>
        </div>

        {/* Mute and lock quick system toggles */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between h-24">
          <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Hệ Thống Nhanh</span>
          <div className="flex gap-2.5 mt-2">
            <button
              onClick={() => onUpdatePreferences({ soundEnabled: !preferences.soundEnabled })}
              className={`flex-1 p-2 rounded-xl text-center text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition ${
                preferences.soundEnabled ? 'bg-teal-500 text-white' : 'bg-red-500/25 text-red-100 border border-red-500/10'
              }`}
            >
              {preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{preferences.soundEnabled ? 'Mở Âm' : 'Tắt Âm'}</span>
            </button>
            
            <button
              onClick={onLock}
              className="flex-1 p-2 rounded-xl text-center text-xs font-bold bg-white/5 border border-white/10 text-white/80 flex flex-col items-center gap-1 hover:bg-white/15 transition cursor-pointer"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Khóa Máy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brightness sliders section */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
        <div className="flex justify-between text-[10px] uppercase font-bold text-white/50 tracking-wider">
          <span>Độ Sáng giả lập</span>
          <span className="text-white">{preferences.brightness}%</span>
        </div>
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <input
            type="range"
            min="20"
            max="100"
            value={preferences.brightness}
            onChange={(e) => onUpdatePreferences({ brightness: Number(e.target.value) })}
            className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>
      </div>

      {/* High def systems Wallpapers selection */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-white/50 tracking-wider">
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span>Hình Nền iOS Độc Quyền</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.name}
              onClick={() => onUpdatePreferences({ wallpaperUrl: wp.url })}
              className={`relative h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                preferences.wallpaperUrl === wp.url ? 'border-sky-400 scale-105 shadow-md shadow-sky-400/20' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <img 
                src={wp.url} 
                alt={wp.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center font-bold truncate p-0.5">
                {wp.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-[10px] text-white/35 flex justify-center items-center gap-1">
        <Smartphone className="w-3 h-3" />
        <span>Giao Diện iOS Sim v14.0 • Thiết kế bởi Trung Developer</span>
      </div>
    </motion.div>
  );
}
