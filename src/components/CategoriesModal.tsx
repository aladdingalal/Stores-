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
        return <Baby className="w-5 h-5 text-pink-500" />;
      case 'shirts':
        return <Shirt className="w-5 h-5 text-blue-500" />;
      case 'tshirts':
        return <Flame className="w-5 h-5 text-pink-500" />;
      case 'underwear':
        return <ShieldCheck className="w-5 h-5 text-blue-500" />;
      case 'sets':
        return <Layers className="w-5 h-5 text-pink-500" />;
      case 'tracksuits':
        return <Activity className="w-5 h-5 text-blue-500" />;
      case 'pajamas':
        return <Moon className="w-5 h-5 text-pink-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-right">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-950 text-white">
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg font-['Tajawal',sans-serif] flex items-center gap-2">
              <span>أقسام معروضات براند J&amp;S</span>
              <span className="text-xs bg-gradient-to-r from-blue-600 to-pink-600 text-white px-2.5 py-0.5 rounded-full font-bold">
                7 أقسام
              </span>
            </h3>
            <p className="text-xs text-neutral-300 mt-0.5">
              اختر القسم لتصفح الموديلات الحصرية المتاحة للشحن الفوري
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2 bg-neutral-50/50">
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
                className={`w-full p-3.5 sm:p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                    : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isActive
                        ? 'bg-gradient-to-tr from-blue-600 to-pink-600 text-white border-white/20'
                        : 'bg-neutral-100 border-neutral-200'
                    }`}
                  >
                    {getIcon(cat.id)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base font-['Tajawal',sans-serif]">
                        {cat.title}
                      </h4>
                      {cat.badge && (
                        <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-sans font-bold px-2 py-0.5 rounded-lg ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {count} موديل
                  </span>
                  <ArrowLeft className={`w-4 h-4 ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
