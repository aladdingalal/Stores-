import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Trash2, 
  Check, 
  Image as ImageIcon, 
  RefreshCw, 
  Crown, 
  Sparkles, 
  Layers,
  Save,
  Download,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductImage: (productId: string, newImageUrl: string) => void;
  onResetAllImages: () => void;
  onCustomLogoUpload?: (logoUrl: string) => void;
  targetProduct?: Product | null;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductImage,
  onResetAllImages,
  onCustomLogoUpload,
  targetProduct,
}) => {
  if (!isOpen) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    targetProduct?.id || products[0]?.id || ''
  );
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'men' | 'kids'>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const filteredProducts = products.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
      setImageUrlInput(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyToProduct = () => {
    if (!selectedProductId || !imageUrlInput) return;
    onUpdateProductImage(selectedProductId, imageUrlInput);
    setSuccessToast(`تم تحديث صورة "${selectedProduct?.name}" بنجاح!`);
    setImageUrlInput('');
    setPreviewUrl(null);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleRemoveCustomImage = (productId: string) => {
    onUpdateProductImage(productId, '');
    setSuccessToast('تمت استعادة الصورة الافتراضية');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleCustomLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onCustomLogoUpload) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onCustomLogoUpload(dataUrl);
      setSuccessToast('تم تحديث شعار المتجر بنجاح!');
      setTimeout(() => setSuccessToast(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn text-right">
      <div 
        className="relative bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Camera className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                لوحة تحديث وتغيير صور المنتجات
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              يمكنك بسهولة رفع صور ملابسك الحقيقية أو إدخال روابط الصور لتظهر فوراً في المتجر
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-800 text-neutral-300 hover:text-white transition"
            id="close-image-manager-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification */}
        {successToast && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Upload Box & Image Preview */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>1. رفع صورة من جهازك / هاتفك</span>
              </h3>

              <label className="border-2 border-dashed border-neutral-700 hover:border-amber-500/80 bg-neutral-900/50 hover:bg-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-neutral-200">
                  اضغط هنا لاختيار صورة من الملفات
                </div>
                <div className="text-[10px] text-neutral-400">
                  يدعم JPG, PNG, WEBP (حجم مثالي للملابس)
                </div>
              </label>

              <div className="text-center text-xs text-neutral-400 py-0.5">أو</div>

              {/* Paste URL */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-300 block">
                  أو الصق رابط الصورة المباشر:
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                />
              </div>

              {/* Preview */}
              {(previewUrl || selectedProduct?.customImage) && (
                <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                  <span className="text-[11px] font-bold text-amber-400">معاينة الصورة:</span>
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                    <img
                      src={previewUrl || selectedProduct?.customImage}
                      alt="معاينة"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Apply Button */}
              <button
                onClick={handleApplyToProduct}
                disabled={!imageUrlInput && !previewUrl}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-xs hover:brightness-110 transition disabled:opacity-40 shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>حفظ وتطبيق الصورة للموديل المختار</span>
              </button>
            </div>

            {/* Custom Logo Upload Option */}
            {onCustomLogoUpload && (
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>تحديث لوجو المتجر (اختياري)</span>
                </h4>
                <label className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomLogoFile}
                    className="hidden"
                  />
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>رفع ملف لوجو بديل</span>
                </label>
              </div>
            )}

          </div>

          {/* Right Column: Products Picker */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white">
                2. اختر الموديل المراد تغيير صورته:
              </h3>

              {/* Category Filter */}
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    categoryFilter === 'all' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setCategoryFilter('men')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    categoryFilter === 'men' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400'
                  }`}
                >
                  رجالي
                </button>
                <button
                  onClick={() => setCategoryFilter('kids')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    categoryFilter === 'kids' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400'
                  }`}
                >
                  أطفال
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
              {filteredProducts.map((prod) => {
                const isSelected = selectedProductId === prod.id;
                const hasCustom = Boolean(prod.customImage);

                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      if (prod.customImage) setPreviewUrl(prod.customImage);
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                        : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                      <img
                        src={prod.customImage || prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                      {hasCustom && (
                        <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-neutral-950" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-amber-400 font-semibold">
                        {prod.category === 'men' ? 'رجالي مودرن' : 'أطفال كاجوال'}
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {prod.priceRetail} ج.م
                      </div>

                      {hasCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCustomImage(prod.id);
                          }}
                          className="text-[10px] text-red-400 hover:underline flex items-center gap-1 mt-1"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          <span>استعادة الصورة الافتراضية</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reset All Button */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={onResetAllImages}
                className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>استعادة جميع الصور الأصلية للكتالوج</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition"
              >
                إغلاق
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
