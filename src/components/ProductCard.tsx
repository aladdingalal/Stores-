import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Star, 
  Crown, 
  Check, 
  Camera, 
  Sparkles 
} from 'lucide-react';
import { Product, PricingMode } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

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
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

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
      `مرحباً ملوك السعادة 👑\nأود طلب الموديل:\n• الاسم: *${product.name}*\n• نوع الطلب: *${
        pricingMode === 'wholesale'
          ? 'جملة (' + product.minWholesaleQty + ' قطع على الأقل)'
          : 'قطاعي'
      }*\n• السعر: *${currentPrice} ج.م*\n• المقاس: *${selectedSize}*\n• اللون: *${selectedColor}*\n\nيرجى تأكيد التوافر وتجهيز الشحن.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Box */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-slate-950 text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>الأكثر مبيعاً</span>
            </span>
          )}
          {product.isNew && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              جديد 2025
            </span>
          )}
          {product.category === 'kids' && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
              أطفال {product.ageRange ? product.ageRange : 'سن 2+'}
            </span>
          )}
        </div>

        {/* Left Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.customImage && (
            <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <Check className="w-3 h-3" />
              <span>صورة مخصصة</span>
            </span>
          )}
          {pricingMode === 'wholesale' && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
              أقل كمية: {product.minWholesaleQty} قطع
            </span>
          )}
        </div>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            id={`quick-view-${product.id}`}
            className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-md font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>معاينة</span>
          </button>

          {onOpenImageManagerForProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenImageManagerForProduct(product);
              }}
              className="p-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-md font-bold text-xs flex items-center gap-1 transition-transform hover:scale-105"
              title="تغيير صورة هذا الموديل بصورتك"
            >
              <Camera className="w-4 h-4 text-amber-600" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 text-right">
        
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-amber-800 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded-md">
              {product.subCategoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 hover:text-amber-700 transition cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Fabric mini info */}
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {product.fabric}
          </p>
        </div>

        {/* Sizes Selector */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
            <span>المقاس المختار:</span>
            <span className="text-slate-900 font-bold">{selectedSize}</span>
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
                className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold rounded-md transition-all ${
                  selectedSize === size
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
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
            <span className="text-[10px] text-slate-500">اللون:</span>
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
                      ? 'border-amber-500 ring-2 ring-amber-400/50 scale-110'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-600 font-semibold truncate mr-auto">
              {selectedColor}
            </span>
          </div>
        )}

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-950 font-['Tajawal',sans-serif]">
                {currentPrice} <span className="text-xs font-bold text-slate-600">ج.م</span>
              </span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>

            <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              {pricingMode === 'wholesale' ? 'جملة مصنع' : 'قطاعي'}
            </span>
          </div>

          {/* Action Buttons: Add to Cart & WhatsApp */}
          <div className="grid grid-cols-5 gap-1.5 pt-0.5">
            <button
              onClick={handleAdd}
              id={`add-to-cart-${product.id}`}
              className={`col-span-4 py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isAddedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة!</span>
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
              className="col-span-1 p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-700 border border-slate-200 hover:border-emerald-300 transition flex items-center justify-center"
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
