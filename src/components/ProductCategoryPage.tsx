"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TransitionLink from "./TransitionLink";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShoppingBag, Phone, ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react";
import { colors, gradients as defaultGradients } from "@/design-system";
import { getCategories, getProducts } from "@/lib/api";
import { Category, Product as BackendProduct } from "@/types";

export interface CategoryProduct {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  variants?: string[];
  badge?: string;
  img?: string; // product root photo
  detailsImage?: string; // image for the tabbed layout
  details?: Array<{ title: string; content: string }>; // product highlights
  price?: number;
  offerPrice?: number | null;
}

interface CategoryPageProps {
  categorySlug?: string;
  categoryId?: string;
  title: string;
  tagline?: string;
  description?: string;
  fullDescription?: string;
  icon?: any;
  color?: string;
  gradient?: string;
  img?: string | null;
  heroImage?: string;
  products?: CategoryProduct[];
  keyPoints?: string[];
}

export default function ProductCategoryPage({
  categorySlug,
  categoryId,
  title,
  tagline = "Professional Hygiene Solutions",
  description,
  fullDescription,
  icon,
  color = colors.bluePrimary,
  gradient = defaultGradients.blueSoft,
  img,
  heroImage,
  products: initialProducts = [],
  keyPoints = [],
}: CategoryPageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState<CategoryProduct[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategoryCatalog() {
      setIsLoading(true);
      try {
        const [allCats, allProds] = await Promise.all([
          getCategories(),
          getProducts({ status: "ACTIVE" }),
        ]);

        const normalize = (str: string) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const targetSlug = normalize(categorySlug || "");
        const targetTitle = normalize(title || "");

        // Find matching backend category
        const matchedCat = allCats.find((c) => {
          if (categoryId && c.id === categoryId) return true;
          const cSlug = normalize(c.slug);
          const cName = normalize(c.name);
          if (targetSlug && (cSlug === targetSlug || cSlug.includes(targetSlug) || targetSlug.includes(cSlug))) return true;
          if (targetTitle && (cName === targetTitle || cName.includes(targetTitle) || targetTitle.includes(cName))) return true;
          return false;
        });

        // Filter products belonging to this category
        const categoryProducts = allProds.filter((p) => {
          if (matchedCat && (p.categoryId === matchedCat.id || p.category?.id === matchedCat.id || p.category?.slug === matchedCat.slug)) {
            return true;
          }
          if (categoryId && (p.categoryId === categoryId || p.category?.id === categoryId)) {
            return true;
          }
          const pCatSlug = normalize(p.category?.slug || "");
          const pCatName = normalize(p.category?.name || "");
          if (targetSlug && (pCatSlug === targetSlug || pCatSlug.includes(targetSlug) || targetSlug.includes(pCatSlug))) return true;
          if (targetTitle && (pCatName === targetTitle || pCatName.includes(targetTitle) || targetTitle.includes(pCatName))) return true;
          return false;
        });

        if (categoryProducts.length > 0) {
          const mapped: CategoryProduct[] = categoryProducts.map((bp) => {
            const rootPhoto = bp.images && bp.images.length > 0
              ? bp.images[0].url || bp.images[0].imageUrl
              : undefined;

            const fallbackMatch = initialProducts.find((ip) => {
              const ipNorm = normalize(ip.name);
              const bpNorm = normalize(bp.name);
              return ipNorm.includes(bpNorm) || bpNorm.includes(ipNorm);
            });

            const rawDesc = bp.description?.replace(/\*\*/g, "").trim();
            const desc = rawDesc || fallbackMatch?.description || "Hospital-grade formulation for maximum cleaning efficiency.";

            const photo = rootPhoto || fallbackMatch?.img || fallbackMatch?.detailsImage;

            return {
              id: bp.id,
              name: bp.name,
              slug: bp.slug,
              description: desc,
              img: photo,
              detailsImage: photo || fallbackMatch?.detailsImage,
              details: bp.details || [],
              price: bp.price,
              offerPrice: bp.offerPrice,
              badge: bp.offerPrice && bp.offerPrice < bp.price ? "Special Offer" : fallbackMatch?.badge,
            };
          });

          setProducts(mapped);
        } else if (initialProducts.length > 0) {
          setProducts(initialProducts);
        }
      } catch (e) {
        console.warn("Could not load dynamic products in ProductCategoryPage:", e);
        if (initialProducts.length > 0) {
          setProducts(initialProducts);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadCategoryCatalog();
  }, [categorySlug, categoryId, title, initialProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const renderIcon = (size: number) => {
    if (typeof icon === "string") return <span style={{ fontSize: size * 0.9 }}>{icon}</span>;
    if (icon) {
      const Icon = icon;
      return <Icon size={size} strokeWidth={1.5} />;
    }
    return <Sparkles size={size} strokeWidth={1.5} />;
  };

  return (
    <>
      {/* Hero */}
      <section
        className="home-hero"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.45)), url('${heroImage || "/hero_image.jpg"}') no-repeat center center`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", flexGrow: 1, paddingBottom: "100px", paddingTop: "160px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "40px",
              alignItems: "end",
            }}
            className="hero-grid"
          >
            <div className="home-hero-copy">
              <TransitionLink
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  textDecoration: "none",
                }}
              >
                ← All Products
              </TransitionLink>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 5.5vw, 4rem)",
                  lineHeight: 1.15,
                  color: "white",
                  marginBottom: "24px",
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  maxWidth: "480px",
                  marginBottom: "32px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <TransitionLink
                  href="/contact"
                  className="hero-btn-pill"
                >
                  Get a Quote
                </TransitionLink>
                <TransitionLink
                  href="/products"
                  className="hero-btn-circle"
                >
                  <ArrowRight size={20} style={{ transform: "rotate(-45deg)" }} />
                </TransitionLink>
              </div>
            </div>

            {/* Right — Empty to let background image show */}
            <div className="hidden-mobile" />
          </div>
        </div>
      </section>

      {/* Tabbed About Section */}
      {products.length > 0 && (
        <section className="section" style={{ background: "var(--warm-white)" }}>
          <div className="container">
            <div
              className="reveal about-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: "64px",
                alignItems: "stretch",
              }}
            >
              {/* Left Column */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "#6B7280", marginBottom: "12px", fontWeight: 500 }}>
                  ({title})
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "clamp(2rem, 3vw, 2.75rem)",
                    color: "#111827",
                    lineHeight: 1.15,
                    marginBottom: "20px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {tagline}
                </h2>
                <p
                  style={{
                    color: "#4B5563",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    marginBottom: "40px",
                  }}
                >
                  {fullDescription || description}
                </p>

                {/* Tabs */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {products.map((product, idx) => (
                    <button
                      key={product.id || product.name}
                      onClick={() => setActiveTab(idx)}
                      style={{
                        textAlign: "left",
                        padding: "16px 0",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--gray-200)",
                        cursor: "pointer",
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.2rem",
                        fontWeight: activeTab === idx ? 700 : 400,
                        color: activeTab === idx ? "#111827" : "var(--gray-400)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                {products.map((product, idx) => {
                  const isVisible = activeTab === idx;
                  const displayImg = product.detailsImage || product.img;
                  const productHref = product.id ? `/products/${product.id}` : "/products";

                  return (
                    <div
                      key={product.id || product.name}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        pointerEvents: isVisible ? "auto" : "none",
                        position: isVisible ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: isVisible ? "auto" : "100%",
                        transition: "opacity 0.3s ease-in-out",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "360px",
                          position: "relative",
                          borderRadius: "16px",
                          overflow: "hidden",
                          marginBottom: "24px",
                          background: "#F4F9FC",
                          border: "1px solid #E6E8EA",
                        }}
                      >
                        {displayImg ? (
                          <Image
                            src={displayImg}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#0367A6", opacity: 0.3 }}>
                            <ShoppingBag size={72} strokeWidth={1} />
                          </div>
                        )}
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "1.75rem",
                          color: "#111827",
                          marginBottom: "16px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {product.name}
                      </h3>

                      <div>
                        <TransitionLink
                          href={productHref}
                          className="btn-dark"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 28px",
                            background: "#000000",
                            color: "white",
                            borderRadius: "50px",
                            fontSize: "0.88rem",
                            fontFamily: "var(--font-heading)",
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "opacity 0.2s ease",
                          }}
                        >
                          View Product <ArrowRight size={15} />
                        </TransitionLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid — Bento Image Showcase */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-label reveal" style={{ background: `${color}12`, color: color }}>
              Product Range
            </span>
            <h2 className="heading-lg reveal" style={{ color: "#1F2937", marginBottom: "12px" }}>
              {title}
            </h2>
            <p className="body-md reveal" style={{ color: "#4B5563", maxWidth: "500px", margin: "0 auto" }}>
              Explore our carefully formulated range designed for performance, safety, and sustainability.
            </p>
          </div>

          <div className="bento-grid">
            {/* 1. Category Intro Card (Top Left - Spans 4 of 6 columns ~60%) */}
            <div
              className="bento-card bento-card-intro reveal reveal-delay-1"
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                minHeight: "440px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "40px",
                background: color,
                color: "white",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {title}
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.6, opacity: 0.95, maxWidth: "90%" }}>
                {description}
              </p>

              <div style={{ marginTop: "auto", display: "flex", gap: "12px", paddingTop: "40px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={20} /></div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={20} /></div>
              </div>
            </div>

            {/* 2. Product Cards (Spans 2 of 6 columns ~33-40%) */}
            {products.map((product, i) => {
              const productUrl = product.id ? `/products/${product.id}` : "/products";

              return (
                <div
                  key={product.id || product.name}
                  className={`bento-card bento-card-product reveal reveal-delay-${i + 2}`}
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    minHeight: "440px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "24px",
                    border: `1px solid ${color}20`,
                    background: product.img ? "#0F172A" : gradient,
                  }}
                >
                  {/* Full-bleed vibrant photo occupying the entire product tile */}
                  {product.img ? (
                    <>
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        style={{
                          objectFit: "cover",
                          zIndex: 0,
                          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                        className="bento-bg-img"
                      />
                      {/* Gradient overlay for clear text contrast */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.1) 100%)",
                          zIndex: 1,
                        }}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: 0.15,
                        color: color,
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    >
                      {renderIcon(260)}
                    </div>
                  )}

                  {product.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        zIndex: 2,
                        background: "#278C0B",
                        color: "white",
                        padding: "4px 14px",
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        boxShadow: "0 4px 12px rgba(39, 140, 11, 0.35)",
                      }}
                    >
                      {product.badge}
                    </div>
                  )}

                  <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", color: "white" }}>
                    <Link href={productUrl} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "1.45rem",
                          lineHeight: 1.25,
                          marginBottom: "8px",
                          textShadow: product.img ? "0 2px 10px rgba(0,0,0,0.6)" : "none",
                          color: product.img ? "white" : "#1F2937",
                          cursor: "pointer",
                        }}
                      >
                        {product.name}
                      </h3>
                    </Link>

                    {/* Highlights Badges on Card */}
                    {product.details && product.details.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                        {product.details.map((d, dIdx) => (
                          <span
                            key={dIdx}
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              background: product.img ? "rgba(255, 255, 255, 0.22)" : "rgba(3, 103, 166, 0.12)",
                              backdropFilter: "blur(6px)",
                              color: product.img ? "white" : "#0367A6",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              border: product.img ? "1px solid rgba(255, 255, 255, 0.3)" : `1px solid ${color}25`,
                            }}
                          >
                            <strong>{d.title}:</strong> {d.content}
                          </span>
                        ))}
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: product.img ? "rgba(255,255,255,0.9)" : "#374151",
                        lineHeight: 1.45,
                        marginBottom: "16px",
                        maxWidth: "95%",
                        textShadow: product.img ? "0 1px 4px rgba(0,0,0,0.5)" : "none",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </p>

                    <div>
                      <TransitionLink
                        href={productUrl}
                        className="bento-btn"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          background: color,
                          color: "white",
                          padding: "10px 24px",
                          borderRadius: "50px",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          textDecoration: "none",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        View Product <ArrowRight size={15} />
                      </TransitionLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
            .bento-grid {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 16px;
            }
            .bento-card:hover .bento-bg-img {
              transform: scale(1.05);
            }
            .bento-btn:hover {
              transform: translateY(-2px);
              filter: brightness(1.1);
            }

            /* Intro card ALWAYS occupies 4 of 6 columns (~66% / 60%) */
            .bento-grid > div:nth-child(1) {
              grid-column: span 4;
            }

            /* All product cards occupy 2 of 6 columns (~33% / 40%) */
            .bento-grid > div:nth-child(n+2) {
              grid-column: span 2;
            }

            @media (max-width: 900px) {
              .bento-grid {
                display: flex;
                flex-direction: column;
              }
              .bento-card {
                min-height: 380px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: "var(--gradient-hero)",
          padding: "80px 0",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="hero-blob" style={{ width: "400px", height: "400px", top: "-150px", right: "-100px", background: color }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h2 className="heading-lg" style={{ color: "white", marginBottom: "16px" }}>
            Interested in {title}?
          </h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", marginBottom: "32px" }}>
            Contact us for pricing, bulk orders, or customized solutions.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <TransitionLink href="/contact" className="btn-primary">
              Contact Us <ArrowRight size={16} />
            </TransitionLink>
            <TransitionLink href="/products" className="btn-outline">
              View All Categories
            </TransitionLink>
          </div>
        </div>
      </section>

      <style>{`
        .home-hero-copy {
          text-align: left;
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .home-hero {
            min-height: 100svh !important;
            padding-top: 106px !important;
            padding-bottom: 76px !important;
          }
          .home-hero-copy {
            text-align: center;
          }
          .home-hero-copy > p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .home-hero-copy > div {
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
}
