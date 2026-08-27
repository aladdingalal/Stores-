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
      `👑 *طلب جديد من متجر ملوك السعادة* 👑\n` +
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

      // Automatic redirect/open WhatsApp with the complete single order message
      handleSendOrderToWhatsApp(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-neutral-800 text-neutral-300 hover:text-white transition"
          id="close-checkout-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                طلب رقم #{completedOrder.orderId}
              </span>
              <h2 className="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                شكراً لاختيارك ملوك السعادة. تم تحويل تفاصيل طلبك مباشرة إلى واتساب المبيعات.
              </p>
            </div>

            {/* If Vodafone Cash or InstaPay was selected, show payment details banner */}
            {completedOrder.paymentMethod === 'vodafone_cash' && (
              <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 text-right space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                    <Smartphone className="w-4 h-4" />
                    <span>عنوان التحويل (فودافون كاش):</span>
                  </div>
                  <span className="text-[11px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                    المبلغ: {completedOrder.total} ج.م
                  </span>
                </div>

                <div className="flex items-center justify-between bg-neutral-950 p-2.5 rounded-xl border border-red-900/50">
                  <span className="font-mono text-sm font-bold text-white tracking-wider dir-ltr">
                    {VODAFONE_CASH_NUMBER}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(VODAFONE_CASH_NUMBER, 'success-voda')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-1.5"
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

                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  📌 قم بالتحويل للرقم أعلاه ثم اضغط على الزر أدناه لإرسال لقطة شاشة أو صورة التحويل عبر الواتساب لتأكيد الشحن فوراً.
                </p>
              </div>
            )}

            {completedOrder.paymentMethod === 'instapay' && (
              <div className="bg-purple-950/40 border border-purple-500/40 rounded-2xl p-4 text-right space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <CreditCard className="w-4 h-4" />
                    <span>عنوان التحويل (InstaPay):</span>
                  </div>
                  <span className="text-[11px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                    المبلغ: {completedOrder.total} ج.م
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-neutral-950 p-2.5 rounded-xl border border-purple-900/50">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block">معرف إنستاباي (IPA):</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-white dir-ltr">
                        {INSTAPAY_ADDRESS}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(INSTAPAY_ADDRESS, 'success-insta-addr')}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5"
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

                  <div className="flex items-center justify-between bg-neutral-950 p-2.5 rounded-xl border border-purple-900/50">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block">أو رقم الهاتف المسجل:</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-white dir-ltr">
                        {INSTAPAY_PHONE}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(INSTAPAY_PHONE, 'success-insta-phone')}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-purple-300 text-xs font-bold transition flex items-center gap-1.5"
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

                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  ⚡ افتح تطبيق إنستاباي وحول المبلغ، ثم أرسل إشعار التحويل في محادثة الواتساب.
                </p>
              </div>
            )}

            {/* Summary Ticket */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-right space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">الاسم:</span>
                <span className="font-bold text-white">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">العنوان:</span>
                <span className="font-bold text-white">
                  {completedOrder.governorate} - {completedOrder.city} ({completedOrder.address})
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">الهاتف:</span>
                <span className="font-bold text-white">{completedOrder.phone}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-amber-400 pt-1">
                <span>المبلغ المستحق:</span>
                <span>{completedOrder.total} ج.م</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => handleSendOrderToWhatsApp(completedOrder)}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {completedOrder.paymentMethod === 'cod'
                    ? 'إرسال ومتابعة الطلب عبر واتساب'
                    : 'إرسال إشعار الدفع والطلب عبر واتساب'}
                </span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs transition"
              >
                العودة للتسوق
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400">
                <Truck className="w-5 h-5" />
                <h2 className="text-xl font-black text-white">إتمام الطلب وبيانات التوصيل</h2>
              </div>
              <p className="text-xs text-neutral-400">
                يرجى إدخال بياناتك بدقة لنتمكن من توصيل شحنتك في أسرع وقت
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  الاسم بالكامل <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمد عبد الله"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Phones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                    رقم الهاتف الرئيسي <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type="tel"
                      required
                      placeholder="010xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                    رقم هاتف إضافي (اختياري)
                  </label>
                  <input
                    type="tel"
                    placeholder="011/012/015..."
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                  />
                </div>
              </div>

              {/* Governorate & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                    المحافظة <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {EGYPT_GOVERNORATES.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                    المدينة / المركز / المنطقة <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مدينة نصر، المعادي، سموحة..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Detailed Address */}
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  العنوان بالتفصيل (اسم الشارع، رقم العمارة، الشقة، علامة مميزة) <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-4 h-4 text-neutral-500" />
                  <textarea
                    required
                    rows={2}
                    placeholder="مثال: ش التحرير، عمارة 12، بجوار صيدلية..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  ملاحظات للطلب أو موعد الاستلام (اختياري)
                </label>
                <input
                  type="text"
                  placeholder="مثال: الاتصال قبل الوصول بنصف ساعة..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-bold text-neutral-200">
                  طريقة الدفع المفضلة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'cod'
                        ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-bold text-emerald-400">الأكثر طلباً</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold">الدفع عند الاستلام</div>
                      <div className="text-[10px] text-neutral-400">معاينة وفحص قبل الدفع</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vodafone_cash')}
                    className={`p-3 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'vodafone_cash'
                        ? 'border-red-500 bg-red-500/10 text-white ring-1 ring-red-500/50'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Smartphone className="w-4 h-4 text-red-400" />
                      <span className="text-[10px] font-bold text-red-400">محفظة كاش</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold">فودافون كاش</div>
                      <div className="text-[10px] text-neutral-400">تحويل مباشر للرقم</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-3 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'instapay'
                        ? 'border-purple-500 bg-purple-500/10 text-white ring-1 ring-purple-500/50'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span className="text-[10px] font-bold text-purple-400">InstaPay</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold">تحويل InstaPay</div>
                      <div className="text-[10px] text-neutral-400">تحويل فوري لحظي</div>
                    </div>
                  </button>
                </div>

                {/* Interactive Payment Details Box during form filling */}
                {paymentMethod === 'vodafone_cash' && (
                  <div className="bg-red-950/30 border border-red-500/40 rounded-2xl p-3.5 space-y-2 text-right animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-red-400" />
                        <span>رقم محفظة فودافون كاش للتحويل:</span>
                      </span>
                      <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-mono">
                        01033545500
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-neutral-950 px-3 py-2 rounded-xl border border-red-900/50">
                      <span className="font-mono text-sm font-bold text-white dir-ltr">
                        {VODAFONE_CASH_NUMBER}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(VODAFONE_CASH_NUMBER, 'form-voda')}
                        className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-1"
                      >
                        {copiedKey === 'form-voda' ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>نسخ الرقم</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      💡 فور الضغط على تأكيد الطلب، سيتم نقلك إلى الواتساب مع كامل بيانات الطلب لإرسال صورة إيصال التحويل وتأكيد الشحن مباشرة.
                    </p>
                  </div>
                )}

                {paymentMethod === 'instapay' && (
                  <div className="bg-purple-950/30 border border-purple-500/40 rounded-2xl p-3.5 space-y-2 text-right animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                        <span>عنوان التحويل عبر تطبيق إنستاباي InstaPay:</span>
                      </span>
                      <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                        تحويل لحظي
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-neutral-950 px-3 py-2 rounded-xl border border-purple-900/50">
                        <div>
                          <span className="text-[10px] text-neutral-400 block">عنوان الدفع (IPA):</span>
                          <span className="font-mono text-xs font-bold text-white dir-ltr">
                            {INSTAPAY_ADDRESS}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(INSTAPAY_ADDRESS, 'form-insta-addr')}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1"
                        >
                          {copiedKey === 'form-insta-addr' ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>تم</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
                        <span className="text-[11px] text-neutral-300">أو برقم الهاتف المسجل: <strong className="font-mono text-white dir-ltr">{INSTAPAY_PHONE}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy(INSTAPAY_PHONE, 'form-insta-phone')}
                          className="text-[11px] text-purple-400 hover:underline font-bold"
                        >
                          {copiedKey === 'form-insta-phone' ? 'تم النسخ ✓' : 'نسخ الرقم'}
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      💡 بعد إتمام التحويل من تطبيق إنستاباي، سيتم إرسال إشعار الدفع مباشرة لمحادثة الواتساب.
                    </p>
                  </div>
                )}

              </div>

              {/* Order Total Summary */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>عدد القطع:</span>
                  <span className="font-bold text-white">{items.reduce((s, i) => s + i.quantity, 0)} قطعة</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal} ج.م</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>الخصم المطبق:</span>
                    <span>-{(subtotal * discount) / 100} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>الشحن إلى {governorate}:</span>
                  <span>{shipping === 0 ? 'مجاني 🎉' : `${shipping} ج.م`}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-neutral-800">
                  <span>الإجمالي للدفع:</span>
                  <span className="text-lg font-['Tajawal',sans-serif]">{total} ج.م</span>
                </div>
              </div>

            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="submit-order-btn"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-sm hover:brightness-110 transition shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                {isSubmitting
                  ? 'جاري تجهيز الطلب...'
                  : paymentMethod === 'cod'
                  ? `تأكيد الطلب والدفع عند الاستلام (${total} ج.م)`
                  : `تأكيد الطلب والتحويل للواتساب لاستكمال الدفع (${total} ج.م)`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>معاينة وفحص المنتج قبل الاستلام | ضمان استبدال واسترجاع 14 يوم</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
