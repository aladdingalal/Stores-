import React from 'react';
import { 
  Home, 
  Layers, 
  ShoppingBag, 
  Crown, 
  MessageCircle,
  Shirt
} from 'lucide-react';
import { CategoryType, PricingMode } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

interface MobileBottomNavProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCategoriesModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeCategory,
  onSelectCategory,
  pricingMode,
  onTogglePricingMode,
  cartCount,
  onOpenCart,
  onOpenCategoriesModal,
}) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'مرحباً ملوك السعادة، أود الاستفسار والطلب مباشرة'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-safe">
      <div className="grid grid-cols-5 items-center h-16 px-1 text-center">
        
        {/* 1. Home / All Products */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeCategory === 'all'
              ? 'text-amber-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          id="mobile-nav-home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">الرئيسية</span>
        </button>

        {/* 2. All Categories / Sections */}
        <button
          onClick={onOpenCategoriesModal}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeCategory !== 'all'
              ? 'text-amber-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          id="mobile-nav-categories"
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">الأقسام (7)</span>
        </button>

        {/* 3. Floating Quick Cart Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onOpenCart}
            id="mobile-nav-cart"
            className="relative -top-3 w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white ring-2 ring-amber-400/50 hover:scale-105 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[9px] font-black leading-none mt-0.5">السلة</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-950 text-amber-300 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* 4. Wholesale / Retail Switcher */}
        <button
          onClick={() => onTogglePricingMode(pricingMode === 'retail' ? 'wholesale' : 'retail')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pricingMode === 'wholesale'
              ? 'text-amber-600 font-black'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          id="mobile-nav-wholesale"
        >
          <Crown className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">
            {pricingMode === 'wholesale' ? 'أسعار الجملة' : 'سعر قطاعي'}
          </span>
        </button>

        {/* 5. Direct WhatsApp Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 transition-colors"
          id="mobile-nav-whatsapp"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight font-bold">واتساب</span>
        </a>

      </div>
    </div>
  );
};
