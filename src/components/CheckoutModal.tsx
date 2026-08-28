import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Truck, 
  Phone, 
  MapPin, 
  User, 
  MessageCircle, 
  ShieldCheck, 
  Receipt, 
  Check
} from 'lucide-react';
import { CartItem, OrderDetails, PricingMode } from '../types';
import { EGYPT_GOVERNORATES } from '../data/products';
import { WHATSAPP_NUMBER } from '../data/contact';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  pricingMode: PricingMode;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  shipping,
  discount,
  total,
  pricingMode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [governorate, setGovernorate] = useState(EGYPT_GOVERNORATES[0]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const formatOrderMessage = (order: OrderDetails) => {
    const itemsList = order.items
      .map(
        (it, idx) =>
          `▪️ *(${idx + 1}) ${it.product.name}*\n` +
          `   • المقاس: *${it.selectedSize}* | اللون: *${it.selectedColor}*\n` +
          `   • الكمية: *${it.quantity} قطعة*\n` +
          `   • السعر: *${it.appliedPrice * it.quantity} ج.م*`
      )
      .join('\n\n');

    const paymentLabel = 'الدفع عند الاستلام 💵 (معاينة وفحص كامل قبل الدفع)';
    const paymentInstructions = '🔹 سيتم الدفع نقداً لمندوب الشحن بعد معاينة وفحص الشحنة والتأكد من المقاسات والخامات.';

    return (
      `✨ *طلب جديد من متجر J&S (Junior & Senior)* ✨\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `🔢 *رقم الطلب:* #${order.orderId}\n` +
      `📅 *التاريخ:* ${order.createdAt}\n\n` +
      `👤 *بيانات العميل والشحن:*\n` +
      `• *الاسم بالكامل:* ${order.customerName}\n` +
      `• *رقم الهاتف:* ${order.phone}\n` +
      (order.secondaryPhone ? `• *رقم إضافي:* ${order.secondaryPhone}\n` : '') +
      `• *المحافظة:* ${order.governorate}\n` +
      `• *المدينة / المركز:* ${order.city}\n` +
      `• *العنوان التفصيلي:* ${order.address}\n` +
      (order.notes ? `• *ملاحظات:* ${order.notes}\n` : '') +
      `\n🛍️ *المنتجات المطلوبة:* (${order.items.reduce((s, i) => s + i.quantity, 0)} قطعة)\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `${itemsList}\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *المجموع:* ${order.subtotal} ج.م\n` +
      (order.discount > 0 ? `🎁 *الخصم:* -${(order.subtotal * order.discount) / 100} ج.م\n` : '') +
      `🚚 *مصاريف الشحن:* ${order.shipping === 0 ? 'شحن مجاني 🎉' : `${order.shipping} ج.م`}\n` +
      `💵 *المبلغ الإجمالي المطلوب:* ${order.total} ج.م\n` +
      `💳 *طريقة الدفع:* ${paymentLabel}\n\n` +
      `${paymentInstructions}\n\n` +
      `✨ *برجاء تأكيد استلام الطلب والبدء في التجهيز والشحن.*`
    );
  };

  const handleSendOrderToWhatsApp = (order: OrderDetails) => {
    const rawMsg = formatOrderMessage(order);
    const msg = encodeURIComponent(rawMsg);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(waUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      alert('يرجى ملء جميع الحقول الإلزامية لتأكيد الطلب');
      return;
    }

    setIsSubmitting(true);

    const newOrder: OrderDetails = {
      orderId: 'JS-' + Math.floor(100000 + Math.random() * 900000),
      customerName: fullName,
      phone,
      secondaryPhone,
      governorate,
      city,
      address,
      notes,
      paymentMethod: 'cod',
      items,
      subtotal,
      shipping,
      discount,
      total,
      createdAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      orderType: 'retail',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-right">
      <div className="bg-white rounded-3xl border-2 border-slate-900 w-full max-w-lg overflow-hidden shadow-2xl animate-fadeIn my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-white text-base sm:text-lg font-['Tajawal',sans-serif]">
                {completedOrder ? 'تم تسجيل الطلب بنجاح' : 'إتمام الطلب وبيانات التوصيل'}
              </h3>
              <p className="text-[11px] text-pink-300">
                {completedOrder ? 'جاهز للإرسال والمتابعة' : 'الدفع نقداً عند الاستلام بعد المعاينة'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {completedOrder ? (
            /* Order Success View */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center mx-auto text-pink-600">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                  شكراً لك، تم تسجيل طلبك #{completedOrder.orderId}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  طريقة الدفع: <strong className="text-pink-600 font-bold">الدفع عند الاستلام 💵</strong> مع فحص ومعاينة الشحنة قبل الاستلام.
                </p>
              </div>

              {/* Summary Ticket */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">الاسم:</span>
                  <span className="font-bold text-slate-900">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">العنوان:</span>
                  <span className="font-bold text-slate-900">
                    {completedOrder.governorate} - {completedOrder.city} ({completedOrder.address})
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">الهاتف:</span>
                  <span className="font-bold text-slate-900">{completedOrder.phone}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-1">
                  <span>المبلغ المطلوب:</span>
                  <span className="text-pink-600">{completedOrder.total} ج.م</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => handleSendOrderToWhatsApp(completedOrder)}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>إرسال تفاصيل الطلب كاملة لواتساب المبيعات</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-200"
                >
                  العودة للمتجر
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Form Fields */}
              <div className="space-y-3">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    الاسم بالكامل <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد محمد"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Phones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      رقم الهاتف الرئيسي (واتساب) <span className="text-pink-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="010xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none text-left dir-ltr transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      رقم هاتف إضافي (اختياري)
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none text-left dir-ltr transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Governorate & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      المحافظة <span className="text-pink-600">*</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none font-bold transition"
                    >
                      {EGYPT_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      المدينة / المنطقة <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مدينة نصر / المنصورة"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    العنوان بالتفصيل <span className="text-pink-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="الشارع، رقم العمارة، الشقة، وأقرب معلم مميز"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    ملاحظات إضافية للتوصيل (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="أي تعليمات للمندوب أو أوقات مناسبة..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 focus:border-pink-500 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition"
                  />
                </div>

                {/* Payment Method Banner (Cash on Delivery only) */}
                <div className="p-3.5 rounded-2xl bg-pink-50 border-2 border-pink-500 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">طريقة الدفع: الدفع عند الاستلام</span>
                      <span className="text-[11px] text-pink-700">معاينة وفحص كافة القطع قبل الدفع للمندوب</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-pink-600 bg-white px-2.5 py-1 rounded-lg border border-pink-200">
                    نقداً 💵
                  </span>
                </div>

              </div>

              {/* Total Order Summary */}
              <div className="bg-slate-950 text-white p-4 rounded-2xl border-2 border-slate-900 space-y-2 text-xs mt-3">
                <div className="flex justify-between text-slate-300">
                  <span>المجموع الفرعي ({items.reduce((s, i) => s + i.quantity, 0)} قطعة):</span>
                  <span className="font-bold">{subtotal} ج.م</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-pink-400">
                    <span>خصم مطبق:</span>
                    <span>-{(subtotal * discount) / 100} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>مصاريف الشحن:</span>
                  <span>{shipping === 0 ? 'شحن مجاني' : `${shipping} ج.م`}</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline text-sm sm:text-base font-black text-white">
                  <span>المبلغ الإجمالي للدفع:</span>
                  <span className="text-pink-400 text-lg font-mono">{total} ج.م</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition border-2 border-pink-700 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل الطلب...</span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تأكيد الطلب وإرساله للواتساب</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
