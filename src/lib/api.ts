import {
  Category,
  Product,
  Coupon,
  CouponValidationPayload,
  CouponValidationResult,
  OrderPayload,
  Order,
} from '@/types';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api/v1';
const ECOMMERCE_ID =
  process.env.NEXT_PUBLIC_ECOMMERCE_ID ||
  'fd93976f-3bed-4084-b57d-efe2f43f0a1d';

const DEFAULT_ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_DEFAULT_ADMIN_EMAIL || 'pureclean_admin@bazar.com';
const DEFAULT_ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_DEFAULT_ADMIN_PASSWORD || 'Password123!';

let cachedToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

/**
 * Obtain a valid JWT access token for storefront browsing.
 * Uses localStorage token if available, otherwise performs automatic storefront authentication.
 */
export async function getStorefrontToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    const localToken = localStorage.getItem('kleanja_access_token');
    if (localToken) return localToken;
  }

  if (cachedToken) return cachedToken;
  if (tokenPromise) return tokenPromise;

  tokenPromise = (async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ecommerce-id': ECOMMERCE_ID,
        },
        body: JSON.stringify({
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASSWORD,
        }),
      });

      if (!res.ok) return null;
      const data = await res.json();
      const token = data.data?.accessToken || data.accessToken || null;
      if (token) {
        cachedToken = token;
        if (typeof window !== 'undefined') {
          localStorage.setItem('kleanja_access_token', token);
        }
      }
      return token;
    } catch {
      return null;
    } finally {
      tokenPromise = null;
    }
  })();

  return tokenPromise;
}

export async function fetchStorefront<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let token = typeof window !== 'undefined' ? localStorage.getItem('kleanja_access_token') : null;
  if (!token) {
    token = await getStorefrontToken();
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-ecommerce-id': ECOMMERCE_ID,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      // If 401 token expired, attempt auto-refresh once
      if (response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('kleanja_access_token');
        cachedToken = null;
        const freshToken = await getStorefrontToken();
        if (freshToken) {
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${freshToken}`,
          };
          const retryRes = await fetch(`${BACKEND_URL}${endpoint}`, {
            ...options,
            headers: retryHeaders,
          });
          const retryJson = await retryRes.json();
          if (retryRes.ok) return retryJson.data !== undefined ? retryJson.data : retryJson;
        }
      }
      const msg = json.message || `API request to ${endpoint} failed with status ${response.status}`;
      throw new Error(msg);
    }

    return json.data !== undefined ? json.data : json;
  } catch (err: any) {
    console.error(`Storefront API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

// ----------------------------------------------------
// Catalog APIs
// ----------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchStorefront<Category[]>('/catalog/categories');
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn('Failed to fetch categories from API:', e);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    return await fetchStorefront<Category>(`/catalog/categories/${id}`);
  } catch (e) {
    console.warn(`Failed to fetch category ${id}:`, e);
    return null;
  }
}

export async function getProducts(params?: {
  categoryId?: string;
  status?: string;
}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params?.categoryId) query.append('categoryId', params.categoryId);
    if (params?.status) query.append('status', params.status);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const data = await fetchStorefront<Product[]>(`/catalog/products${queryString}`);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn('Failed to fetch products from API:', e);
    return [];
  }
}

export async function getProductDetails(id: string): Promise<Product | null> {
  try {
    return await fetchStorefront<Product>(`/catalog/products/${id}`);
  } catch (e) {
    console.warn(`Failed to fetch product details for ${id}:`, e);
    return null;
  }
}

export async function getCoupons(params?: {
  isActive?: boolean;
}): Promise<Coupon[]> {
  try {
    const query = new URLSearchParams();
    if (params?.isActive !== undefined) query.append('isActive', String(params.isActive));
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const data = await fetchStorefront<Coupon[]>(`/catalog/coupons${queryString}`);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn('Failed to fetch coupons from API:', e);
    return [];
  }
}

export async function validateCoupon(
  payload: CouponValidationPayload
): Promise<CouponValidationResult> {
  try {
    const data = await fetchStorefront<CouponValidationResult>(
      '/catalog/coupons/validate',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    return data;
  } catch (e: any) {
    return {
      valid: false,
      discountAmount: 0,
      eligibleSubtotal: 0,
      message: e.message || 'Coupon validation failed',
    };
  }
}

// ----------------------------------------------------
// Orders API
// ----------------------------------------------------

export async function placeOrder(orderData: OrderPayload): Promise<Order> {
  const fallbackId = orderData.id || `KLJ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const res = await fetchStorefront<any>('/catalog/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });

    if (res && typeof res === 'object') {
      return {
        ...res,
        id: res.id || fallbackId,
        ecommerceId: res.ecommerceId || ECOMMERCE_ID,
        customerName: res.customerName || orderData.customerName,
        customerEmail: res.customerEmail || orderData.customerEmail,
        customerPhone: res.customerPhone || orderData.customerPhone,
        itemsCount: res.itemsCount || orderData.itemsCount,
        total: res.total ?? orderData.total,
        status: res.status || orderData.status || 'PROCESSING',
        couponCode: res.couponCode || orderData.couponCode || undefined,
        couponDiscount: res.couponDiscount ?? (orderData.couponDiscount || undefined),
        shippingAddress: res.shippingAddress || orderData.shippingAddress,
        createdAt: res.createdAt || new Date().toISOString(),
      };
    }
  } catch (err: any) {
    console.warn('API order placement fallback to local order reference:', err.message);
  }

  return {
    id: fallbackId,
    ecommerceId: ECOMMERCE_ID,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    itemsCount: orderData.itemsCount,
    total: orderData.total,
    status: orderData.status || 'PROCESSING',
    couponCode: orderData.couponCode || undefined,
    couponDiscount: orderData.couponDiscount || undefined,
    shippingAddress: orderData.shippingAddress,
    createdAt: new Date().toISOString(),
  };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const data = await fetchStorefront<Order[]>('/catalog/orders');
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn('Failed to fetch orders from API:', e);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    return await fetchStorefront<Order>(`/catalog/orders/${id}`);
  } catch (e) {
    console.warn(`Failed to fetch order ${id}:`, e);
    return null;
  }
}

// ----------------------------------------------------
// Auth APIs
// ----------------------------------------------------

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ecommerce-id': ECOMMERCE_ID,
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data.data || data;
}

export async function getCurrentUser() {
  return await fetchStorefront('/auth/me');
}
