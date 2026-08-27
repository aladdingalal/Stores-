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
  Truck
} from 'lucide-react';

import { 
  Product, 
  CartItem, 
  CategoryType, 
  SubCategoryType, 
  PricingMode, 
  OrderDetails 
} from './types';
import { INITIAL_PRODUCTS, REVIEWS_DATA } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { WholesaleSection } from './components/WholesaleSection';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

export default function App() {
  // Products state (persisted in localStorage to keep custom uploaded photos)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('molok_products_v1');
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
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategoryType>('all');
  const [pricingMode, setPricingMode] = useState<PricingMode>('retail');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyOffers, setOnlyOffers] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('molok_cart_v1');
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetProductForImage, setTargetProductForImage] = useState<Product | null>(null);

  // Discounts
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('molok_products_v1', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('molok_cart_v1', JSON.stringify(cartItems));
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
    if (window.confirm('هل تريد بالتأكيد استعادة جميع الصور الافتراضية للكتالوج؟')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.removeItem('molok_products_v1');
    }
  };

  const handleCustomLogoUpload = (logoUrl: string) => {
    setCustomLogoUrl(logoUrl);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;

        // Subcategory filter
        if (activeSubCategory !== 'all' && p.subCategory !== activeSubCategory) return false;

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
  }, [products, activeCategory, activeSubCategory, onlyOffers, searchQuery, sortBy, pricingMode]);

  // Subcategories available for active category
  const subCategoriesList = useMemo(() => {
    if (activeCategory === 'men') {
      return [
        { id: 'all', label: 'كل الموديلات الرجالي' },
        { id: 'men-tshirts', label: 'تيشرتات أوفر سايز وبولو' },
        { id: 'men-shirts', label: 'قمصان كتان وكاجوال' },
        { id: 'men-sets', label: 'أطقم وسيتات صيفي' },
        { id: 'men-pants', label: 'بنطلونات كارجو وجينز' },
        { id: 'men-jackets', label: 'هوديز وسويت شيرت' },
      ];
    }
    if (activeCategory === 'kids') {
      return [
        { id: 'all', label: 'كل ملابس الأطفال (5+ سنوات)' },
        { id: 'kids-sets', label: 'أطقم وترينجات أطفال' },
        { id: 'kids-tshirts', label: 'تيشرتات كاجوال' },
        { id: 'kids-pants', label: 'جينز وشورتات كارجو' },
        { id: 'kids-hoodies', label: 'سويت شيرتات رياضية' },
      ];
    }
    return [
      { id: 'all', label: 'الكل' },
      { id: 'men-tshirts', label: 'رجالي: تيشرتات وبولو' },
      { id: 'men-shirts', label: 'رجالي: قمصان مودرن' },
      { id: 'men-sets', label: 'رجالي: أطقم كاجوال' },
      { id: 'kids-sets', label: 'أطفال: أطقم وترينجات' },
      { id: 'kids-tshirts', label: 'أطفال: تيشرتات جرافيك' },
    ];
  }, [activeCategory]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.appliedPrice * item.quantity, 0);
  const shippingFee = cartSubtotal >= 1200 || cartItems.length === 0 ? 0 : 50;
  const discountAmount = appliedDiscount > 0 ? (cartSubtotal * appliedDiscount) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-['Cairo',sans-serif] flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubCategory('all');
        }}
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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        customLogoUrl={customLogoUrl}
      />

      {/* Hero Section */}
      <HeroBanner
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubCategory('all');
        }}
        pricingMode={pricingMode}
        onTogglePricingMode={setPricingMode}
        onOpenImageManager={() => {
          setTargetProductForImage(null);
          setIsImageManagerOpen(true);
        }}
      />

      {/* Main Catalog Explorer */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="catalog-section">
        
        {/* Filter Controls Bar */}
        <div className="bg-neutral-900/90 p-4 sm:p-5 rounded-3xl border border-neutral-800 space-y-4 shadow-lg text-right">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSubCategory('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                جميع الموديلات ({products.length})
              </button>

              <button
                onClick={() => {
                  setActiveCategory('men');
                  setActiveSubCategory('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'men'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>ملابس رجالي مودرن</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('kids');
                  setActiveSubCategory('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === 'kids'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Baby className="w-3.5 h-3.5" />
                <span>أطفال كاجوال (5+ سنوات)</span>
              </button>
            </div>

            {/* Sort & Offer Filter */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              <button
                onClick={() => setOnlyOffers(!onlyOffers)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                  onlyOffers
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>العروض والتخفيضات فقط</span>
              </button>

              <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                <span>ترتيب حسب:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-neutral-900 text-white">المميز والأكثر طلباً</option>
                  <option value="newest" className="bg-neutral-900 text-white">أحدث الموديلات 2025</option>
                  <option value="price-asc" className="bg-neutral-900 text-white">السعر: من الأقل للأعلى</option>
                  <option value="price-desc" className="bg-neutral-900 text-white">السعر: من الأعلى للأقل</option>
                  <option value="rating" className="bg-neutral-900 text-white">أعلى تقييم للعملاء</option>
                </select>
              </div>

            </div>

          </div>

          {/* Subcategories Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs text-neutral-400 whitespace-nowrap ml-1">الأقسام الفرعية:</span>
            {subCategoriesList.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubCategory(sub.id as SubCategoryType)}
                className={`px-3 py-1 text-xs rounded-xl whitespace-nowrap transition-all ${
                  activeSubCategory === sub.id
                    ? 'bg-neutral-100 text-neutral-950 font-bold shadow'
                    : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

        </div>

        {/* Pricing Mode Notice Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-right ${
          pricingMode === 'wholesale'
            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
            : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
        }`}>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Crown className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {pricingMode === 'wholesale' ? (
                <>
                  <strong>أنت الآن في وضع تجار الجملة:</strong> الأسعار المعروضة هي أسعار المصنع مع الحد الأدنى للدست والكميات.
                </>
              ) : (
                <>
                  <strong>أنت تتسوق بالأسعار الفردية (قطاعي):</strong> هل أنت صاحب محل أو مكتب جملة؟ فعّل وضع الجملة للحصول على خصومات المصنع.
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => setPricingMode(pricingMode === 'retail' ? 'wholesale' : 'retail')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition ${
              pricingMode === 'wholesale'
                ? 'bg-neutral-900 text-white border border-neutral-700'
                : 'bg-amber-500 text-neutral-950 hover:brightness-110 shadow'
            }`}
          >
            {pricingMode === 'wholesale' ? 'التحويل لسعر القطاعي' : 'التحويل لسعر الجملة'}
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/50 rounded-3xl border border-neutral-800 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
              <Shirt className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">لم نجد موديلات تطابق بحثك</h3>
              <p className="text-xs text-neutral-400">
                جرب البحث بكلمات أخرى أو اختر "جميع الموديلات" لإظهار التشكيلة الكاملة
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveSubCategory('all');
                setSearchQuery('');
                setOnlyOffers(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:brightness-110 transition"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
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
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenImageManager={() => {
          setTargetProductForImage(null);
          setIsImageManagerOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        customLogoUrl={customLogoUrl}
      />

      {/* Floating WhatsApp Contact Button */}
      <a
        href="https://wa.me/201033545500?text=مرحباً%20ملوك%20السعادة،%20أود%20الاستفسار%20عن%20الملابس%20والأسعار"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border-2 border-emerald-400/50 group"
        title="تواصل مباشر عبر واتساب أعمال: 01033545500"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-1">
          واتساب ملوك السعادة (01033545500)
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
