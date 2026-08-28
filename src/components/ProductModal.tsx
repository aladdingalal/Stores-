import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  Crown, 
  Check, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Share2, 
  Camera, 
  SlidersHorizontal,
  Plus,
  Minus
} from 'lucide-react';
import { Product, PricingMode } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

interface ProductModalProps {
  product: Product | null;
  pricingMode: PricingMode;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onOpenImageManagerForProduct?: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  pricingMode,
  onClose,
  onAddToCart,
  onOpenImageManagerForProduct,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(
    product.customImage || product.images[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(
    pricingMode === 'wholesale' ? product.minWholesaleQty : 1
  );
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPrice = pricingMode === 'wholesale' ? product.priceWholesale : product.priceRetail;
  const totalPrice = currentPrice * quantity;

  const handleQuantityChange = (delta: number) => {
    const min = pricingMode === 'wholesale' ? product.minWholesaleQty : 1;
    const step = pricingMode === 'wholesale' ? (product.minWholesaleQty >= 6 ? 6 : 1) : 1;
    setQuantity((prev) => Math.max(min, prev + delta * step));
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleDirectWhatsApp = () => {
    const msg = encodeURIComponent(
      `مرحباً ملوك السعادة 👑\nأود تأكيد طلب المنتج:\n• الاسم: *${product.name}*\n• النظام: *${pricingMode === 'wholesale' ? 'طلب جملة' : 'طلب قطاعي'}*\n• الكمية: *${quantity} قطعة*\n• المقاس: *${selectedSize}*\n• اللون: *${selectedColor}*\n• الإجمالي: *${totalPrice} ج.م*\n\nيرجى تأكيد الاستلام والتوصيل.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} من براند ملوك السعادة`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 p-2 sm:p-2.5 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition border border-slate-200"
          id="close-product-modal"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-8">
          
          {/* Images Gallery */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {product.customImage && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Check className="w-3.5 h-3.5" />
                  <span>صورة خاصة بالمحل</span>
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-amber-500 ring-2 ring-amber-400/40'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Photo Manager Prompt */}
            {onOpenImageManagerForProduct && (
              <button
                onClick={() => {
                  onClose();
                  onOpenImageManagerForProduct(product);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 flex items-center justify-center gap-2 transition"
              >
                <Camera className="w-4 h-4 text-amber-600" />
                <span>تحديث صورة هذا الموديل برابط خارجي أو ملف</span>
              </button>
            )}
          </div>

          {/* Product Details & Purchase Form */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {product.subCategoryName}
                </span>

                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-900">{product.rating}</span>
                  <span className="text-xs text-slate-500 font-normal">
                    ({product.reviewsCount} تقييم)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-['Tajawal',sans-serif] leading-tight">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600 block">
                    {pricingMode === 'wholesale' ? 'سعر الجملة للقطعة' : 'سعر القطاعي'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                      {currentPrice} <span className="text-sm font-bold text-slate-700">ج.م</span>
                    </span>
                    {product.originalPrice && product.originalPrice > currentPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {product.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                </div>

                {pricingMode === 'wholesale' && (
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded block">
                      أقل طلب: {product.minWholesaleQty} قطع
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">الخامة:</span>
                  <span className="font-bold text-slate-900">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">القصة / التلبيس:</span>
                  <span className="font-bold text-slate-900">{product.fit}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">اختر المقاس:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-amber-700 hover:text-amber-800 flex items-center gap-1 font-bold text-[11px]"
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
                          ? 'bg-slate-950 text-amber-400 ring-2 ring-amber-400/50 shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="mt-3.5 space-y-1.5">
                  <span className="font-bold text-xs text-slate-800 block">
                    اختر اللون: <strong className="text-amber-800 font-semibold">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'border-amber-500 ring-2 ring-amber-400/50 scale-110'
                            : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-800">الكمية المطلوبة:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-base text-slate-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              
              {/* Total & Action Buttons */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>الإجمالي:</span>
                <span className="text-lg font-black text-slate-950 font-['Tajawal',sans-serif]">
                  {totalPrice} ج.م
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  id="modal-add-to-cart-btn"
                  className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? 'تمت الإضافة بنجاح!' : 'إضافة إلى السلة'}</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  id="modal-whatsapp-order-btn"
                  className="py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>طلب فوري عبر واتساب</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-slate-500 text-center">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>معاينة قبل الدفع</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>توصيل سريع</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>استبدال سهل</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
