import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Star, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

interface ProductCardProps {
  product: Product;
  pricingMode?: string;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onQuickView: (product: Product) => void;
  onOpenImageManagerForProduct?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'جميع المقاسات');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const displayImage = product.customImage || product.images[0];
  const currentPrice = product.priceRetail;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor, 1);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1500);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `مرحباً براند J&S (Junior & Senior) ✨\nأود طلب الموديل المعروض:\n• الاسم: *${product.name}*\n• السعر: *${currentPrice} ج.م*\n• المقاس: *${selectedSize}*\n• اللون: *${selectedColor}*\n• الوصف: *${product.description}*\n\nيرجى تأكيد التوافر وتجهيز الشحن مع المعاينة عند الاستلام.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-right"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container (4:5 Fashion Aspect Ratio) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={displayImage}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-neutral-950/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm border border-white/10 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              <span>جديد</span>
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-blue-600 to-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
              كود 21kids
            </span>
          )}
        </div>

        {/* Inspection Tag (معاينة قبل الاستلام) */}
        <div className="absolute bottom-2 right-2 bg-neutral-950/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-blue-400" />
          <span>معاينة قبل الدفع</span>
        </div>

        {/* Quick View Button on Desktop Hover */}
        <div className="hidden sm:flex absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center p-4 pointer-events-none">
          <span className="px-3.5 py-2 bg-white/95 text-neutral-950 rounded-full font-bold text-xs shadow-lg backdrop-blur-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>عرض سريع</span>
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 space-y-2 sm:space-y-2.5">
        
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold text-blue-600 text-[10px] sm:text-xs">
              {product.subCategoryName}
            </span>
            <div className="flex items-center gap-0.5 text-neutral-800 font-bold text-[10px] sm:text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-neutral-950 text-xs sm:text-sm leading-snug line-clamp-2 font-['Tajawal',sans-serif] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Description line */}
          <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Sizes Quick Selector Pills */}
        <div className="space-y-1 pt-1.5 border-t border-neutral-100">
          <div className="flex items-center justify-between text-[10px] text-neutral-500">
            <span>المقاس:</span>
            <span className="text-neutral-900 font-bold truncate max-w-[120px]">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
            {product.sizes.slice(0, 3).map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold transition-all border ${
                  selectedSize === size
                    ? 'bg-neutral-950 text-white border-neutral-900 shadow-2xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {size.replace('جميع المقاسات ', '')}
              </button>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[9px] text-neutral-400 self-center font-bold px-1">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
          
          {/* Price Tag */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black text-neutral-950 font-sans">
                {currentPrice} ج.م
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-neutral-400 line-through font-sans">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              متاح للشحن
            </span>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              id={`add-to-cart-btn-${product.id}`}
              className={`py-2 px-2 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 border ${
                isAddedAnimation
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-neutral-950 hover:bg-black text-white border-neutral-950 shadow-2xs'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-3 h-3 text-white" />
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 text-pink-400" />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>

            {/* WhatsApp Quick Order Button */}
            <button
              onClick={handleWhatsAppBuy}
              id={`whatsapp-buy-btn-${product.id}`}
              className="py-2 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer border border-blue-500/30"
              title="طلب سريع ومباشر عبر واتساب"
            >
              <MessageCircle className="w-3 h-3 text-blue-200" />
              <span>طلب واتساب</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
