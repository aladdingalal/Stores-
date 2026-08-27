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
      `👑 استفسار طلب جملة جديد - ملوك السعادة 👑\n\n` +
      `👤 التاجر / المحل: ${merchantName}\n` +
      `📞 رقم الهاتف: ${merchantPhone}\n` +
      `📍 الموقع / المحافظة: ${storeLocation || 'غير محدد'}\n` +
      `👕 القسم المطلوب: ${catText}\n` +
      `📦 الكمية التقريبية: ${estimatedQuantity}\n\n` +
      `أرغب في الحصول على قائمة أسعار الجملة الكاملة وتشكيلة الموسم الجديد.`
    );

    setSubmitted(true);
    window.open(`https://wa.me/201033545500?text=${msg}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-t border-b border-neutral-800 text-right relative overflow-hidden" id="wholesale-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-bold">
            <Crown className="w-4 h-4" />
            <span>خدمة خاصة لتجار الجملة والمحلات والموزعين</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-['Tajawal',sans-serif]">
            انضم لشركاء نجاح <span className="text-amber-400">براند ملوك السعاده</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300">
            نوفر لكم أسعار المصنع التنافسية، تشكيلات أسبوعية متجددة، وأعلى خامات قطنية مضمونة للرجالي المودرن والأطفال من سن 5 سنوات.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 space-y-2 hover:border-amber-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">أسعار مصنع منافسة</h3>
            <p className="text-xs text-neutral-400">
              هوامش ربح ممتازة تضمن لك منافسة قوية في السوق وسرعة تصريف للبضاعة.
            </p>
          </div>

          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 space-y-2 hover:border-amber-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">تشكيل كراتين حسب طلبك</h3>
            <p className="text-xs text-neutral-400">
              إمكانية تشكيل المقاسات والألوان في الدستة لتلبية احتياجات زبائن محلك.
            </p>
          </div>

          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 space-y-2 hover:border-amber-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">شحن سريع مع المعاينة</h3>
            <p className="text-xs text-neutral-400">
              توصيل لجميع المحافظات خلال 24 - 48 ساعة مع إمكانية فتح ومعاينة البضاعة.
            </p>
          </div>

          <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 space-y-2 hover:border-amber-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">ضمان الجودة والاستبدال</h3>
            <p className="text-xs text-neutral-400">
              ضمان خامات قطنية 100% مع إمكانية استبدال عيوب الصناعة فوراً.
            </p>
          </div>

        </div>

        {/* Wholesale Fast Inquiry Form */}
        <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">طلب عروض أسعار الجملة للتاجر</h3>
              <p className="text-xs text-neutral-400">
                سجل بياناتك وسيتم إرسال كتالوج الجملة وقوائم الأسعار عبر الواتساب فوراً
              </p>
            </div>
          </div>

          <form onSubmit={handleWholesaleInquiry} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  اسم التاجر / المحل <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محل الأناقة / أحمد حسني"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  رقم الواتساب / الهاتف <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010xxxxxxxx"
                  value={merchantPhone}
                  onChange={(e) => setMerchantPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  المحافظة / المدينة
                </label>
                <input
                  type="text"
                  placeholder="مثال: القاهرة - العتبة / طنطا / الإسكندرية..."
                  value={storeLocation}
                  onChange={(e) => setStoreLocation(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-1.5">
                  الكمية التقديرية للطلب
                </label>
                <select
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="باقة تجريبية (3 إلى 5 دست)">باقة تجريبية (3 إلى 5 دست)</option>
                  <option value="10 دست (120 قطعة)">10 دست (120 قطعة)</option>
                  <option value="25 دستة (300 قطعة)">25 دستة (300 قطعة)</option>
                  <option value="50 دستة فأكثر (كميات كبرى)">50 دستة فأكثر (كميات كبرى)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-200">
                القسم المطلوب:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRequestedCategory('both')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    requestedCategory === 'both'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  رجالي + أطفال (الكل)
                </button>
                <button
                  type="button"
                  onClick={() => setRequestedCategory('men')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    requestedCategory === 'men'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  رجالي مودرن فقط
                </button>
                <button
                  type="button"
                  onClick={() => setRequestedCategory('kids')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    requestedCategory === 'kids'
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  أطفال كاجوال (+5 سنوات)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-xs hover:brightness-110 transition shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال طلب عروض أسعار الجملة عبر واتساب مباشرة</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
