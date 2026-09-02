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
  ChevronLeft,
  Tag 
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
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      case 'kids':
        return <Baby className="w-4 h-4 text-pink-500" />;
      case 'shirts':
        return <Shirt className="w-4 h-4 text-blue-500" />;
      case 'tshirts':
        return <Flame className="w-4 h-4 text-pink-500" />;
      case 'pants':
        return <Tag className="w-4 h-4 text-blue-500" />;
      case 'underwear':
        return <ShieldCheck className="w-4 h-4 text-blue-500" />;
      case 'sets':
        return <Layers className="w-4 h-4 text-pink-500" />;
      case 'tracksuits':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'pajamas':
        return <Moon className="w-4 h-4 text-pink-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 left-4 z-40" dir="rtl">
      {/* Expanded Floating Menu Drawer / Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 mb-3 w-72 sm:w-80 bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-neutral-950 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-600 flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white font-['Tajawal',sans-serif]">
                    أقسام المعروضات
                  </h4>
                  <p className="text-[10px] text-neutral-300">تصفح سريع لجميع أقسام المتجر</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of categories */}
            <div className="p-2 max-h-72 overflow-y-auto space-y-1 bg-neutral-50/50">
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
                    className={`w-full p-2.5 rounded-2xl transition-all flex items-center justify-between text-right border cursor-pointer ${
                      isActive
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                        : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                          isActive
                            ? 'bg-gradient-to-tr from-blue-600 to-pink-600 text-white border-white/20'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold font-['Tajawal',sans-serif]">
                          {cat.title}
                        </span>
                        <span className={`text-[10px] line-clamp-1 ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {cat.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {typeof count === 'number' && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-sans font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {count}
                        </span>
                      )}
                      <ChevronLeft className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`} />
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
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white font-bold text-xs shadow-lg border border-neutral-700 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        title="قوائم المعروضات"
        id="floating-categories-menu-btn"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-blue-500 to-pink-500"></span>
        </span>
        <Layers className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
        <span className="font-['Tajawal',sans-serif] font-bold tracking-wide">
          {isOpen ? 'إغلاق الأقسام' : 'أقسام المعروضات'}
        </span>
      </button>
    </div>
  );
};
