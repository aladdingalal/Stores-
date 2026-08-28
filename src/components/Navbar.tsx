import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  SlidersHorizontal, 
  Camera,
  Crown, 
  Menu, 
  X, 
  Truck,
  Sparkles,
  ChevronDown,
  Layers,
  PhoneCall
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
  pricingMode,
  onTogglePricingMode,
  cartCount,
  onOpenCart,
  onOpenImageManager,
  onOpenSizeGuide,
  onOpenCategoriesModal,
  searchQuery,
  onSearchChange,
  customLogoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      {/* Top Banner: Fast Announcement & WhatsApp Order Hotline */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white font-bold text-xs py-1.5 sm:py-2 px-2.5 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="flex items-center justify-center w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] sm:text-[11px] font-black shrink-0">
              🚚
            </span>
            <span className="text-[10px] sm:text-xs text-slate-200 truncate">
              شحن سريع لجميع محافظات مصر • <strong className="text-amber-400 font-bold">معاينة قبل الدفع</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] text-amber-300">
              <Crown className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>قطاعي وجملة مكاتب ومحلات</span>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'مرحباً براند J&S (Junior & Senior)، أود الاستفسار عن الموديلات والأسعار'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black transition shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0 text-slate-950" />
              <span className="hidden xs:inline">واتساب:</span>
              <span>{PHONE_NUMBER_DISPLAY}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-4">
          
          {/* Brand Logo with Floating Emblem */}
          <button 
            onClick={() => onSelectCategory('all')} 
            className="flex items-center gap-1.5 sm:gap-2 text-right hover:opacity-95 transition group cursor-pointer shrink-0"
            id="brand-logo-btn"
            title="J&S - Junior & Senior"
          >
            <Logo size="sm" customLogoUrl={customLogoUrl} variant="dark" />
          </button>

          {/* Desktop Categories Quick Navigation (7 Dedicated Pages) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  id={`top-nav-${cat.id}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 text-amber-400 shadow-xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </nav>

          {/* Categories Button for Medium screens */}
          <button
            onClick={onOpenCategoriesModal}
            className="hidden md:flex xl:hidden items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200"
          >
            <Layers className="w-4 h-4 text-amber-600 shrink-0" />
            <span>الأقسام ({activeCategory === 'all' ? 'الكل' : CATEGORIES_CONFIG.find(c => c.id === activeCategory)?.title})</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </button>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Wholesale / Retail Switcher */}
            <div className="bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 flex items-center shrink-0">
              <button
                onClick={() => onTogglePricingMode('retail')}
                id="pricing-retail-btn"
                className={`px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                  pricingMode === 'retail'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="سعر القطاعي للقطع الفردية"
              >
                قطاعي
              </button>
              <button
                onClick={() => onTogglePricingMode('wholesale')}
                id="pricing-wholesale-btn"
                className={`px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  pricingMode === 'wholesale'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                    : 'text-amber-800 hover:text-amber-950'
                }`}
                title="أسعار الجملة للتجار والمحلات"
              >
                <Crown className="w-3 h-3 shrink-0" />
                <span>جملة</span>
              </button>
            </div>

            {/* Desktop Search Input */}
            <div className="relative hidden lg:block">
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-sm focus-within:border-amber-500 focus-within:bg-white transition-colors w-40 xl:w-52">
                <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                <input
                  type="text"
                  placeholder="ابحث عن موديل، قميص..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-slate-400 hover:text-slate-700 text-xs"
                  >
                    <X className="w-3.5 h-3.5 shrink-0" />
                  </button>
                )}
              </div>
            </div>

            {/* Photo Uploader Modal Button */}
            <button
              onClick={onOpenImageManager}
              id="open-image-manager-btn"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 transition flex items-center gap-1 text-xs font-bold"
              title="تحديث وتغيير صور المنتجات واللوجو"
            >
              <Camera className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="hidden sm:inline">الصور</span>
            </button>

            {/* Size Guide Modal Button */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden sm:flex items-center gap-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold"
              title="جدول مقاسات رجالي وأطفال"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="hidden xl:inline">المقاسات</span>
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={onOpenCart}
              id="open-cart-drawer-btn"
              className="relative p-1.5 sm:p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black hover:brightness-105 transition shadow-sm flex items-center gap-1.5"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" />
              <span className="hidden sm:inline text-xs">السلة</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-slate-950 text-amber-300 text-[10px] font-black w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200"
              id="mobile-menu-toggle"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Search & Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-sm">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="ابحث عن موديل، قميص، تيشرت، طقم..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>

          {/* 7 Categories Grid on Mobile */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 block">اختر القسم:</span>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES_CONFIG.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 text-xs font-bold rounded-xl text-right transition flex items-center justify-between ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{cat.title}</span>
                  {cat.badge && (
                    <span className="text-[9px] bg-slate-900/10 px-1.5 py-0.5 rounded font-mono">
                      {cat.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
            <button
              onClick={() => {
                onOpenSizeGuide();
                setMobileMenuOpen(false);
              }}
              className="text-amber-700 font-bold flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>جدول المقاسات</span>
            </button>

            <button
              onClick={() => {
                onOpenImageManager();
                setMobileMenuOpen(false);
              }}
              className="text-slate-700 font-semibold flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>تحديث وتغيير الصور</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
