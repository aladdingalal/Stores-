import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Heart, 
  Star, 
  Crown, 
  Check, 
  Camera, 
  Layers,
  Sparkles 
} from 'lucide-react';
import { Product, PricingMode } from '../types';

interface ProductCardProps {
  product: Product;
  pricingMode: PricingMode;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onQuickView: (product: Product) => void;
  onOpenImageManagerForProduct?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  pricingMode,
  onAddToCart,
  onQuickView,
  onOpenImageManagerForProduct,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = product.customImage || product.images[0];
  const currentPrice = pricingMode === 'wholesale' ? product.priceWholesale : product.priceRetail;
  const defaultQty = pricingMode === 'wholesale' ? product.minWholesaleQty : 1;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor, defaultQty);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1500);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `مرحباً ملوك السعادة 👑\nأود طلب الموديل:\n- الاسم: ${product.name}\n- النوع: ${pricingMode === 'wholesale' ? 'جملة (' + product.minWholesaleQty + ' قطع على الأقل)' : 'قطاعي'}\n- السعر: ${currentPrice} ج.م\n- المقاس: ${selectedSize}\n- اللون: ${selectedColor}\n\nيرجى تأكيد التوافر والتوصيل.`
    );
    window.open(`https://wa.me/201033545500?text=${msg}`, '_blank');
  };

  return (
    <div 
      className="group relative bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-500 text-neutral-950 text-[10px] font-black px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
              <Crown className="w-3 h-3" />
              <span>الأكثر مبيعاً</span>
            </span>
          )}
          {product.isNew && (
            <span className="bg-neutral-950/90 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow">
              جديد 2025
            </span>
          )}
          {product.category === 'kids' && (
            <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow">
              أطفال {product.ageRange ? product.ageRange : '5+ سنوات'}
            </span>
          )}
        </div>

        {/* Left Badges: Custom image indicator / Wholesale badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.customImage && (
            <span className="bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow">
              <Check className="w-3 h-3" />
              <span>صورة مخصصة</span>
            </span>
          )}
          {pricingMode === 'wholesale' && (
            <span className="bg-amber-500 text-neutral-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow flex items-center gap-1">
              <Crown className="w-3 h-3" />
              <span>أقل كمية: {product.minWholesaleQty} قطع</span>
            </span>
          )}
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product)}
            id={`quick-view-${product.id}`}
            className="p-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 shadow-xl transition-transform hover:scale-105 flex items-center gap-1.5 text-xs font-bold"
            title="معاينة وتفاصيل الموديل"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>معاينة سريعة</span>
          </button>

          {onOpenImageManagerForProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenImageManagerForProduct(product);
              }}
              className="p-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-amber-400 border border-neutral-700 shadow-xl transition-transform hover:scale-105"
              title="تغيير صورة هذا الموديل بصورتك الخاصة"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="text-amber-400/90 font-semibold">{product.subCategoryName}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-sm text-white line-clamp-2 hover:text-amber-400 transition cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Fabric & Fit mini info */}
          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
            {product.fabric} • {product.fit}
          </p>
        </div>

        {/* Sizes Pill Selector */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>المقاس المتاح:</span>
            <span className="text-amber-400 font-bold">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-all ${
                  selectedSize === size
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors Selector */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] text-neutral-400">الألوان:</span>
            <div className="flex items-center gap-1">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'border-amber-400 ring-2 ring-amber-400/40 scale-110'
                      : 'border-neutral-600'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[10px] text-neutral-400 font-medium mr-auto truncate max-w-[100px]">
              {selectedColor}
            </span>
          </div>
        )}

        {/* Price & Action Button Area */}
        <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-amber-400 font-['Tajawal',sans-serif]">
                {currentPrice} <span className="text-xs font-bold">ج.م</span>
              </span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="text-xs text-neutral-500 line-through">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>

            <span className="text-[11px] font-bold text-neutral-400">
              {pricingMode === 'wholesale' ? 'سعر الجملة' : 'قطاعي'}
            </span>
          </div>

          {/* Action Buttons: Add to Cart & WhatsApp */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            <button
              onClick={handleAdd}
              id={`add-to-cart-${product.id}`}
              className={`col-span-4 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                isAddedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:brightness-110 shadow'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة للسلة!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {pricingMode === 'wholesale' ? `أضف (${product.minWholesaleQty} قطع)` : 'أضف للسلة'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppBuy}
              id={`whatsapp-buy-${product.id}`}
              className="col-span-1 p-2.5 rounded-xl bg-neutral-800 hover:bg-emerald-900/50 text-emerald-400 border border-neutral-700 hover:border-emerald-500/50 transition flex items-center justify-center"
              title="طلب هذا الموديل مباشرة عبر واتساب"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
