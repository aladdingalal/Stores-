import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  Layers,
  Sparkles,
  Truck,
  X,
  ShieldCheck
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType, PricingMode } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';
import { WHATSAPP_NUMBER, PHONE_NUMBER_DISPLAY } from '../data/contact';

interface NavbarProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  pricingMode?: PricingMode;
  onTogglePricingMode?: (mode: PricingMode) => void;
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenImageManager?: () => void;
  onOpenSizeGuide?: () => void;
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Top Banner Ticker: Blue, Pink, Black & White accents */}
      <div className="bg-neutral-950 text-white font-medium text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 truncate">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white text-[9px] font-black shrink-0">
              ✓
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-200 truncate">
              براند <strong className="text-white font-bold">J&amp;S (Junior &amp; Senior)</strong> • <span className="text-blue-400 font-bold">معاينة كاملة</span> واستلام قبل الدفع
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'مرحباً براند J&S (Junior & Senior)، أود الاستفسار والطلب مباشرة'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold transition shadow-xs"
            >
              <MessageCircle className="w-3 h-3 shrink-0" />
              <span className="hidden xs:inline">واتساب:</span>
              <span>{PHONE_NUMBER_DISPLAY}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Brand Logo */}
          <button 
            onClick={() => onSelectCategory('all')} 
            className="flex items-center gap-2 text-right hover:opacity-90 transition group cursor-pointer shrink-0"
            id="brand-logo-btn"
            title="J&S - Junior & Senior"
          >
            <Logo size="sm" customLogoUrl={customLogoUrl} variant="dark" />
          </button>

          {/* Desktop Categories Quick Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-full border border-neutral-200">
            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  id={`top-nav-${cat.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </nav>

          {/* Search Box & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Bar */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="بحث في الموديلات والمقاسات..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-100 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-full py-2 pr-9 pl-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition shadow-2xs"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="md:hidden p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
              aria-label="البحث"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Categories Modal Button (Desktop/Mobile Quick Trigger) */}
            <button
              onClick={onOpenCategoriesModal}
              id="navbar-categories-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold border border-neutral-200 transition cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="hidden sm:inline">الأقسام</span>
              <span className="text-[10px] bg-neutral-950 text-white px-1.5 py-0.2 rounded-full font-sans">7</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              id="navbar-cart-btn"
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-full bg-neutral-950 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-sm transition hover:scale-105 cursor-pointer"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-4 h-4 text-pink-400" />
              <span className="hidden sm:inline">السلة</span>
              {cartCount > 0 && (
                <span className="bg-gradient-to-r from-blue-500 to-pink-500 text-white text-[10px] font-black h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Search Input Drawer (When toggled on mobile) */}
        {showSearchInput && (
          <div className="md:hidden pb-3 pt-1 border-t border-neutral-100 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="ابحث عن موديل، مقاس، أو لون..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-100 border border-blue-500 rounded-full py-2.5 pr-9 pl-8 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white shadow-xs"
              />
              <Search className="w-4 h-4 text-blue-600 absolute right-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-3 text-neutral-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
