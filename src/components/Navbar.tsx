import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  PhoneCall, 
  MessageCircle, 
  SlidersHorizontal, 
  Sparkles,
  Camera,
  Layers,
  Heart,
  Crown,
  Menu,
  X,
  Truck
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType, PricingMode } from '../types';

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
  wishlistCount,
  onOpenCart,
  onOpenImageManager,
  onOpenSizeGuide,
  searchQuery,
  onSearchChange,
  customLogoUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 transition-all">
      {/* Top Banner with announcements & fast WhatsApp */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 font-bold text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 shrink-0" />
            <span>شحن سريع لجميع محافظات مصر | معاينة قبل الاستلام والدفع عند الاستلام</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-black/15 px-2.5 py-0.5 rounded-full">
              <Crown className="w-3.5 h-3.5" />
              <span>جملة للمحلات والمكاتب & قطاعي</span>
            </div>
            <a
              href="https://wa.me/201033545500?text=مرحباً%20ملوك%20السعادة،%20أود%20الاستفسار%20عن%20المنتجات%20والأسعار"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 bg-neutral-950 text-amber-400 px-2.5 py-0.5 rounded-full text-[11px]"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>واتساب المبيعات: 01033545500</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => onSelectCategory('all')} 
            className="flex items-center gap-3 text-right hover:opacity-90 transition group cursor-pointer"
            id="brand-logo-btn"
          >
            <Logo size="sm" customLogoUrl={customLogoUrl} variant="gold" />
          </button>

          {/* Center Navigation Categories */}
          <nav className="hidden md:flex items-center gap-1.5 bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800">
            <button
              onClick={() => onSelectCategory('all')}
              id="nav-cat-all"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              كل التشكيلة
            </button>
            <button
              onClick={() => onSelectCategory('men')}
              id="nav-cat-men"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeCategory === 'men'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>ملابس رجالي مودرن</span>
              <span className="text-[10px] bg-neutral-800 text-amber-400 px-1.5 py-0.5 rounded-md border border-neutral-700">
                2025
              </span>
            </button>
            <button
              onClick={() => onSelectCategory('kids')}
              id="nav-cat-kids"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeCategory === 'kids'
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>أطفال كاجوال</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-md">
                سن 5+
              </span>
            </button>
          </nav>

          {/* Right Actions: Wholesale Toggle, Search, Image Manager & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wholesale / Retail Toggle Pill */}
            <div className="bg-neutral-900 p-1 rounded-xl border border-neutral-800 flex items-center">
              <button
                onClick={() => onTogglePricingMode('retail')}
                id="pricing-retail-btn"
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  pricingMode === 'retail'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="سعر القطاعي للقطع الفردية"
              >
                قطاعي
              </button>
              <button
                onClick={() => onTogglePricingMode('wholesale')}
                id="pricing-wholesale-btn"
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                  pricingMode === 'wholesale'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-amber-400/80 hover:text-amber-300'
                }`}
                title="أسعار الجملة للتجار والمحلات"
              >
                <Crown className="w-3 h-3" />
                <span>جملة</span>
              </button>
            </div>

            {/* Search Toggle / Input */}
            <div className="relative hidden sm:block">
              <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-sm focus-within:border-amber-500/80 transition-colors w-44 lg:w-60">
                <Search className="w-4 h-4 text-neutral-400 ml-2" />
                <input
                  type="text"
                  placeholder="ابحث عن موديل، قميص، تيشرت..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-neutral-400 hover:text-white text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Change/Upload Photos Manager Trigger */}
            <button
              onClick={onOpenImageManager}
              id="open-image-manager-btn"
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-400 hover:text-amber-300 transition flex items-center gap-1 text-xs font-semibold"
              title="تغيير وإضافة صور الملابس الخاصة بك"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden xl:inline">تحديث الصور</span>
            </button>

            {/* Size Guide Trigger */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden lg:flex items-center gap-1 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-medium"
              title="جدول مقاسات رجالي وأطفال"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>المقاسات</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              id="open-cart-drawer-btn"
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 font-bold hover:brightness-110 transition shadow-lg flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-black">السلة</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-neutral-950 text-amber-400 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-500 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900/98 border-b border-neutral-800 px-4 py-4 space-y-3">
          {/* Mobile Search */}
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm">
            <Search className="w-4 h-4 text-neutral-400 ml-2" />
            <input
              type="text"
              placeholder="ابحث عن موديل، قميص، تيشرت أطفال..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg ${
                activeCategory === 'all' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => {
                onSelectCategory('men');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg ${
                activeCategory === 'men' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              رجالي مودرن
            </button>
            <button
              onClick={() => {
                onSelectCategory('kids');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg ${
                activeCategory === 'kids' ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              أطفال 5+ سنوات
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
            <button
              onClick={() => {
                onOpenSizeGuide();
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 font-semibold flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>دليل المقاسات</span>
            </button>

            <button
              onClick={() => {
                onOpenImageManager();
                setMobileMenuOpen(false);
              }}
              className="text-neutral-300 hover:text-white flex items-center gap-1"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>تحديث وتغيير الصور</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
