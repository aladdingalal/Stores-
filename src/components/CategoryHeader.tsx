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
  Filter,
  CheckCircle2,
  Crown
} from 'lucide-react';
import { CategoryType, PricingMode } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface CategoryHeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  productCount: number;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  activeCategory,
  onSelectCategory,
  productCount,
  pricingMode,
  onTogglePricingMode,
}) => {
  const currentCategory = CATEGORIES_CONFIG.find((c) => c.id === activeCategory) || CATEGORIES_CONFIG[0];

  const getCategoryIcon = (id: CategoryType) => {
    switch (id) {
      case 'kids':
        return <Baby className="w-8 h-8 text-amber-600" />;
      case 'shirts':
        return <Shirt className="w-8 h-8 text-amber-600" />;
      case 'tshirts':
        return <Flame className="w-8 h-8 text-amber-600" />;
      case 'underwear':
        return <ShieldCheck className="w-8 h-8 text-amber-600" />;
      case 'sets':
        return <Layers className="w-8 h-8 text-amber-600" />;
      case 'tracksuits':
        return <Activity className="w-8 h-8 text-amber-600" />;
      case 'pajamas':
        return <Moon className="w-8 h-8 text-amber-600" />;
      default:
        return <Sparkles className="w-8 h-8 text-amber-600" />;
    }
  };

  if (activeCategory === 'all') {
    return null; // On "all", we show the full hero banner
  }

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-slate-50 border-b border-slate-200/80 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb & Navigation Back */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكل التشكيلة</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              عدد المنتجات: <strong className="text-slate-900 font-bold font-mono">{productCount}</strong>
            </span>
          </div>
        </div>

        {/* Category Main Title & Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              {getCategoryIcon(activeCategory)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                  {currentCategory.title}
                </h1>
                {currentCategory.badge && (
                  <span className="text-xs font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                    {currentCategory.badge}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {currentCategory.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>قطن مصري 100% معتمد</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>معاينة وفحص قبل الاستلام</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>متاح طلب قطاعي وجملة فورية</span>
                </span>
              </div>
            </div>
          </div>

          {/* Wholesale / Retail toggle on category page */}
          <div className="shrink-0 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center self-start md:self-center">
            <button
              onClick={() => onTogglePricingMode('retail')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                pricingMode === 'retail'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              عرض سعر القطاعي
            </button>
            <button
              onClick={() => onTogglePricingMode('wholesale')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition flex items-center gap-1.5 ${
                pricingMode === 'wholesale'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>عرض أسعار الجملة</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
