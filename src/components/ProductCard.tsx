import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Star, 
  Check, 
  Sparkles 
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
  // Stable direct price (300 EGP as set)
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
      className="group relative bg-white rounded-3xl border-2 border-slate-900 hover:border-pink-500 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1"
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
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-slate-950 text-white text-[11px] font-black px-3 py-1 rounded-xl shadow-md border border-pink-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>جديد</span>
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-pink-600 text-white text-[11px] font-black px-3 py-1 rounded-xl shadow-md">
              كود 21kids
            </span>
          )}
        </div>

        {/* Quick View Floating Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-slate-950 rounded-2xl font-black text-xs shadow-xl hover:bg-pink-500 hover:text-white transition flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>عرض التفاصيل</span>
          </button>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 text-right">
        
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-lg border border-pink-200">
              {product.subCategoryName}
            </span>
            <div className="flex items-center gap-1 text-slate-900 font-bold">
              <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-black text-slate-950 text-sm sm:text-base leading-snug line-clamp-2 hover:text-pink-600 transition cursor-pointer font-['Tajawal',sans-serif]"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
            {product.description}
          </p>
        </div>

        {/* Sizes Selector */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>المقاس:</span>
            <span className="text-slate-950 font-bold">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  selectedSize === size
                    ? 'bg-slate-950 text-white ring-2 ring-pink-500'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors Selector */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500 shrink-0">اللون:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all shrink-0 ${
                    selectedColor === c.name
                      ? 'border-pink-600 ring-2 ring-pink-400 scale-110'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-700 font-bold truncate mr-auto">
              {selectedColor}
            </span>
          </div>
        )}

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-2xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                {currentPrice} <span className="text-xs font-bold text-slate-700">ج.م</span>
              </span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>

            <span className="text-[10px] sm:text-xs font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
              شامل المعاينة
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-1.5">
            <button
              onClick={handleAdd}
              className={`col-span-3 py-2.5 px-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                isAddedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 hover:bg-black text-white active:scale-95'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-pink-400" />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppBuy}
              className="col-span-2 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1 transition shadow-sm"
              title="طلب فوري عبر واتساب"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب واتساب</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
