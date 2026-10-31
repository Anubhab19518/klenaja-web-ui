"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CartDrawer() {
  const {
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
    closeCart,
    updateQuantity,
    removeItem,
    setCouponCodeInput,
    applyCoupon,
    applySpecificCoupon,
    removeCoupon,
  } = useCart();

  const { user } = useAuth();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(user?.email || 'customer@kleanja.com');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(1, 43, 71, 0.5)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--warm-white, #FFFFFF)',
          boxShadow: '-10px 0 40px rgba(3, 103, 166, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(3, 103, 166, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#E4F1F7',
                color: '#0367A6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1D2939' }}>
                Your Cart
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#667085', margin: 0 }}>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: '#F2F2F2',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475467',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div style={{ background: '#E4F1F7', padding: '10px 24px', borderBottom: '1px solid #D0E5F2' }}>
          {subtotal >= 500 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1E6B08', fontSize: '0.8rem', fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>Congratulations! You get <strong>FREE Delivery</strong></span>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#0367A6', marginBottom: '4px', fontWeight: 600 }}>
                <span>Add ₹{(500 - subtotal).toFixed(0)} more for FREE Delivery</span>
                <span>{Math.min(100, Math.round((subtotal / 500) * 100))}%</span>
              </div>
              <div style={{ height: '5px', width: '100%', background: '#D0E5F2', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (subtotal / 500) * 100)}%`,
                    background: '#278C0B',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#E4F1F7',
                  color: '#0367A6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#1D2939', marginBottom: '6px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#667085', maxWidth: '240px', marginBottom: '24px' }}>
                Discover our eco-friendly, powerful cleaning solutions and add them here.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                style={{
                  padding: '10px 24px',
                  background: '#0367A6',
                  color: 'white',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                }}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const currentPrice = item.offerPrice ?? item.price;
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '14px',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid rgba(3, 103, 166, 0.08)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '12px',
                      background: '#F8FAF8',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.image ? (
                      <Image src={item.image} alt={item.productName} fill style={{ objectFit: 'contain', padding: '4px' }} />
                    ) : (
                      <ShoppingBag size={24} style={{ color: '#0367A6', opacity: 0.5 }} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, color: '#1D2939', margin: 0, lineHeight: 1.3 }}>
                          {item.productName}
                        </h4>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                            {Object.entries(item.selectedOptions).map(([key, val]) => {
                              const formattedVal = /[a-zA-Z]/.test(val)
                                ? val
                                : parseFloat(val) >= 20
                                ? `${val} ml`
                                : `${val} L`;
                              return (
                                <span
                                  key={key}
                                  style={{
                                    fontSize: '0.72rem',
                                    color: '#0367A6',
                                    background: '#E4F1F7',
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                  }}
                                >
                                  {key}: {formattedVal}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#98A2B3',
                          cursor: 'pointer',
                          padding: '2px',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#E74C3C')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#98A2B3')}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.98rem', color: '#1D2939' }}>
                          ₹{currentPrice.toFixed(2)}
                        </span>
                        {item.offerPrice && (
                          <span style={{ fontSize: '0.75rem', color: '#98A2B3', textDecoration: 'line-through' }}>
                            ₹{item.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#F2F2F2',
                          padding: '3px 6px',
                          borderRadius: '8px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            background: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#1D2939',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            background: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#1D2939',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Coupon & Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(3, 103, 166, 0.1)',
              background: '#FFFFFF',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
            }}
          >
            {/* Coupon Code Box */}
            <div style={{ marginBottom: '16px' }}>
              {/* Available Offers Chips */}
              {!appliedCoupon?.valid && availableCoupons.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#1E6B08' }}>
                    <Tag size={13} />
                    <span>Available Offers:</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {availableCoupons.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => applySpecificCoupon(c.code, user?.email || 'customer@kleanja.com')}
                        disabled={couponLoading}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '5px 10px',
                          borderRadius: '8px',
                          border: '1px dashed #278C0B',
                          background: '#F0FDF4',
                          color: '#1E6B08',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                        title={c.description || `${c.discountValue}% OFF`}
                      >
                        <span style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}>{c.code}</span>
                        <span style={{ opacity: 0.85, fontSize: '0.72rem', fontWeight: 600 }}>
                          • {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% Off` : `₹${c.discountValue} Off`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {appliedCoupon?.valid ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#B3D9A9',
                    color: '#1E6B08',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={15} />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E6B08',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      textDecoration: 'underline',
                      fontWeight: 700,
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. OFF10)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: '10px',
                      border: '1px solid #D0D5DD',
                      fontSize: '0.82rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      textTransform: 'uppercase',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    style={{
                      padding: '9px 16px',
                      background: '#0367A6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {couponLoading ? 'Checking...' : 'Apply'}
                  </button>
                </form>
              )}
              {couponError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#E74C3C', fontSize: '0.75rem', marginTop: '6px' }}>
                  <AlertCircle size={13} />
                  <span>{couponError}</span>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#475467', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#1D2939' }}>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#278C0B' }}>
                  <span>Discount</span>
                  <span style={{ fontWeight: 600 }}>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Charges</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? '#278C0B' : '#1D2939' }}>
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#1D2939',
                  fontFamily: 'var(--font-heading)',
                  paddingTop: '8px',
                  borderTop: '1px dashed #D0D5DD',
                  marginTop: '4px',
                }}
              >
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px',
                background: '#0367A6',
                color: 'white',
                borderRadius: '14px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(3, 103, 166, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#024873')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0367A6')}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
