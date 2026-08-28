import React, { useState } from 'react';
import { 
  Crown, 
  Package, 
  Truck, 
  MessageCircle, 
  Percent, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ArrowLeft 
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
        ? 'رجالي مودرن وأطفال كاجوال'
        : requestedCategory === 'men'
        ? 'رجالي مودرن فقط'
        : 'أطفال كاجوال من سن 5 سنوات';

    const msg = encodeURIComponent(
      `👑 *استفسار طلب جملة جديد - براند J&S (Junior & Senior)* 👑\n\n` +
      `👤 *التاجر / المحل:* ${merchantName}\n` +
      `📞 *رقم الهاتف:* ${merchantPhone}\n` +
      `📍 *الموقع / المحافظة:* ${storeLocation || 'غير محدد'}\n` +
      `👕 *القسم المطلوب:* ${catText}\n` +
      `📦 *الكمية التقريبية:* ${estimatedQuantity}\n\n` +
      `أرغب في الحصول على قائمة أسعار الجملة الكاملة وتشكيلة الموسم الجديد.`
    );

    setSubmitted(true);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-14 bg-gradient-to-b from-amber-50/50 via-white to-slate-50 border-t border-b border-slate-200 text-right relative overflow-hidden" id="wholesale-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-white border border-amber-300 px-3 py-1 rounded-full text-amber-900 text-xs font-bold shadow-xs">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>خدمة خاصة لتجار الجملة والمحلات والموزعين</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-['Tajawal',sans-serif]">
            انضم لشركاء نجاح <span className="text-amber-700">براند J&amp;S (Junior &amp; Senior)</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            نوفر لكم أسعار المصنع التنافسية، تشكيلات أسبوعية متجددة، وأعلى خامات قطنية مضمونة للرجالي المودرن والأطفال من سن 5 سنوات.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">أسعار مصنع منافسة</h3>
            <p className="text-xs text-slate-600">
              هوامش ربح ممتازة تضمن لك منافسة قوية في السوق وسرعة تصريف للبضاعة.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">تشكيل كراتين ودست</h3>
            <p className="text-xs text-slate-600">
              إمكانية تشكيل المقاسات والألوان في الدستة لتلبية احتياجات زبائن محلك.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">شحن سريع مع المعاينة</h3>
            <p className="text-xs text-slate-600">
              توصيل لجميع المحافظات خلال 24 - 48 ساعة مع إمكانية فتح ومعاينة البضاعة.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-amber-400 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950">ضمان الجودة والاستبدال</h3>
            <p className="text-xs text-slate-600">
              ضمان خامات قطنية 100% مع إمكانية استبدال عيوب الصناعة فوراً.
            </p>
          </div>

        </div>

        {/* Wholesale Fast Inquiry Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto shadow-md">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950">طلب عروض أسعار الجملة للتاجر</h3>
              <p className="text-xs text-slate-500">
                سجل بياناتك وسيتم إرسال كتالوج الجملة وقوائم الأسعار عبر الواتساب فوراً
              </p>
            </div>
          </div>

          <form onSubmit={handleWholesaleInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  اسم التاجر / المحل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محل الأناقة / أحمد حسني"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  رقم الهاتف (واتساب) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010xxxxxxxx"
                  value={merchantPhone}
                  onChange={(e) => setMerchantPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white text-left dir-ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  المحافظة والمدينة
                </label>
                <input
                  type="text"
                  placeholder="مثال: القاهرة - العتبة / المنصورة"
                  value={storeLocation}
                  onChange={(e) => setStoreLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  الكمية التقديرية المطلوبة
                </label>
                <select
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  <option value="تجربة (3 دستة - 36 قطعة)">تجربة (3 دستة - 36 قطعة)</option>
                  <option value="10 دست (120 قطعة)">10 دست (120 قطعة)</option>
                  <option value="25 دستة (300 قطعة)">25 دستة (300 قطعة)</option>
                  <option value="50 دستة فما فوق (طلب مكاتب)">50 دستة فما فوق (طلب مكاتب)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              id="wholesale-submit-btn"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>إرسال استفسار الجملة إلى واتساب الإدارة</span>
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
