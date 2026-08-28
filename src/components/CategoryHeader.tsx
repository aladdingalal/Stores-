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
        return <Baby className="w-7 h-7 text-pink-600" />;
      case 'shirts':
        return <Shirt className="w-7 h-7 text-pink-600" />;
      case 'tshirts':
        return <Flame className="w-7 h-7 text-pink-600" />;
      case 'underwear':
        return <ShieldCheck className="w-7 h-7 text-pink-600" />;
      case 'sets':
        return <Layers className="w-7 h-7 text-pink-600" />;
      case 'tracksuits':
        return <Activity className="w-7 h-7 text-pink-600" />;
      case 'pajamas':
        return <Moon className="w-7 h-7 text-pink-600" />;
      default:
        return <Sparkles className="w-7 h-7 text-pink-600" />;
    }
  };

  if (activeCategory === 'all') {
    return null;
  }

  return (
    <div className="bg-white border-b-2 border-slate-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb & Navigation Back */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-950 hover:text-pink-600 bg-pink-50 hover:bg-pink-100 px-3.5 py-2 rounded-xl transition border border-pink-200"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكل التشكيلة</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              عدد المعروضات: <strong className="text-slate-950 font-black font-mono">{productCount}</strong>
            </span>
          </div>
        </div>

        {/* Category Main Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-5 sm:p-6 rounded-3xl border-2 border-slate-900 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-xs">
              {getCategoryIcon(activeCategory)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                  {currentCategory.title}
                </h1>
                {currentCategory.badge && (
                  <span className="text-xs font-black bg-pink-600 text-white px-3 py-0.5 rounded-full">
                    {currentCategory.badge}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
                {currentCategory.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold">
              <Truck className="w-4 h-4 text-pink-600" />
              <span>معاينة قبل الدفع</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
