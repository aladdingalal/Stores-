import React from 'react';
import { 
  Sparkles, 
  Baby, 
  Shirt, 
  Flame, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Moon
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface CategoryNavPillsProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  className?: string;
  variant?: 'pills' | 'cards' | 'dropdown';
  productCounts?: Record<CategoryType, number>;
}

export const CategoryNavPills: React.FC<CategoryNavPillsProps> = ({
  activeCategory,
  onSelectCategory,
  className = '',
  variant = 'pills',
  productCounts,
}) => {
  const getIcon = (id: CategoryType, classNameStr = 'w-4 h-4') => {
    switch (id) {
      case 'all':
        return <Sparkles className={classNameStr} />;
      case 'kids':
        return <Baby className={classNameStr} />;
      case 'shirts':
        return <Shirt className={classNameStr} />;
      case 'tshirts':
        return <Flame className={classNameStr} />;
      case 'underwear':
        return <ShieldCheck className={classNameStr} />;
      case 'sets':
        return <Layers className={classNameStr} />;
      case 'tracksuits':
        return <Activity className={classNameStr} />;
      case 'pajamas':
        return <Moon className={classNameStr} />;
      default:
        return <Sparkles className={classNameStr} />;
    }
  };

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 ${className}`}>
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = productCounts?.[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              id={`cat-card-${cat.id}`}
              className={`group flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-950 text-white border-pink-500 shadow-md ring-2 ring-pink-400/50 scale-[1.02]'
                  : 'bg-white hover:bg-pink-50/40 text-slate-900 border-slate-200 hover:border-pink-300 shadow-xs'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shrink-0 border ${
                  isActive
                    ? 'bg-pink-600 text-white border-pink-700'
                    : 'bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                {getIcon(cat.id, 'w-5 h-5 shrink-0')}
              </div>

              <span className="font-black text-xs sm:text-sm tracking-tight truncate w-full px-1 font-['Tajawal',sans-serif]">
                {cat.title}
              </span>

              {cat.badge && (
                <span
                  className={`mt-1 text-[9px] px-2 py-0.5 rounded-full font-bold leading-none truncate max-w-full ${
                    isActive
                      ? 'bg-pink-500 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {cat.badge}
                </span>
              )}

              {typeof count === 'number' && (
                <span
                  className={`text-[10px] mt-1 font-bold ${
                    isActive ? 'text-pink-300' : 'text-slate-500'
                  }`}
                >
                  {count} معروض
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Horizontal scrollable pills
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth ${className}`}
      dir="rtl"
    >
      {CATEGORIES_CONFIG.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = productCounts?.[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            id={`cat-pill-${cat.id}`}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer border-2 ${
              isActive
                ? 'bg-slate-950 text-white border-pink-500 shadow-sm ring-1 ring-pink-400'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-pink-300'
            }`}
          >
            <span
              className={`shrink-0 ${
                isActive ? 'text-pink-400' : 'text-pink-600'
              }`}
            >
              {getIcon(cat.id, 'w-4 h-4 shrink-0')}
            </span>
            <span className="whitespace-nowrap font-['Tajawal',sans-serif]">{cat.title}</span>
            {typeof count === 'number' && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold shrink-0 ${
                  isActive ? 'bg-pink-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
