"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Address } from "@/types";
import {
  User,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Package,
  ShieldCheck,
  Edit2,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function AccountPage() {
  const {
    user,
    isAuthenticated,
    openAuthModal,
    logout,
    addresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAuth();

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street || !city || !state || !postalCode) return;

    addAddress({
      fullName: name || user?.name || "Customer",
      phone: phone || user?.phone || "",
      street,
      city,
      state,
      postalCode,
      country,
      isDefault: addresses.length === 0,
    });

    setIsAddingAddress(false);
    setStreet("");
    setCity("");
    setState("");
    setPostalCode("");
  };

  if (!isAuthenticated || !user) {
    return (
      <div style={{ minHeight: "75vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "120px", textAlign: "center" }}>
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
          <User size={32} />
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "#1D2939", marginBottom: "8px" }}>Sign In to Your Account</h2>
        <p style={{ color: "#667085", maxWidth: "420px", marginBottom: "24px" }}>
          Log in with Google or your email to manage your saved delivery addresses, track orders, and experience faster checkout.
        </p>
        <button
          onClick={openAuthModal}
          style={{
            padding: "12px 32px",
            background: "#0367A6",
            color: "white",
            border: "none",
            borderRadius: "50px",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(3, 103, 166, 0.25)",
          }}
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--off-white, #F8FAF8)", minHeight: "100vh", paddingTop: "148px", paddingBottom: "100px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Profile Card Header */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid rgba(3, 103, 166, 0.08)",
            boxShadow: "0 8px 30px rgba(26, 107, 160, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0367A6 0%, #0378A6 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.75rem",
                fontWeight: 800,
                fontFamily: "var(--font-heading)",
                boxShadow: "0 6px 20px rgba(3, 103, 166, 0.25)",
                flexShrink: 0,
              }}
            >
              {user.name?.trim().charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "#1D2939", margin: 0 }}>
                  {user.name}
                </h2>
                {user.isGoogle && (
                  <span style={{ fontSize: "0.72rem", background: "#EBF5FB", color: "#0367A6", padding: "2px 8px", borderRadius: "50px", fontWeight: 700 }}>
                    Google Verified
                  </span>
                )}
              </div>
              <p style={{ margin: "2px 0 0", color: "#667085", fontSize: "0.9rem" }}>{user.email}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              href="/orders"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "#E4F1F7",
                color: "#0367A6",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              <Package size={16} /> View Orders
            </Link>
            <button
              onClick={logout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                background: "#FEE2E2",
                color: "#991B1B",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.85rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid rgba(3, 103, 166, 0.08)",
            boxShadow: "0 8px 30px rgba(26, 107, 160, 0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, color: "#1D2939", margin: 0 }}>
                Saved Addresses for Faster Checkout
              </h3>
              <p style={{ margin: "2px 0 0", color: "#667085", fontSize: "0.85rem" }}>
                Autofill your delivery address during instant checkout.
              </p>
            </div>

            <button
              onClick={() => setIsAddingAddress(!isAddingAddress)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 18px",
                background: "#0367A6",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(3, 103, 166, 0.2)",
              }}
            >
              <Plus size={16} /> {isAddingAddress ? "Cancel" : "Add New Address"}
            </button>
          </div>

          {/* Add Address Form */}
          {isAddingAddress && (
            <form
              onSubmit={handleSaveAddress}
              style={{
                background: "#FAFBFB",
                borderRadius: "18px",
                padding: "24px",
                border: "1px solid #E6E8EA",
                marginBottom: "28px",
              }}
            >
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#1D2939", margin: "0 0 16px" }}>
                Add New Delivery Location
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>Contact Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recipient's Name"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House/Flat No., Building, Street Name"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>PIN Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal Code"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#344054", marginBottom: "4px" }}>Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #D0D5DD", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "16px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  style={{
                    padding: "9px 18px",
                    background: "#F2F2F2",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "9px 22px",
                    background: "#278C0B",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {/* Address Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  background: addr.isDefault ? "#F4F9FC" : "#FFFFFF",
                  border: addr.isDefault ? "2px solid #0367A6" : "1px solid #E6E8EA",
                  borderRadius: "18px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#1D2939" }}>
                      {addr.fullName}
                    </span>
                    {addr.isDefault && (
                      <span style={{ fontSize: "0.72rem", background: "#D8F3DC", color: "#1E6B08", padding: "2px 8px", borderRadius: "50px", fontWeight: 700 }}>
                        Default
                      </span>
                    )}
                  </div>
                  <p style={{ margin: "0 0 4px", fontSize: "0.88rem", color: "#475467", lineHeight: 1.5 }}>
                    {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#667085" }}>
                    Phone: {addr.phone}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px", paddingTop: "12px", borderTop: "1px solid #E6E8EA" }}>
                  {!addr.isDefault ? (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0367A6",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "#278C0B", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle2 size={14} /> Selected for Checkout
                    </span>
                  )}

                  <button
                    onClick={() => deleteAddress(addr.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#98A2B3",
                      cursor: "pointer",
                      padding: "4px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E74C3C")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#98A2B3")}
                    title="Delete Address"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
