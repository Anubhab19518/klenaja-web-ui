"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CleanEverySurface from "@/components/CleanEverySurface";
import { colors, gradients } from "@/design-system";
import dynamic from "next/dynamic";
const IndiaDistributionMap = dynamic(() => import("@/components/IndiaDistributionMap"), { ssr: false });
import TransitionLink from "@/components/TransitionLink";
import FAQSection from "@/components/FAQSection";
import ProductCategoriesCarousel from "@/components/ProductCategoriesCarousel";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Star,
  Leaf,
  Truck,
  Award,
  Users,
  TrendingUp,
  FlaskConical,
  Sparkles,
  SprayCan,
  Bath,
  HandMetal,
  Utensils,
  Monitor,
  ShieldCheck,
} from "lucide-react";

const stats = [
  { value: "6+", label: "Product Categories" },
  { value: "20+", label: "Product Variants" },
  { value: "B2B", label: "Bulk Supply Ready" },
  { type: "map"},
];

const categories = [
  {
    title: "Floor Cleaning",
    tagline: "Deep clean, lasting shine.",
    description:
      "Multi-surface cleaners, disinfectants & herbal variants for every type of flooring.",
    icon: SprayCan,
    color: colors.bluePrimary,
    bgGrad: gradients.bluePale,
    href: "/products/floor-cleaning",
    img: "/floor-cleaning.png",
  },
  {
    title: "Toilet & Bathroom",
    tagline: "Hygiene where it matters most.",
    description:
      "Toilet bowl cleaners, descaling solutions & germ-kill formulations.",
    icon: Bath,
    color: colors.blueDark,
    bgGrad: gradients.blueSoft,
    href: "/products/toilet-bathroom",
    img: "/toilet-cleaner.png",
  },
  {
    title: "Hand Hygiene",
    tagline: "Clean hands, healthier lives.",
    description:
      "Antibacterial liquid handwash with moisturizing formulations for homes & institutions.",
    icon: HandMetal,
    color: colors.greenPrimary,
    bgGrad: gradients.greenPale,
    href: "/products/hand-hygiene",
    img: "/handwash.png",
  },
  {
    title: "Dishwashing",
    tagline: "Sparkling clean, every time.",
    description:
      "Powerful grease-cutting dishwash liquids for domestic kitchens and food service.",
    icon: Utensils,
    color: colors.greenDark,
    bgGrad: gradients.greenSoft,
    href: "/products/dishwashing",
    img: "/dishwash.png",
  },
  {
    title: "Glass & Surface",
    tagline: "Streak-free brilliance.",
    description:
      "Crystal-clear glass cleaners and multi-surface sprays for offices & homes.",
    icon: Monitor,
    color: colors.bluePrimary,
    bgGrad: gradients.blueMuted,
    href: "/products/glass-surface",
    img: "/glass-cleaner.png",
  },
  {
    title: "Phenyl & Disinfectants",
    tagline: "Industrial-grade protection.",
    description:
      "White & black phenyl, concentrated disinfectants for large-scale hygiene.",
    icon: ShieldCheck,
    color: colors.blueDark,
    bgGrad: gradients.blueGray,
    href: "/products/phenyl-disinfectants",
    img: null,
  },
];

const industries = [
  { name: "Hospitality", label: "Hotels & Restaurants", img: "/hotel.avif", href: "/b2b" },
  { name: "Healthcare", label: "Hospitals & Clinics", img: "/hospital.jpg", href: "/b2b" },
  { name: "Education", label: "Schools & Colleges", img: "/college-1.jpg", href: "/b2b" },
  { name: "Facility Management", label: "Commercial Facilities", img: "/facilitymanagement.avif", href: "/b2b" },
  { name: "Government", label: "Public & Govt. Institutions", img: "/government.avif", href: "/b2b" },
  { name: "Corporate", label: "Offices & Workspaces", img: "/office.avif", href: "/b2b" },
];

function IndustriesSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (dir: 1 | -1) => {
    setCurrent((c) => (c + dir + industries.length) % industries.length);
  };

  useEffect(() => {
    if (isHovered) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % industries.length), 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered]);

  const ind = industries[current];

  return (
    <section className="industries-section" style={{ background: "var(--off-white)", padding: "80px 0 0" }}>
      {/* Text header above the slider */}
      <div className="container industries-heading" style={{ marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--gray-800)", lineHeight: 1.15, marginBottom: "16px" }}>
          We Deliver <span style={{ color: "var(--green-primary)" }}>Solutions</span>,<br />For Every Industry.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--gray-600)", maxWidth: "640px", lineHeight: 1.7 }}>
          Our expertly formulated products serve a diverse range of sectors including hospitality, healthcare, education, facility management, government, and corporate environments.
        </p>
      </div>

      {/* Full-bleed photo slider */}
      <div
        className="industries-slider"
        style={{ position: "relative", width: "100%", height: "500px", overflow: "hidden", cursor: "pointer" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides */}
        {industries.map((item, i) => (
          <div
            key={item.name}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.8s ease",
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={item.img}
              alt={item.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={i === 0}
            />
            {/* Dark gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />
          </div>
        ))}

        {/* Center content overlay */}
        <div className="industries-slider-content" style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "12px" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
            INDUSTRIES
          </p>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "white", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1, textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
            {ind.name}
          </h3>
          <TransitionLink
            href={ind.href}
            className="slider-btn"
          >
            VIEW RANGE
          </TransitionLink>
        </div>

        {/* Left arrow */}
        <button
          className="industry-slider-arrow industry-slider-arrow-prev"
          onClick={() => go(-1)}
          aria-label="Previous industry"
          style={{ position: "absolute", left: "40px", top: "50%", transform: "translateY(-50%)", zIndex: 20, background: "transparent", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "50%", width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: "1.4rem", transition: "all 0.2s ease", backdropFilter: "blur(4px)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "white"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.7)"; }}
        >
          ←
        </button>

        {/* Right arrow */}
        <button
          className="industry-slider-arrow industry-slider-arrow-next"
          onClick={() => go(1)}
          aria-label="Next industry"
          style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", zIndex: 20, background: "transparent", border: "2px solid rgba(255,255,255,0.7)", borderRadius: "50%", width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: "1.4rem", transition: "all 0.2s ease", backdropFilter: "blur(4px)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "white"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.7)"; }}
        >
          →
        </button>

        {/* Dot indicators */}
        <div className="industry-slider-dots" style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", gap: "8px" }}>
          {industries.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === current ? "white" : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const whyChoose = [
  { icon: Star, title: "Wide Product Range", desc: "6 categories, 20+ variants for every cleaning need.", img: "/wideproductrange.jpg" },
  { icon: Award, title: "Quality Assured", desc: "Formulations crafted for consistent, effective performance.", img: "/quality.avif" },
  { icon: Leaf, title: "Eco-Friendly Options", desc: "Herbal and environmentally conscious product variants.", img: "/ecofriendly.jpg" },
  { icon: Truck, title: "Reliable Supply", desc: "Pan India distribution with dependable logistics.", img: "/reliablesupply.jpg" },
  { icon: FlaskConical, title: "Concentrated Solutions", desc: "Higher yield per unit — reduce cost, not quality.", img: "/concentrated.jpg" },
  { icon: Users, title: "B2B Capabilities", desc: "Bulk packaging and custom solutions for institutions.", img: "/b2b.jpg" },
];

export default function Home() {
  const revealRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    elements.forEach((el) => observer.observe(el));
    revealRef.current = elements;

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section
        className="home-hero"
        style={{
          background: "var(--gradient-hero)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "84px",
        }}
      >
        {/* Decorative blobs */}
        <div className="hero-blob" style={{ width: "600px", height: "600px", top: "-200px", right: "-200px", background: "var(--blue-primary)" }} />
        <div className="hero-blob" style={{ width: "400px", height: "400px", bottom: "-150px", left: "-100px", background: "var(--green-dark)" }} />
        <div className="hero-blob" style={{ width: "300px", height: "300px", top: "30%", right: "30%", background: "var(--blue-light)", opacity: 0.1 }} />

        {/* Animated ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "12%",
            transform: "translateY(-50%)",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "80px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Left — Text */}
            <div className="home-hero-copy">
              

              <h1
                className="heading-xl"
                style={{
                  color: "white",
                  marginBottom: "12px",
                  animation: "fadeInUp 0.7s 0.1s ease both",
                }}
              >
                Dirt Ka
                <br />
                <span
                  style={{
                    background: gradients.successToBlue,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  The End.
                </span>
              </h1>

              <p
                className="body-lg"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  maxWidth: "480px",
                  marginBottom: "36px",
                  animation: "fadeInUp 0.7s 0.2s ease both",
                }}
              >
                Premium cleaning & hygiene solutions engineered for homes, offices, hospitals, and industries. Superior performance. Proven results.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  animation: "fadeInUp 0.7s 0.3s ease both",
                }}
              >
                <TransitionLink href="/products" className="btn-primary">
                  Explore Products <ArrowRight size={18} />
                </TransitionLink>
                <TransitionLink href="/b2b" className="btn-outline">
                  B2B Solutions
                </TransitionLink>
              </div>

              {/* Trust strip */}
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  marginTop: "40px",
                  flexWrap: "wrap",
                  animation: "fadeInUp 0.7s 0.4s ease both",
                }}
              >
                {["Germ Protection", "Eco-Friendly Variants", "Concentrated Solutions"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle size={15} color={colors.greenLight} />
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heading)", fontWeight: 500 }}>
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Product Image */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                animation: "fadeInRight 0.8s 0.2s ease both",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "480px",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <Image
                  src="/hero-products.png"
                  alt="Kleanja Premium Cleaning Products"
                  width={420}
                  height={420}
                  style={{ objectFit: "contain", borderRadius: "50%" }}
                  priority
                />
                {/* Floating badges */}
                <div
                  style={{
                    position: "absolute",
                    top: "15%",
                    left: "-10%",
                    background: "white",
                    borderRadius: "12px",
                    padding: "10px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    animation: "float 4s 1s ease-in-out infinite",
                  }}
                >
                  <Sparkles size={16} color={colors.greenPrimary} />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A" }}>6 Categories</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "20%",
                    right: "-10%",
                    background: "white",
                    borderRadius: "12px",
                    padding: "10px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    animation: "float 5s 0.5s ease-in-out infinite",
                  }}
                >
                  <Shield size={16} color={colors.bluePrimary} />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A" }}>Germ Kill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="var(--off-white)" />
          </svg>
        </div>
      </section>

      {/* ============ STATS BANNER ============ */}
      <section style={{ background: "var(--off-white)", padding: "60px 0" }}>
        <div className="container">
          <div
            className="stats-card"
            style={{
              background: "var(--warm-white)",
              borderRadius: "24px",
              padding: "48px",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid rgba(26,107,160,0.06)",
            }}
          >
            <p
              className="label reveal"
              style={{ color: "var(--blue-primary)", textAlign: "center", marginBottom: "8px" }}
            >
              Kleanja at a Glance
            </p>
            <h2
              className="heading-md reveal"
              style={{ textAlign: "center", marginBottom: "40px", color: "var(--gray-800)" }}
            >
              Trusted across India's homes and businesses
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                background: "var(--gray-100)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
              className="stats-grid"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    background: "white",
                    padding: "24px",
                    textAlign: "center",
                    minHeight: "250px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.type === "map" ? (
                    <IndiaDistributionMap />
                  ) : (
                    <>
                      <div
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "clamp(2rem,4vw,3rem)",
                          fontWeight: 800,
                          background: "var(--gradient-brand)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          marginBottom: "8px",
                        }}
                      >
                        {stat.value}
                      </div>

                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--gray-600)",
                        }}
                      >
                        {stat.label}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCT CATEGORIES ============ */}
      <ProductCategoriesCarousel categories={categories} />

      {/* ============ WHY CHOOSE KLEANJA ============ */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          {/* Centered Heading */}
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px auto" }}>
            <span className="section-label section-label-blue reveal">Why Kleanja</span>
            <h2 className="heading-lg reveal" style={{ color: "var(--gray-800)", marginBottom: "16px" }}>
              Built for performance.<br />Priced for value.
            </h2>
            <p className="body-md reveal" style={{ marginBottom: "0" }}>
              We engineer cleaning products that deliver measurable results — from germ protection to streak-free shine. Every formulation is tested for consistency and effectiveness.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="why-bento">
            {whyChoose.map((item, i) => (
              <div
                key={item.title}
                className={`why-card why-card-${i} reveal reveal-delay-${(i % 3) + 1}`}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "32px",
                  background: "#111",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                }}
              >
                {/* Background Image */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover", zIndex: 0, transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  className="why-bg-img"
                />
                {/* Dark Gradient Overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)", zIndex: 1 }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 2, color: "white" }}>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", color: "white", marginBottom: "8px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .why-bento {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, 280px);
            gap: 24px;
          }
          .why-card {
            cursor: default;
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          }
          .why-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 48px rgba(0,0,0,0.25) !important;
          }
          .why-card:hover .why-bg-img {
            transform: scale(1.08) !important;
          }
          
          /* Asymmetrical Bento layout */
          .why-card-0 { grid-column: span 2; grid-row: span 2; }
          .why-card-1 { grid-column: span 2; grid-row: span 1; }
          .why-card-2 { grid-column: span 1; grid-row: span 1; }
          .why-card-3 { grid-column: span 1; grid-row: span 2; }
          .why-card-4 { grid-column: span 2; grid-row: span 1; }
          .why-card-5 { grid-column: span 1; grid-row: span 1; }

          @media (max-width: 900px) {
            .why-bento {
              grid-template-columns: 1fr;
              grid-template-rows: auto;
            }
            .why-card {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
              min-height: 320px;
            }
          }
        `}</style>
      </section>
      <CleanEverySurface />

      {/* ============ INDUSTRIES WE SERVE — Photo Slider ============ */}
      <IndustriesSlider />

      {/* ============ B2B HIGHLIGHT ============ */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, var(--blue-dark) 0%, var(--blue-primary) 100%)",
              borderRadius: "32px",
              padding: "64px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "40px",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
            className="b2b-card"
          >
            <div className="hero-blob" style={{ width: "300px", height: "300px", top: "-80px", right: "100px", background: "var(--green-dark)", opacity: 0.15 }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div className="section-label reveal" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}>
                Bulk & B2B Supply
              </div>
              <h2 className="heading-lg reveal" style={{ color: "white", marginBottom: "16px" }}>
                Scalable Solutions for <br />Your Business
              </h2>
              <p className="body-lg reveal" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "520px", marginBottom: "24px" }}>
                Competitive pricing, bulk packaging, customized formulations, and reliable logistics — designed to support distributors, wholesalers, and institutional buyers.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  maxWidth: "460px",
                }}
                className="b2b-features"
              >
                {[
                  "Bulk packaging & supply",
                  "Customized product solutions",
                  "Competitive distributor pricing",
                  "Reliable logistics & delivery",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle size={15} color={colors.greenLight} />
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-heading)", fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative", zIndex: 2, flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
              <TrendingUp size={80} color="rgba(255,255,255,0.12)" style={{ position: "absolute", top: "-20px", right: "-20px" }} />
              <TransitionLink href="/b2b" className="btn-primary" style={{ background: "var(--warm-white)", color: "var(--blue-primary)" }}>
                Partner With Us <ArrowRight size={18} />
              </TransitionLink>
              <TransitionLink href="/contact" className="btn-outline">
                Get a Quote
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <style>{`
        .slider-btn {
          margin-top: 8px;
          display: inline-block;
          padding: 12px 32px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 4px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          color: white;
          text-decoration: none;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }
        .slider-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .b2b-card { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
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
            margin-left: auto;
            margin-right: auto;
          }
          .home-hero-copy > div {
            justify-content: center;
          }
          .stats-card {
            padding: 24px !important;
          }
          .industries-section {
            padding-top: 56px !important;
          }
          .industries-heading {
            margin-bottom: 32px !important;
          }
          .industries-slider {
            height: 430px !important;
          }
          .industries-slider-content {
            padding: 0 52px;
          }
          .industry-slider-arrow {
            top: auto !important;
            bottom: 52px !important;
            width: 44px !important;
            height: 44px !important;
            transform: none !important;
          }
          .industry-slider-arrow-prev {
            left: calc(50% - 68px) !important;
          }
          .industry-slider-arrow-next {
            right: calc(50% - 68px) !important;
          }
          .industry-slider-dots {
            bottom: 20px !important;
          }
          .b2b-card { padding: 32px !important; }
          .b2b-features { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
