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
  pricingMode?: PricingMode;
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 text-right">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl border border-neutral-200 w-full max-w-lg overflow-hidden shadow-2xl animate-fadeIn max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-950 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-600 flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base font-['Tajawal',sans-serif]">
                {completedOrder ? 'تم تأكيد تسجيل الطلب' : 'إتمام الطلب وبيانات التوصيل'}
              </h3>
              <p className="text-[11px] text-blue-300">
                {completedOrder ? 'رقم الطلب #' + completedOrder.orderId : 'الدفع نقداً عند الاستلام بعد المعاينة'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {completedOrder ? (
            /* Order Success View */
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-neutral-950 font-['Tajawal',sans-serif]">
                  شكراً لك! تم تسجيل طلبك #{completedOrder.orderId}
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  طريقة الدفع: <strong className="text-blue-600 font-bold">الدفع عند الاستلام 💵</strong> مع فحص ومعاينة الشحنة قبل الاستلام.
                </p>
              </div>

              {/* Summary Ticket */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-right space-y-2 text-xs">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">الاسم:</span>
                  <span className="font-bold text-neutral-900">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">العنوان:</span>
                  <span className="font-bold text-neutral-900">
                    {completedOrder.governorate} - {completedOrder.city} ({completedOrder.address})
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">الهاتف:</span>
                  <span className="font-bold text-neutral-900">{completedOrder.phone}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-neutral-950 pt-1">
                  <span>المبلغ المطلوب:</span>
                  <span className="text-blue-600 font-sans">{completedOrder.total} ج.م</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleSendOrderToWhatsApp(completedOrder)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-blue-200" />
                  <span>إرسال تفاصيل الطلب لواتساب المبيعات</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition border border-neutral-200 cursor-pointer"
                >
                  العودة للمتجر
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Form Fields */}
              <div className="space-y-3">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-900 mb-1">
                    الاسم بالكامل <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-2.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد محمد"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl pr-9 pl-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Phones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      رقم الهاتف (واتساب) <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-2.5 w-4 h-4 text-neutral-400" />
                      <input
                        type="tel"
                        required
                        placeholder="010xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl pr-9 pl-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none text-left dir-ltr transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      رقم هاتف إضافي (اختياري)
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-2.5 w-4 h-4 text-neutral-400" />
                      <input
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl pr-9 pl-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none text-left dir-ltr transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Governorate & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      المحافظة <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none font-bold transition"
                    >
                      {EGYPT_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      المدينة / الحي <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مدينة نصر / سموحة"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-900 mb-1">
                    العنوان التفصيلي <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="اسم الشارع، رقم العمارة، رقم الشقة، علامة مميزة"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl pr-9 pl-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-neutral-900 mb-1">
                    ملاحظات للمندوب (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="أي تعليمات خاصة بموعد التوصيل أو المقاسات..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none transition"
                  />
                </div>

              </div>

              {/* Payment Method Notice */}
              <div className="p-3 rounded-2xl bg-neutral-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold block">الدفع عند الاستلام (COD)</span>
                    <span className="text-[10px] text-neutral-300">معاينة وفحص القطع قبل دفع أي مبلغ</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  متاح لجميع المحافظات
                </span>
              </div>

              {/* Order Summary Breakdown */}
              <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>المجموع ({items.reduce((s, i) => s + i.quantity, 0)} قطعة):</span>
                  <span className="font-bold text-neutral-950 font-sans">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>الشحن:</span>
                  <span className="font-bold text-emerald-600">
                    {shipping === 0 ? 'شحن مجاني 🎉' : `${shipping} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-neutral-950 pt-1.5 border-t border-neutral-200">
                  <span>المبلغ الإجمالي المطلوب:</span>
                  <span className="text-blue-600 font-sans font-black">{total} ج.م</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-neutral-950 hover:bg-black text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Check className="w-4 h-4 text-pink-400" />
                <span>{isSubmitting ? 'جاري تأكيد الطلب...' : `تأكيد الطلب الآن (${total} ج.م)`}</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
