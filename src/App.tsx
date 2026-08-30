import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  Shirt, 
  Baby, 
  Layers, 
  X,
  Flame,
  Truck,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

import { 
  Product, 
  CartItem, 
  CategoryType, 
  OrderDetails 
} from './types';
import { INITIAL_PRODUCTS, REVIEWS_DATA, CATEGORIES_CONFIG } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNavPills } from './components/CategoryNavPills';
import { CategoryHeader } from './components/CategoryHeader';
import { CategoriesModal } from './components/CategoriesModal';
import { FloatingCategoriesMenu } from './components/FloatingCategoriesMenu';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { AddProductModal } from './components/AddProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { WHATSAPP_NUMBER, PHONE_NUMBER_DISPLAY } from './data/contact';

export default function App() {
  // Products state (persisted in localStorage to keep custom uploaded photos)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('js_products_v15');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  // Custom logo state
  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    return (
      localStorage.getItem('js_custom_logo_v3') ||
      'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0717.jpeg'
    );
  });

  // Filters
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyOffers, setOnlyOffers] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('js_cart_v3');
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
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
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
      localStorage.setItem('js_products_v15', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('js_cart_v3', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    if (customLogoUrl) {
      localStorage.setItem('js_custom_logo_v3', customLogoUrl);
    }
  }, [customLogoUrl]);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    const appliedPrice = product.priceRetail;
    const itemId = `${product.id}-${size}-${color}`;

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
          pricingMode: 'retail',
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
            const newQty = item.quantity + delta;
            return newQty >= 1 ? { ...item, quantity: newQty } : null;
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

  const handleApplyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'JS10' || clean === 'SENIOR10' || clean === 'JUNIOR10') {
      setAppliedDiscount(10);
      setDiscountCode(clean);
      return true;
    }
    return false;
  };

  // Image Management Handlers
  const handleUpdateProductImage = (productId: string, newImageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, customImage: newImageUrl } : p))
    );
  };

  const handleResetAllImages = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  const handleCustomLogoUpload = (url: string) => {
    setCustomLogoUrl(url);
  };

  // Add Product Handler
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveCategory(newProduct.category);
  };

  // Category counts
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

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.subCategoryName.toLowerCase().includes(q) ||
          (p.sizes && p.sizes.some((s) => s.toLowerCase().includes(q))) ||
          (p.colors && p.colors.some((c) => c.name.toLowerCase().includes(q)))
      );
    }

    // Filter offers
    if (onlyOffers) {
      list = list.filter((p) => p.originalPrice && p.originalPrice > p.priceRetail);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.priceRetail - b.priceRetail);
        break;
      case 'price-desc':
        list.sort((a, b) => b.priceRetail - a.priceRetail);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [products, activeCategory, searchQuery, onlyOffers, sortBy]);

  // Calculations
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.appliedPrice * item.quantity,
    0
  );
  const freeShippingThreshold = 1200;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 50;
  const discountAmount = appliedDiscount > 0 ? (cartSubtotal * appliedDiscount) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategorySelect = (cat: CategoryType) => {
    setActiveCategory(cat);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans selection:bg-pink-500 selection:text-white" dir="rtl">
      
      {/* 1. Header & Navigation (Black, White, Blue, Pink theme) */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        pricingMode="retail"
        onTogglePricingMode={() => {}}
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

      {/* 2. Hero Banner (Only on 'all' category) */}
      {activeCategory === 'all' && (
        <HeroBanner
          onSelectCategory={handleCategorySelect}
          pricingMode="retail"
          onTogglePricingMode={() => {}}
          onOpenImageManager={() => {
            setTargetProductForImage(null);
            setIsImageManagerOpen(true);
          }}
          onOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
        />
      )}

      {/* 3. Category Page Header (When a specific category is active) */}
      {activeCategory !== 'all' && (
        <CategoryHeader
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          productCount={filteredProducts.length}
        />
      )}

      {/* 4. Main Products Catalog Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5">
        
        {/* Category Filter Pills & Sort Bar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-neutral-200 shadow-2xs space-y-3.5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-neutral-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-950 font-['Tajawal',sans-serif] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>تصفح تشكيلة J&amp;S حسب القسم</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                اضغط على أي قسم لعرض موديلاته الحصرية المتاحة للشحن الفوري
              </p>
            </div>

            <button
              onClick={() => setIsCategoriesModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 px-3.5 py-1.5 rounded-full transition shadow-xs shrink-0 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>الأقسام (7)</span>
            </button>
          </div>

          {/* Horizontal scrollable pills */}
          <CategoryNavPills
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            productCounts={productCounts}
          />

          {/* Filter, Sort & Offers Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-neutral-100">
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOnlyOffers(!onlyOffers)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                  onlyOffers
                    ? 'bg-pink-50 text-pink-700 border-pink-300'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-pink-500" />
                <span>العروض والتخفيضات فقط</span>
              </button>

              <div className="text-xs text-neutral-500 px-1">
                عرض <strong className="text-neutral-950 font-bold">{filteredProducts.length}</strong> موديل
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1.5 text-xs text-neutral-700 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
              <span>ترتيب:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-neutral-950 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">المميز والأكثر طلباً</option>
                <option value="newest">أحدث الموديلات</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">أعلى تقييم للعملاء</option>
              </select>
            </div>

          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-neutral-200 space-y-3 shadow-2xs">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Shirt className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-950">لم نجد موديلات تطابق بحثك في هذا القسم</h3>
              <p className="text-xs text-neutral-500">
                اضغط على "عرض جميع المعروضات" للعودة لكافة المنتجات
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlyOffers(false);
              }}
              className="px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs transition shadow-md cursor-pointer"
            >
              عرض جميع المعروضات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
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

      {/* Floating Categories Menu Button (Always accessible floating widget) */}
      <FloatingCategoriesMenu
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        productCounts={productCounts}
      />

      {/* Mobile Bottom Bar Navigation */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
      />

      {/* Floating WhatsApp Contact Button (Desktop / Tablet) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'مرحباً براند J&S (Junior & Senior)، أود الاستفسار عن الموديلات والأسعار'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-40 p-3 bg-neutral-950 hover:bg-black text-white rounded-full shadow-2xl hover:scale-105 transition-transform items-center gap-2 border border-neutral-700 group"
        title={`تواصل مباشر عبر واتساب أعمال: ${PHONE_NUMBER_DISPLAY}`}
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-5 h-5 text-emerald-400" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-1">
          واتساب مبيعات J&amp;S ({PHONE_NUMBER_DISPLAY})
        </span>
      </a>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
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
        pricingMode="retail"
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

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        defaultCategory={activeCategory}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

    </div>
  );
}
