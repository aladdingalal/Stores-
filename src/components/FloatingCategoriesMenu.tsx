import React, { useState } from 'react';
import { 
  Layers, 
  X, 
  Sparkles, 
  Baby, 
  Shirt, 
  Flame, 
  ShieldCheck, 
  Activity, 
  Moon, 
  ChevronLeft 
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface FloatingCategoriesMenuProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  productCounts?: Record<CategoryType, number>;
}

export const FloatingCategoriesMenu: React.FC<FloatingCategoriesMenuProps> = ({
  activeCategory,
  onSelectCategory,
  productCounts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (id: CategoryType) => {
    switch (id) {
      case 'all':
        return <Sparkles className="w-4 h-4 text-pink-500" />;
      case 'kids':
        return <Baby className="w-4 h-4 text-pink-500" />;
      case 'shirts':
        return <Shirt className="w-4 h-4 text-pink-500" />;
      case 'tshirts':
        return <Flame className="w-4 h-4 text-pink-500" />;
      case 'underwear':
        return <ShieldCheck className="w-4 h-4 text-pink-500" />;
      case 'sets':
        return <Layers className="w-4 h-4 text-pink-500" />;
      case 'tracksuits':
        return <Activity className="w-4 h-4 text-pink-500" />;
      case 'pajamas':
        return <Moon className="w-4 h-4 text-pink-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-500" />;
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 left-4 z-40" dir="rtl">
      {/* Expanded Floating Menu Drawer / Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 mb-3 w-72 sm:w-80 bg-white rounded-3xl border-2 border-slate-900 shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-slate-950 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-black text-sm text-white font-['Tajawal',sans-serif]">
                    قوائم وأقسام المعروضات
                  </h4>
                  <p className="text-[10px] text-pink-300">تصفح سريع لجميع أقسام المتجر</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of categories */}
            <div className="p-2 max-h-72 overflow-y-auto space-y-1 bg-slate-50/50">
              {CATEGORIES_CONFIG.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = productCounts?.[cat.id];

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-2xl transition-all flex items-center justify-between text-right border ${
                      isActive
                        ? 'bg-pink-50 border-pink-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-white hover:bg-pink-50/40 border-slate-200/90 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                          isActive
                            ? 'bg-pink-500 text-white border-pink-600'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-950 font-['Tajawal',sans-serif]">
                          {cat.title}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">{cat.subtitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {typeof count === 'number' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono font-bold">
                          {count}
                        </span>
                      )}
                      <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-slate-950 hover:bg-black text-white font-bold text-xs shadow-xl border-2 border-pink-500 hover:border-pink-400 hover:scale-105 active:scale-95 transition-all duration-200"
        title="قوائم المعروضات"
        id="floating-categories-menu-btn"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
        <Layers className="w-4 h-4 text-pink-400 group-hover:rotate-12 transition-transform" />
        <span className="font-['Tajawal',sans-serif] font-black tracking-wide">
          {isOpen ? 'إغلاق القوائم' : 'قوائم المعروضات (7)'}
        </span>
      </button>
    </div>
  );
};
