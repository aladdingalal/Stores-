import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart,
  Layers
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';
import { 
  WHATSAPP_NUMBER, 
  PHONE_NUMBER_DISPLAY
} from '../data/contact';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenImageManager?: () => void;
  onOpenSizeGuide: () => void;
  customLogoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSizeGuide,
  customLogoUrl,
}) => {
  return (
    <footer className="bg-slate-950 border-t-2 border-slate-900 text-slate-300 text-right pb-20 md:pb-0">
      {/* Upper features bar */}
      <div className="border-b border-slate-800 bg-black/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">شحن سريع لكل مصر</h4>
                <p className="text-[11px] text-slate-400">توصيل لباب بيتك بجميع المحافظات</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">معاينة قبل الدفع</h4>
                <p className="text-[11px] text-slate-400">افحص واستلم الشحنة براحتك قبل الدفع</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">استبدال سهل</h4>
                <p className="text-[11px] text-slate-400">إمكانية تبديل المقاسات بكل سهولة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">خدمة عملاء وطلب سريع</h4>
                <p className="text-[11px] text-slate-400">متواجدون يومياً عبر الواتساب</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <Logo size="md" customLogoUrl={customLogoUrl} variant="light" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">
              براند <strong>J&amp;S</strong> (اختصار Junior &amp; Senior) للأزياء والملابس العصرية، رواد صناعة وتوزيع الملابس الشبابية وملابس الأطفال الكاجوال بخامات قطنية ممتازة.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-black transition flex items-center gap-2 shadow-lg border border-pink-400"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب المبيعات: {PHONE_NUMBER_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Categories (7) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-white font-['Tajawal',sans-serif] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-pink-500" />
              <span>أقسام المعروضات (7)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES_CONFIG.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-pink-400 transition"
                  >
                    • {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-white font-['Tajawal',sans-serif]">
              خدمة العملاء والشحن
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                <span>جمهورية مصر العربية - شحن لكافة المحافظات</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                <span>المبيعات: يومياً من 10 صباحاً حتى 11 مساءً</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pink-500 shrink-0" />
                <span>الدفع: نقداً عند الاستلام بعد فحص الشحنة</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenSizeGuide}
                  className="text-pink-400 hover:underline font-bold text-xs"
                >
                  جدول المقاسات ودليل التلبيس
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 J&amp;S (Junior &amp; Senior). جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            <span>صُنع بحب لأناقة الشباب والأطفال</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
