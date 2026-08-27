import React from 'react';
import { 
  Sparkles, 
  Crown, 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Percent, 
  Award,
  Users,
  Camera
} from 'lucide-react';
import { CategoryType, PricingMode } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryType) => void;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  onOpenImageManager: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  pricingMode,
  onTogglePricingMode,
  onOpenImageManager,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border-b border-neutral-800">
      {/* Background Subtle Gradients & Crown Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-right space-y-5">
            
            {/* Royal Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="text-xs font-bold text-amber-300">
                براند ملوك السعاده للأزياء العصرية
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[11px] text-neutral-400">جملة & قطاعي</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-['Tajawal',sans-serif]">
              أقوى تشكيلة <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-amber-400 to-amber-500">ملابس رجالي مودرن</span> 
              <br />
              وأطقم أطفال كاجوال <span className="text-amber-400 underline decoration-amber-500/50 decoration-wavy">من سن 5 سنوات</span>
            </h1>

            {/* Subtext */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              خامات قطن مصري 100% معالجة وتقفيل فاخر لا يضاهى. متاح البيع الفردي بأسعار القطاعي المميزة وخصومات الجملة الكبرى لأصحاب المحلات والمكاتب في جميع المحافظات.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectCategory('men')}
                id="hero-explore-men-btn"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-sm hover:brightness-110 transition shadow-xl shadow-amber-500/15 flex items-center gap-2"
              >
                <span>تصفح قسم الرجالي المودرن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectCategory('kids')}
                id="hero-explore-kids-btn"
                className="px-6 py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-sm hover:bg-neutral-800 border border-neutral-700 transition flex items-center gap-2"
              >
                <span>تشكيلة أطفال كاجوال (5+ سنوات)</span>
                <ArrowLeft className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onOpenImageManager}
                id="hero-upload-photos-btn"
                className="px-4 py-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 text-amber-400 font-semibold text-xs border border-dashed border-amber-500/40 transition flex items-center gap-1.5"
                title="تحديث صور المنتجات بصور المخزون الخاص بك"
              >
                <Camera className="w-4 h-4" />
                <span>إضافة وتغيير صور الموديلات</span>
              </button>
            </div>

            {/* Key Features Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800/80">
              <div className="flex items-center gap-2 text-neutral-300 text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>معاينة قبل الاستلام</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-xs">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>شحن لكل المحافظات</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-xs">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>خامات قطنية أصلية</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-xs">
                <Percent className="w-4 h-4 text-amber-400 shrink-0" />
                <span>أسعار جملة المصنع</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card: Crown Showcase & Wholesale Banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-6 border border-neutral-800 shadow-2xl overflow-hidden group">
              
              {/* Decorative Crown glow & background badge */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400">تشكيلة صيف 2025 متوفرة الآن</span>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
                  جملة & قطاعي
                </span>
              </div>

              {/* Visual Presentation */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div 
                  onClick={() => onSelectCategory('men')}
                  className="cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] border border-neutral-800 group/img"
                >
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                    alt="ملابس رجالي مودرن"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <span className="text-xs font-bold text-white">رجالي مودرن</span>
                    <span className="text-[10px] text-amber-400 font-medium">تيشرتات، قمصان وسيتات</span>
                  </div>
                </div>

                <div 
                  onClick={() => onSelectCategory('kids')}
                  className="cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] border border-neutral-800 group/img"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
                    alt="ملابس أطفال كاجوال"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <span className="text-xs font-bold text-white">أطفال كاجوال</span>
                    <span className="text-[10px] text-amber-400 font-medium">من سن 5 سنوات فأكثر</span>
                  </div>
                </div>
              </div>

              {/* Wholesale / Retail Fast Switch Card */}
              <div className="bg-neutral-950/80 rounded-2xl p-3.5 border border-neutral-800 flex items-center justify-between">
                <div className="text-right">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>تفعيل وضع تجار الجملة</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    عرض أسعار الدستة وخصومات الباقات
                  </div>
                </div>

                <button
                  onClick={() => onTogglePricingMode(pricingMode === 'retail' ? 'wholesale' : 'retail')}
                  id="hero-toggle-pricing-btn"
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    pricingMode === 'wholesale'
                      ? 'bg-amber-500 text-neutral-950 shadow-md'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {pricingMode === 'wholesale' ? 'وضع الجملة مفعّل ✓' : 'تفعيل سعر الجملة'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
