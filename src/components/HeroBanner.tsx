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
  CheckCircle,
  Eye
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
    <div className="relative overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
      {/* Ambient Fashion Backlight: Blue & Pink Luxury Lighting */}
      <div className="absolute top-0 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-right space-y-4 sm:space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full shadow-sm max-w-full">
              <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-white p-0.5">
                <img
                  src="https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg"
                  alt="J&S"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                براند <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent font-black font-sans">J&amp;S</span> (Junior &amp; Senior)
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-medium text-neutral-300">أزياء شباب وأطفال</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-['Tajawal',sans-serif]">
              أناقة عصرية تبدأ من{' '}
              <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                J&amp;S
              </span>
              <br />
              خامات قطنية ممتازة مع{' '}
              <span className="text-white underline decoration-pink-500 decoration-2 underline-offset-6">
                المعاينة قبل الاستلام
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              اكتشف تشكيلة 2025 الحصرية: ملابس أطفال كاجوال، قمصان قطن وكتان، تيشرتات أوفر سايز، أطقم وترنجات. شحن آمن وسريع لباب بيتك بجميع محافظات مصر.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenCategoriesModal}
                id="hero-explore-categories-btn"
                className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer border border-blue-400/30 active:scale-95"
              >
                <Layers className="w-4 h-4 text-blue-200 shrink-0" />
                <span>تصفح كل الأقسام (7)</span>
                <ArrowLeft className="w-4 h-4 text-blue-200 shrink-0" />
              </button>

              <button
                onClick={() => onSelectCategory('kids')}
                id="hero-explore-kids-btn"
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition border border-white/20 backdrop-blur-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Baby className="w-4 h-4 text-pink-400 shrink-0" />
                <span>ملابس أطفال كود 21kids</span>
              </button>
            </div>

            {/* Key Features Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-200 text-xs font-medium bg-neutral-900/90 p-2.5 rounded-2xl border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">معاينة قبل الدفع</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 text-xs font-medium bg-neutral-900/90 p-2.5 rounded-2xl border border-neutral-800">
                <Truck className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="truncate">شحن للمحافظات</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 text-xs font-medium bg-neutral-900/90 p-2.5 rounded-2xl border border-neutral-800">
                <Award className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">خامات قطنية ممتازة</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 text-xs font-medium bg-neutral-900/90 p-2.5 rounded-2xl border border-neutral-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">دفع عند الاستلام</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card: Real Product Showcase (Modern Fashion Editorial Style) */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => onSelectCategory('kids')}
              className="cursor-pointer relative rounded-3xl bg-neutral-900 p-3 sm:p-4 border border-neutral-800 shadow-2xl overflow-hidden group hover:border-neutral-700 transition-all"
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800 text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-xs font-bold font-['Tajawal',sans-serif]">الموديل الحصري الحالي</span>
                </div>
                <span className="text-xs bg-gradient-to-r from-blue-600 to-pink-600 text-white font-black px-3 py-0.5 rounded-full shadow-xs">
                  300 ج.م
                </span>
              </div>

              {/* Real Product Image with 4:5 fashion crop */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-950">
                <img
                  src="https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0705.jpeg"
                  alt="طقم جاكيت قميص وتيشيرت أطفال كود 21kids"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating overlay badge */}
                <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-lg">
                  كود 21kids
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-neutral-950/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-xs font-bold truncate">طقم جاكيت قميص وتيشيرت</p>
                    <p className="text-[10px] text-blue-300">جميع المقاسات متاحة</p>
                  </div>
                  <span className="text-[11px] text-pink-400 font-bold flex items-center gap-1">
                    <span>عرض</span>
                    <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <div className="pt-3 text-right">
                <p className="text-xs text-neutral-400 font-medium">
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
