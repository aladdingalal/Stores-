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
  Tag
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
      case 'pants':
        return <Tag className={classNameStr} />;
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
                  ? 'bg-neutral-950 text-white border-neutral-900 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200/80 shadow-2xs hover:border-neutral-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-tr from-blue-600 to-pink-600 text-white'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {getIcon(cat.id, 'w-5 h-5 shrink-0')}
              </div>

              <span className="font-bold text-xs sm:text-sm tracking-tight truncate w-full px-1 font-['Tajawal',sans-serif]">
                {cat.title}
              </span>

              {cat.badge && (
                <span
                  className={`mt-1 text-[9px] px-2 py-0.5 rounded-full font-bold leading-none truncate max-w-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {cat.badge}
                </span>
              )}

              {typeof count === 'number' && (
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    isActive ? 'text-blue-300' : 'text-neutral-400'
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

  // Modern horizontal scrollable pills with Blue & Pink active glow
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
            className={`shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border ${
              isActive
                ? 'bg-neutral-950 text-white border-neutral-900 shadow-sm'
                : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <span
              className={`shrink-0 ${
                isActive ? 'text-pink-400' : 'text-blue-600'
              }`}
            >
              {getIcon(cat.id, 'w-3.5 h-3.5 shrink-0')}
            </span>
            <span className="whitespace-nowrap font-['Tajawal',sans-serif]">{cat.title}</span>
            {typeof count === 'number' && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold shrink-0 ${
                  isActive ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white' : 'bg-neutral-100 text-neutral-600'
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
