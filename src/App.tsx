import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  SlidersHorizontal, 
  MessageCircle, 
  Crown, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  Camera, 
  PhoneCall, 
  Shirt, 
  Baby, 
  Layers, 
  X,
  Flame,
  Tag,
  Truck,
  Activity,
  Moon,
  ShieldCheck
} from 'lucide-react';

import { 
  Product, 
  CartItem, 
  CategoryType, 
  PricingMode, 
  OrderDetails 
} from './types';
import { INITIAL_PRODUCTS, REVIEWS_DATA, CATEGORIES_CONFIG } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNavPills } from './components/CategoryNavPills';
import { CategoryHeader } from './components/CategoryHeader';
import { CategoriesModal } from './components/CategoriesModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { WholesaleSection } from './components/WholesaleSection';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { WHATSAPP_NUMBER, PHONE_NUMBER_DISPLAY } from './data/contact';

export default function App() {
  // Products state (persisted in localStorage to keep custom uploaded photos)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('molok_products_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Custom logo state
  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    return localStorage.getItem('molok_custom_logo') || '';
  });

  // Filters and pricing
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [pricingMode, setPricingMode] = useState<PricingMode>('retail');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyOffers, setOnlyOffers] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('molok_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetProductForImage, setTargetProductForImage] = useState<Product | null>(null);

  // Discounts
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('molok_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('molok_cart_v2', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    if (customLogoUrl) {
      localStorage.setItem('molok_custom_logo', customLogoUrl);
    }
  }, [customLogoUrl]);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    const appliedPrice = pricingMode === 'wholesale' ? product.priceWholesale : product.priceRetail;
    const itemId = `${product.id}-${size}-${color}-${pricingMode}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity, appliedPrice }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
          pricingMode,
          appliedPrice,
        },
      ];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const min = item.pricingMode === 'wholesale' ? item.product.minWholesaleQty : 1;
            const newQty = item.quantity + delta;
            if (newQty < 1) return null;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
      );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MOLOK10' || clean === 'SAADA') {
      setDiscountCode(clean);
      setAppliedDiscount(10);
      return true;
    }
    if (clean === 'GOMLEH' || clean === 'KINGS') {
      setDiscountCode(clean);
      setAppliedDiscount(15);
      return true;
    }
    return false;
  };

  // Image Customizer handlers
  const handleUpdateProductImage = (productId: string, newImageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, customImage: newImageUrl || undefined } : p))
    );
  };

  const handleResetAllImages = () => {
    if (window.confirm('هل تريد بالتأكيد استعادة جميع الصور الأصلية للكتالوج؟')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.removeItem('molok_products_v2');
    }
  };

  const handleCustomLogoUpload = (logoUrl: string) => {
    setCustomLogoUrl(logoUrl);
  };

  // Product Counts per category
  const productCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: products.length,
      kids: 0,
      shirts: 0,
      tshirts: 0,
      underwear: 0,
      sets: 0,
      tracksuits: 0,
      pajamas: 0,
    };

    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    return counts;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter (7 main categories)
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;

        // Offers filter
        if (onlyOffers && (!p.originalPrice || p.originalPrice <= p.priceRetail)) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subCategoryName.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchFabric && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = pricingMode === 'wholesale' ? a.priceWholesale : a.priceRetail;
        const priceB = pricingMode === 'wholesale' ? b.priceWholesale : b.priceRetail;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, onlyOffers, searchQuery, sortBy, pricingMode]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.appliedPrice * item.quantity, 0);
  const shippingFee = cartSubtotal >= 1200 || cartItems.length === 0 ? 0 : 50;
  const discountAmount = appliedDiscount > 0 ? (cartSubtotal * appliedDiscount) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleCategorySelect = (cat: CategoryType) => {
    setActiveCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Cairo',sans-serif] flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        pricingMode={pricingMode}
        onTogglePricingMode={setPricingMode}
        cartCount={cartCount}
        wishlistCount={0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenImageManager={() => {
          setTargetProductForImage(null);
          setIsImageManagerOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        customLogoUrl={customLogoUrl}
      />

      {/* Hero Section or Category Context Header */}
      {activeCategory === 'all' ? (
        <HeroBanner
          onSelectCategory={handleCategorySelect}
          pricingMode={pricingMode}
          onTogglePricingMode={setPricingMode}
          onOpenImageManager={() => {
            setTargetProductForImage(null);
            setIsImageManagerOpen(true);
          }}
        />
      ) : (
        <CategoryHeader
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          productCount={filteredProducts.length}
          pricingMode={pricingMode}
          onTogglePricingMode={setPricingMode}
        />
      )}

      {/* Main Catalog Explorer */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6" id="catalog-section">
        
        {/* Category Navigation Cards/Pills */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-right">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 font-['Tajawal',sans-serif] flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-600" />
                <span>أقسام تشكيلة ملوك السعادة (7 أقسام متخصصة)</span>
              </h2>
              <p className="text-xs text-slate-500">
                اختر القسم للتصفح الفوري للرجالي المودرن والأطفال الكاجوال
              </p>
            </div>

            <button
              onClick={() => setIsCategoriesModalOpen(true)}
              className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 self-start sm:self-auto py-1 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 transition border border-amber-200/60"
            >
              <span>عرض دليل الأقسام الكامل</span>
            </button>
          </div>

          {/* Category Cards */}
          <CategoryNavPills
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            variant="cards"
            productCounts={productCounts}
          />

          {/* Filter, Sort & Offers Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOnlyOffers(!onlyOffers)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                  onlyOffers
                    ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-400/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>العروض والتخفيضات فقط</span>
              </button>

              <div className="text-xs text-slate-500 px-1 font-medium">
                عرض <strong className="text-slate-900">{filteredProducts.length}</strong> موديل
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
              <span>ترتيب:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">المميز والأكثر طلباً</option>
                <option value="newest">أحدث الموديلات 2025</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">أعلى تقييم للعملاء</option>
              </select>
            </div>

          </div>

        </div>

        {/* Pricing Mode Notice Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-right shadow-2xs ${
          pricingMode === 'wholesale'
            ? 'bg-amber-50 border-amber-300 text-amber-950'
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              pricingMode === 'wholesale' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-amber-600'
            }`}>
              <Crown className="w-4 h-4" />
            </div>
            <span>
              {pricingMode === 'wholesale' ? (
                <>
                  <strong className="text-amber-900 font-bold">أنت تتسوق الآن بأسعار الجملة والمصنع:</strong> الأسعار المعروضة هي للدست والكميات مع خصومات المكاتب والمحلات.
                </>
              ) : (
                <>
                  <strong className="text-slate-950 font-bold">أنت تتسوق بالأسعار الفردية (قطاعي):</strong> هل أنت صاحب محل أو تاجر؟ فعّل وضع الجملة للحصول على أسعار المصنع.
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => setPricingMode(pricingMode === 'retail' ? 'wholesale' : 'retail')}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition cursor-pointer ${
              pricingMode === 'wholesale'
                ? 'bg-white text-slate-950 border border-slate-300 hover:bg-slate-100 shadow-xs'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
            }`}
          >
            {pricingMode === 'wholesale' ? 'التحويل لسعر القطاعي' : 'التحويل لأسعار الجملة 👑'}
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-3xl border border-slate-200 space-y-3.5 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Shirt className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-950">لم نجد موديلات تطابق بحثك في هذا القسم</h3>
              <p className="text-xs text-slate-500">
                جرب البحث بكلمات أخرى أو اضغط على "جميع الموديلات" لإظهار التشكيلة الكاملة
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlyOffers(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-xs cursor-pointer"
            >
              عرض جميع الموديلات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                pricingMode={pricingMode}
                onAddToCart={handleAddToCart}
                onQuickView={setSelectedProduct}
                onOpenImageManagerForProduct={(p) => {
                  setTargetProductForImage(p);
                  setIsImageManagerOpen(true);
                }}
              />
            ))}
          </div>
        )}

      </main>

      {/* Wholesale Section */}
      <WholesaleSection />

      {/* Customer Reviews Section */}
      <ReviewsSection reviews={REVIEWS_DATA} />

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategorySelect}
        onOpenImageManager={() => {
          setTargetProductForImage(null);
          setIsImageManagerOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        customLogoUrl={customLogoUrl}
      />

      {/* Mobile Bottom Bar Navigation (Optimized for phones) */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        pricingMode={pricingMode}
        onTogglePricingMode={setPricingMode}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
      />

      {/* Floating WhatsApp Contact Button (Desktop / Tablet) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'مرحباً ملوك السعادة، أود الاستفسار عن الملابس والأسعار'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-105 transition-transform items-center gap-2 border-2 border-emerald-400/80 group"
        title={`تواصل مباشر عبر واتساب أعمال: ${PHONE_NUMBER_DISPLAY}`}
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-1">
          واتساب أعمال ({PHONE_NUMBER_DISPLAY})
        </span>
      </a>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        pricingMode={pricingMode}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenImageManagerForProduct={(p) => {
          setTargetProductForImage(p);
          setIsImageManagerOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        appliedDiscount={appliedDiscount}
        onApplyDiscount={handleApplyDiscount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        shipping={shippingFee}
        discount={discountAmount}
        total={cartTotal}
        pricingMode={pricingMode}
        onOrderSuccess={(order) => {
          handleClearCart();
        }}
      />

      <CategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        productCounts={productCounts}
      />

      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => {
          setIsImageManagerOpen(false);
          setTargetProductForImage(null);
        }}
        products={products}
        targetProduct={targetProductForImage}
        onUpdateProductImage={handleUpdateProductImage}
        onResetAllImages={handleResetAllImages}
        onCustomLogoUpload={handleCustomLogoUpload}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

    </div>
  );
}
