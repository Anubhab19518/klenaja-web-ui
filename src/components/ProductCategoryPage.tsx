"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TransitionLink from "./TransitionLink";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShoppingBag, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { colors } from "@/design-system";

interface Product {
  name: string;
  description?: string;
  variants?: string[];
  badge?: string;
  img?: string; // optional per-product image
  detailsImage?: string; // image for the tabbed layout
}

interface CategoryPageProps {
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  icon?: any;
  color: string;
  gradient: string;
  img: string | null;
  heroImage?: string;
  products: Product[];
  keyPoints: string[];
}

export default function ProductCategoryPage({
  title,
  tagline,
  description,
  fullDescription,
  icon,
  color,
  gradient,
  img,
  heroImage,
  products,
  keyPoints,
}: CategoryPageProps) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const renderIcon = (size: number) => {
    if (typeof icon === "string") return <span style={{ fontSize: size * 0.9 }}>{icon}</span>;
    const Icon = icon;
    return <Icon size={size} strokeWidth={1.5} />;
  };

  return (
    <>
      {/* Hero */}
      <section
        className="home-hero"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.35)), url('${heroImage || "/hero_image.jpg"}') no-repeat center center`,
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
            {/* Left — Text */}
            <div className="home-hero-copy" style={{ textAlign: "left" }}>
              <TransitionLink
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "rgba(255,255,255,0.6)",
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
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 5.5vw, 4rem)",
                  lineHeight: 1.15,
                  color: "white",
                  marginBottom: "24px",
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
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
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          <div
            className="card reveal"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "48px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
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
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  color: "#111827",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                  letterSpacing: "-0.03em"
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
                {fullDescription}
              </p>

              {/* Tabs */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {products.map((product, idx) => (
                  <button
                    key={product.name}
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
                      fontWeight: activeTab === idx ? 600 : 400,
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
              {products.map((product, idx) => (
                <div
                  key={product.name}
                  style={{
                    opacity: activeTab === idx ? 1 : 0,
                    pointerEvents: activeTab === idx ? "auto" : "none",
                    position: activeTab === idx ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: activeTab === idx ? "auto" : "100%",
                    transition: "opacity 0.3s ease-in-out",
                    display: "flex",
                    flexDirection: "column"
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
                      background: "var(--gray-100)", // fallback
                    }}
                  >
                    {product.detailsImage && (
                      <Image
                        src={product.detailsImage}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 500,
                      fontSize: "1.75rem",
                      color: "#111827",
                      marginBottom: "12px",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      color: "#4B5563",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      marginBottom: "24px",
                    }}
                  >
                    {product.description}
                  </p>
                  <div>
                    <TransitionLink
                      href="/contact"
                      className="btn-dark"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "10px 24px",
                        background: "#000000",
                        color: "white",
                        borderRadius: "50px",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      Contact Us
                    </TransitionLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid — premium image cards */}
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

          <div className={`bento-grid items-${products.length + 2}`}>
            {/* 1. Category Intro Card (Top Left) */}
            <div
              className="bento-card bento-card-intro reveal reveal-delay-1"
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                minHeight: "440px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "40px",
                boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                background: color,
                color: "white"
              }}
            >
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {title}
              </h2>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.6, opacity: 0.9, maxWidth: "90%" }}>
                {description}
              </p>

              <div style={{ marginTop: "auto", display: "flex", gap: "12px", paddingTop: "40px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={20} /></div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={20} /></div>
              </div>
            </div>

            {/* 2. Product Cards */}
            {products.map((product, i) => (
              <div
                key={product.name}
                className={`bento-card bento-card-product reveal reveal-delay-${i + 2}`}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  minHeight: "440px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                  border: `1px solid ${color}20`,
                  background: product.img ? "var(--ds-color-primary)" : gradient,
                }}
              >
                {product.img ? (
                  <>
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover", zIndex: 0, transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                      className="bento-bg-img"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)", zIndex: 1 }} />
                  </>
                ) : (
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.15, color: color, zIndex: 0 }}>
                    {renderIcon(260)}
                  </div>
                )}

                {product.badge && (
                  <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 2, background: color, color: "white", padding: "6px 16px", borderRadius: "50px", fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: `0 4px 16px ${color}60` }}>
                    {product.badge}
                  </div>
                )}

                <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", color: "white" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1.45rem",
                      lineHeight: 1.2,
                      marginBottom: "6px",
                      textShadow: product.img ? "0 2px 10px rgba(0,0,0,0.4)" : "none",
                      color: product.img ? "white" : "#1F2937",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p style={{ fontSize: "0.95rem", color: product.img ? "rgba(255,255,255,0.85)" : "#374151", lineHeight: 1.45, marginBottom: "16px", maxWidth: "95%", textShadow: product.img ? "0 1px 4px rgba(0,0,0,0.4)" : "none" }}>
                    {product.description}
                  </p>

                  <div>
                    <TransitionLink
                      href="/contact"
                      className="bento-btn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: color,
                        color: "white",
                        padding: "12px 28px",
                        borderRadius: "50px",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        textDecoration: "none",
                        boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      Explore Now <ArrowRight size={16} />
                    </TransitionLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            .bento-grid {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 16px;
            }
            .bento-card {
              /* transition: box-shadow .25s ease; removed to allow .reveal to work properly */
            }
            // .bento-card:hover {
            //   transform: translateY(-6px);
            //   box-shadow: 0 20px 48px rgba(0,0,0,0.25) !important;
            // }
            // .bento-card:hover .bento-bg-img {
            //   transform: scale(1.08) !important;
            }
            .bento-btn:hover {
              transform: translateY(-2px);
              filter: brightness(1.05);
            }
            
            .bento-bg-img{
            object-fit:cover;
            inset:0;
            }

            /* 5 ITEMS: Intro + 3 Products + Contact */
            .bento-grid.items-5 > div:nth-child(1) { grid-column: span 3; } /* Intro */
            .bento-grid.items-5 > div:nth-child(2) { grid-column: span 3; } /* Prod 1 */
            .bento-grid.items-5 > div:nth-child(3) { grid-column: span 2; } /* Prod 2 */
            .bento-grid.items-5 > div:nth-child(4) { grid-column: span 2; } /* Prod 3 */
            .bento-grid.items-5 > div:nth-child(5) { grid-column: span 2; } /* Contact */

            /* 6 ITEMS: Intro + 4 Products + Contact */
            .bento-grid.items-6 > div:nth-child(1) { grid-column: span 4; } /* Intro */
            .bento-grid.items-6 > div:nth-child(2) { grid-column: span 2; } /* Prod 1 */
            .bento-grid.items-6 > div:nth-child(3) { grid-column: span 2; } /* Prod 2 */
            .bento-grid.items-6 > div:nth-child(4) { grid-column: span 2; } /* Prod 3 */
            .bento-grid.items-6 > div:nth-child(5) { grid-column: span 2; } /* Prod 4 */
            .bento-grid.items-6 > div:nth-child(6) { grid-column: span 6; } /* Contact */

            /* 4 ITEMS: Intro + 2 Products + Contact */
            .bento-grid.items-4 > div:nth-child(1) { grid-column: span 6; } /* Intro */
            .bento-grid.items-4 > div:nth-child(2) { grid-column: span 2; } /* Prod 1 */
            .bento-grid.items-4 > div:nth-child(3) { grid-column: span 2; } /* Prod 2 */
            .bento-grid.items-4 > div:nth-child(4) { grid-column: span 2; } /* Contact */

            @media (max-width: 900px) {
              .bento-grid {
                display: flex;
                flex-direction: column;
              }
              .bento-card {
                min-height: 400px !important;
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
        @media (max-width: 1024px) {
          .cat-hero-grid { grid-template-columns: 1fr !important; }
          .cat-hero-img { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
