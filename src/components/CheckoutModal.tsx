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
  Building
} from 'lucide-react';
import { CartItem, OrderDetails, PricingMode } from '../types';
import { EGYPT_GOVERNORATES } from '../data/products';

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
    }, 800);
  };

  const handleSendOrderToWhatsApp = (order: OrderDetails) => {
    let itemsText = order.items
      .map(
        (it, idx) =>
          `📌 ${idx + 1}. ${it.product.name}\n   - المقاس: ${it.selectedSize} | اللون: ${it.selectedColor}\n   - الكمية: ${it.quantity} (${it.pricingMode === 'wholesale' ? 'جملة' : 'قطاعي'})\n   - السعر: ${it.appliedPrice * it.quantity} ج.م`
      )
      .join('\n\n');

    const paymentLabel =
      order.paymentMethod === 'cod'
        ? 'الدفع عند الاستلام (معاينة قبل الدفع)'
        : order.paymentMethod === 'instapay'
        ? 'تحويل عبر إنستاباي InstaPay'
        : 'فودافون كاش / محفظة إلكترونية';

    const msg = encodeURIComponent(
      `👑 تأكيد طلب جديد من ملوك السعادة 👑\n` +
      `رقم الطلب: #${order.orderId}\n` +
      `التاريخ: ${order.createdAt}\n\n` +
      `👤 بيانات العميل:\n` +
      `- الاسم: ${order.customerName}\n` +
      `- رقم الهاتف: ${order.phone}\n` +
      (order.secondaryPhone ? `- هاتف إضافي: ${order.secondaryPhone}\n` : '') +
      `- المحافظة: ${order.governorate} - ${order.city}\n` +
      `- العنوان التفصيلي: ${order.address}\n` +
      (order.notes ? `- ملاحظات: ${order.notes}\n` : '') +
      `\n📦 المنتجات المطلوبة:\n${itemsText}\n\n` +
      `💵 الإجمالي المطلوب: ${order.total} ج.م\n` +
      `💳 طريقة الدفع: ${paymentLabel}\n\n` +
      `يرجى تأكيد التجهيز والشحن في أقرب وقت.`
    );

    window.open(`https://wa.me/201033545500?text=${msg}`, '_blank');
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
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                طلب رقم #{completedOrder.orderId}
              </span>
              <h2 className="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                شكراً لاختيارك ملوك السعادة. سيقوم فريق خدمة العملاء بالتواصل معك خلال ساعات لتأكيد الطلب وتحديد موعد الشحن.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-right space-y-3 text-xs">
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
                <span>إرسال وتأكيد الطلب عبر واتساب ملوك السعادة</span>
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

              {/* Payment Methods */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-neutral-200">
                  طريقة الدفع المفضلة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'cod'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-bold text-emerald-400">الأكثر طلباً</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold">الدفع عند الاستلام</div>
                      <div className="text-[10px] text-neutral-400">معاينة قبل الدفع</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-3 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'instapay'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold">تحويل InstaPay</div>
                      <div className="text-[10px] text-neutral-400">لحساب الشركة مباشرة</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vodafone_cash')}
                    className={`p-3 rounded-xl border text-right transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'vodafone_cash'
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold">فودافون كاش</div>
                      <div className="text-[10px] text-neutral-400">محافظ إلكترونية</div>
                    </div>
                  </button>
                </div>
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
              {isSubmitting ? (
                <span>جاري تسجيل الطلب...</span>
              ) : (
                <>
                  <Receipt className="w-5 h-5" />
                  <span>تأكيد وتسجيل الطلب الآن ({total} ج.م)</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
