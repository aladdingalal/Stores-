import React from 'react';
import { 
  Home, 
  Layers, 
  ShoppingBag, 
  MessageCircle
} from 'lucide-react';
import { CategoryType } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

interface MobileBottomNavProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCategoriesModal: () => void;
  pricingMode?: string;
  onTogglePricingMode?: (mode: any) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenCategoriesModal,
}) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'مرحباً براند J&S (Junior & Senior)، أود الاستفسار والطلب مباشرة'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-2 text-center">
        
        {/* 1. Home / All Products */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            activeCategory === 'all'
              ? 'text-blue-600 font-black'
              : 'text-neutral-500 hover:text-neutral-900 active:scale-95'
          }`}
          id="mobile-nav-home"
        >
          <Home className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] leading-tight font-bold">الرئيسية</span>
        </button>

        {/* 2. All Categories / Sections */}
        <button
          onClick={onOpenCategoriesModal}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            activeCategory !== 'all'
              ? 'text-blue-600 font-black'
              : 'text-neutral-500 hover:text-neutral-900 active:scale-95'
          }`}
          id="mobile-nav-categories"
        >
          <Layers className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] leading-tight font-bold">الأقسام (7)</span>
        </button>

        {/* 3. Floating Quick Cart Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onOpenCart}
            id="mobile-nav-cart"
            className="relative -top-3.5 w-12 h-12 rounded-full bg-neutral-950 text-white flex flex-col items-center justify-center shadow-lg border-2 border-white ring-2 ring-neutral-950 hover:scale-105 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-pink-400" />
            <span className="text-[8px] font-bold leading-none mt-0.5">السلة</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* 4. WhatsApp Hotline */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 active:scale-95 transition-colors"
          id="mobile-nav-whatsapp"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 shrink-0" />
          <span className="text-[10px] leading-tight font-bold">واتساب</span>
        </a>

      </div>
    </div>
  );
};
