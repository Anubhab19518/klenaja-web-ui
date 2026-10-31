"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "KLJ-" + Date.now();

  return (
    <div style={{ background: "var(--off-white, #F8FAF8)", minHeight: "100vh", paddingTop: "135px", paddingBottom: "60px" }}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div
          style={{
            background: "white",
            borderRadius: "22px",
            padding: "32px 28px",
            border: "1px solid rgba(3, 103, 166, 0.08)",
            boxShadow: "0 8px 30px rgba(26, 107, 160, 0.06)",
            textAlign: "center",
          }}
        >
          {/* Green Checkmark */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#D8F3DC",
              color: "#1E6B08",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "0 6px 18px rgba(39, 140, 11, 0.18)",
            }}
          >
            <CheckCircle2 size={30} strokeWidth={2.5} />
          </div>

          <span
            style={{
              display: "inline-block",
              background: "#E4F1F7",
              color: "#0367A6",
              padding: "3px 12px",
              borderRadius: "50px",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            Order Successfully Placed
          </span>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#1D2939",
              margin: "0 0 6px",
            }}
          >
            Thank You for Your Order!
          </h1>

          <p style={{ color: "#667085", fontSize: "0.88rem", maxWidth: "460px", margin: "0 auto 18px", lineHeight: 1.5 }}>
            Your order has been recorded in the Kleanja system and sent for rapid dispatch from our local facility.
          </p>

          {/* Order ID Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "#F8FAF8",
              border: "1px solid #E6E8EA",
              borderRadius: "10px",
              marginBottom: "22px",
            }}
          >
            <span style={{ fontSize: "0.78rem", color: "#667085" }}>Order Reference ID:</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#0367A6", fontSize: "0.92rem" }}>
              {orderId}
            </span>
          </div>

          {/* Order Delivery Status Timeline */}
          <div
            style={{
              background: "#F8FAF8",
              borderRadius: "16px",
              padding: "18px 18px",
              border: "1px solid #E6E8EA",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "6px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "#1D2939", margin: 0 }}>
                Delivery Status
              </h3>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: "#1E6B08", fontWeight: 700, background: "#D8F3DC", padding: "3px 8px", borderRadius: "50px" }}>
                <Clock size={12} /> Est. 2-3 Business Days
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", position: "relative" }}>
              {[
                { title: "Order Placed", desc: "Just now", status: "completed" },
                { title: "Processing", desc: "Warehouse", status: "current" },
                { title: "Dispatched", desc: "Courier", status: "pending" },
                { title: "Delivered", desc: "Your address", status: "pending" },
              ].map((step, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      margin: "0 auto 6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background:
                        step.status === "completed"
                          ? "#278C0B"
                          : step.status === "current"
                          ? "#0367A6"
                          : "#E6E8EA",
                      color: step.status === "pending" ? "#667085" : "white",
                      boxShadow:
                        step.status === "current" ? "0 0 0 3px rgba(3, 103, 166, 0.2)" : "none",
                    }}
                  >
                    {step.status === "completed" ? "✓" : idx + 1}
                  </div>
                  <p style={{ margin: "0 0 1px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.76rem", color: "#1D2939" }}>
                    {step.title}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.68rem", color: "#667085" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/orders"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                background: "#0367A6",
                color: "white",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                boxShadow: "0 3px 12px rgba(3, 103, 166, 0.2)",
              }}
            >
              <Package size={15} /> View My Orders
            </Link>

            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                background: "#F2F2F2",
                color: "#344054",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              Continue Shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "120px" }}>
          <p>Loading order receipt...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
