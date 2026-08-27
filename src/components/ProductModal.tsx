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
      `مرحباً ملوك السعادة 👑\nأود تأكيد طلب المنتج:\n- الاسم: ${product.name}\n- النظام: ${pricingMode === 'wholesale' ? 'طلب جملة' : 'طلب قطاعي'}\n- الكمية: ${quantity} قطعة\n- المقاس: ${selectedSize}\n- اللون: ${selectedColor}\n- الإجمالي: ${totalPrice} ج.م\n\nأرجو تزويدي بتفاصيل الشحن والتأكيد.`
    );
    window.open(`https://wa.me/201033545500?text=${msg}`, '_blank');
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
          id="close-product-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Images Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {product.customImage && (
                <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                  <Check className="w-3.5 h-3.5" />
                  <span>صورة خاصة بالمحل</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery & Custom Photo Trigger */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-amber-500 scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}

              {onOpenImageManagerForProduct && (
                <button
                  onClick={() => onOpenImageManagerForProduct(product)}
                  className="w-16 h-20 rounded-xl border-2 border-dashed border-amber-500/50 bg-neutral-950 flex flex-col items-center justify-center gap-1 text-amber-400 hover:bg-amber-500/10 transition shrink-0 p-1 text-center"
                  title="استبدال صورة هذا المنتج"
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-[9px] font-bold">تغيير الصورة</span>
                </button>
              )}
            </div>
          </div>

          {/* Details & Options */}
          <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Category & Tags */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                  {product.category === 'men' ? 'ملابس رجالي مودرن' : 'ملابس أطفال كاجوال (5+ سنوات)'} • {product.subCategoryName}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition text-xs flex items-center gap-1"
                    title="مشاركة المنتج"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'تم النسخ!' : 'مشاركة'}</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {product.name}
              </h2>

              {/* Rating & reviews */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewsCount} تقييم حقيقي</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">متوفر بالمخزن ({product.stockCount} قطعة)</span>
              </div>

              {/* Price Tier Box */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-400 font-medium">
                    {pricingMode === 'wholesale' ? 'سعر الجملة للقطعة الواحدة' : 'سعر القطاعي'}
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 font-['Tajawal',sans-serif]">
                      {currentPrice} <span className="text-sm font-bold">ج.م</span>
                    </span>
                    {product.originalPrice && product.originalPrice > currentPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        {product.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                </div>

                {pricingMode === 'wholesale' ? (
                  <div className="text-left bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                    <span className="text-[11px] text-amber-300 font-bold block">أقل كمية للجملة</span>
                    <span className="text-xs font-black text-amber-400">{product.minWholesaleQty} قطع</span>
                  </div>
                ) : (
                  <div className="text-left">
                    <span className="text-[11px] text-neutral-400 block">سعر الجملة متاح:</span>
                    <span className="text-xs font-bold text-amber-400">{product.priceWholesale} ج.م / قطعة (دستة)</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-200">اختر المقاس:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>جدول المقاسات بالسنتيمتر</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                        selectedSize === size
                          ? 'bg-amber-500 text-neutral-950 shadow-md ring-2 ring-amber-500/50'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Selection */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-200 block">
                    اللون المختار: <span className="text-amber-400">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs border transition-all ${
                          selectedColor === c.name
                            ? 'border-amber-400 bg-neutral-800 text-white shadow'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-neutral-600" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-neutral-200">الكمية:</span>
                <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-xl p-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-black text-white px-2 min-w-[2rem] text-center font-['Tajawal',sans-serif]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Total & Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">إجمالي الطلب للموديل:</span>
                <span className="text-lg font-black text-amber-400 font-['Tajawal',sans-serif]">
                  {totalPrice} ج.م
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleAdd}
                  id="modal-add-to-cart-btn"
                  className={`py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:brightness-110 shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تمت الإضافة بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>إضافة للسلة ({quantity} قطعة)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  id="modal-whatsapp-btn"
                  className="py-3.5 px-4 rounded-xl bg-neutral-800 hover:bg-emerald-950/60 text-emerald-400 border border-neutral-700 hover:border-emerald-500/50 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>طلب فوري عبر واتساب</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-around text-[10px] text-neutral-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  معاينة عند الاستلام
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  استبدال خلال 14 يوم
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  شحن سريع لجميع المحافظات
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
