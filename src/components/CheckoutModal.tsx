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
  Crown,
  CreditCard,
  Building,
  Copy,
  Check,
  Smartphone
} from 'lucide-react';
import { CartItem, OrderDetails, PricingMode } from '../types';
import { EGYPT_GOVERNORATES } from '../data/products';
import { 
  VODAFONE_CASH_NUMBER, 
  INSTAPAY_ADDRESS, 
  INSTAPAY_PHONE, 
  WHATSAPP_NUMBER 
} from '../data/contact';

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
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'instapay' | 'vodafone_cash'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const formatOrderMessage = (order: OrderDetails) => {
    const itemsList = order.items
      .map(
        (it, idx) =>
          `▪️ *(${idx + 1}) ${it.product.name}*\n` +
          `   • المقاس: *${it.selectedSize}* | اللون: *${it.selectedColor}*\n` +
          `   • الكمية: *${it.quantity} قطعة* (${it.pricingMode === 'wholesale' ? 'جملة' : 'قطاعي'})\n` +
          `   • السعر: *${it.appliedPrice * it.quantity} ج.م*`
      )
      .join('\n\n');

    let paymentLabel = '';
    let paymentInstructions = '';

    if (order.paymentMethod === 'cod') {
      paymentLabel = 'الدفع عند الاستلام 💵 (معاينة وفحص قبل الدفع)';
      paymentInstructions = '🔹 سيتم الدفع نقداً لمندوب الشحن بعد معاينة وفحص الشحنة.';
    } else if (order.paymentMethod === 'instapay') {
      paymentLabel = 'تحويل عبر تطبيق إنستاباي InstaPay ⚡';
      paymentInstructions = 
        `⚡ *بيانات تحويل إنستاباي InstaPay:*\n` +
        `• العنوان / المعرف: *${INSTAPAY_ADDRESS}*\n` +
        `• رقم الهاتف المسجل: *${INSTAPAY_PHONE}*\n` +
        `• المبلغ المطلوب: *${order.total} ج.م*\n` +
        `📸 *يرجى إرسال لقطة شاشة / صورة إيصال التحويل في هذه المحادثة لتأكيد الدفع فوراً.*`;
    } else {
      paymentLabel = 'فودافون كاش / محفظة إلكترونية 📱';
      paymentInstructions = 
        `📱 *بيانات تحويل فودافون كاش:*\n` +
        `• رقم محفظة التحويل: *${VODAFONE_CASH_NUMBER}*\n` +
        `• المبلغ المطلوب: *${order.total} ج.م*\n` +
        `📸 *يرجى إرسال لقطة شاشة / رسالة تأكيد التحويل في هذه المحادثة لتأكيد الدفع فوراً.*`;
    }

    const orderTypeLabel = order.orderType === 'wholesale' ? 'طلب جملة / مكاتب ومحلات 📦' : 'طلب قطاعي 🛍️';

    return (
      `✨ *طلب جديد من متجر J&S (Junior & Senior)* ✨\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `🏷️ *نوع الطلب:* ${orderTypeLabel}\n` +
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
      `💰 *المجموع الفرعي:* ${order.subtotal} ج.م\n` +
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
      orderId: 'MS-' + Math.floor(100000 + Math.random() * 900000),
      customerName: fullName,
      phone,
      secondaryPhone,
      governorate,
      city,
      address,
      notes,
      paymentMethod,
      orderType: pricingMode,
      items,
      subtotal,
      shipping,
      discount,
      total,
      createdAt: new Date().toLocaleString('ar-EG'),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);

      // Automatic redirect to WhatsApp with the formatted single message
      handleSendOrderToWhatsApp(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition border border-slate-200"
          id="close-checkout-modal"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-300">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                طلب رقم #{completedOrder.orderId}
              </span>
              <h2 className="text-2xl font-black text-slate-950 font-['Tajawal',sans-serif]">تم استلام طلبك بنجاح!</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                شكراً لاختيارك ملوك السعادة. تم تجهيز تفاصيل طلبك وتم فتح واتساب لإرسالها في رسالة واحدة متكاملة.
              </p>
            </div>

            {/* If Vodafone Cash or InstaPay was selected, show payment details banner */}
            {completedOrder.paymentMethod === 'vodafone_cash' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-right space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-xs">
                    <Smartphone className="w-4 h-4" />
                    <span>عنوان التحويل (فودافون كاش):</span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded font-mono">
                    المبلغ: {completedOrder.total} ج.م
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-200 shadow-2xs">
                  <span className="font-mono text-base font-bold text-slate-900 tracking-wider dir-ltr">
                    {VODAFONE_CASH_NUMBER}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(VODAFONE_CASH_NUMBER, 'success-voda')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {copiedKey === 'success-voda' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الرقم</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  📌 قم بالتحويل للرقم أعلاه ثم اضغط على الزر أدناه لإرسال لقطة شاشة التحويل عبر الواتساب لتأكيد الشحن فوراً.
                </p>
              </div>
            )}

            {completedOrder.paymentMethod === 'instapay' && (
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-right space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-800 font-bold text-xs">
                    <CreditCard className="w-4 h-4" />
                    <span>عنوان التحويل (InstaPay):</span>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded font-mono">
                    المبلغ: {completedOrder.total} ج.م
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-200 shadow-2xs">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">معرف إنستاباي (IPA):</span>
                      <span className="font-mono text-sm font-bold text-slate-900 dir-ltr">
                        {INSTAPAY_ADDRESS}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(INSTAPAY_ADDRESS, 'success-insta-addr')}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      {copiedKey === 'success-insta-addr' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ العنوان</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-200 shadow-2xs">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">أو رقم الهاتف المسجل:</span>
                      <span className="font-mono text-sm font-bold text-slate-900 dir-ltr">
                        {INSTAPAY_PHONE}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(INSTAPAY_PHONE, 'success-insta-phone')}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-purple-900 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200"
                    >
                      {copiedKey === 'success-insta-phone' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  ⚡ افتح تطبيق إنستاباي وحول المبلغ، ثم أرسل إشعار التحويل في محادثة الواتساب.
                </p>
              </div>
            )}

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
                <span>المبلغ المستحق:</span>
                <span className="text-amber-800">{completedOrder.total} ج.م</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleSendOrderToWhatsApp(completedOrder)}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>إرسال تفاصيل الطلب كاملة لواتساب المبيعات</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-200"
              >
                العودة للمتجر
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-700">
                <Truck className="w-5 h-5" />
                <h2 className="text-xl font-black text-slate-950 font-['Tajawal',sans-serif]">إتمام الطلب وبيانات التوصيل</h2>
              </div>
              <p className="text-xs text-slate-500">
                يرجى إدخال بياناتك بدقة وسيتم إرسالها تلقائياً لواتساب المبيعات في رسالة موحدة
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  الاسم بالكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمد عبد الله"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Phones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    رقم الهاتف الرئيسي (واتساب) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="010xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white text-left dir-ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    رقم هاتف إضافي (اختياري)
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      value={secondaryPhone}
                      onChange={(e) => setSecondaryPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white text-left dir-ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Governorate & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    المحافظة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  >
                    {EGYPT_GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    المدينة / المركز / المنطقة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مدينة نصر / المنصورة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  العنوان بالتفصيل (اسم الشارع، رقم العمارة والشقة) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: شارع الجمهورية، عمارة 15، الدور الثالث"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ملاحظات إضافية للتوصيل (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="أي تفاصيل خاصة بوقت التسليم أو مقاسات خاصة..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  اختر طريقة الدفع المناسبة:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/40 text-slate-950'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold">الدفع عند الاستلام</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      معاينة وفحص الشحنة قبل الدفع
                    </span>
                  </label>

                  {/* Vodafone Cash */}
                  <label
                    onClick={() => setPaymentMethod('vodafone_cash')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      paymentMethod === 'vodafone_cash'
                        ? 'bg-red-50 border-red-500 ring-2 ring-red-400/40 text-slate-950'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold">فودافون كاش</span>
                      <Smartphone className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      تحويل عبر المحفظة الإلكترونية
                    </span>
                  </label>

                  {/* InstaPay */}
                  <label
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      paymentMethod === 'instapay'
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400/40 text-slate-950'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold">إنستاباي InstaPay</span>
                      <CreditCard className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      تحويل لحظي مباشر بالمعرف
                    </span>
                  </label>
                </div>

                {/* Instant preview of chosen payment credentials */}
                {paymentMethod === 'vodafone_cash' && (
                  <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-xs space-y-1 mt-2">
                    <span className="font-bold text-red-800 block">رقم تحويل فودافون كاش:</span>
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-red-200">
                      <span className="font-mono font-bold text-slate-900 dir-ltr">{VODAFONE_CASH_NUMBER}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(VODAFONE_CASH_NUMBER, 'form-voda')}
                        className="text-[11px] text-red-700 hover:underline font-bold"
                      >
                        {copiedKey === 'form-voda' ? 'تم النسخ ✓' : 'نسخ الرقم'}
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'instapay' && (
                  <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-xs space-y-1 mt-2">
                    <span className="font-bold text-purple-900 block">معرف إنستاباي (IPA):</span>
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-purple-200">
                      <span className="font-mono font-bold text-slate-900 dir-ltr">{INSTAPAY_ADDRESS}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(INSTAPAY_ADDRESS, 'form-insta')}
                        className="text-[11px] text-purple-800 hover:underline font-bold"
                      >
                        {copiedKey === 'form-insta' ? 'تم النسخ ✓' : 'نسخ المعرف'}
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Total Price & Submit Button */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">المبلغ الإجمالي المطلوب دفعه:</span>
                <span className="text-xl font-black text-slate-950 font-['Tajawal',sans-serif]">
                  {total} <span className="text-xs font-bold text-slate-600">ج.م</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-order-btn"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-5 h-5 text-slate-950" />
                <span>
                  {isSubmitting ? 'جاري تسجيل الطلب...' : 'تأكيد الطلب والإرسال للواتساب تلقائياً'}
                </span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span>🔒 بياناتك محمية ومشفرة</span>
                <span>•</span>
                <span>👑 ضمان جودة ملوك السعادة</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
