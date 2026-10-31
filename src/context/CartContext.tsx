"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Coupon, CouponValidationResult } from '@/types';
import { validateCoupon as apiValidateCoupon, getCoupons, getProducts } from '@/lib/api';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  appliedCoupon: CouponValidationResult | null;
  couponCodeInput: string;
  couponLoading: boolean;
  couponError: string | null;
  availableCoupons: Coupon[];
  shipping: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setCouponCodeInput: (code: string) => void;
  applyCoupon: (customerEmail?: string) => Promise<boolean>;
  applySpecificCoupon: (code: string, customerEmail?: string) => Promise<boolean>;
  removeCoupon: () => void;
  loadCoupons: () => Promise<Coupon[]>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kleanja_cart_items';
const COUPON_STORAGE_KEY = 'kleanja_applied_coupon';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidationResult | null>(null);
  const [couponCodeInput, setCouponCodeInput] = useState<string>('');
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load available active coupons
  const loadCoupons = useCallback(async (): Promise<Coupon[]> => {
    try {
      const activeCoupons = await getCoupons({ isActive: true });
      setAvailableCoupons(activeCoupons);
      return activeCoupons;
    } catch (e) {
      console.warn('Could not load active coupons:', e);
      return [];
    }
  }, []);

  // Initialize cart from localStorage & load active coupons
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Error hydrating cart:', e);
    }
    loadCoupons();
  }, [loadCoupons]);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (itemData: Omit<CartItem, 'id'>) => {
    // Unique ID based on productId and variantId
    const uniqueId = itemData.variantId
      ? `${itemData.productId}_${itemData.variantId}`
      : itemData.productId;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + itemData.quantity;
        updated[existingIndex].quantity = Math.min(newQty, itemData.stock || 999);
        if (itemData.categoryId && !updated[existingIndex].categoryId) {
          updated[existingIndex].categoryId = itemData.categoryId;
        }
        return updated;
      } else {
        return [...prevItems, { ...itemData, id: uniqueId }];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const maxQty = item.stock ? Math.min(quantity, item.stock) : quantity;
          return { ...item, quantity: maxQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  // Calculations
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.offerPrice ?? item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  // Re-verify coupon discount against current subtotal
  const discount = appliedCoupon?.valid
    ? appliedCoupon.discountType === 'PERCENTAGE'
      ? (subtotal * (appliedCoupon.discountValue || 0)) / 100
      : Math.min(appliedCoupon.discountAmount || 0, subtotal)
    : 0;

  // Free shipping above ₹500, otherwise ₹50 (or 0 if cart is empty)
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

  const applySpecificCoupon = async (
    rawCode: string,
    customerEmail = 'customer@kleanja.com'
  ): Promise<boolean> => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code');
      return false;
    }

    setCouponLoading(true);
    setCouponError(null);
    setCouponCodeInput(code);

    try {
      // Ensure categoryId is populated for all items
      let resolvedItems = [...items];
      const hasMissingCategory = resolvedItems.some((i) => !i.categoryId);

      if (hasMissingCategory) {
        try {
          const allProds = await getProducts({ status: 'ACTIVE' });
          resolvedItems = resolvedItems.map((item) => {
            if (!item.categoryId) {
              const matched = allProds.find((p) => p.id === item.productId || p.slug === item.slug);
              if (matched) {
                return {
                  ...item,
                  categoryId: matched.categoryId || matched.category?.id,
                  categorySlug: matched.category?.slug,
                };
              }
            }
            return item;
          });
          setItems(resolvedItems);
        } catch (catErr) {
          console.warn('Could not backfill categoryId for cart items:', catErr);
        }
      }

      const payload = {
        code,
        customerEmail,
        subtotal,
        cartItems: resolvedItems.map((item) => ({
          productId: item.productId,
          categoryId: item.categoryId,
          quantity: item.quantity,
          pricing: {
            effectivePrice: item.offerPrice ?? item.price,
          },
          product: {
            id: item.productId,
            categoryId: item.categoryId,
            price: item.price,
          },
        })),
      };

      const result = await apiValidateCoupon(payload);

      if (result.valid) {
        setAppliedCoupon(result);
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(result));
        setCouponError(null);
        return true;
      } else {
        setAppliedCoupon(null);
        localStorage.removeItem(COUPON_STORAGE_KEY);
        setCouponError(result.message || 'Invalid or expired coupon');
        return false;
      }
    } catch (err: any) {
      setCouponError(err.message || 'Failed to apply coupon');
      return false;
    } finally {
      setCouponLoading(false);
    }
  };

  const applyCoupon = async (customerEmail = 'customer@kleanja.com'): Promise<boolean> => {
    return applySpecificCoupon(couponCodeInput, customerEmail);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError(null);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        discount,
        appliedCoupon,
        couponCodeInput,
        couponLoading,
        couponError,
        availableCoupons,
        shipping,
        total,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        setCouponCodeInput,
        applyCoupon,
        applySpecificCoupon,
        removeCoupon,
        loadCoupons,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
