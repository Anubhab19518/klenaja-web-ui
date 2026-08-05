"use client";
import { useEffect, useRef } from "react";
import TransitionLink from "@/components/TransitionLink";
import { colors, gradients } from "@/design-system";
import Image from "next/image";
import { ArrowRight, SprayCan, Bath, HandMetal, Utensils, Sparkles, ShieldCheck } from "lucide-react";

const categories = [
  {
    title: "Floor Cleaning Solutions",
    slug: "floor-cleaning",
    tagline: "Deep clean, lasting shine",
    description:
      "Multi-surface floor cleaners, disinfectants, herbal variants, and concentrated solutions designed for tiles, marble, granite, and more.",
    icon: SprayCan,
    color: colors.bluePrimary,
    gradient: gradients.bluePale,
    products: 4,
    img: "/floor-cleaning.png",
  },
  {
    title: "Toilet & Bathroom Cleaners",
    slug: "toilet-bathroom",
    tagline: "Hygiene where it matters most",
    description:
      "Deep-action toilet bowl cleaners, bathroom surface cleaners, descaling solutions, and germ-kill formulations.",
    icon: Bath,
    color: colors.blueDark,
    gradient: gradients.blueSoft,
    products: 4,
    img: "/toilet-cleaner.png",
  },
  {
    title: "Hand Hygiene Products",
    slug: "hand-hygiene",
    tagline: "Clean hands, healthier lives",
    description:
      "Gentle yet effective liquid handwash, antibacterial formulations, and moisturizing solutions for homes and institutions.",
    icon: HandMetal,
    color: colors.greenPrimary,
    gradient: gradients.greenPale,
    products: 4,
    img: "/handwash.png",
  },
  {
    title: "Dishwashing Solutions",
    slug: "dishwashing",
    tagline: "Sparkling clean, every time",
    description:
      "Powerful grease-cutting dishwash liquids and concentrated solutions for kitchens of all sizes.",
    icon: Utensils,
    color: colors.greenDark,
    gradient: gradients.greenSoft,
    products: 3,
    img: "/dishwash.png",
  },
  {
    title: "Glass & Surface Cleaners",
    slug: "glass-surface",
    tagline: "Streak-free brilliance",
    description:
      "Crystal-clear glass cleaners, multi-surface sprays, and office cleaning solutions for spotless presentation.",
    icon: Sparkles,
    color: colors.bluePrimary,
    gradient: gradients.blueMuted,
    products: 3,
    img: "/glass-cleaner.png",
  },
  {
    title: "Phenyl & Disinfectants",
    slug: "phenyl-disinfectants",
    tagline: "Industrial-grade protection",
    description:
      "White phenyl, black phenyl, concentrated disinfectants, and bulk cleaning solutions for large-scale hygiene.",
    icon: ShieldCheck,
    color: colors.blueDark,
    gradient: gradients.blueGray,
    products: 4,
    img: null,
  },
];

export default function ProductsPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target); // animate once only
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" style={{ position: "relative" }}>
        <div
          className="hero-blob"
          style={{ width: "500px", height: "500px", top: "-150px", right: "-150px", background: "var(--blue-light)" }}
        />
        <div
          className="hero-blob"
          style={{ width: "300px", height: "300px", bottom: "-100px", left: "10%", background: "var(--green-dark)" }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span
            className="section-label"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
          >
            Product Portfolio
          </span>
          <h1 className="heading-xl" style={{ color: "white", marginBottom: "20px" }}>
            Our Product Range
          </h1>
          <p
            className="body-lg"
            style={{ color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto 36px" }}
          >
            Comprehensive cleaning and hygiene solutions engineered for homes, offices, hospitals, and beyond.
          </p>
          {/* Jump-to pills */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    fontSize: "0.82rem",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)";
                  }}
                >
                  <Icon size={13} />
                  {cat.title.split(" ")[0]}
                </a>
              );
            })}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--warm-white)" />
          </svg>
        </div>
      </section>

      {/* Zig-Zag Categories */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isEven = i % 2 === 0;

            return (
              <div
                key={cat.slug}
                id={cat.slug}
                style={{ marginBottom: i < categories.length - 1 ? "72px" : 0, scrollMarginTop: "100px" }}
              >
                {/* ZigZag card — the whole card slides in from L or R */}
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`${isEven ? "zz-left" : "zz-right"} products-zigzag-card`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isEven ? "420px 1fr" : "1fr 420px",
                    minHeight: "340px",
                    background: "var(--warm-white)",
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "0 8px 40px rgba(26,107,160,0.09)",
                    border: "1px solid rgba(26,107,160,0.07)",
                    transitionDelay: `${i * 0.08}s`,
                  }}
                >
                  {/* Image Panel */}
                  <div
                    style={{
                      background: cat.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      order: isEven ? 1 : 2,
                      padding: "48px 40px",
                      position: "relative",
                      overflow: "hidden",
                      minHeight: "300px",
                    }}
                  >
                    {/* Decorative circle */}
                    <div
                      style={{
                        position: "absolute",
                        width: "260px",
                        height: "260px",
                        borderRadius: "50%",
                        background: `${cat.color}12`,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        background: `${cat.color}09`,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                    {cat.img ? (
                      <Image
                        src={cat.img}
                        alt={cat.title}
                        width={240}
                        height={240}
                        style={{
                          objectFit: "contain",
                          filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.13))",
                          position: "relative",
                          zIndex: 1,
                          transition: "transform 0.4s ease",
                        }}
                        className="cat-product-img"
                      />
                    ) : (
                      <div
                        style={{
                          position: "relative",
                          zIndex: 1,
                          color: cat.color,
                          opacity: 0.55,
                        }}
                      >
                        <Icon size={120} strokeWidth={0.85} />
                      </div>
                    )}
                  </div>

                  {/* Content Panel */}
                  <div
                    style={{
                      order: isEven ? 2 : 1,
                      padding: "44px 48px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    className="product-content"
                  >
                    {/* Products count badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "5px 14px",
                        background: `${cat.color}12`,
                        color: cat.color,
                        borderRadius: "50px",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "18px",
                        width: "fit-content",
                      }}
                    >
                      <Icon size={12} />
                      {cat.products} Products
                    </div>

                    <h2
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                        color: "var(--gray-800)",
                        marginBottom: "8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {cat.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: cat.color,
                        marginBottom: "14px",
                      }}
                    >
                      {cat.tagline}
                    </p>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--gray-600)",
                        lineHeight: 1.75,
                        marginBottom: "30px",
                        maxWidth: "440px",
                      }}
                    >
                      {cat.description}
                    </p>

                    <TransitionLink
                      href={`/products/${cat.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "11px 26px",
                        background: cat.color,
                        color: "white",
                        borderRadius: "50px",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        textDecoration: "none",
                        width: "fit-content",
                        transition: "all 0.25s ease",
                      }}
                      className="cat-explore-btn"
                    >
                      Explore Category <ArrowRight size={15} />
                    </TransitionLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .products-zigzag-card {
            grid-template-columns: 1fr !important;
          }
          .products-zigzag-card > div {
            order: unset !important;
          }
          .product-content {
            padding: 32px 28px !important;
          }
        }
        .products-zigzag-card:hover .cat-product-img {
          transform: scale(1.05) !important;
        }
        .cat-explore-btn:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 28px rgba(0,0,0,0.18) !important;
          opacity: 0.92;
        }
      `}</style>
    </>
  );
}
