export interface Category {
  id: string;
  ecommerceId: string;
  parentId?: string | null;
  name: string;
  slug: string;
  path?: string;
  isActive?: boolean;
  sortOrder?: number;
  displayOrder?: number;
  children?: Category[];
}

export interface ProductImage {
  id: string;
  productId?: string;
  url?: string;
  imageUrl?: string;
  publicId?: string;
  displayOrder?: number;
  isPrimary?: boolean;
}

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  category?: string;
}

export interface OptionValue {
  id: string;
  productOptionId?: string;
  value: string;
  unitId?: string | null;
  displayOrder?: number;
  unit?: Unit | null;
}

export interface ProductOption {
  id: string;
  productId?: string;
  name: string;
  displayOrder?: number;
  values: OptionValue[];
}

export interface ProductVariant {
  id: string;
  productId?: string;
  sku: string;
  price: number;
  offerPrice?: number | null;
  quantity: number;
  status: string;
  details?: Array<{ title: string; content: string }>;
  optionValues?: OptionValue[];
  images?: ProductImage[];
}

export interface Product {
  id: string;
  ecommerceId: string;
  categoryId?: string;
  name: string;
  slug: string;
  description: string;
  details?: Array<{ title: string; content: string }>;
  price: number;
  offerPrice?: number | null;
  taxRate?: number;
  taxClass?: string;
  quantity?: number;
  computedQuantity: number;
  status: string;
  hasVariants: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  images?: ProductImage[];
  options?: ProductOption[];
  variants?: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CouponRule {
  categoryId?: string;
  categorySlug?: string;
  categoryPath?: string;
  minSubtotal?: number;
  minItems?: number;
  productIds?: string[];
  [key: string]: any;
}

export interface Coupon {
  id: string;
  ecommerceId: string;
  code: string;
  name?: string;
  description?: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minSubtotal?: number;
  maxDiscount?: number;
  targetType?: string;
  rules?: CouponRule;
  startDate?: string;
  expiryDate?: string;
  endDate?: string;
  isActive: boolean;
  usageLimit?: number | null;
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CouponValidationPayload {
  code: string;
  customerEmail: string;
  subtotal: number;
  cartItems: Array<{
    productId: string;
    categoryId?: string;
    quantity: number;
    pricing: {
      effectivePrice: number;
    };
    product?: {
      id: string;
      categoryId?: string;
      price: number;
    };
  }>;
}

export interface CouponValidationResult {
  valid: boolean;
  couponId?: string;
  code?: string;
  discountType?: 'PERCENTAGE' | 'FIXED';
  discountValue?: number;
  discountAmount: number;
  eligibleSubtotal: number;
  affectedItemIds?: string[];
  message: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface CartItem {
  id: string; // unique item key (productId + variantId)
  productId: string;
  categoryId?: string;
  categorySlug?: string;
  productName: string;
  slug: string;
  sku?: string;
  variantId?: string;
  price: number;
  offerPrice?: number | null;
  quantity: number;
  image?: string;
  selectedOptions?: Record<string, string>;
  stock: number;
}

export interface OrderItemPayload {
  productId: string;
  productName?: string;
  name?: string;
  sku?: string;
  variantId?: string | null;
  variantTitle?: string | null;
  variantName?: string | null;
  product?: {
    id: string;
    name: string;
    images?: Array<{ url: string } | string>;
  };
  selectedOptions?: Record<string, string>;
  options?: Record<string, string>;
  quantity: number;
  price: number;
  total?: number;
  image?: string;
}

export interface OrderPayload {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemsCount: number;
  total: number;
  status: string;
  couponId?: string | null;
  couponCode?: string | null;
  couponDiscount?: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItemPayload[];
}

export interface Order {
  id: string;
  ecommerceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemsCount: number;
  total: number;
  status: string;
  couponCode?: string;
  couponDiscount?: number;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items?: OrderItemPayload[];
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isGoogle?: boolean;
}
