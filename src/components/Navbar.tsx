import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  Layers,
  Sparkles,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType, PricingMode } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';
import { WHATSAPP_NUMBER, PHONE_NUMBER_DISPLAY } from '../data/contact';

interface NavbarProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  pricingMode: PricingMode;
  onTogglePricingMode: (mode: PricingMode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenImageManager: () => void;
  onOpenSizeGuide: () => void;
  onOpenCategoriesModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  customLogoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenCategoriesModal,
  searchQuery,
  onSearchChange,
  customLogoUrl,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-900 shadow-sm transition-all">
      {/* Top Banner: Fast Announcement & WhatsApp Hotline (Black, White, Pink) */}
      <div className="bg-slate-950 text-white font-bold text-xs py-2 px-3 sm:px-6 border-b border-pink-500/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 truncate">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white text-[11px] font-black shrink-0">
              🚚
            </span>
            <span className="text-[11px] sm:text-xs text-slate-100 truncate">
              شحن لجميع محافظات مصر • <strong className="text-pink-400 font-black">الدفع عند الاستلام مع المعاينة</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'مرحباً براند J&S (Junior & Senior)، أود الاستفسار والطلب'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-black transition shadow-sm border border-pink-400"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">واتساب:</span>
              <span>{PHONE_NUMBER_DISPLAY}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-22 gap-2 sm:gap-4">
          
          {/* Brand Logo with Floating Emblem */}
          <button 
            onClick={() => onSelectCategory('all')} 
            className="flex items-center gap-2 text-right hover:opacity-95 transition group cursor-pointer shrink-0"
            id="brand-logo-btn"
            title="J&S - Junior & Senior"
          >
            <Logo size="sm" customLogoUrl={customLogoUrl} variant="dark" />
          </button>

          {/* Desktop Categories Quick Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200">
            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  id={`top-nav-${cat.id}`}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm ring-2 ring-pink-500'
                      : 'text-slate-700 hover:text-pink-600 hover:bg-white'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </nav>

          {/* Categories Button for Medium/Small screens */}
          <button
            onClick={onOpenCategoriesModal}
            className="hidden md:flex xl:hidden items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-black border-2 border-slate-900 shadow-xs"
          >
            <Layers className="w-4 h-4 text-pink-600 shrink-0" />
            <span>قوائم المعروضات ({activeCategory === 'all' ? 'الكل' : CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.title})</span>
          </button>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Search Input / Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white border-2 border-slate-900 rounded-2xl px-2.5 py-1.5 shadow-sm">
                  <Search className="w-4 h-4 text-slate-500 ml-1.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="ابحث عن موديل، كود، أو خامة..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-36 sm:w-56 text-xs text-slate-900 bg-transparent focus:outline-none placeholder-slate-400"
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setShowSearchInput(false);
                    }}
                    className="text-slate-400 hover:text-slate-700 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-200 hover:border-slate-900 transition flex items-center justify-center cursor-pointer"
                  title="البحث في المنتجات"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-xs transition border-2 border-slate-900 shadow-md cursor-pointer group"
              title="عرض سلة المشتريات"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-pink-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-scaleIn">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-['Tajawal',sans-serif]">السلة</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
