"use client";
import { useEffect } from "react";
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
}

interface CategoryPageProps {
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  icon: any;
  color: string;
  gradient: string;
  img: string | null;
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
  products,
  keyPoints,
}: CategoryPageProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
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
        style={{
          background: "var(--gradient-hero)",
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        <div className="hero-blob" style={{ width: "400px", height: "400px", top: "-100px", right: "-100px", background: color }} />
        <div className="hero-blob" style={{ width: "250px", height: "250px", bottom: "-80px", left: "5%", background: "var(--green-dark)" }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "60px",
              alignItems: "center",
            }}
            className="cat-hero-grid"
          >
            <div>
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
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  background: `${color}33`,
                  border: `1px solid ${color}66`,
                  borderRadius: "50px",
                  marginBottom: "20px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {renderIcon(14)} Product Category
              </div>
              <h1 className="heading-xl" style={{ color: "white", marginBottom: "12px" }}>
                {title}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: colors.greenLight,
                  marginBottom: "16px",
                }}
              >
                {tagline}
              </p>
              <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "520px", marginBottom: "32px" }}>
                {description}
              </p>
              {/* ── Compact CTA buttons ── */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <TransitionLink href="/contact" className="btn-primary-sm">
                  Get a Quote <ArrowRight size={14} />
                </TransitionLink>
                <TransitionLink href="/b2b" className="btn-outline-sm">
                  B2B Inquiry
                </TransitionLink>
              </div>
            </div>

            {/* Hero image */}
            <div
              style={{
                background: gradient,
                borderRadius: "32px",
                padding: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "280px",
                minHeight: "280px",
              }}
              className="cat-hero-img"
            >
              {img ? (
                <Image
                  src={img}
                  alt={title}
                  width={220}
                  height={220}
                  style={{ objectFit: "contain", filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.15))", animation: "float 6s ease-in-out infinite" }}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-800)", animation: "float 6s ease-in-out infinite" }}>
                  {renderIcon(120)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--off-white)" /></svg>
        </div>
      </section>

      {/* About Section */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "48px",
              alignItems: "start",
            }}
            className="about-grid"
          >
            <div>
              <h2 className="heading-md reveal" style={{ marginBottom: "16px" }}>
                About Our {title}
              </h2>
              <div className="divider" />
              <p className="body-md reveal" style={{ marginBottom: "20px" }}>
                {fullDescription}
              </p>
              <h3
                className="reveal"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--gray-800)",
                  marginTop: "24px",
                  marginBottom: "16px",
                }}
              >
                What We Offer
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {keyPoints.map((point, i) => (
                  <div
                    key={point}
                    className={`reveal reveal-delay-${Math.min(i + 1, 6)}`}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <CheckCircle size={18} color={color} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.95rem", color: "var(--gray-600)" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="card reveal"
                style={{
                  padding: "32px",
                  background: `linear-gradient(135deg, ${color}08, ${color}15)`,
                  border: `1px solid ${color}25`,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--gray-800)",
                    marginBottom: "20px",
                  }}
                >
                  Need Bulk Supply?
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--gray-600)", lineHeight: 1.7, marginBottom: "24px" }}>
                  We offer competitive pricing for distributors and institutional buyers. Contact us for customized solutions and volume discounts.
                </p>
                <TransitionLink href="/contact" className="btn-blue" style={{ background: color, display: "flex", justifyContent: "center", width: "100%" }}>
                  <Phone size={16} /> Contact Us
                </TransitionLink>
                <div style={{ marginTop: "20px", padding: "16px", background: "rgba(255,255,255,0.7)", borderRadius: "12px" }}>
                  {[
                    "Bulk packaging available",
                    "Custom formulations",
                    "Competitive pricing",
                    "Reliable delivery",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "0.82rem", color: "var(--gray-600)" }}>
                      <CheckCircle size={13} color={color} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid — premium image cards */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-label reveal" style={{ background: `${color}12`, color: color }}>
              Product Range
            </span>
            <h2 className="heading-lg reveal" style={{ color: "var(--gray-800)", marginBottom: "12px" }}>
              {title}
            </h2>
            <p className="body-md reveal" style={{ color: "var(--gray-600)", maxWidth: "500px", margin: "0 auto" }}>
              Explore our carefully formulated range designed for performance, safety, and sustainability.
            </p>
          </div>

          <div className={`bento-grid items-${products.length + 2}`}>
            {/* 1. Category Intro Card (Top Left) */}
            <div
              className="bento-card bento-card-intro reveal reveal-delay-1"
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                minHeight: "440px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "48px",
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
                className={`bento-card bento-card-product reveal reveal-delay-${((i + 1) % 3) + 1}`}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  minHeight: "440px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "36px",
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
                  <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 2, background: color, color: "white", padding: "6px 16px", borderRadius: "50px", fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: `0 4px 16px ${color}60` }}>
                    {product.badge}
                  </div>
                )}

                <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", color: "white" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
                      lineHeight: 1.15,
                      marginBottom: "12px",
                      textShadow: product.img ? "0 2px 10px rgba(0,0,0,0.5)" : "none",
                      color: product.img ? "white" : "var(--gray-800)",
                    }}
                  >
                    {product.name}
                  </h3>

                  <p style={{ fontSize: "0.95rem", color: product.img ? "rgba(255,255,255,0.85)" : "var(--gray-700)", lineHeight: 1.6, marginBottom: "24px", maxWidth: "95%" }}>
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
                        fontWeight: 700,
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

            {/* 3. Black Contact Card (Bottom Right) */}
            <div
              className="bento-card bento-card-contact reveal reveal-delay-3"
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                minHeight: "440px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "48px",
                boxShadow: "0 12px 32px rgba(3, 103, 166, 0.2)",
                background: "var(--gradient-hero)",
                color: "white"
              }}
            >
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 2.5vw, 2.2rem)", fontWeight: 600, marginBottom: "16px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                  Ordering goods is like sending money in just minutes.
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: 1.6, opacity: 0.7, maxWidth: "95%" }}>
                  Empowering your logistics decisions to independent ventures for bulk goods.
                </p>
              </div>

              <div style={{ marginTop: "32px" }}>
                <TransitionLink
                  href="/contact"
                  className="bento-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: color,
                    color: "white",
                    padding: "12px 32px",
                    borderRadius: "50px",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    boxShadow: `0 8px 24px rgba(0,0,0,0.2)`,
                    transition: "all 0.3s ease",
                  }}
                >
                  Contact Us
                </TransitionLink>
              </div>
            </div>
          </div>

          <style>{`
            .bento-grid {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 24px;
            }
            .bento-card {
              cursor: default;
              transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
            }
            .bento-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 20px 48px rgba(0,0,0,0.25) !important;
            }
            .bento-card:hover .bento-bg-img {
              transform: scale(1.08) !important;
            }
            .bento-btn:hover {
              transform: translateY(-2px);
              filter: brightness(1.05);
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
