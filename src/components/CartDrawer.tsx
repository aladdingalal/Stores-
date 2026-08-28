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
import { WHATSAPP_NUMBER } from '../data/contact';

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
          `🔹 *الموديل ${idx + 1}:* ${it.product.name}\n   - المقاس: ${it.selectedSize} | اللون: ${it.selectedColor}\n   - الكمية: ${it.quantity} قطعة (${it.pricingMode === 'wholesale' ? 'جملة' : 'قطاعي'})\n   - السعر: ${it.appliedPrice * it.quantity} ج.م`
      )
      .join('\n\n');

    const msg = encodeURIComponent(
      `👑 *طلب جديد من سلة ملوك السعادة* 👑\n\n` +
      `📦 *تفاصيل المنتجات:*\n${itemsListText}\n\n` +
      `───────────────\n` +
      `💵 *المجموع الفرعي:* ${subtotal} ج.م\n` +
      (discountAmount > 0 ? `🎁 *الخصم المطبق:* -${discountAmount} ج.م\n` : '') +
      `🚚 *مصاريف الشحن:* ${shippingFee === 0 ? 'شحن مجاني' : shippingFee + ' ج.م'}\n` +
      `⭐ *الإجمالي النهائي المطلوب:* ${finalTotal} ج.م\n\n` +
      `يرجى تأكيد تجهيز الشحنة وإرسال بيانات التوصيل.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fadeIn text-right">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-white border-r border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="font-black text-lg text-slate-950 font-['Tajawal',sans-serif]">سلة المشتريات</h2>
              <span className="text-xs bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} قطعة
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition border border-slate-200"
              id="close-cart-btn"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-amber-50/80 p-3 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {subtotal >= freeShippingThreshold
                    ? '🎉 مبروك! حصلت على شحن مجاني لكافة المحافظات'
                    : `أضف بقيمة ${freeShippingThreshold - subtotal} ج.م إضافية للشحن المجاني`}
                </span>
              </span>
              <span className="font-bold text-amber-900">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">سلة المشتريات فارغة</h3>
                  <p className="text-xs text-slate-500 mt-1">تصفح التشكيلة وأضف الموديلات التي تعجبك</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs hover:bg-amber-400 transition"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3 relative group"
                >
                  {/* Image */}
                  <img
                    src={item.product.customImage || item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-slate-200 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span>المقاس: <strong className="text-slate-900 font-bold">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>اللون: <strong className="text-slate-900 font-bold">{item.selectedColor}</strong></span>
                      </div>

                      <div className="mt-1">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                          {item.pricingMode === 'wholesale' ? 'جملة' : 'قطاعي'} ({item.appliedPrice} ج.م للقطعة)
                        </span>
                      </div>
                    </div>

                    {/* Quantity + Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-slate-900 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-black text-xs sm:text-sm text-slate-950 font-['Tajawal',sans-serif]">
                        {item.appliedPrice * item.quantity} ج.م
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              
              {/* Discount Coupon Form */}
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="كود الخصم (MOLOK10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 uppercase font-mono"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-950 text-amber-400 hover:bg-slate-800 text-xs font-bold rounded-xl transition"
                >
                  تطبيق
                </button>
              </form>

              {couponMessage && (
                <div
                  className={`text-[11px] font-bold p-2 rounded-lg ${
                    couponMessage.isError
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {couponMessage.text}
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-slate-900">{subtotal} ج.م</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>الخصم ({appliedDiscount}%):</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>مصاريف الشحن:</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? 'مجاناً 🎁' : `${shippingFee} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-base font-black text-amber-800 font-['Tajawal',sans-serif]">
                    {finalTotal} ج.م
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  id="checkout-proceed-btn"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
                >
                  <span>متابعة الشراء وتأكيد البيانات</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSendWhatsAppOrder}
                  id="cart-whatsapp-order-btn"
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>إرسال السلة كاملة مباشرة للواتساب</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
