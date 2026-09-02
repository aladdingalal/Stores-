import React, { useRef, useState, useEffect } from 'react';
import { 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  Truck, 
  Eye, 
  ShieldCheck, 
  Tag, 
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';

interface OffersSliderProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory?: (category: any) => void;
}

interface OfferItem {
  id: string;
  productId?: string;
  badge: string;
  badgeColor: 'pink' | 'blue' | 'amber' | 'emerald' | 'purple';
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  image: string;
  tag: string;
  isFreeShipping?: boolean;
  categoryFilter?: string;
}

export const OffersSlider: React.FC<OffersSliderProps> = ({
  products,
  onSelectProduct,
  onSelectCategory
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'senior' | 'summer' | 'jeans' | 'junior'>('all');
  const [isPaused, setIsPaused] = useState(false);

  // List of promotional offer items mapped to images and products
  const offersList: OfferItem[] = [
    {
      id: 'offer-senior-849',
      productId: 'prod-set-senior-full-shipping-0849',
      badge: '🌟 عرض Senior الكامل',
      badgeColor: 'purple',
      title: 'طقم السينيور الفاخر (شامل الشحن مجاناً)',
      subtitle: 'كولكشن السينيور الحصري قطن وسوفت فاخر',
      price: 999,
      originalPrice: 1350,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0849.jpeg',
      tag: 'موديل 0849',
      isFreeShipping: true,
      categoryFilter: 'senior'
    },
    {
      id: 'offer-set-795',
      productId: 'prod-set-js-luxury-0795',
      badge: '🔥 عرض خاص لفترة محدودة',
      badgeColor: 'pink',
      title: 'طقم كاجوال كامل فاخر براند J&S',
      subtitle: 'عرض مميز حتى نفاذ الكمية باللون المعروض',
      price: 1300,
      originalPrice: 1600,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0795.jpeg',
      tag: 'موديل 0795',
      categoryFilter: 'senior'
    },
    {
      id: 'offer-import-850',
      productId: 'prod-set-import-1st-tier-shipping-0850',
      badge: '🚚 شامل الشحن مجاناً',
      badgeColor: 'emerald',
      title: 'طقم مستورد درجة أولى (تيشيرت + بنطلون)',
      subtitle: 'متاح مقاس M و L و XL فقط مع الشحن مجاناً',
      price: 850,
      originalPrice: 1150,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0850.jpeg',
      tag: 'موديل 0850',
      isFreeShipping: true,
      categoryFilter: 'senior'
    },
    {
      id: 'offer-set-843',
      productId: 'prod-set-tshirt-jeans-0843',
      badge: '⭐ تيشيرت قطن + جينز',
      badgeColor: 'blue',
      title: 'طقم كاجوال فاخر (تيشيرت قطن + بنطلون جينز)',
      subtitle: 'خامات قطنية 100% وجينز مرن كاجوال',
      price: 950,
      originalPrice: 1250,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0843.jpeg',
      tag: 'موديل 0843',
      categoryFilter: 'senior'
    },
    {
      id: 'offer-summer-857',
      productId: 'prod-pants-jogger-soft-0857',
      badge: '☀️ عرض آخر الصيف',
      badgeColor: 'amber',
      title: 'بنطلون شروال سوفت كاجوال مريح',
      subtitle: 'خامة سوفت قطنية مريحة وخفيفة جداً',
      price: 440,
      originalPrice: 550,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0857.jpeg',
      tag: 'موديل 0857',
      categoryFilter: 'summer'
    },
    {
      id: 'offer-summer-858',
      productId: 'prod-pants-jogger-soft-0858',
      badge: '☀️ عرض آخر الصيف',
      badgeColor: 'amber',
      title: 'بنطلون شروال سوفت قطن فاخر',
      subtitle: 'تصميم شبابي أنيق بجيوب ووسط مريح',
      price: 460,
      originalPrice: 580,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0858.jpeg',
      tag: 'موديل 0858',
      categoryFilter: 'summer'
    },
    {
      id: 'offer-summer-859',
      productId: 'prod-pants-jogger-soft-0859',
      badge: '☀️ عرض آخر الصيف',
      badgeColor: 'amber',
      title: 'بنطلون شروال سوفت عصري',
      subtitle: 'أعلى درجات الراحة والمرونة اليومية',
      price: 450,
      originalPrice: 560,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0859.jpeg',
      tag: 'موديل 0859',
      categoryFilter: 'summer'
    },
    {
      id: 'offer-summer-866',
      productId: 'prod-pants-jogger-soft-0866',
      badge: '☀️ عرض آخر الصيف',
      badgeColor: 'amber',
      title: 'بنطلون شروال سوفت رياضي كاجوال',
      subtitle: 'قماش سوفت ناعم جداً ومقاوم للحرارة',
      price: 470,
      originalPrice: 590,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0866.jpeg',
      tag: 'موديل 0866',
      categoryFilter: 'summer'
    },
    {
      id: 'offer-jeans-855',
      productId: 'prod-pants-jeans-imported-0855',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز رجالي مستورد فاخر',
      subtitle: 'جينز قطن مع ليكرا مرنة ومقاسات كاملة',
      price: 850,
      originalPrice: 1050,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0855.jpeg',
      tag: 'موديل 0855',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-jeans-856',
      productId: 'prod-pants-jeans-imported-0856',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز شبابي كاجوال مستورد',
      subtitle: 'تقفيل ممتاز وتلبيس مريح لجميع الأوزان',
      price: 850,
      originalPrice: 1050,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0856.jpeg',
      tag: 'موديل 0856',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-jeans-860',
      productId: 'prod-pants-jeans-imported-0860',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز مستورد بتصميم عصري',
      subtitle: 'متانة عالية ونعومة ملمس طوال اليوم',
      price: 870,
      originalPrice: 1100,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0860.jpeg',
      tag: 'موديل 0860',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-jeans-862',
      productId: 'prod-pants-jeans-imported-0862',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز رجالي كولكشن مستورد',
      subtitle: 'شياكة وعملية للمناسبات والخروجات',
      price: 850,
      originalPrice: 1050,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0862.jpeg',
      tag: 'موديل 0862',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-jeans-863',
      productId: 'prod-pants-jeans-imported-0863',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز مستورد راقي بتفاصيل فخمة',
      subtitle: 'أعلى معايير الجودة وثبات اللون',
      price: 880,
      originalPrice: 1100,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0863.jpeg',
      tag: 'موديل 0863',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-jeans-865',
      productId: 'prod-pants-jeans-imported-0865',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز شبابي كاجوال مستورد',
      subtitle: 'قصة كاجوال مريحة وجذابة',
      price: 850,
      originalPrice: 1050,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0865.jpeg',
      tag: 'موديل 0865',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-jeans-867',
      productId: 'prod-pants-jeans-imported-0867',
      badge: '👖 جينز مستورد فاخر',
      badgeColor: 'blue',
      title: 'بنطلون جينز مستورد فاخر براند J&S',
      subtitle: 'خامات تدوم طويلاً ولون ثابت جذاب',
      price: 860,
      originalPrice: 1080,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0867.jpeg',
      tag: 'موديل 0867',
      categoryFilter: 'jeans'
    },
    {
      id: 'offer-set-848',
      productId: 'prod-set-jeans-tshirt-0848',
      badge: '🔥 عرض خاص لفترة محدودة',
      badgeColor: 'pink',
      title: 'طقم كاجوال شبابي (جينز مستورد + تيشيرت)',
      subtitle: 'جينز متين مع تيشيرت قطن 100%',
      price: 900,
      originalPrice: 1200,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0848.jpeg',
      tag: 'موديل 0848',
      categoryFilter: 'senior'
    },
    {
      id: 'offer-set-844',
      productId: 'prod-set-tshirt-jogger-0844',
      badge: '🔥 عرض خاص لفترة محدودة',
      badgeColor: 'pink',
      title: 'طقم كاجوال عصري (تيشيرت + شروال سوفت)',
      subtitle: 'راحة التيشيرت القطن والشروال السوفت',
      price: 750,
      originalPrice: 1000,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0844.jpeg',
      tag: 'موديل 0844',
      categoryFilter: 'senior'
    },
    {
      id: 'offer-set-845',
      productId: 'prod-set-soft-tshirt-0845',
      badge: '☀️ عرض صيفي كاجوال',
      badgeColor: 'amber',
      title: 'طقم صيفي كاجوال (شروال سوفت + تيشيرت)',
      subtitle: 'خامات قطنية وسوفت صيفية ممتازة',
      price: 800,
      originalPrice: 1080,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0845.jpeg',
      tag: 'موديل 0845',
      categoryFilter: 'summer'
    },
    {
      id: 'offer-junior-705',
      productId: 'prod-kids-jacket-tshirt-b0705',
      badge: '👶 كولكشن Junior للأطفال',
      badgeColor: 'pink',
      title: 'طقم جاكيت قميص وتيشيرت أطفال',
      subtitle: 'جميع المقاسات متاحة مع المعاينة قبل الدفع',
      price: 300,
      originalPrice: 450,
      image: 'https://raw.githubusercontent.com/aladdingalal/Stores-/refs/heads/main/%E2%81%A0images/IMG_0705.jpeg',
      tag: 'موديل 0705',
      categoryFilter: 'junior'
    }
  ];

  const filteredOffers = offersList.filter(item => {
    if (activeFilter === 'all') return true;
    return item.categoryFilter === activeFilter;
  });

  const checkScrollBounds = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // In RTL, scrollLeft can be negative or positive depending on browser implementation
      const currentScroll = Math.abs(scrollLeft);
      const maxScroll = scrollWidth - clientWidth - 5;
      
      setCanScrollRight(currentScroll > 5);
      setCanScrollLeft(currentScroll < maxScroll);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollBounds);
      checkScrollBounds();
      return () => el.removeEventListener('scroll', checkScrollBounds);
    }
  }, [filteredOffers]);

  // Smooth auto-scrolling ticker when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 340;
        // In RTL scroll left to move to next item
        container.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleOfferClick = (offer: OfferItem) => {
    if (offer.productId) {
      const foundProduct = products.find(p => p.id === offer.productId);
      if (foundProduct) {
        onSelectProduct(foundProduct);
        return;
      }
    }
    // Fallback if product matching by category
    if (offer.categoryFilter === 'jeans' || offer.categoryFilter === 'summer') {
      onSelectCategory?.('pants');
    } else if (offer.categoryFilter === 'senior') {
      onSelectCategory?.('sets');
    } else if (offer.categoryFilter === 'junior') {
      onSelectCategory?.('kids');
    }
  };

  const getBadgeStyle = (color: OfferItem['badgeColor']) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-600/90 text-purple-100 border-purple-400/40 shadow-purple-900/30';
      case 'emerald':
        return 'bg-emerald-600/90 text-emerald-100 border-emerald-400/40 shadow-emerald-900/30';
      case 'amber':
        return 'bg-amber-600/90 text-amber-100 border-amber-400/40 shadow-amber-900/30';
      case 'blue':
        return 'bg-blue-600/90 text-blue-100 border-blue-400/40 shadow-blue-900/30';
      case 'pink':
      default:
        return 'bg-pink-600/90 text-pink-100 border-pink-400/40 shadow-pink-900/30';
    }
  };

  return (
    <div 
      className="w-full bg-neutral-950 text-white border-y border-neutral-800 py-5 sm:py-7 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        
        {/* Header Strip & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-3.5">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-blue-600 p-0.5 shadow-lg shadow-pink-600/20 shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-pink-500 animate-pulse" />
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white font-['Tajawal',sans-serif] flex items-center gap-1.5">
                  <span>عروض خاصة لفترة محدودة</span>
                  <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
                    حتى نفاذ الكمية
                  </span>
                </h2>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                تمرير لليمين واليسار لاستعراض أقوى تخفيضات وموديلات براند J&amp;S الحصرية
              </p>
            </div>
          </div>

          {/* Quick Category Filter Pills & Left/Right Arrows */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 border ${
                  activeFilter === 'all'
                    ? 'bg-white text-neutral-950 border-white shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                الكل ({offersList.length})
              </button>
              
              <button
                onClick={() => setActiveFilter('senior')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 border ${
                  activeFilter === 'senior'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                🌟 عرض Senior
              </button>

              <button
                onClick={() => setActiveFilter('summer')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 border ${
                  activeFilter === 'summer'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                ☀️ آخر الصيف
              </button>

              <button
                onClick={() => setActiveFilter('jeans')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 border ${
                  activeFilter === 'jeans'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                👖 جينز مستورد
              </button>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-neutral-800">
              <button
                onClick={() => handleScroll('right')}
                aria-label="التمرير لليمين"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 flex items-center justify-center transition shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('left')}
                aria-label="التمرير لليسار"
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/80 flex items-center justify-center transition shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Horizontal Offers Ribbon / Slider Track */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 select-none snap-x snap-mandatory"
        >
          {filteredOffers.map((offer) => {
            const discountPercent = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
            return (
              <div
                key={offer.id}
                onClick={() => handleOfferClick(offer)}
                className="group relative flex-none w-[270px] sm:w-[310px] bg-neutral-900 hover:bg-neutral-850 rounded-3xl border border-neutral-800 hover:border-neutral-600 transition-all duration-300 shadow-xl cursor-pointer overflow-hidden flex flex-col snap-start"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-1.5 pointer-events-none">
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-xl backdrop-blur-md border shadow-lg ${getBadgeStyle(offer.badgeColor)}`}>
                      {offer.badge}
                    </span>

                    <span className="text-[11px] font-black bg-neutral-950/80 backdrop-blur-md text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded-lg shadow-sm">
                      وفر {discountPercent}%
                    </span>
                  </div>

                  {/* Model Tag Pill */}
                  <div className="absolute bottom-2.5 right-3 bg-neutral-950/85 backdrop-blur-md text-neutral-200 border border-white/10 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3 text-blue-400" />
                    <span>{offer.tag}</span>
                  </div>

                  {/* Free shipping pill if applicable */}
                  {offer.isFreeShipping && (
                    <div className="absolute bottom-2.5 left-3 bg-emerald-600/90 backdrop-blur-md text-white border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <Truck className="w-3 h-3" />
                      <span>شحن مجاني</span>
                    </div>
                  )}
                </div>

                {/* Offer Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3 text-right">
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                      {offer.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 font-normal">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Price Block & Action Button */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-black text-white font-['Tajawal',sans-serif]">
                          {offer.price}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-300">ج.م</span>
                        
                        <span className="text-[10px] text-neutral-500 line-through mr-1">
                          {offer.originalPrice} ج.م
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white font-bold text-[11px] transition shadow-sm flex items-center gap-1 cursor-pointer group-hover:shadow-pink-600/20 active:scale-95 shrink-0"
                    >
                      <span>طلب فوري</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Trust Micro-Bar */}
        <div className="pt-1 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/60 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>معاينة وفحص المنتج قبل الدفع</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-blue-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              <span>شحن وتوصيل فوري لجميع المحافظات</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-pink-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>عروض سارية حتى نفاذ الكمية المخزنة</span>
            </span>
          </div>

          <span className="text-neutral-400 font-bold">
            اسحب أو استخدم الأسهم لرؤية باقي الموديلات ({filteredOffers.length})
          </span>
        </div>

      </div>
    </div>
  );
};
