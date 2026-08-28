import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../data/contact';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  discountCode?: string;
  appliedDiscount?: number;
  onApplyDiscount?: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.appliedPrice * item.quantity, 0);
  const freeShippingThreshold = 1200;
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 50;
  const finalTotal = subtotal + shippingFee;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    let itemsListText = items
      .map(
        (it, idx) =>
          `🔹 *الموديل ${idx + 1}:* ${it.product.name}\n   - المقاس: ${it.selectedSize} | اللون: ${it.selectedColor}\n   - الكمية: ${it.quantity} قطعة\n   - السعر: ${it.appliedPrice * it.quantity} ج.م`
      )
      .join('\n\n');

    const msg = encodeURIComponent(
      `✨ *طلب جديد من سلة J&S (Junior & Senior)* ✨\n\n` +
      `📦 *تفاصيل المنتجات:*\n${itemsListText}\n\n` +
      `───────────────\n` +
      `💵 *المجموع:* ${subtotal} ج.م\n` +
      `🚚 *مصاريف الشحن:* ${shippingFee === 0 ? 'شحن مجاني' : shippingFee + ' ج.م'}\n` +
      `⭐ *الإجمالي النهائي:* ${finalTotal} ج.م\n\n` +
      `يرجى تأكيد تجهيز الشحنة مع المعاينة عند الاستلام.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn text-right">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-white border-r-2 border-slate-900 text-slate-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-pink-400" />
              <h2 className="font-black text-lg text-white font-['Tajawal',sans-serif]">سلة المشتريات</h2>
              <span className="text-xs bg-pink-600 text-white font-black px-2.5 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} قطعة
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              id="close-cart-btn"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-pink-50 p-3 border-b border-pink-200">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="text-slate-800 flex items-center gap-1">
                <Truck className="w-4 h-4 text-pink-600" />
                <span>
                  {subtotal >= freeShippingThreshold
                    ? '🎉 حصلت على شحن مجاني لكافة المحافظات!'
                    : `أضف بـ ${freeShippingThreshold - subtotal} ج.م إضافية للشحن المجاني`}
                </span>
              </span>
              <span className="text-pink-700 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-pink-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-pink-600 h-full rounded-full transition-all duration-500"
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
                  <p className="text-xs text-slate-500 mt-1">تصفح التشكيلة وأضف الموديلات التي تناسبك</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-950 text-white font-black rounded-xl text-xs hover:bg-black transition border-2 border-pink-500"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-2xl border-2 border-slate-200 flex gap-3 items-center hover:border-pink-500 transition shadow-2xs"
                >
                  <img
                    src={item.product.customImage || item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-black text-slate-950 truncate font-['Tajawal',sans-serif]">
                      {item.product.name}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-slate-600 font-bold">
                      <span>مقاس: {item.selectedSize}</span>
                      <span>•</span>
                      <span>لون: {item.selectedColor}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-white rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-slate-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-slate-700 hover:bg-white rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-slate-950">
                        {item.appliedPrice * item.quantity} ج.م
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="حذف من السلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-slate-900">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>مصاريف الشحن:</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? 'مجاني' : `${shippingFee} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>المبلغ الإجمالي:</span>
                  <span className="text-pink-600">{finalTotal} ج.م</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition border-2 border-pink-700 cursor-pointer"
                >
                  <span>متابعة إتمام الطلب (بيانات الشحن)</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>طلب مباشر وسريع عبر واتساب</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
