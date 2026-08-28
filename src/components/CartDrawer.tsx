import React from 'react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn text-right">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-white text-neutral-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-950 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-pink-400" />
              <h2 className="font-black text-lg text-white font-['Tajawal',sans-serif]">حقيبة التسوق</h2>
              <span className="text-xs bg-gradient-to-r from-blue-600 to-pink-600 text-white font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} قطعة
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition cursor-pointer"
              id="close-cart-btn"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-50 p-3 border-b border-neutral-200">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-neutral-800 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {subtotal >= freeShippingThreshold
                    ? '🎉 تهانينا! حصلت على شحن مجاني لطلبك'
                    : `أضف بـ ${freeShippingThreshold - subtotal} ج.م إضافية للشحن المجاني`}
                </span>
              </span>
              <span className="text-blue-600 font-bold font-sans">{progressPercent}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-pink-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-800 text-base">سلة المشتريات فارغة</h3>
                  <p className="text-xs text-neutral-500 mt-1">تصفح تشكيلة J&amp;S وأضف الموديلات التي تناسبك</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-neutral-950 text-white font-bold rounded-full text-xs hover:bg-black transition cursor-pointer"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 relative"
                >
                  <img
                    src={item.product.customImage || item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 rounded-xl object-cover border border-neutral-200 shrink-0 bg-white"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate font-['Tajawal',sans-serif]">
                      {item.product.name}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                      <span>{item.selectedSize}</span>
                      <span>•</span>
                      <span>{item.selectedColor}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-xs sm:text-sm text-neutral-950 font-sans">
                        {item.appliedPrice * item.quantity} ج.م
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-neutral-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-neutral-500 hover:text-neutral-900 p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black font-sans w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-neutral-500 hover:text-neutral-900 p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute top-2.5 left-2.5 text-neutral-400 hover:text-rose-600 transition p-1"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 border-t border-neutral-200 bg-white space-y-3">
              
              {/* Pricing breakdown */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-neutral-950 font-sans">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>الشحن:</span>
                  <span className="font-bold text-emerald-600">
                    {shippingFee === 0 ? 'مجاني' : `${shippingFee} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-neutral-950 pt-1 border-t border-neutral-100">
                  <span>الإجمالي النهائي:</span>
                  <span className="font-sans text-blue-600 font-black">{finalTotal} ج.م</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3 rounded-full bg-neutral-950 hover:bg-black text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>إتمام الطلب والدفع عند الاستلام</span>
                </button>

                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-blue-200" />
                  <span>إرسال الطلب عبر واتساب</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-neutral-400 font-medium">
                معاينة كاملة وقياس قبل استلام ودفع الطلب
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
