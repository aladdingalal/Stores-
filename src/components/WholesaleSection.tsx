import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MessageCircle, 
  Percent, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/contact';

export const WholesaleSection: React.FC = () => {
  const [merchantName, setMerchantName] = useState('');
  const [merchantPhone, setMerchantPhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [requestedCategory, setRequestedCategory] = useState<'both' | 'men' | 'kids'>('both');
  const [estimatedQuantity, setEstimatedQuantity] = useState('10 دست (120 قطعة)');
  const [submitted, setSubmitted] = useState(false);

  const handleWholesaleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantName || !merchantPhone) {
      alert('يرجى كتابة الاسم ورقم الهاتف للتواصل');
      return;
    }

    const catText =
      requestedCategory === 'both'
        ? 'شبابي وأطفال'
        : requestedCategory === 'men'
        ? 'شبابي فقط'
        : 'أطفال كاجوال';

    const msg = encodeURIComponent(
      `✨ *استفسار كميات وتجار - براند J&S (Junior & Senior)* ✨\n\n` +
      `👤 *الاسم / المحل:* ${merchantName}\n` +
      `📞 *رقم الهاتف:* ${merchantPhone}\n` +
      `📍 *المحافظة:* ${storeLocation || 'غير محدد'}\n` +
      `👕 *القسم:* ${catText}\n` +
      `📦 *الكمية:* ${estimatedQuantity}\n\n` +
      `أرغب في الحصول على تفاصيل الكميات المتاحة والتوريد.`
    );

    setSubmitted(true);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-14 bg-white border-b-2 border-slate-900 text-right relative overflow-hidden" id="wholesale-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-slate-950 text-white border-2 border-pink-500 px-4 py-1 rounded-full text-xs font-black shadow-xs">
            <Package className="w-4 h-4 text-pink-400" />
            <span>توريد كميات ومحلات ومكاتب تجارية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-['Tajawal',sans-serif]">
            توريد مباشر من مصانع <span className="text-pink-600">J&amp;S (Junior &amp; Senior)</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            نوفر كميات وتشكيلات مميزة للمحلات والموزعين مع سرعة شحن ومعاينة كاملة للبضاعة قبل الاستلام
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Features Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-900 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-950 text-sm">أفضل قيمة للكميات</h3>
                <p className="text-xs text-slate-600">خصومات خاصة للطلبيات الكبيرة والمحلات.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-900 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-pink-400 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-950 text-sm">شحن لكافة المحافظات</h3>
                <p className="text-xs text-slate-600">شحن آمن مع المعاينة قبل الدفع للمندوب.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-900 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-950 text-sm">ضمان جودة الخامات</h3>
                <p className="text-xs text-slate-600">أقمشة قطنية 100% وتقفيل متين بمواصفات قياسية.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-900 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-pink-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-950 text-sm">تنوع المقاسات والموديلات</h3>
                <p className="text-xs text-slate-600">سيري كامل بجميع المقاسات والألوان المطلوبة.</p>
              </div>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 rounded-3xl border-2 border-slate-900 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-pink-600 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-black text-white font-['Tajawal',sans-serif]">طلب استفسار وتوريد</h3>
                <p className="text-[11px] text-pink-300">أرسل بياناتك وسيتم التواصل معك مباشرة عبر الواتساب</p>
              </div>
            </div>

            <form onSubmit={handleWholesaleInquiry} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">الاسم أو اسم المحل <span className="text-pink-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="مثال: متجر الأناقة"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-pink-500 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">رقم الهاتف (واتساب) <span className="text-pink-400">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="010xxxxxxxx"
                  value={merchantPhone}
                  onChange={(e) => setMerchantPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-pink-500 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">المحافظة</label>
                <input
                  type="text"
                  placeholder="مثال: القاهرة / الإسكندرية"
                  value={storeLocation}
                  onChange={(e) => setStoreLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-pink-500 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الكمية التقديرية</label>
                <input
                  type="text"
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-pink-500 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition border border-pink-400 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الاستفسار عبر واتساب</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
