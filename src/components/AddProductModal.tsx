import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Crown, 
  Tag, 
  Layers, 
  Sparkles,
  Trash2
} from 'lucide-react';
import { Product, CategoryType, SubCategoryType } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  defaultCategory?: CategoryType;
}

export function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  defaultCategory = 'kids',
}: AddProductModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryType>(
    defaultCategory === 'all' ? 'kids' : defaultCategory
  );
  const [subCategoryName, setSubCategoryName] = useState('جاكيت / قميص أطفال');
  const [priceRetail, setPriceRetail] = useState<number | ''>(280);
  const [priceWholesale, setPriceWholesale] = useState<number | ''>(185);
  const [originalPrice, setOriginalPrice] = useState<number | ''>(380);
  const [minWholesaleQty, setMinWholesaleQty] = useState<number>(6);
  const [fabric, setFabric] = useState('كوردروي قطن مضلع فاخر + تيشيرت قطن 100%');
  const [description, setDescription] = useState(
    'قميص جاكيت كوردروي قطني مضلع عالي الجودة للأطفال، يأتي مع تيشيرت داخلي أبيض بطبعة جرافيك حصرية كود 21kids. مناسب للخروجات والمناسبات.'
  );
  const [sizesInput, setSizesInput] = useState('6 سنوات, 8 سنوات, 10 سنوات, 12 سنة, 14 سنة');
  const [colorsInput, setColorsInput] = useState('بني شوكولاتة, هافان جملي, كحلي, زيتي');
  
  // Image states
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('يرجى كتابة اسم المنتج');
      return;
    }

    const sizes = sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const colors = colorsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((cName) => {
        let hex = '#111827';
        if (cName.includes('بني')) hex = '#4A2C2A';
        if (cName.includes('هافان') || cName.includes('جملي')) hex = '#B87333';
        if (cName.includes('كحلي') || cName.includes('أزرق')) hex = '#1E293B';
        if (cName.includes('زيتي') || cName.includes('أخضر')) hex = '#2E3A2F';
        if (cName.includes('أبيض')) hex = '#FFFFFF';
        if (cName.includes('رمادي') || cName.includes('رصاصي')) hex = '#64748B';
        if (cName.includes('بيج')) hex = '#E2D9C8';
        if (cName.includes('أحمر') || cName.includes('نبيتي')) hex = '#991B1B';
        return { name: cName, hex };
      });

    const finalImage = imagePreview || imageUrl.trim() || 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80';

    const newProduct: Product = {
      id: `prod-real-${Date.now()}`,
      name: name.trim(),
      category,
      subCategory: category === 'kids' ? 'kids-sets' : 'all',
      subCategoryName: subCategoryName.trim() || 'موديل جديد',
      priceRetail: Number(priceRetail) || 250,
      priceWholesale: Number(priceWholesale) || 160,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      minWholesaleQty: Number(minWholesaleQty) || 6,
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
      colors: colors.length > 0 ? colors : [{ name: 'افتراضي', hex: '#111827' }],
      description: description.trim(),
      fabric: fabric.trim() || 'قطن مصري 100%',
      fit: 'مريح وعصري',
      season: 'خريف وشتاء 2025',
      images: [finalImage],
      customImage: finalImage,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: 100,
      isNew: true,
      isFeatured: true,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-right p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 font-['Tajawal',sans-serif]">
                إضافة منتج حقيقي جديد للكتالوج
              </h2>
              <p className="text-xs text-slate-500">
                أدخل بيانات الموديل وارفع صورته ليظهر فوراً في المتجر
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
          
          {/* 1. Category Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900 block">
              القسم الرئيسي في المتجر *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {CATEGORIES_CONFIG.filter((c) => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title} ({cat.subtitle})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Product Name & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">
                اسم الموديل / المنتج *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: قميص جاكيت كوردروي أطفال كود 21kids"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">
                التصنيف الفرعي (النوع)
              </label>
              <input
                type="text"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                placeholder="مثال: جاكيت / قميص أطفال شيك"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* 3. Image Upload / Picker */}
          <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <label className="font-bold text-slate-900 flex items-center justify-between">
              <span>صورة المنتج (رفع من الهاتف أو رابط)</span>
              {imagePreview && (
                <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  تم تحديد الصورة بنجاح ✓
                </span>
              )}
            </label>

            {/* Direct File Picker */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow-xs transition">
                <Upload className="w-4 h-4" />
                <span>اختر صورة من جهازك / الكاميرا</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-slate-400 font-bold">أو أدخل رابط صورة مباشر:</span>

              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://..."
                className="flex-1 w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
            </div>

            {/* Preview Box */}
            {(imagePreview || imageUrl) && (
              <div className="mt-2 flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                <img
                  src={imagePreview || imageUrl}
                  alt="معاينة المنتج"
                  className="w-16 h-20 object-cover rounded-lg border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-900">معاينة الصورة المرفوعة</p>
                  <p className="text-[11px] text-slate-500">ستظهر هذه الصورة في الكتالوج وكارت المنتج والسلة</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setImageUrl('');
                  }}
                  className="mr-auto text-xs text-red-600 hover:text-red-700 font-bold p-1"
                >
                  إزالة
                </button>
              </div>
            )}
          </div>

          {/* 4. Pricing (Retail, Wholesale, Original) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200">
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block text-xs">
                سعر القطاعي (ج.م) *
              </label>
              <input
                type="number"
                value={priceRetail}
                onChange={(e) => setPriceRetail(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="280"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-black text-slate-950 focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-amber-900 block text-xs flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>سعر الجملة (ج.م) *</span>
              </label>
              <input
                type="number"
                value={priceWholesale}
                onChange={(e) => setPriceWholesale(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="185"
                className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 font-black text-amber-950 focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-500 block text-xs">
                السعر قبل الخصم (اختياري)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="380"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
              />
            </div>
          </div>

          {/* 5. Sizes & Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-900 block text-xs">
                المقاسات المتاحة (مفصولة بفواصل)
              </label>
              <input
                type="text"
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                placeholder="6 سنوات, 8 سنوات, 10 سنوات, 12 سنة, 14 سنة"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-900 block text-xs">
                الألوان المتاحة (مفصولة بفواصل)
              </label>
              <input
                type="text"
                value={colorsInput}
                onChange={(e) => setColorsInput(e.target.value)}
                placeholder="بني شوكولاتة, هافان جملي, كحلي, زيتي"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs"
              />
            </div>
          </div>

          {/* 6. Fabric & Description */}
          <div className="space-y-1">
            <label className="font-bold text-slate-900 block text-xs">
              الخامة والتفاصيل
            </label>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              placeholder="كوردروي قطن مضلع فاخر + تيشيرت قطن 100%"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition text-xs"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md transition text-xs sm:text-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>إضافة الموديل فوراً للمتجر 👑</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
