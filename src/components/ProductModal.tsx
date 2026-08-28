import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Check, 
  SlidersHorizontal, 
  ShieldCheck, 
  Truck,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

interface ProductModalProps {
  product: Product | null;
  pricingMode?: string;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onOpenSizeGuide: () => void;
  onOpenImageManagerForProduct?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'جميع المقاسات');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = product.customImage
    ? [product.customImage, ...product.images]
    : product.images;

  const currentPrice = product.priceRetail;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(
      `مرحباً براند J&S (Junior & Senior) ✨\nأود طلب الموديل المعروض:\n• الاسم: *${product.name}*\n• السعر: *${currentPrice * quantity} ج.م* (${quantity} قطعة)\n• المقاس: *${selectedSize}*\n• اللون: *${selectedColor}*\n• الوصف: *${product.description}*\n\nيرجى تأكيد التوافر وتجهيز الشحن مع المعاينة عند الاستلام.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-right animate-fadeIn">
      <div className="bg-white rounded-3xl border-2 border-slate-900 w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-slate-950/80 text-white hover:bg-black transition border border-pink-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Images Section */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-900 shadow-sm">
              <img
                src={displayImages[activeImageIndex] || displayImages[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md">
                كود 21kids
              </span>
            </div>

            {/* Thumbnail if multiple */}
            {displayImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-18 rounded-xl overflow-hidden border-2 shrink-0 ${
                      activeImageIndex === idx ? 'border-pink-600 ring-2 ring-pink-400' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt="mini" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Purchase Form */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-lg border border-pink-200">
                  {product.subCategoryName}
                </span>

                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                  <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-['Tajawal',sans-serif] leading-tight">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-950 text-white border-2 border-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-xs text-pink-300 block font-bold">
                    السعر
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-['Tajawal',sans-serif]">
                      {currentPrice} <span className="text-sm font-bold text-pink-400">ج.م</span>
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {product.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-bold bg-pink-600 text-white px-2.5 py-1 rounded-lg border border-pink-500">
                  معاينة قبل الدفع
                </span>
              </div>

              {/* Description */}
              <div className="mt-3 p-3 rounded-xl bg-pink-50 border border-pink-200">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold">
                  {product.description}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">الخامة:</span>
                  <span className="font-bold text-slate-900">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">المقاسات:</span>
                  <span className="font-bold text-slate-900">{product.fit}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">اختر المقاس:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-pink-600 hover:text-pink-700 flex items-center gap-1 font-bold text-[11px]"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>جدول المقاسات</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-slate-950 text-white ring-2 ring-pink-500 shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    اللون المحدد: <span className="text-pink-600">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          selectedColor === c.name
                            ? 'border-pink-600 bg-pink-50 ring-2 ring-pink-400'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-900">الكمية المطلوبة:</span>
                <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center font-black rounded-lg bg-white text-slate-800 shadow-2xs hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-black text-sm text-slate-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center font-black rounded-lg bg-white text-slate-800 shadow-2xs hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition border-2 border-pink-500"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 text-pink-400" />
                    <span>تمت الإضافة للسلة بنجاح!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-pink-400" />
                    <span>إضافة إلى سلة المشتريات ({currentPrice * quantity} ج.م)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب مباشر عبر الواتساب</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
