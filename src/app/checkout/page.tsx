"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { placeOrder } from "@/lib/api";
import { Address, OrderPayload } from "@/types";
import {
  ShieldCheck,
  ShoppingBag,
  MapPin,
  Plus,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  Tag,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discount,
    appliedCoupon,
    couponCodeInput,
    couponLoading,
    couponError,
    availableCoupons,
    shipping,
    total,
    clearCart,
    setCouponCodeInput,
    applyCoupon,
    applySpecificCoupon,
    removeCoupon,
  } = useCart();

  const {
    user,
    isAuthenticated,
    isLoading,
    addresses,
    addAddress,
    getDefaultAddress,
    openAuthModal,
  } = useAuth();

  // Contact info
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  // Address selection & new address form
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [newStreet, setNewStreet] = useState<string>("");
  const [newCity, setNewCity] = useState<string>("");
  const [newState, setNewState] = useState<string>("");
  const [newPostalCode, setNewPostalCode] = useState<string>("");
  const [newCountry, setNewCountry] = useState<string>("India");
  const [saveAddressForLater, setSaveAddressForLater] = useState<boolean>(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-redirect logged out users to home
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  // Initialize fields from user context
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerEmail) setCustomerEmail(user.email);
      if (!customerPhone && user.phone) setCustomerPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = getDefaultAddress();
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
    } else if (addresses.length === 0) {
      setIsAddingNewAddress(true);
    }
  }, [addresses, selectedAddressId, getDefaultAddress]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(customerEmail || user?.email || "customer@kleanja.com");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Add products to proceed.");
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage("Please provide customer name.");
      return;
    }
    if (!customerEmail.trim()) {
      setErrorMessage("Please provide customer email.");
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage("Please provide customer phone number for delivery updates.");
      return;
    }

    // Determine final shipping address
    let finalAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };

    if (isAddingNewAddress || addresses.length === 0) {
      if (!newStreet.trim() || !newCity.trim() || !newState.trim() || !newPostalCode.trim()) {
        setErrorMessage("Please fill in all shipping address fields.");
        return;
      }
      finalAddress = {
        street: newStreet.trim(),
        city: newCity.trim(),
        state: newState.trim(),
        postalCode: newPostalCode.trim(),
        country: newCountry.trim(),
      };

      if (saveAddressForLater) {
        addAddress({
          fullName: customerName,
          phone: customerPhone,
          ...finalAddress,
          isDefault: addresses.length === 0,
        });
      }
    } else {
      const chosen = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
      if (!chosen) {
        setErrorMessage("Please select or enter a shipping address.");
        return;
      }
      finalAddress = {
        street: chosen.street,
        city: chosen.city,
        state: chosen.state,
        postalCode: chosen.postalCode,
        country: chosen.country,
      };
    }

    setIsSubmitting(true);

    try {
      const orderReferenceId = `KLJ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderPayload: OrderPayload = {
        id: orderReferenceId,
        customerName: customerName.trim() || user?.name || "Customer",
        customerEmail: customerEmail.trim() || user?.email || "customer@kleanja.com",
        customerPhone: customerPhone.trim() || user?.phone || "+91 98765 00000",
        itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
        total: Number(total.toFixed(2)),
        status: "PROCESSING",
        shippingAddress: {
          street: finalAddress.street,
          city: finalAddress.city,
          state: finalAddress.state,
          postalCode: finalAddress.postalCode,
          country: finalAddress.country || "India",
        },
        items: items.map((item) => {
          const itemPrice = item.offerPrice ?? item.price;
          const variantLabel =
            item.selectedOptions?.Size ||
            item.selectedOptions?.Volume ||
            Object.values(item.selectedOptions || {})[0] ||
            "";

          return {
            productId: item.productId,
            name: item.productName,
            productName: item.productName,
            sku: item.sku || `SKU-${item.productId.slice(0, 6)}`,
            variantId: item.variantId || null,
            variantTitle: variantLabel || null,
            variantName: variantLabel || null,
            product: {
              id: item.productId,
              name: item.productName,
              images: item.image ? [{ url: item.image }] : [],
            },
            selectedOptions: item.selectedOptions || {},
            options: item.selectedOptions || {},
            quantity: item.quantity,
            price: Number(itemPrice.toFixed(2)),
            total: Number((itemPrice * item.quantity).toFixed(2)),
            image: item.image,
          };
        }),
        couponId: appliedCoupon?.couponId || null,
        couponCode: appliedCoupon?.code || null,
        couponDiscount: discount > 0 ? Number(discount.toFixed(2)) : 0,
      };

      const placedOrder = await placeOrder(orderPayload);
      const resolvedOrderId = placedOrder?.id || orderReferenceId;

      // Save order record to local customer history
      const savedOrdersKey = "kleanja_customer_orders";
      const existing = JSON.parse(localStorage.getItem(savedOrdersKey) || "[]");
      localStorage.setItem(
        savedOrdersKey,
        JSON.stringify([
          {
            ...(placedOrder || {}),
            id: resolvedOrderId,
            items: orderPayload.items,
            shippingAddress: orderPayload.shippingAddress,
            total: orderPayload.total,
            createdAt: placedOrder?.createdAt || new Date().toISOString(),
          },
          ...existing,
        ])
      );

      // Clear the cart
      clearCart();

      // Navigate to success page
      router.push(`/order-success?orderId=${resolvedOrderId}`);
    } catch (err: any) {
      console.error("Order creation error:", err);
      setErrorMessage(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <div style={{ minHeight: "75vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "148px", textAlign: "center" }}>
        <div
          style={{
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            background: "#E4F1F7",
            color: "#0367A6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Lock size={36} />
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "#1D2939", marginBottom: "8px" }}>
          Sign In to Complete Order
        </h2>
        <p style={{ color: "#667085", maxWidth: "440px", marginBottom: "28px", lineHeight: 1.6 }}>
          Please sign in with your Google account or email to securely place your order and track live delivery updates.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={openAuthModal}
            style={{
              padding: "13px 36px",
              background: "#0367A6",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(3, 103, 166, 0.25)",
            }}
          >
            Sign In with Google / Email
          </button>
          <Link
            href="/"
            style={{
              padding: "13px 28px",
              background: "#FFFFFF",
              color: "#475467",
              border: "1px solid #D0D5DD",
              borderRadius: "50px",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "75vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "148px", textAlign: "center" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#E4F1F7",
            color: "#0367A6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <ShoppingBag size={32} />
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "#1D2939", marginBottom: "8px" }}>Your Cart is Empty</h2>
        <p style={{ color: "#667085", marginBottom: "24px" }}>Add Kleanja products to your cart before proceeding to checkout.</p>
        <Link href="/products" className="btn-primary" style={{ padding: "12px 28px" }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--off-white, #F8FAF8)", minHeight: "100vh", paddingTop: "148px", paddingBottom: "100px" }}>
      <div className="container" style={{ maxWidth: "1140px" }}>
        {/* Title */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#0367A6", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px" }}>
            <Lock size={15} /> Secure Checkout
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", fontWeight: 800, color: "#1D2939", margin: 0 }}>
            Complete Your Order
          </h1>
        </div>

        {errorMessage && (
          <div
            style={{
              background: "#FEE2E2",
              border: "1px solid #F87171",
              color: "#991B1B",
              padding: "14px 18px",
              borderRadius: "16px",
              fontSize: "0.9rem",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "36px",
            }}
            className="checkout-grid"
          >
            {/* Left Column: Customer Details & Shipping */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* 1. Customer Information */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid rgba(3, 103, 166, 0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, color: "#1D2939", margin: 0 }}>
                    1. Contact Information
                  </h3>
                  {!isAuthenticated && (
                    <button
                      type="button"
                      onClick={openAuthModal}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0367A6",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Sign in with Google for faster checkout
                    </button>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1px solid #D0D5DD",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1px solid #D0D5DD",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                      Phone Number (for delivery tracking) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1px solid #D0D5DD",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address & Saved Addresses */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid rgba(3, 103, 166, 0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, color: "#1D2939", margin: 0 }}>
                    2. Shipping Address
                  </h3>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0367A6",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {isAddingNewAddress ? "Use Saved Address" : "+ Add New Address"}
                    </button>
                  )}
                </div>

                {/* Saved Address Cards */}
                {!isAddingNewAddress && addresses.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          style={{
                            padding: "16px 20px",
                            borderRadius: "14px",
                            border: isSelected ? "2px solid #0367A6" : "1px solid #E6E8EA",
                            background: isSelected ? "#F4F9FC" : "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "14px",
                            transition: "all 0.2s",
                          }}
                        >
                          <input
                            type="radio"
                            name="selectedAddress"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            style={{ marginTop: "4px", accentColor: "#0367A6" }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "#1D2939" }}>
                                {addr.fullName}
                              </span>
                              {addr.isDefault && (
                                <span style={{ fontSize: "0.72rem", background: "#D8F3DC", color: "#1E6B08", padding: "2px 8px", borderRadius: "50px", fontWeight: 700 }}>
                                  Default
                                </span>
                              )}
                            </div>
                            <p style={{ margin: "0 0 2px", fontSize: "0.88rem", color: "#475467" }}>
                              {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                            </p>
                            <p style={{ margin: 0, fontSize: "0.82rem", color: "#667085" }}>
                              Phone: {addr.phone}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* New Address Entry Form */
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div style={{ gridColumn: "span 2" }}>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                        Street Address / Apartment / Landmark *
                      </label>
                      <input
                        type="text"
                        required={isAddingNewAddress || addresses.length === 0}
                        placeholder="e.g. 42, Brigade Road, Ashok Nagar"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #D0D5DD",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                        City *
                      </label>
                      <input
                        type="text"
                        required={isAddingNewAddress || addresses.length === 0}
                        placeholder="e.g. Bengaluru"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #D0D5DD",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                        State *
                      </label>
                      <input
                        type="text"
                        required={isAddingNewAddress || addresses.length === 0}
                        placeholder="e.g. Karnataka"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #D0D5DD",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                        Postal PIN Code *
                      </label>
                      <input
                        type="text"
                        required={isAddingNewAddress || addresses.length === 0}
                        placeholder="e.g. 560025"
                        value={newPostalCode}
                        onChange={(e) => setNewPostalCode(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #D0D5DD",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#344054", marginBottom: "6px" }}>
                        Country *
                      </label>
                      <input
                        type="text"
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #D0D5DD",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div style={{ gridColumn: "span 2", marginTop: "4px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#344054", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={saveAddressForLater}
                          onChange={(e) => setSaveAddressForLater(e.target.checked)}
                          style={{ accentColor: "#0367A6" }}
                        />
                        Save this address to my account for faster checkout next time
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Payment Method */}
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid rgba(3, 103, 166, 0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, color: "#1D2939", margin: "0 0 16px" }}>
                  3. Payment Method
                </h3>

                <div
                  style={{
                    padding: "16px 20px",
                    background: "#E4F1F7",
                    borderRadius: "14px",
                    border: "2px solid #0367A6",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#0367A6",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Truck size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "#1D2939" }}>
                        Pay on Delivery / Direct Storefront Order
                      </span>
                      <span style={{ fontSize: "0.72rem", background: "#278C0B", color: "white", padding: "2px 8px", borderRadius: "50px", fontWeight: 700 }}>
                        Active
                      </span>
                    </div>
                    <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#475467" }}>
                      Order will be submitted directly to the Kleanja Admin panel for processing & fulfillment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Placement */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "28px",
                  border: "1px solid rgba(3, 103, 166, 0.08)",
                  boxShadow: "0 8px 30px rgba(26, 107, 160, 0.06)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "#1D2939", margin: "0 0 18px" }}>
                  Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
                </h3>

                {/* Items preview */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "240px", overflowY: "auto", marginBottom: "20px" }}>
                  {items.map((item) => {
                    const price = item.offerPrice ?? item.price;
                    return (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "8px", background: "#F8FAF8", position: "relative", flexShrink: 0 }}>
                          {item.image && <Image src={item.image} alt={item.productName} fill style={{ objectFit: "contain", padding: "4px" }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.85rem", color: "#1D2939", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {item.productName}
                          </p>
                          <p style={{ margin: 0, fontSize: "0.75rem", color: "#667085" }}>
                            Qty: {item.quantity}{" "}
                            {item.selectedOptions &&
                              Object.entries(item.selectedOptions)
                                .map(([k, v]) => {
                                  const formatted = /[a-zA-Z]/.test(v)
                                    ? v
                                    : parseFloat(v) >= 20
                                    ? `${v} ml`
                                    : `${v} L`;
                                  return `• ${k}: ${formatted}`;
                                })
                                .join(" ")}
                          </p>
                        </div>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "#1D2939" }}>
                          ₹{(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Box */}
                <div style={{ marginBottom: "20px" }}>
                  {/* Available Offers Chips */}
                  {!appliedCoupon?.valid && availableCoupons.length > 0 && (
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", fontSize: "0.78rem", fontWeight: 700, color: "#1E6B08" }}>
                        <Tag size={13} />
                        <span>Available Offers:</span>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {availableCoupons.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => applySpecificCoupon(c.code, customerEmail || user?.email || "customer@kleanja.com")}
                            disabled={couponLoading}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "5px 10px",
                              borderRadius: "8px",
                              border: "1px dashed #278C0B",
                              background: "#F0FDF4",
                              color: "#1E6B08",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                            title={c.description || `${c.discountValue}% OFF`}
                          >
                            <span style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}>{c.code}</span>
                            <span style={{ opacity: 0.85, fontSize: "0.72rem", fontWeight: 600 }}>
                              • {c.discountType === "PERCENTAGE" ? `${c.discountValue}% Off` : `₹${c.discountValue} Off`}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {appliedCoupon?.valid ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#B3D9A9",
                        color: "#1E6B08",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      <span>Coupon <strong>{appliedCoupon.code}</strong> (-₹{discount.toFixed(2)})</span>
                      <button type="button" onClick={removeCoupon} style={{ background: "none", border: "none", color: "#1E6B08", cursor: "pointer", fontWeight: 700, textDecoration: "underline" }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "9px 12px",
                          borderRadius: "10px",
                          border: "1px solid #D0D5DD",
                          fontSize: "0.85rem",
                          outline: "none",
                          textTransform: "uppercase",
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                        style={{
                          padding: "9px 16px",
                          background: "#0367A6",
                          color: "white",
                          border: "none",
                          borderRadius: "10px",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: "0.82rem",
                          cursor: "pointer",
                        }}
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <span style={{ fontSize: "0.75rem", color: "#E74C3C", marginTop: "4px", display: "block" }}>
                      {couponError}
                    </span>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "#475467", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: 600, color: "#1D2939" }}>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#278C0B" }}>
                      <span>Coupon Discount</span>
                      <span style={{ fontWeight: 700 }}>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Delivery</span>
                    <span style={{ fontWeight: 600, color: shipping === 0 ? "#278C0B" : "#1D2939" }}>
                      {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "#1D2939",
                      fontFamily: "var(--font-heading)",
                      paddingTop: "12px",
                      borderTop: "1px dashed #D0D5DD",
                      marginTop: "4px",
                    }}
                  >
                    <span>Total Payable</span>
                    <span style={{ color: "#0367A6" }}>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "15px",
                    background: "#278C0B",
                    color: "white",
                    borderRadius: "14px",
                    border: "none",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(39, 140, 11, 0.3)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1E6B08")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#278C0B")}
                >
                  {isSubmitting ? (
                    "Submitting Order to Admin..."
                  ) : (
                    <>
                      Place Order (₹{total.toFixed(2)}) <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#667085", fontSize: "0.78rem", marginTop: "14px" }}>
                  <ShieldCheck size={14} color="#278C0B" />
                  <span>Your order details reflect immediately in Kleanja Admin</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
