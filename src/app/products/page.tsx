"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/api";
import { Category, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Filter,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const { addItem } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();

  useEffect(() => {
    async function loadCatalog() {
      setIsLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts({ status: "ACTIVE" }),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error("Error loading catalog:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCatalog();
  }, []);

  // Filter and Sort Products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.categoryId === selectedCategory ||
      product.category?.slug === selectedCategory ||
      product.category?.id === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.offerPrice ?? a.price;
    const priceB = b.offerPrice ?? b.price;
    if (sortBy === "price-low") return priceA - priceB;
    if (sortBy === "price-high") return priceB - priceA;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0; // featured / default
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    // Pick first variant if present
    const firstVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
    const firstImage = product.images && product.images.length > 0 ? product.images[0].url || product.images[0].imageUrl : undefined;

    addItem({
      productId: product.id,
      categoryId: product.categoryId || product.category?.id,
      categorySlug: product.category?.slug,
      productName: product.name,
      slug: product.slug,
      sku: firstVariant?.sku || `SKU-${product.id.slice(0, 6)}`,
      variantId: firstVariant?.id,
      price: firstVariant?.price ?? product.price,
      offerPrice: firstVariant?.offerPrice ?? product.offerPrice,
      quantity: 1,
      image: firstImage || "/floor-cleaning.png",
      stock: product.computedQuantity || 100,
    });

    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div style={{ background: "var(--off-white, #F8FAF8)", minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px" }}>
      {/* Hero Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #012B47 0%, #0367A6 60%, #0378A6 100%)",
          color: "white",
          padding: "60px 0 50px",
          position: "relative",
          overflow: "hidden",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(39, 140, 11, 0.25) 0%, transparent 70%)",
            top: "-100px",
            right: "-100px",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(6px)",
              borderRadius: "50px",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={14} color="#b5f3be" />
            Direct to Consumer Storefront
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Explore Our Products
          </h1>
          <p
            style={{
              maxWidth: "640px",
              margin: "14px auto 0",
              fontSize: "1.05rem",
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.6,
            }}
          >
            Hospital-grade disinfection, plant-powered multi-surface cleaners, and daily hygiene formulations delivered straight to your doorstep.
          </p>

          {/* Search & Quick Stats Bar */}
          <div
            style={{
              maxWidth: "600px",
              margin: "32px auto 0",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "white",
                borderRadius: "50px",
                padding: "6px 8px 6px 20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <Search size={18} color="#0367A6" />
              <input
                type="text"
                placeholder="Search products by name, surface type, or application..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "10px 14px",
                  fontSize: "0.95rem",
                  color: "#1D2939",
                  fontFamily: "inherit",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#98A2B3",
                    cursor: "pointer",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="container">
        {/* Filter Navigation & Sort */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(3, 103, 166, 0.1)",
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              maxWidth: "100%",
            }}
          >
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                padding: "8px 18px",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.85rem",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                background: selectedCategory === "all" ? "#0367A6" : "#FFFFFF",
                color: selectedCategory === "all" ? "white" : "#475467",
                boxShadow: selectedCategory === "all" ? "0 4px 14px rgba(3, 103, 166, 0.25)" : "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              All Categories ({products.length})
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id || selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "50px",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                    background: isSelected ? "#0367A6" : "#FFFFFF",
                    color: isSelected ? "white" : "#475467",
                    boxShadow: isSelected ? "0 4px 14px rgba(3, 103, 166, 0.25)" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.85rem", color: "#667085", fontWeight: 500 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid #D0D5DD",
                background: "white",
                color: "#1D2939",
                fontFamily: "inherit",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid / Loading / Empty */}
        {isLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px", padding: "40px 0" }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                style={{
                  height: "380px",
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid #E6E8EA",
                  animation: "pulse 1.5s infinite ease-in-out",
                }}
              />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "white",
              borderRadius: "24px",
              border: "1px solid rgba(3, 103, 166, 0.08)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#E4F1F7",
                color: "#0367A6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Search size={32} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "#1D2939", marginBottom: "8px" }}>
              No products found
            </h3>
            <p style={{ color: "#667085", fontSize: "0.95rem", maxWidth: "400px", margin: "0 auto 24px" }}>
              We couldn&apos;t find anything matching your selected filters or search keyword. Try clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              style={{
                padding: "10px 24px",
                background: "#0367A6",
                color: "white",
                borderRadius: "50px",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {sortedProducts.map((product) => {
              const primaryImage =
                product.images && product.images.length > 0
                  ? product.images[0].url || product.images[0].imageUrl
                  : "/floor-cleaning.png";

              const effectivePrice = product.offerPrice ?? product.price;
              const hasDiscount = product.offerPrice && product.offerPrice < product.price;
              const discountPercent = hasDiscount
                ? Math.round(((product.price - (product.offerPrice || 0)) / product.price) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "24px",
                    border: "1px solid rgba(3, 103, 166, 0.09)",
                    boxShadow: "0 8px 30px rgba(26, 107, 160, 0.06)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    position: "relative",
                  }}
                  className="product-card"
                >
                  {/* Category & Offer Badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      right: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      zIndex: 3,
                    }}
                  >
                    {product.category?.name && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#0367A6",
                          background: "rgba(228, 241, 247, 0.9)",
                          backdropFilter: "blur(4px)",
                          padding: "4px 10px",
                          borderRadius: "50px",
                        }}
                      >
                        {product.category.name}
                      </span>
                    )}
                    {hasDiscount && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          color: "white",
                          background: "#278C0B",
                          padding: "4px 10px",
                          borderRadius: "50px",
                          boxShadow: "0 2px 6px rgba(39, 140, 11, 0.3)",
                        }}
                      >
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Image Link */}
                  <Link
                    href={`/products/${product.id}`}
                    style={{
                      display: "block",
                      padding: "48px 24px 20px",
                      background: "radial-gradient(circle at center, #F4F9FC 0%, #FFFFFF 70%)",
                      position: "relative",
                      height: "220px",
                    }}
                  >
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain", padding: "16px" }}
                        className="product-thumb"
                      />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#0367A6", opacity: 0.4 }}>
                        <ShoppingBag size={64} strokeWidth={1} />
                      </div>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#1D2939",
                          margin: "0 0 6px",
                          lineHeight: 1.35,
                          transition: "color 0.2s",
                        }}
                        className="product-title-hover"
                      >
                        {product.name}
                      </h3>
                    </Link>

                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#667085",
                        lineHeight: 1.5,
                        marginBottom: "16px",
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description?.replace(/\*\*/g, "") || "Premium quality hygiene and cleaning formula engineered for spotless surfaces."}
                    </p>

                    {/* Pricing & Stock */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 800,
                          fontSize: "1.25rem",
                          color: "#0367A6",
                        }}
                      >
                        ₹{effectivePrice.toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span style={{ fontSize: "0.85rem", color: "#98A2B3", textDecoration: "line-through" }}>
                          ₹{product.price.toFixed(2)}
                        </span>
                      )}
                      <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#278C0B", fontWeight: 700, background: "#E4F7DF", padding: "2px 8px", borderRadius: "4px" }}>
                        In Stock
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        style={{
                          flex: 1,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "10px 14px",
                          background: addedItemMap[product.id] ? "#278C0B" : "#0367A6",
                          color: "white",
                          borderRadius: "12px",
                          border: "none",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: "0.84rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {addedItemMap[product.id] ? (
                          <>
                            <CheckCircle2 size={15} /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={15} /> Add to Cart
                          </>
                        )}
                      </button>

                      <Link
                        href={`/products/${product.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 14px",
                          background: "#F2F2F2",
                          color: "#344054",
                          borderRadius: "12px",
                          textDecoration: "none",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: "0.84rem",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#E4E7EC")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#F2F2F2")}
                      >
                        Details <ChevronRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(3, 103, 166, 0.12) !important;
        }
        .product-card:hover .product-thumb {
          transform: scale(1.04);
          transition: transform 0.3s ease;
        }
        .product-title-hover:hover {
          color: #0367A6 !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
