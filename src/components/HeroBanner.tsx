import React from 'react';
import { 
  Sparkles, 
  Crown, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Percent, 
  Award,
  Camera,
  Layers,
  Baby,
  Shirt,
  Flame
} from 'lucide-react';
import { CategoryType, PricingMode } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryType) => void;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  onOpenImageManager: () => void;
  onOpenCategoriesModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  pricingMode,
  onTogglePricingMode,
  onOpenImageManager,
  onOpenCategoriesModal,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-slate-50 to-white border-b border-slate-200">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-12 sm:pb-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-right space-y-3.5 sm:space-y-5">
            
            {/* Royal Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-white border border-amber-300 px-3.5 py-1.5 rounded-full shadow-xs max-w-full">
              <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-amber-400 bg-white">
                <img
                  src="https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg"
                  alt="J&S"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="text-xs font-black text-slate-950 truncate">
                براند <span className="text-amber-600 font-extrabold font-sans">J&amp;S</span> (Junior &amp; Senior)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-700 shrink-0">جملة &amp; قطاعي</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-snug sm:leading-tight font-['Tajawal',sans-serif]">
              أقوى تشكيلة <span className="text-amber-600">ملابس رجالي وأطفال</span> 
              <br />
              قطن مصري 100% <span className="underline decoration-amber-400 decoration-wavy underline-offset-8">بأفضل سعر في مصر</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl">
              تصفح 7 أقسام متكاملة: تيشرتات، قمصان رجالي، ملابس داخلية، أطقم كاملة، ترنجات، بيجامات، وملابس أطفال. معاينة وفحص الشحنة قبل الاستلام مع شحن فوري لكافة المحافظات.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
              <button
                onClick={onOpenCategoriesModal}
                id="hero-explore-categories-btn"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 font-black text-xs sm:text-sm transition shadow-md flex items-center gap-1.5 sm:gap-2"
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>تصفح الأقسام السبعة (7)</span>
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              </button>

              <button
                onClick={() => onSelectCategory('tshirts')}
                id="hero-explore-tshirts-btn"
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                <span>تيشرتات أوفر سايز</span>
              </button>

              <button
                onClick={() => onSelectCategory('kids')}
                id="hero-explore-kids-btn"
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-xs flex items-center gap-1.5"
              >
                <Baby className="w-4 h-4 shrink-0" />
                <span>ملابس أطفال</span>
              </button>
            </div>

            {/* Key Features Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-3 sm:pt-4 border-t border-slate-200/90">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 text-[11px] sm:text-xs font-semibold bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">معاينة قبل الدفع</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 text-[11px] sm:text-xs font-semibold bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">شحن للمحافظات</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 text-[11px] sm:text-xs font-semibold bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">قطن مصري أصلي</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 text-[11px] sm:text-xs font-semibold bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                <Percent className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">أسعار جملة المصنع</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card: 4 Quick Category Shortcuts */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-lg overflow-hidden group">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900">تشكيلة صيف 2025 الملكية</span>
                </div>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                  جملة & قطاعي
                </span>
              </div>

              {/* Visual Showcase 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                <div 
                  onClick={() => onSelectCategory('shirts')}
                  className="cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-100 group/img shadow-2xs"
                >
                  <img
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
                    alt="قميص رجالي"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5 text-right">
                    <span className="text-xs font-bold text-white">قميص رجالي</span>
                    <span className="text-[10px] text-amber-300 font-medium">كتان وكاجوال</span>
                  </div>
                </div>

                <div 
                  onClick={() => onSelectCategory('kids')}
                  className="cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-100 group/img shadow-2xs"
                >
                  <img
                    src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80"
                    alt="ملابس أطفال"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5 text-right">
                    <span className="text-xs font-bold text-white">ملابس أطفال</span>
                    <span className="text-[10px] text-amber-300 font-medium">أطقم وتيشرتات</span>
                  </div>
                </div>
              </div>

              {/* Wholesale Bar inside Card */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-center justify-between text-right">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-amber-950 block">هل أنت صاحب محل أو مكتب؟</span>
                  <span className="text-[11px] text-amber-800">فعّل وضع الجملة لمعاينة دست ومقاسات الشغل</span>
                </div>
                <button
                  onClick={() => onTogglePricingMode('wholesale')}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 font-bold text-xs hover:bg-slate-900 transition"
                >
                  أسعار الجملة
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
