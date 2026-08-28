export type CategoryType = 
  | 'all'
  | 'kids'        // ملابس أطفال
  | 'shirts'      // قميص رجالي
  | 'tshirts'     // تيشرتات
  | 'underwear'   // ملابس داخلية
  | 'sets'        // أطقم كامل
  | 'tracksuits'  // ترنج
  | 'pajamas';    // بيجامات

export type SubCategoryType = 
  | 'all'
  | 'men-tshirts'
  | 'men-shirts'
  | 'men-pants'
  | 'men-sets'
  | 'men-tracksuits'
  | 'men-underwear'
  | 'men-pajamas'
  | 'kids-tshirts'
  | 'kids-sets'
  | 'kids-pants'
  | 'kids-pajamas'
  | 'kids-underwear';

export type PricingMode = 'retail' | 'wholesale';

export interface CategoryMeta {
  id: CategoryType;
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  subCategory: SubCategoryType;
  subCategoryName: string;
  priceRetail: number;
  priceWholesale: number;
  originalPrice?: number;
  minWholesaleQty: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  fabric: string;
  fit: string;
  season: 'صيف 2025' | 'شتوي' | 'كل المواسم' | string;
  ageRange?: string; // e.g. "5 - 14 سنة" for kids
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  customImage?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  pricingMode: PricingMode;
  appliedPrice: number;
}

export interface FilterState {
  category: CategoryType;
  subCategory: SubCategoryType;
  searchQuery: string;
  selectedSizes: string[];
  priceRange: [number, number];
  pricingMode: PricingMode;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  onlyInStock: boolean;
  onlyOffers: boolean;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  secondaryPhone?: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'instapay' | 'vodafone_cash';
  orderType: PricingMode;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productName?: string;
}
