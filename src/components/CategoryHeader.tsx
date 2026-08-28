import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Baby, 
  Shirt, 
  Flame, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Moon,
  Truck
} from 'lucide-react';
import { CategoryType, PricingMode } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface CategoryHeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  productCount: number;
  pricingMode?: PricingMode;
  onTogglePricingMode?: (mode: PricingMode) => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  activeCategory,
  onSelectCategory,
  productCount,
}) => {
  const currentCategory = CATEGORIES_CONFIG.find((c) => c.id === activeCategory) || CATEGORIES_CONFIG[0];

  const getCategoryIcon = (id: CategoryType) => {
    switch (id) {
      case 'kids':
        return <Baby className="w-6 h-6 text-pink-500" />;
      case 'shirts':
        return <Shirt className="w-6 h-6 text-blue-500" />;
      case 'tshirts':
        return <Flame className="w-6 h-6 text-pink-500" />;
      case 'underwear':
        return <ShieldCheck className="w-6 h-6 text-blue-500" />;
      case 'sets':
        return <Layers className="w-6 h-6 text-pink-500" />;
      case 'tracksuits':
        return <Activity className="w-6 h-6 text-blue-500" />;
      case 'pajamas':
        return <Moon className="w-6 h-6 text-pink-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-500" />;
    }
  };

  if (activeCategory === 'all') {
    return null;
  }

  return (
    <div className="bg-white border-b border-neutral-200/80 py-5 sm:py-7 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Navigation Back Pill */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full transition cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لكل التشكيلة</span>
          </button>

          <span className="text-xs font-medium text-neutral-500">
            عدد المعروضات: <strong className="text-neutral-950 font-bold font-sans">{productCount}</strong>
          </span>
        </div>

        {/* Category Details Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-950 text-white p-5 sm:p-6 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-3.5 sm:gap-4 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0">
              {getCategoryIcon(activeCategory)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-white font-['Tajawal',sans-serif]">
                  {currentCategory.title}
                </h1>
                {currentCategory.badge && (
                  <span className="text-[11px] font-bold bg-gradient-to-r from-blue-600 to-pink-600 text-white px-2.5 py-0.5 rounded-full">
                    {currentCategory.badge}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 relative z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-neutral-200 text-xs font-medium">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              <span>معاينة قبل الدفع</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
