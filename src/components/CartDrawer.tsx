import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  MessageCircle, 
  Crown, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { CartItem, PricingMode } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  appliedDiscount: number;
  onApplyDiscount: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  discountCode,
  appliedDiscount,
  onApplyDiscount,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState(discountCode);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.appliedPrice * item.quantity, 0);
  const freeShippingThreshold = 1200;
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 50;
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyDiscount(couponInput.trim());
    if (success) {
      setCouponMessage({ text: 'تم تطبيق كود الخصم بنجاح! 🎉', isError: false });
    } else {
      setCouponMessage({ text: 'كود غير صالح (جرب MOLOK10 أو GOMLEH)', isError: true });
    }
  };

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    let itemsListText = items
      .map(
        (it, idx) =>
          `${idx + 1}- ${it.product.name}\n   - المقاس: ${it.selectedSize} | اللون: ${it.selectedColor}\n   - الكمية: ${it.quantity} (${it.pricingMode === 'wholesale' ? 'جملة' : 'قطاعي'})\n   - السعر: ${it.appliedPrice * it.quantity} ج.م`
      )
      .join('\n\n');

    const msg = encodeURIComponent(
      `👑 طلبية جديدة من موقع ملوك السعادة 👑\n\n` +
      `📦 المنتجات:\n${itemsListText}\n\n` +
      `💵 المجموع الفرعي: ${subtotal} ج.م\n` +
      (discountAmount > 0 ? `🎁 الخصم: -${discountAmount} ج.م\n` : '') +
      `🚚 مصاريف الشحن: ${shippingFee === 0 ? 'مجاني' : shippingFee + ' ج.م'}\n` +
      `⭐ الإجمالي المطلوب: ${finalTotal} ج.م\n\n` +
      `الرجاء تأكيد استلام الطلب وتحديد موعد الشحن.`
    );

    window.open(`https://wa.me/201033545500?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn text-right">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-neutral-900 border-r border-neutral-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-lg text-white">سلة المشتريات</h2>
              <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} قطعة
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-neutral-950 p-3 border-b border-neutral-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {subtotal >= freeShippingThreshold
                    ? '🎉 مبروك! حصلت على شحن مجاني لكافة المحافظات'
                    : `أضف بقيمة ${freeShippingThreshold - subtotal} ج.م إضافية للشحن المجاني`}
                </span>
              </span>
              <span className="font-bold text-amber-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">السلة فارغة حالياً</h3>
                  <p className="text-xs text-neutral-400">
                    تصفح أحدث موديلات ملابس الرجال والأطفال وأضف ما يعجبك
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:brightness-110 transition"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800 flex gap-3 items-center relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.customImage || item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 rounded-xl object-cover bg-neutral-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition p-1"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span>المقاس: <strong className="text-amber-400">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>اللون: <strong className="text-neutral-200">{item.selectedColor}</strong></span>
                      {item.pricingMode === 'wholesale' && (
                        <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded">
                          جملة
                        </span>
                      )}
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-black text-amber-400 font-['Tajawal',sans-serif]">
                        {item.appliedPrice * item.quantity} ج.م
                      </span>

                      <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 rounded text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5 min-w-[1.2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 rounded text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area: Coupon & Totals */}
          {items.length > 0 && (
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleCouponSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="كود الخصم (مثال: MOLOK10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs rounded-xl border border-neutral-700 transition"
                  >
                    تطبيق
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] ${
                      couponMessage.isError ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal} ج.م</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>خصم الكوبون ({appliedDiscount}%):</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>مصاريف الشحن:</span>
                  <span>{shippingFee === 0 ? 'مجاني 🚚' : `${shippingFee} ج.م`}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-neutral-800">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-lg text-amber-400 font-['Tajawal',sans-serif]">
                    {finalTotal} ج.م
                  </span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  id="checkout-btn"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-xs hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2"
                >
                  <span>إتمام الطلب وتأكيد العنوان</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSendWhatsAppOrder}
                  id="whatsapp-cart-order-btn"
                  className="w-full py-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-emerald-600/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال الفاتورة مباشرة عبر واتساب</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  دفع عند الاستلام
                </span>
                <span>•</span>
                <span>معاينة المنتجات قبل الدفع</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
