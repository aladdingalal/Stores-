import React from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Award,
  Layers,
  Baby,
  Shirt,
  Flame,
  CheckCircle
} from 'lucide-react';
import { CategoryType, PricingMode } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryType) => void;
  pricingMode?: PricingMode;
  onTogglePricingMode?: (mode: PricingMode) => void;
  onOpenImageManager?: () => void;
  onOpenCategoriesModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenCategoriesModal,
}) => {
  return (
    <div className="relative overflow-hidden bg-white border-b-2 border-slate-900">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-12 sm:pb-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-right space-y-4 sm:space-y-5">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-950 text-white border-2 border-pink-500 px-4 py-1.5 rounded-full shadow-md max-w-full">
              <span className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white bg-white p-0.5">
                <img
                  src="https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg"
                  alt="J&S"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="text-xs font-black truncate">
                براند <span className="text-pink-400 font-extrabold font-sans text-sm">J&amp;S</span> (Junior &amp; Senior)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
              <span className="text-[11px] font-bold text-slate-300 shrink-0">ملابس شباب وأطفال</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-snug sm:leading-tight font-['Tajawal',sans-serif]">
              أفضل تشكيلة <span className="text-pink-600">ملابس شباب وأطفال</span> 
              <br />
              خامات قطنية فاخرة <span className="underline decoration-pink-500 decoration-wavy underline-offset-8">معاينة كاملة قبل الاستلام</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-700 text-xs sm:text-base leading-relaxed max-w-2xl font-medium">
              تصفح 7 أقسام متكاملة: ملابس أطفال، قمصان، تيشرتات، ملابس داخلية، أطقم كاملة، ترنجات، وبيجامات. السعر شامل المعاينة المباشرة قبل الدفع لمندوب التوصيل.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={onOpenCategoriesModal}
                id="hero-explore-categories-btn"
                className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-xs sm:text-sm transition shadow-lg flex items-center gap-2 border-2 border-pink-500 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-pink-400 shrink-0" />
                <span>تصفح قوائم المعروضات (7)</span>
                <ArrowLeft className="w-4 h-4 text-pink-400 shrink-0" />
              </button>

              <button
                onClick={() => onSelectCategory('kids')}
                id="hero-explore-kids-btn"
                className="px-4 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-black text-xs sm:text-sm transition shadow-md flex items-center gap-2 border border-pink-700 cursor-pointer"
              >
                <Baby className="w-4 h-4 shrink-0" />
                <span>ملابس أطفال كود 21kids</span>
              </button>
            </div>

            {/* Key Features Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t-2 border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-pink-600 shrink-0" />
                <span className="truncate">معاينة قبل الدفع</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Truck className="w-4 h-4 text-slate-950 shrink-0" />
                <span className="truncate">شحن للمحافظات</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Award className="w-4 h-4 text-pink-600 shrink-0" />
                <span className="truncate">خامات قطنية ممتازة</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">دفع عند الاستلام</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card: Real Product Showcase */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => onSelectCategory('kids')}
              className="cursor-pointer relative rounded-3xl bg-slate-950 p-4 border-2 border-slate-900 shadow-2xl overflow-hidden group hover:border-pink-500 transition-all"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-xs font-black font-['Tajawal',sans-serif]">الموديل المميز الحالي</span>
                </div>
                <span className="text-xs bg-pink-600 text-white font-black px-2.5 py-0.5 rounded-full">
                  300 ج.م
                </span>
              </div>

              {/* Real Product Image */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border border-slate-800">
                <img
                  src="https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0705.jpeg"
                  alt="طقم جاكيت قميص وتيشيرت أطفال كود 21kids"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-950/90 text-white border border-pink-500 text-xs font-black px-3 py-1 rounded-xl shadow-lg">
                  كود 21kids
                </div>
              </div>

              <div className="pt-3 text-right">
                <h4 className="text-sm font-black text-white font-['Tajawal',sans-serif]">
                  طقم جاكيت قميص وتيشيرت أطفال كود 21kids
                </h4>
                <p className="text-xs text-pink-300 mt-0.5 font-bold">
                  قميص وتيشيرت فقط جميع المقاسات السعر غير شامل مصاريف الشحن
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
