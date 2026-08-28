import React from 'react';
import { 
  Crown, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart,
  Camera,
  Layers
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';
import { 
  WHATSAPP_NUMBER, 
  PHONE_NUMBER_DISPLAY, 
  VODAFONE_CASH_NUMBER, 
  INSTAPAY_ADDRESS 
} from '../data/contact';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenImageManager: () => void;
  onOpenSizeGuide: () => void;
  customLogoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenImageManager,
  onOpenSizeGuide,
  customLogoUrl,
}) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-right pb-18 md:pb-0">
      {/* Upper features bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">شحن سريع لكل مصر</h4>
                <p className="text-[11px] text-slate-400">توصيل لباب بيتك أو محلك خلال 24-48 ساعة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">معاينة قبل الدفع</h4>
                <p className="text-[11px] text-slate-400">افتح شحنتك وتأكد من المقاس والخامة قبل الدفع</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">بيع جملة وقطاعي</h4>
                <p className="text-[11px] text-slate-400">أسعار خاصة للدست والكميات لتجار المحلات</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">استبدال واسترجاع</h4>
                <p className="text-[11px] text-slate-400">إمكانية تبديل المقاسات بكل سهولة</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="inline-block">
              <Logo size="md" customLogoUrl={customLogoUrl} variant="gold" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              براند ملوك السعادة للأزياء والملابس العصرية، رواد صناعة وتوزيع الملابس الرجالي وملابس الأطفال الكاجوال. قطن مصري 100% عالي الجودة وتصميمات مميزة متوفرة للقطاعي والجملة.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب: {PHONE_NUMBER_DISPLAY}</span>
              </a>

              <button
                onClick={onOpenImageManager}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>تحديث الصور</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories (7 Sections) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              أقسام المتجر السبعة
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {CATEGORIES_CONFIG.slice(1).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-amber-400 transition text-right"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              خدمة العملاء والتجار
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-amber-400 transition">
                  جدول ودليل المقاسات
                </button>
              </li>
              <li>
                <a href="#wholesale-section" className="hover:text-amber-400 transition">
                  طلب عروض أسعار الجملة
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('أود الاستفسار عن الشحن والتوصيل')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition"
                >
                  سياسة الشحن والمعاينة
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('أود الاستفسار عن استبدال مقاس')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition"
                >
                  طلب استبدال منتج
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment & Contact Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
              طرق الدفع والتواصل
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-white font-bold">{PHONE_NUMBER_DISPLAY}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>شحن وتوصيل لجميع محافظات مصر</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>خدمة العملاء 24/7 طوال الأسبوع</span>
              </div>

              {/* Payment badges */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 block mb-1">طرق الدفع المعتمدة:</span>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                    عند الاستلام 💵
                  </span>
                  <span className="bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-800">
                    فودافون كاش
                  </span>
                  <span className="bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    InstaPay
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            جميع الحقوق محفوظة © {new Date().getFullYear()} — براند <strong className="text-amber-400">ملوك السعادة</strong> للملابس الجاهزة
          </span>
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <span>👑 فخامة الرجالي وكاجوال الأطفال</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
