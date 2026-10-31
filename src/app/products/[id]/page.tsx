"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductCategoryPage from "@/components/ProductCategoryPage";
import { getProductDetails, getProducts, getCategories } from "@/lib/api";
import { Category, Product, ProductVariant, OptionValue } from "@/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { colors, gradients } from "@/design-system";
import {
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Layers,
  Award,
  Tag,
  Copy,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const { isAuthenticated, openAuthModal } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [matchedCategory, setMatchedCategory] = useState<Category | null>(null);
  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const { addItem, availableCoupons, applySpecificCoupon, openCart } = useCart();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        let prod: Product | null = null;
        try {
          prod = await getProductDetails(id);
        } catch {
          // not found directly by ID
        }

        if (!prod) {
          const allProds = await getProducts({ status: "ACTIVE" });
          prod = allProds.find((p) => p.slug === id || p.id === id) || null;
        }

        if (prod) {
          setProduct(prod);
          setMatchedCategory(null);

          // Initialize selected options & active variant
          if (prod.variants && prod.variants.length > 0) {
            const firstVariant = prod.variants[0];
            setActiveVariant(firstVariant);

            // Populate initial options from first variant
            const initialOpts: Record<string, string> = {};
            if (prod.options && prod.options.length > 0) {
              prod.options.forEach((opt) => {
                const matchedVal = firstVariant.optionValues?.find(
                  (ov: any) => ov.productOptionId === opt.id || opt.values.some((v) => v.id === ov.id)
                );
                if (matchedVal) {
                  initialOpts[opt.name] = matchedVal.value;
                } else if (opt.values.length > 0) {
                  initialOpts[opt.name] = opt.values[0].value;
                }
              });
            }
            setSelectedOptions(initialOpts);
          }

          // Fetch related products in same category
          const allProds = await getProducts({
            categoryId: prod.categoryId || prod.category?.id,
            status: "ACTIVE",
          });
          setRelatedProducts(allProds.filter((p) => p.id !== prod.id).slice(0, 3));
          return;
        }

        // If not a product, check if id is a category (slug or id)
        const allCats = await getCategories();
        const normalize = (str: string) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const target = normalize(id);
        const cat = allCats.find((c) => {
          if (c.id === id || c.slug === id) return true;
          const cSlug = normalize(c.slug);
          const cName = normalize(c.name);
          return cSlug === target || cSlug.includes(target) || target.includes(cSlug) || cName === target || cName.includes(target);
        });

        if (cat) {
          setMatchedCategory(cat);
          setProduct(null);
          return;
        }
      } catch (e) {
        console.error("Error loading product/category detail:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);

  // When option selection changes, resolve matching variant
  const handleOptionChange = (optionName: string, value: string) => {
    const updatedOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(updatedOptions);

    if (product?.variants && product.variants.length > 0) {
      // Find variant whose optionValues match all selected options
      const matched = product.variants.find((variant) => {
        if (!variant.optionValues) return false;
        return Object.entries(updatedOptions).every(([optName, optVal]) => {
          return variant.optionValues?.some((ov) => ov.value === optVal);
        });
      });

      if (matched) {
        setActiveVariant(matched);
      }
    }
  };

  // Helper to format option values with proper unit
  const formatOptionLabel = (val: { value: string; unit?: any }, optionName: string) => {
    if (!val) return "";
    const rawValue = val.value?.trim() || "";
    if (val.unit?.symbol) return `${rawValue} ${val.unit.symbol}`;
    if (val.unit?.name) return `${rawValue} ${val.unit.name}`;
    if (/[a-zA-Z]/.test(rawValue)) return rawValue;

    // Check SKU suffix from variants
    const matchedVariant = product?.variants?.find((v) =>
      v.optionValues?.some((ov) => ov.value === rawValue) ||
      v.sku?.toLowerCase().includes(rawValue.replace(".", ""))
    );
    if (matchedVariant?.sku) {
      const sku = matchedVariant.sku.toUpperCase();
      if (sku.endsWith("L") || sku.includes("075L") || sku.includes("1L") || sku.includes("2L") || sku.includes("5L")) {
        return `${rawValue} L`;
      }
      if (sku.endsWith("ML") || sku.includes("500ML") || sku.includes("250ML")) {
        return `${rawValue} ml`;
      }
    }

    const lowerOpt = optionName.toLowerCase();
    if (lowerOpt.includes("size") || lowerOpt.includes("volume") || lowerOpt.includes("qty")) {
      const num = parseFloat(rawValue);
      if (!isNaN(num)) {
        return num >= 20 ? `${rawValue} ml` : `${rawValue} L`;
      }
    }
    return rawValue;
  };

  const formatOptionLabelString = (valStr: string, optionName: string) => {
    if (!valStr) return "";
    const opt = product?.options?.find((o) => o.name === optionName);
    const matchedVal = opt?.values?.find((v) => v.value === valStr);
    return formatOptionLabel(matchedVal || { value: valStr }, optionName);
  };

  const currentPrice = activeVariant?.offerPrice ?? activeVariant?.price ?? product?.offerPrice ?? product?.price ?? 0;
  const originalPrice = activeVariant?.price ?? product?.price ?? currentPrice;
  const hasDiscount = (activeVariant?.offerPrice && activeVariant.offerPrice < originalPrice) ||
    (!activeVariant && product?.offerPrice && product.offerPrice < originalPrice);
  const discountPercent = hasDiscount && originalPrice > 0
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const images = product?.images && product.images.length > 0
    ? product.images.map((img) => img.url || img.imageUrl || "/floor-cleaning.png")
    : ["/floor-cleaning.png"];

  const currentStock = activeVariant?.quantity ?? product?.computedQuantity ?? product?.quantity ?? 100;

  const handleAddToCart = (openDrawer = true) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    if (!product) return;

    // Ensure options have proper unit labels attached
    const formattedOptions: Record<string, string> = {};
    if (selectedOptions) {
      Object.entries(selectedOptions).forEach(([k, v]) => {
        formattedOptions[k] = formatOptionLabelString(v, k);
      });
    }

    addItem({
      productId: product.id,
      categoryId: product.categoryId || product.category?.id,
      categorySlug: product.category?.slug,
      productName: product.name,
      slug: product.slug,
      sku: activeVariant?.sku || `SKU-${product.id.slice(0, 6)}`,
      variantId: activeVariant?.id,
      price: originalPrice,
      offerPrice: hasDiscount ? currentPrice : null,
      quantity,
      image: images[0],
      selectedOptions: formattedOptions,
      stock: currentStock,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    handleAddToCart(false);
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "120px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #E4F1F7",
              borderTopColor: "#0367A6",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#667085", fontFamily: "var(--font-heading)", fontWeight: 600 }}>Loading catalog...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (matchedCategory) {
    return (
      <ProductCategoryPage
        categorySlug={matchedCategory.slug}
        categoryId={matchedCategory.id}
        title={matchedCategory.name}
        tagline="Engineered for spotless hygiene."
        description={`Explore Kleanja's premium ${matchedCategory.name.toLowerCase()} solutions formulated for maximum efficacy, clinical germ kill, and spotless surfaces.`}
        fullDescription={`Kleanja's ${matchedCategory.name.toLowerCase()} range is engineered for both domestic and commercial environments. Formulated with high-potency cleansing agents that are tough on residue yet safe for surfaces.`}
        color={colors.bluePrimary}
        gradient={gradients.blueSoft}
        img="/floor-cleaning.png"
      />
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "120px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", color: "#1D2939", marginBottom: "8px" }}>Item Not Found</h2>
        <p style={{ color: "#667085", marginBottom: "20px" }}>The requested cleaning product or category is currently unavailable.</p>
        <Link href="/products" className="btn-primary" style={{ padding: "10px 24px" }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--off-white, #F8FAF8)", minHeight: "100vh", paddingTop: "148px", paddingBottom: "100px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            color: "#667085",
            marginBottom: "32px",
          }}
        >
          <Link href="/" style={{ color: "#667085", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" style={{ color: "#667085", textDecoration: "none" }}>Products</Link>
          {product.category && (
            <>
              <ChevronRight size={14} />
              <Link href={`/products#${product.category.slug}`} style={{ color: "#667085", textDecoration: "none" }}>
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight size={14} />
          <span style={{ color: "#0367A6", fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* PDP Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            background: "white",
            borderRadius: "28px",
            padding: "40px",
            border: "1px solid rgba(3, 103, 166, 0.08)",
            boxShadow: "0 10px 40px rgba(26, 107, 160, 0.06)",
            marginBottom: "60px",
          }}
          className="pdp-grid"
        >
          {/* Left Column: Image Gallery */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                background: "radial-gradient(circle at center, #F4F9FC 0%, #FFFFFF 80%)",
                borderRadius: "20px",
                border: "1px solid #E6E8EA",
                height: "440px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {images[selectedImageIndex] && (
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain", padding: "28px" }}
                  priority
                />
              )}
              {hasDiscount && (
                <span
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "18px",
                    background: "#278C0B",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    boxShadow: "0 2px 8px rgba(39, 140, 11, 0.25)",
                  }}
                >
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail selector if multiple images */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "12px" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    style={{
                      width: "74px",
                      height: "74px",
                      borderRadius: "14px",
                      background: "#F8FAF8",
                      border: selectedImageIndex === i ? "2px solid #0367A6" : "1px solid #E6E8EA",
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                      padding: "4px",
                    }}
                  >
                    <Image src={img} alt="Thumbnail" fill style={{ objectFit: "contain", padding: "4px" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Purchasing */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Category & Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              {product.category && (
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#0367A6",
                    background: "#E4F1F7",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {product.category.name}
                </span>
              )}
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#1E6B08",
                  background: "#D8F3DC",
                  padding: "4px 10px",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Check size={12} strokeWidth={3} /> Certified Germ Kill
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                fontWeight: 800,
                color: "#1D2939",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              {product.name}
            </h1>

            {/* SKU & Stock */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.82rem", color: "#667085", marginBottom: "20px" }}>
              <span>SKU: <strong>{activeVariant?.sku || product.slug}</strong></span>
              <span>•</span>
              <span style={{ color: currentStock > 0 ? "#278C0B" : "#E74C3C", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle2 size={14} />
                {currentStock > 0 ? `In Stock (${currentStock} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Price section */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                padding: "16px 20px",
                background: "#F8FAF8",
                borderRadius: "16px",
                border: "1px solid rgba(3, 103, 166, 0.08)",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.85rem",
                  color: "#0367A6",
                }}
              >
                ₹{currentPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span style={{ fontSize: "1.05rem", color: "#98A2B3", textDecoration: "line-through" }}>
                    ₹{originalPrice.toFixed(2)}
                  </span>
                  <span style={{ color: "#278C0B", fontWeight: 700, fontSize: "0.85rem", background: "#E4F7DF", padding: "2px 8px", borderRadius: "6px" }}>
                    Save ₹{(originalPrice - currentPrice).toFixed(2)}
                  </span>
                </>
              )}
              <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#667085" }}>
                Inclusive of all taxes
              </span>
            </div>

            {/* Bank & Coupon Offers Banner */}
            {availableCoupons.length > 0 && (
              <div
                style={{
                  background: "linear-gradient(135deg, #F0FDF4 0%, #E8F7EC 100%)",
                  border: "1px dashed #278C0B",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Tag size={16} color="#278C0B" />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "#1E6B08" }}>
                    Available Offers & Coupons
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {availableCoupons.map((c) => {
                    const isTargetMatched =
                      !c.rules?.categoryId ||
                      c.rules.categoryId === product.categoryId ||
                      c.rules.categoryId === product.category?.id ||
                      (c.rules.categoryPath && product.category?.name && c.rules.categoryPath.toLowerCase().includes(product.category.name.toLowerCase()));

                    return (
                      <div
                        key={c.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "white",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid rgba(39, 140, 11, 0.2)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              background: "#E4F7DF",
                              color: "#1E6B08",
                              fontWeight: 800,
                              fontSize: "0.78rem",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontFamily: "monospace",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {c.code}
                          </span>
                          <span style={{ fontSize: "0.82rem", color: "#344054", fontWeight: 500 }}>
                            {c.description || (c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(c.code);
                            setCopiedCoupon(c.code);
                            setTimeout(() => setCopiedCoupon(null), 2000);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: copiedCoupon === c.code ? "#278C0B" : "#0367A6",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {copiedCoupon === c.code ? (
                            <>
                              <Check size={12} strokeWidth={3} /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy Code
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Description */}
            <p
              style={{
                fontSize: "0.95rem",
                color: "#475467",
                lineHeight: 1.65,
                marginBottom: "24px",
              }}
            >
              {product.description?.replace(/\*\*/g, "")}
            </p>

            {/* Variant Options Selector (e.g. Size/Volume, Fragrance) */}
            {product.options && product.options.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
                {product.options.map((option) => (
                  <div key={option.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.88rem", color: "#1D2939" }}>
                        Select {option.name}:
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "#0367A6", fontWeight: 600 }}>
                        {formatOptionLabelString(selectedOptions[option.name], option.name)}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {option.values.map((val) => {
                        const isSelected = selectedOptions[option.name] === val.value;
                        return (
                          <button
                            key={val.id}
                            type="button"
                            onClick={() => handleOptionChange(option.name, val.value)}
                            style={{
                              padding: "9px 18px",
                              borderRadius: "10px",
                              border: isSelected ? "2px solid #0367A6" : "1px solid #D0D5DD",
                              background: isSelected ? "#E4F1F7" : "white",
                              color: isSelected ? "#0367A6" : "#344054",
                              fontFamily: "var(--font-heading)",
                              fontWeight: isSelected ? 700 : 500,
                              fontSize: "0.88rem",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            {formatOptionLabel(val, option.name)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #D0D5DD",
                  borderRadius: "12px",
                  padding: "4px 8px",
                  background: "white",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#475467",
                  }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ minWidth: "36px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#475467",
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 20px",
                  background: isAdded ? "#278C0B" : "#0367A6",
                  color: "white",
                  borderRadius: "14px",
                  border: "none",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(3, 103, 166, 0.25)",
                  transition: "all 0.2s ease",
                }}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={18} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                style={{
                  padding: "14px 24px",
                  background: "#278C0B",
                  color: "white",
                  borderRadius: "14px",
                  border: "none",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(39, 140, 11, 0.25)",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1E6B08")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#278C0B")}
              >
                Buy Now
              </button>
            </div>

            {/* Key Assurance Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
                paddingTop: "20px",
                borderTop: "1px solid #E6E8EA",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={20} color="#0367A6" />
                <span style={{ fontSize: "0.78rem", color: "#475467", fontWeight: 600 }}>Fast Shipping Across India</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={20} color="#278C0B" />
                <span style={{ fontSize: "0.78rem", color: "#475467", fontWeight: 600 }}>100% Quality Guaranteed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={20} color="#0367A6" />
                <span style={{ fontSize: "0.78rem", color: "#475467", fontWeight: 600 }}>Commercial Grade Strength</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications & Details Table */}
        {product.details && product.details.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "36px 40px",
              border: "1px solid rgba(3, 103, 166, 0.08)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.02)",
              marginBottom: "60px",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, color: "#1D2939", marginBottom: "20px" }}>
              Technical Specifications & Application
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {product.details.map((detail, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px 20px",
                    background: "#F8FAF8",
                    borderRadius: "14px",
                    border: "1px solid #E6E8EA",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "#667085", fontWeight: 600 }}>
                    {detail.title}
                  </span>
                  <p style={{ margin: "4px 0 0", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#1D2939" }}>
                    {detail.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0367A6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  More in this Category
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, color: "#1D2939", margin: "4px 0 0" }}>
                  You May Also Like
                </h3>
              </div>
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#0367A6",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                View all products <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {relatedProducts.map((rel) => {
                const relImg = rel.images && rel.images.length > 0 ? rel.images[0].url || rel.images[0].imageUrl : "/floor-cleaning.png";
                return (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.id}`}
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      border: "1px solid rgba(3, 103, 166, 0.08)",
                      padding: "20px",
                      textDecoration: "none",
                      color: "inherit",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ height: "160px", position: "relative", marginBottom: "14px" }}>
                      <Image src={relImg || "/floor-cleaning.png"} alt={rel.name} fill style={{ objectFit: "contain" }} />
                    </div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#1D2939", margin: "0 0 6px" }}>
                      {rel.name}
                    </h4>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#0367A6", marginTop: "auto" }}>
                      ₹{(rel.offerPrice ?? rel.price).toFixed(2)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pdp-grid {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
