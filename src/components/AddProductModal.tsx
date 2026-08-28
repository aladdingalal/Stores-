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
import { Product, CategoryType } from '../types';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-right p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-600 text-white flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-950 font-['Tajawal',sans-serif]">
                إضافة منتج جديد للكتالوج
              </h2>
              <p className="text-xs text-neutral-500">
                أدخل بيانات الموديل وارفع صورته ليظهر فوراً في المتجر
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs sm:text-sm">
          
          {/* 1. Category Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-neutral-900 block">
              القسم الرئيسي في المتجر *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
              <label className="font-bold text-neutral-900 block">
                اسم الموديل / المنتج *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: قميص جاكيت كوردروي أطفال كود 21kids"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-neutral-900 block">
                التصنيف الفرعي (النوع)
              </label>
              <input
                type="text"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                placeholder="مثال: جاكيت / قميص أطفال شيك"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 3. Image Upload / Picker */}
          <div className="space-y-2 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
            <label className="font-bold text-neutral-900 flex items-center justify-between">
              <span>صورة المنتج (رفع من الهاتف أو رابط)</span>
              {imagePreview && (
                <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  تم تحديد الصورة بنجاح ✓
                </span>
              )}
            </label>

            {/* Direct File Picker */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold cursor-pointer shadow-xs transition text-xs">
                <Upload className="w-4 h-4 text-pink-400" />
                <span>اختر صورة من جهازك / الكاميرا</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-neutral-400 font-bold">أو أدخل رابط صورة مباشر:</span>

              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://..."
                className="flex-1 w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Preview Box */}
            {(imagePreview || imageUrl) && (
              <div className="mt-2 flex items-center gap-3 bg-white p-2 rounded-xl border border-neutral-200">
                <img
                  src={imagePreview || imageUrl}
                  alt="معاينة المنتج"
                  className="w-12 h-14 object-cover rounded-lg border border-neutral-200"
                />
                <div className="text-xs">
                  <span className="text-emerald-600 font-bold block">معاينة الصورة المحددة</span>
                  <span className="text-neutral-500 text-[10px]">جاهزة للنشر مع المنتج</span>
                </div>
              </div>
            )}
          </div>

          {/* 4. Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-900 block">
                السعر (ج.م) *
              </label>
              <input
                type="number"
                value={priceRetail}
                onChange={(e) => setPriceRetail(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-neutral-900 block">
                سعر الجملة الاسترشادي (ج.م)
              </label>
              <input
                type="number"
                value={priceWholesale}
                onChange={(e) => setPriceWholesale(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-neutral-900 block">
                السعر الأصلي قبل الخصم (اختياري)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder="مثال: 380"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 5. Fabric & Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-900 block">
                الخامة ونوع القماش
              </label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="مثال: قطن مصري 100%"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-neutral-900 block">
                المقاسات المتاحة (مفصولة بفواصل)
              </label>
              <input
                type="text"
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                placeholder="6 سنوات, 8 سنوات, 10 سنوات"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 6. Colors Input */}
          <div className="space-y-1.5">
            <label className="font-bold text-neutral-900 block">
              الألوان المتاحة (مفصولة بفواصل)
            </label>
            <input
              type="text"
              value={colorsInput}
              onChange={(e) => setColorsInput(e.target.value)}
              placeholder="بني, هافان جملي, كحلي, زيتي"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 7. Description */}
          <div className="space-y-1.5">
            <label className="font-bold text-neutral-900 block">
              وصف الموديل ومميزاته
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-bold rounded-full transition flex items-center justify-center gap-2 shadow-md cursor-pointer text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4 text-pink-400" />
              <span>إضافة المنتج ونشره في المتجر فوراً</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
