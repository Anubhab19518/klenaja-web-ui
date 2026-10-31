"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getOrders } from "@/lib/api";
import { Order } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function OrdersPage() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { addItem } = useCart();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTrackingId, setSearchTrackingId] = useState<string>("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      try {
        // Fetch from backend API
        const apiOrders = await getOrders();

        // Also fetch from local storage for freshly placed customer orders
        const localSaved: Order[] = JSON.parse(
          localStorage.getItem("kleanja_customer_orders") || "[]"
        );

        // Merge without duplicates by ID
        const map = new Map<string, Order>();
        localSaved.forEach((o) => map.set(o.id, o));
        apiOrders.forEach((o) => map.set(o.id, { ...map.get(o.id), ...o }));

        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(merged);
        if (merged.length > 0) {
          setExpandedOrderId(merged[0].id);
        }
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "DELIVERED":
        return { bg: "#D8F3DC", color: "#1E6B08", text: "Delivered", step: 4 };
      case "SHIPPED":
        return { bg: "#E4F1F7", color: "#0367A6", text: "Shipped / In Transit", step: 3 };
      case "CONFIRMED":
        return { bg: "#FFF4E5", color: "#B54708", text: "Order Confirmed", step: 2 };
      case "PROCESSING":
      default:
        return { bg: "#EBF5FB", color: "#0367A6", text: "Processing", step: 1 };
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchTrackingId.trim()) return true;
    return (
      order.id.toLowerCase().includes(searchTrackingId.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTrackingId.toLowerCase()) ||
      order.customerPhone?.includes(searchTrackingId)
    );
  });

  return (
    <div style={{ background: "var(--off-white, #F8FAF8)", minHeight: "100vh", paddingTop: "148px", paddingBottom: "100px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Page Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#0367A6", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px" }}>
              <Package size={16} /> Customer Order Tracking
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", fontWeight: 800, color: "#1D2939", margin: 0 }}>
              My Orders & Delivery Status
            </h1>
          </div>

          <Link
            href="/account"
            style={{
              padding: "9px 20px",
              borderRadius: "50px",
              background: "white",
              border: "1px solid #D0D5DD",
              color: "#344054",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.88rem",
              textDecoration: "none",
            }}
          >
            Manage Saved Addresses →
          </Link>
        </div>

        {/* Tracking Search Bar */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "16px 20px",
            border: "1px solid rgba(3, 103, 166, 0.1)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Search size={20} color="#0367A6" />
          <input
            type="text"
            placeholder="Search by Order ID (e.g. order-uuid or reference) to check live status..."
            value={searchTrackingId}
            onChange={(e) => setSearchTrackingId(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "0.95rem",
              fontFamily: "inherit",
              color: "#1D2939",
            }}
          />
          {searchTrackingId && (
            <button
              onClick={() => setSearchTrackingId("")}
              style={{
                background: "none",
                border: "none",
                color: "#98A2B3",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Orders List / Empty State */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                border: "4px solid #E4F1F7",
                borderTopColor: "#0367A6",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ color: "#667085", fontWeight: 600 }}>Loading orders...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "60px 24px",
              textAlign: "center",
              border: "1px solid rgba(3, 103, 166, 0.08)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
            }}
          >
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
                margin: "0 auto 16px",
              }}
            >
              <Package size={32} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 700, color: "#1D2939", marginBottom: "8px" }}>
              No Orders Found
            </h3>
            <p style={{ color: "#667085", fontSize: "0.95rem", maxWidth: "420px", margin: "0 auto 24px" }}>
              {searchTrackingId
                ? "No matching order found for this reference ID. Please check the ID or email."
                : "You haven't placed any orders yet. Explore our products and order online."}
            </p>
            <Link href="/products" className="btn-primary" style={{ padding: "12px 28px" }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredOrders.map((order) => {
              const badge = getStatusBadge(order.status);
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  style={{
                    background: "white",
                    borderRadius: "22px",
                    border: "1px solid rgba(3, 103, 166, 0.08)",
                    boxShadow: "0 6px 24px rgba(26, 107, 160, 0.04)",
                    overflow: "hidden",
                  }}
                >
                  {/* Order Summary Header */}
                  <div
                    style={{
                      padding: "20px 24px",
                      background: "#FFFFFF",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "16px",
                      cursor: "pointer",
                      borderBottom: isExpanded ? "1px solid #E6E8EA" : "none",
                    }}
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "#E4F1F7",
                          color: "#0367A6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Package size={22} />
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem", color: "#1D2939" }}>
                            Order #{order.id.slice(0, 18)}
                          </span>
                          <span
                            style={{
                              background: badge.bg,
                              color: badge.color,
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: "50px",
                            }}
                          >
                            {badge.text}
                          </span>
                        </div>
                        <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "#667085" }}>
                          Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {order.itemsCount || order.items?.length || 1} items
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "0.75rem", color: "#667085", display: "block" }}>Total Amount</span>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.15rem", color: "#0367A6" }}>
                          ₹{Number(order.total).toFixed(2)}
                        </span>
                      </div>
                      <button
                        type="button"
                        style={{
                          background: "#F2F2F2",
                          border: "none",
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ padding: "24px 28px", background: "#FAFBFB" }}>
                      {/* Delivery Status Stepper */}
                      <div
                        style={{
                          background: "white",
                          borderRadius: "16px",
                          padding: "20px",
                          border: "1px solid #E6E8EA",
                          marginBottom: "24px",
                        }}
                      >
                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#1D2939", margin: "0 0 16px" }}>
                          Delivery Progress Tracker
                        </h4>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                          {[
                            { name: "Order Placed", step: 1 },
                            { name: "Processing", step: 2 },
                            { name: "In Transit", step: 3 },
                            { name: "Delivered", step: 4 },
                          ].map((s) => {
                            const isDone = badge.step >= s.step;
                            return (
                              <div key={s.name} style={{ textAlign: "center" }}>
                                <div
                                  style={{
                                    height: "6px",
                                    borderRadius: "4px",
                                    background: isDone ? "#278C0B" : "#E6E8EA",
                                    marginBottom: "8px",
                                    transition: "background 0.3s",
                                  }}
                                />
                                <span style={{ fontSize: "0.78rem", fontWeight: isDone ? 700 : 500, color: isDone ? "#1E6B08" : "#667085" }}>
                                  {s.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Items & Shipping Address Grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "20px" }} className="order-details-grid">
                        {/* Ordered Items */}
                        <div style={{ background: "white", borderRadius: "16px", padding: "18px", border: "1px solid #E6E8EA" }}>
                          <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "#1D2939", margin: "0 0 12px" }}>
                            Items in this Order
                          </h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, idx) => {
                                const itemOptions = item.options || item.selectedOptions;
                                const optionsText = itemOptions && Object.keys(itemOptions).length > 0
                                  ? Object.entries(itemOptions)
                                      .map(([k, v]) => {
                                        const valStr = String(v);
                                        const formatted = /[a-zA-Z]/.test(valStr)
                                          ? valStr
                                          : parseFloat(valStr) >= 20
                                          ? `${valStr} ml`
                                          : `${valStr} L`;
                                        return `${k}: ${formatted}`;
                                      })
                                      .join(", ")
                                  : item.variantTitle || item.variantName || (item.sku ? `SKU: ${item.sku}` : "");

                                return (
                                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                                    <div>
                                      <p style={{ margin: 0, fontWeight: 700, color: "#1D2939" }}>
                                        {item.productName || item.name || item.product?.name || "Cleaning Formulation"}
                                      </p>
                                      <span style={{ fontSize: "0.75rem", color: "#667085" }}>
                                        Qty: {item.quantity} {optionsText ? `• ${optionsText}` : ""}
                                      </span>
                                    </div>
                                    <span style={{ fontWeight: 700, color: "#0367A6" }}>
                                      ₹{Number(item.total || item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              <p style={{ margin: 0, fontSize: "0.85rem", color: "#667085" }}>Kleanja Cleaning Package</p>
                            )}
                          </div>
                        </div>

                        {/* Shipping Address & Info */}
                        <div style={{ background: "white", borderRadius: "16px", padding: "18px", border: "1px solid #E6E8EA" }}>
                          <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "#1D2939", margin: "0 0 10px" }}>
                            Delivery Destination
                          </h4>
                          {order.shippingAddress ? (
                            <div style={{ fontSize: "0.82rem", color: "#475467", lineHeight: 1.5 }}>
                              <p style={{ margin: 0, fontWeight: 700, color: "#1D2939" }}>{order.customerName}</p>
                              <p style={{ margin: 0 }}>{order.shippingAddress.street}</p>
                              <p style={{ margin: 0 }}>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
                              <p style={{ margin: "4px 0 0", color: "#0367A6", fontWeight: 600 }}>Phone: {order.customerPhone}</p>
                            </div>
                          ) : (
                            <p style={{ margin: 0, fontSize: "0.82rem", color: "#667085" }}>Standard Express Delivery</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
