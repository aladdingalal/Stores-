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
  Camera
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType } from '../types';

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
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-300 text-right">
      {/* Upper features bar */}
      <div className="border-b border-neutral-900 bg-neutral-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">شحن سريع لكل مصر</h4>
                <p className="text-[11px] text-neutral-400">توصيل لباب بيتك أو محلك خلال 24-48 ساعة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">معاينة قبل الدفع</h4>
                <p className="text-[11px] text-neutral-400">افتح شحنتك وتأكد من المقاس والخامة قبل الدفع</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">بيع جملة وقطاعي</h4>
                <p className="text-[11px] text-neutral-400">أسعار خاصة للدست والكميات لتجار المحلات</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">استبدال واسترجاع</h4>
                <p className="text-[11px] text-neutral-400">إمكانية تبديل المقاسات خلال 14 يوماً بكل سهولة</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <Logo size="md" customLogoUrl={customLogoUrl} variant="gold" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              براند ملوك السعاده للأزياء الراقية، رواد صناعة وتوزيع الملابس الرجالي المودرن وملابس الأطفال الكاجوال من سن 5 سنوات. خامات قطنية أصيلة وجودة تصنيع نعتز بها للجملة والقطاعي.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/201033545500"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل واتساب مباشر</span>
              </a>

              <button
                onClick={onOpenImageManager}
                className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>تحديث الصور</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white border-b border-neutral-800 pb-2">
              أقسام المتجر
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onSelectCategory('men')}
                  className="hover:text-amber-400 transition"
                >
                  ملابس رجالي مودرن
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kids')}
                  className="hover:text-amber-400 transition"
                >
                  أطفال كاجوال (من سن 5 سنوات)
                </button>
              </li>
              <li>
                <a href="#wholesale-section" className="hover:text-amber-400 transition">
                  قسم تجار الجملة والمكاتب
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-amber-400 transition"
                >
                  عروض وتخفيضات 2025
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white border-b border-neutral-800 pb-2">
              خدمة العملاء
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-amber-400 transition">
                  جدول المقاسات بالسنتيمتر
                </button>
              </li>
              <li>
                <span className="hover:text-amber-400 transition cursor-pointer">
                  سياسة الاستبدال والاسترجاع
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition cursor-pointer">
                  طرق الشحن ومواعيد التسليم
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition cursor-pointer">
                  الأسئلة الشائعة حول الجملة
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white border-b border-neutral-800 pb-2">
              تواصل معنا
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+201033545500" className="dir-ltr text-neutral-300 font-mono hover:text-amber-400 transition">+20 10 3354 5500</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/201033545500" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                  واتساب الأعمال: 01033545500
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>جمهورية مصر العربية - شحن لكل المحافظات</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>يومياً من 10 صباحاً حتى 11 مساءً</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} <strong className="text-amber-400">ملوك السعاده</strong> - براند ملابس للجمله والقطاعي.
          </div>
          <div className="flex items-center gap-1">
            <span>صنع بكل فخر للأناقة والموضة الحديثة</span>
            <Crown className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
