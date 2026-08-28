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
  Sparkles,
  Award
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 text-right animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl border border-neutral-200 w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[94vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-neutral-950/80 text-white hover:bg-black transition backdrop-blur-sm cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Images Section */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={displayImages[activeImageIndex] || displayImages[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                كود 21kids
              </span>
            </div>

            {/* Thumbnail selector */}
            {displayImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 shrink-0 ${
                      activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-400' : 'border-neutral-200'
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
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {product.subCategoryName}
                </span>

                <div className="flex items-center gap-1 text-neutral-900 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-2xl font-black text-neutral-950 font-['Tajawal',sans-serif] leading-tight">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="mt-3 p-3.5 rounded-2xl bg-neutral-950 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400 block font-medium">
                    السعر للقطعة
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-white font-sans">
                      {currentPrice} <span className="text-xs font-bold text-pink-400">ج.م</span>
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through font-sans">
                        {product.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-blue-400 font-bold block">
                    الدفع عند الاستلام
                  </span>
                  <span className="text-[10px] text-neutral-300">
                    مع المعاينة والقياس
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700 space-y-1">
                <p className="font-bold text-neutral-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>تفاصيل الموديل:</span>
                </p>
                <p className="leading-relaxed">{product.description}</p>
                <p className="text-[11px] text-neutral-500 font-medium pt-1 border-t border-neutral-200/60">
                  {product.fabric} • السعر غير شامل مصاريف الشحن
                </p>
              </div>

              {/* Sizes Selection */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">
                    المقاس المتاح:
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>دليل المقاسات</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedSize === size
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Selection */}
              <div className="mt-3 space-y-2">
                <span className="text-xs font-bold text-neutral-900 block">
                  اللون المختار: <strong className="text-blue-600">{selectedColor}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center justify-between bg-neutral-100 p-2 rounded-2xl">
                <span className="text-xs font-bold text-neutral-800 pr-2">الكمية المطلوبة:</span>
                <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-neutral-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-black text-sm flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-black font-sans w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-neutral-950 text-white font-black text-sm flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 hover:bg-black text-white shadow-md'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تمت الإضافة للسلة</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-pink-400" />
                      <span>أضف لسلة المشتريات</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-blue-200" />
                  <span>طلب مباشر عبر واتساب</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                  معاينة كاملة قبل الدفع
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-pink-500" />
                  شحن لجميع المحافظات
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
