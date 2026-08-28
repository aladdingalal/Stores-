import React from 'react';
import { 
  X, 
  Sparkles, 
  Baby, 
  Shirt, 
  Flame, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Moon,
  ArrowLeft,
  Crown
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  productCounts: Record<CategoryType, number>;
}

export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  productCounts,
}) => {
  if (!isOpen) return null;

  const getIcon = (id: CategoryType) => {
    switch (id) {
      case 'kids':
        return <Baby className="w-6 h-6 text-amber-600" />;
      case 'shirts':
        return <Shirt className="w-6 h-6 text-amber-600" />;
      case 'tshirts':
        return <Flame className="w-6 h-6 text-amber-600" />;
      case 'underwear':
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      case 'sets':
        return <Layers className="w-6 h-6 text-amber-600" />;
      case 'tracksuits':
        return <Activity className="w-6 h-6 text-amber-600" />;
      case 'pajamas':
        return <Moon className="w-6 h-6 text-amber-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-right">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl font-['Tajawal',sans-serif] flex items-center gap-2">
              <span>أقسام وقوائم ملوك السعادة</span>
              <span className="text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                7 أقسام
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              اختر القسم للتسوق المباشر والطلب قطاعي أو جملة
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5">
          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = productCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/40 text-slate-950 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                    }`}
                  >
                    {getIcon(cat.id)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-slate-900">
                        {cat.title}
                      </span>
                      {cat.badge && (
                        <span className="text-[10px] bg-slate-900 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100/80 px-2 py-1 rounded-lg">
                    {count} موديل
                  </span>
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center flex items-center justify-between text-xs text-slate-500">
          <span>✨ جميع الموديلات مصنوعة من أجود أنواع القطن المصري</span>
          <button
            onClick={() => {
              onSelectCategory('all');
              onClose();
            }}
            className="text-amber-700 font-bold hover:underline"
          >
            تصفح كل التشكيلة
          </button>
        </div>

      </div>
    </div>
  );
};
