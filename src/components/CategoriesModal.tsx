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
  ArrowLeft
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
        return <Baby className="w-6 h-6 text-pink-600" />;
      case 'shirts':
        return <Shirt className="w-6 h-6 text-pink-600" />;
      case 'tshirts':
        return <Flame className="w-6 h-6 text-pink-600" />;
      case 'underwear':
        return <ShieldCheck className="w-6 h-6 text-pink-600" />;
      case 'sets':
        return <Layers className="w-6 h-6 text-pink-600" />;
      case 'tracksuits':
        return <Activity className="w-6 h-6 text-pink-600" />;
      case 'pajamas':
        return <Moon className="w-6 h-6 text-pink-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-pink-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-slate-900 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-right">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white">
          <div>
            <h3 className="font-black text-white text-lg sm:text-xl font-['Tajawal',sans-serif] flex items-center gap-2">
              <span>أقسام وقوائم معروضات J&amp;S</span>
              <span className="text-xs bg-pink-600 text-white px-2.5 py-0.5 rounded-full font-bold">
                7 أقسام
              </span>
            </h3>
            <p className="text-xs text-pink-300 mt-0.5">
              اختر القسم للتسوق المباشر والطلب قطاعي وجملة
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 bg-slate-50/50">
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
                className={`w-full p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-pink-50 border-pink-600 ring-2 ring-pink-400 text-slate-950 shadow-sm'
                    : 'bg-white hover:bg-pink-50/30 border-slate-200 text-slate-800 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isActive
                        ? 'bg-pink-500 text-white border-pink-600'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    {getIcon(cat.id)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-950 text-base font-['Tajawal',sans-serif]">
                        {cat.title}
                      </h4>
                      {cat.badge && (
                        <span className="text-[10px] bg-slate-950 text-pink-300 px-2 py-0.5 rounded-full font-bold">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{cat.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                    {count} موديل
                  </span>
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
