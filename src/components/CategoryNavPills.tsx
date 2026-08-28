import React from 'react';
import { 
  Sparkles, 
  Baby, 
  Shirt, 
  Flame, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Moon,
  ChevronLeft
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
      <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 ${className}`}>
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = productCounts?.[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              id={`cat-card-${cat.id}`}
              className={`group flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/50 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80 hover:border-amber-400/60 shadow-xs'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${
                  isActive
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                }`}
              >
                {getIcon(cat.id, 'w-5 h-5')}
              </div>

              <span className="font-bold text-xs sm:text-sm tracking-tight line-clamp-1">
                {cat.title}
              </span>

              {cat.badge && (
                <span
                  className={`mt-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                    isActive
                      ? 'bg-slate-900/90 text-amber-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.badge}
                </span>
              )}

              {typeof count === 'number' && (
                <span
                  className={`text-[10px] mt-0.5 font-medium ${
                    isActive ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {count} موديل
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Horizontal scrollable pills (Mobile-First friendly)
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth ${className}`}
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
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-slate-950 text-amber-400 border border-slate-900 shadow-sm ring-1 ring-amber-400/40'
                : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/90'
            }`}
          >
            <span
              className={`${
                isActive ? 'text-amber-400' : 'text-amber-600'
              }`}
            >
              {getIcon(cat.id, 'w-4 h-4')}
            </span>
            <span className="whitespace-nowrap">{cat.title}</span>
            {typeof count === 'number' && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
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
