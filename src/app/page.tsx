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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const stats = [
  { value: "6+", label: "Product Categories" },
  { value: "20+", label: "Product Variants" },
  { value: "B2B", label: "Bulk Supply Ready" },
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
    img: "/cat_1.png",
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
    <section className="industries-section" style={{ background: "var(--warm-white)", padding: "80px 0 0" }}>
      {/* Text header above the slider */}
      <div className="container industries-heading" style={{ marginBottom: "48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(2.2rem, 6vw, 3rem)", color: "var(--gray-800)", lineHeight: 1.15, marginBottom: "16px" }}>
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

function WhyKleanjaSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bentoSlides = [
    {
      title: "Showcase our best products",
      desc: "We engineer cleaning products that deliver measurable results — from germ protection to streak-free shine. Every formulation is tested for consistency and effectiveness.",
    },
    {
      title: "Wide Product Range",
      desc: "6 core cleaning categories and 20+ specialized variants crafted for residential, institutional, and industrial applications.",
    },
    {
      title: "Concentrated Solutions",
      desc: "Industrial-grade concentrated liquids designed to deliver higher yield per unit, significantly cutting facility maintenance costs.",
    },
    {
      title: "Eco-Conscious Formulations",
      desc: "Herbal and environmentally safe product variants developed with non-toxic, biodegradable ingredients.",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bentoSlides.length) % bentoSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bentoSlides.length);
  };

  return (
    <section className="section" style={{ background: "var(--warm-white)" }}>
      <div className="container">
        {/* Centered Heading */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px auto" }}>
          <span className="section-label section-label-blue reveal">Why Kleanja</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug text-semibold" style={{ color: "var(--gray-800)", marginBottom: "16px" }}>
            Built for performance.<br />Priced for value.
          </h2>
          <p className="body-md reveal" style={{ marginBottom: "0" }}>
            We engineer cleaning products that deliver measurable results — from germ protection to streak-free shine. Every formulation is tested for consistency and effectiveness.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="why-bento">
          {/* Card 1: Top-Left Yellow Featured Card */}
          <div className="bento-card bento-card-1 reveal reveal-delay-1">
            <div className="bento-yellow-content">
              <div>
                <h3 className="bento-yellow-title">
                  {bentoSlides[currentSlide].title}
                </h3>
                <p className="bento-yellow-desc">
                  {bentoSlides[currentSlide].desc}
                </p>
              </div>
              {/* Navigation Arrows */}
              <div className="bento-nav-arrows">
                <button
                  onClick={prevSlide}
                  aria-label="Previous feature"
                  className="bento-arrow-btn"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next feature"
                  className="bento-arrow-btn"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Top-Right Image Card */}
          <div className="bento-card bento-card-2 reveal reveal-delay-2">
            <Image
              src="/quality.avif"
              alt="Project name"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="bento-bg-img"
            />
            <div className="bento-card-overlay" />
            <div className="bento-card-body">
              <h4 className="bento-card-title">Assured Quality</h4>
              <p className="bento-card-desc">
                Rigorous testing and strict controls ensure every batch meets quality benchmarks.
              </p>
              <TransitionLink href="/products" className="bento-yellow-pill-btn">
                Explore Now
              </TransitionLink>
            </div>
          </div>

          {/* Card 3: Bottom-Left Image Card */}
          <div className="bento-card bento-card-3 reveal reveal-delay-3">
            <Image
              src="/wideproductrange.jpg"
              alt="Project name"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="bento-bg-img"
            />
            <div className="bento-card-overlay" />
            <div className="bento-card-body">
              <h4 className="bento-card-title">Wide Product Range</h4>
              <TransitionLink href="/products" className="bento-yellow-pill-btn">
                Explore Now
              </TransitionLink>
            </div>
          </div>

          {/* Card 4: Bottom-Middle Photo Card */}
          <div className="bento-card bento-card-4 reveal reveal-delay-4">
            <Image
              src="/ecofriendly.jpg"
              alt="Eco-Friendly Formulations"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="bento-bg-img"
            />
          </div>

          {/* Card 5: Bottom-Right Solid Black Card */}
          <div className="bento-card bento-card-5 reveal reveal-delay-5">
            <div className="bento-black-content">
              <div>
                <h3 className="bento-black-title">
                  Ordering goods is like sending money in just minutes.
                </h3>
                <p className="bento-black-desc">
                  Empowering your logistics decisions to independent ventures for bulk goods.
                </p>
              </div>
              <TransitionLink href="/b2b" className="bento-yellow-pill-btn">
                Contact Us
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-bento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 360px 420px;
          gap: 16px;
        }

        .bento-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .bento-bg-img {
          object-fit: cover;
          z-index: 0;
        }

        /* Card 1: Top-Left Featured Sliding Card */
        .bento-card-1 {
          grid-column: 1 / span 2;
          grid-row: 1;
          background: var(--ds-color-primary);
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bento-yellow-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .bento-yellow-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(1.8rem, 2.8vw, 2.5rem);
          color: #ffffff;
          line-height: 1.25;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .bento-yellow-desc {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          max-width: 540px;
        }

        .bento-nav-arrows {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }

        .bento-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid #ffffff;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          transition: all 0.2s ease;
        }

        .bento-arrow-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.06);
        }

        /* Card 2, 3, 4: Image Cards */
        .bento-card-2 {
          grid-column: 3 / span 1;
          grid-row: 1;
        }

        .bento-card-3 {
          grid-column: 1 / span 1;
          grid-row: 2;
        }

        .bento-card-4 {
          grid-column: 2 / span 1;
          grid-row: 2;
        }

        .bento-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(3, 67, 106, 0.92) 0%,
            rgba(3, 67, 106, 0.35) 55%,
            transparent 100%
          );
          z-index: 1;
        }

        .bento-card-body {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          color: white;
        }

        .bento-card-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.45rem;
          color: #ffffff;
          margin-bottom: 6px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        .bento-card-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.45;
          margin-bottom: 16px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }

        /* Accent Pill Button */
        .bento-yellow-pill-btn {
          background: var(--ds-color-accent);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 10px 24px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(39, 140, 11, 0.3);
        }

        .bento-yellow-pill-btn:hover {
          background: #1E6B08;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(39, 140, 11, 0.4);
        }

        /* Card 5: Bottom-Right Solid Primary Card */
        .bento-card-5 {
          grid-column: 3 / span 1;
          grid-row: 2;
          background: var(--ds-color-primary);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bento-black-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
        }

        .bento-black-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: clamp(1.4rem, 1.8vw, 1.75rem);
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .bento-black-desc {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.55;
        }

        /* Mobile / Tablet Responsiveness */
        @media (max-width: 900px) {
          .why-bento {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 20px;
          }

          .bento-card-1,
          .bento-card-2,
          .bento-card-3,
          .bento-card-4,
          .bento-card-5 {
            grid-column: span 1 !important;
            grid-row: auto !important;
            min-height: 340px;
          }
        }
      `}</style>
    </section>
  );
}

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
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
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
          background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.35)), url('/hero_image.jpg') no-repeat center center",
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
                Dirt ka the end.
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
                Premium cleaning & hygiene solutions engineered for homes, offices, hospitals, and industries. Superior performance. Proven results.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <TransitionLink
                  href="/products"
                  className="hero-btn-pill"
                >
                  Explore Products
                </TransitionLink>
                <TransitionLink
                  href="/products"
                  className="hero-btn-circle"
                >
                  <ArrowRight size={20} style={{ transform: "rotate(-45deg)" }} />
                </TransitionLink>
              </div>
            </div>

            {/* Right — Empty to let background image show the device */}
            <div className="hidden-mobile" />
          </div>
        </div>
      </section>

      {/* ============ DISTRIBUTION NETWORK ============ */}
      <section className="distribution-section" style={{ background: "var(--warm-white)", padding: "clamp(48px, 9vw, 72px) 0" }}>
        <div className="container">
          <div className="distribution-layout">
            <div className="distribution-copy">
              <p className="label reveal" style={{ color: "var(--blue-primary)", marginBottom: "14px" }}>
                Our reach
              </p>
              <h2 className="heading-lg reveal" style={{ color: "var(--gray-800)", marginBottom: "20px", maxWidth: "620px" }}>
                We Have Distributions All Over India!
              </h2>
              <p className="reveal" style={{ color: "var(--gray-600)", fontSize: "1rem", maxWidth: "560px", marginBottom: "42px" }}>
                From homes to businesses, Kleanja products move through a dependable network built to serve customers across the country.
              </p>
              <div className="distribution-stats">
                {stats.map((stat, i) => (
                  <div key={stat.label} className={`distribution-stat reveal reveal-delay-${i + 1}`}>
                    <div className="distribution-stat-value">{stat.value}</div>
                    <div className="distribution-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="distribution-map reveal reveal-delay-2" aria-label="Kleanja distribution network across India">
              {/* Adjust mapHeight here to change the map's visual size. */}
              <IndiaDistributionMap large mapHeight="clamp(360px, 50vw, 450px)" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCT CATEGORIES ============ */}
      <ProductCategoriesCarousel categories={categories} />

      {/* ============ WHY CHOOSE KLEANJA ============ */}
      <WhyKleanjaSection />
      <CleanEverySurface />

      {/* ============ INDUSTRIES WE SERVE — Photo Slider ============ */}
      <IndustriesSlider />

      {/* ============ B2B HIGHLIGHT ============ */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
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
        .hero-btn-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 36px;
          background: white;
          color: #1D2939;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }
        .hero-btn-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          background: #f8faf8;
        }
        .hero-btn-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: white;
          color: #1D2939;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }
        .hero-btn-circle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          background: #f8faf8;
        }
        .home-hero-copy {
          text-align: left;
        }
        .distribution-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 0.95fr);
          align-items: center;
          gap: clamp(40px, 7vw, 112px);
        }
        .distribution-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .distribution-stat {
          min-width: 0;
          padding: 4px clamp(14px, 2vw, 30px);
          border-right: 1px solid var(--gray-200);
        }
        .distribution-stat:first-child { padding-left: 0; }
        .distribution-stat:last-child { border-right: none; }
        .distribution-stat-value {
          font-family: var(--font-heading);
          font-size: clamp(2.45rem, 4.2vw, 4.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.055em;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
        }
        .distribution-stat-label {
          color: var(--gray-600);
          font-size: clamp(0.72rem, 1.1vw, 0.9rem);
          font-weight: 600;
          line-height: 1.45;
        }
        .distribution-map {
          min-height: 0;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 13%, #000 86%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 13%, #000 86%, transparent 100%);
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .b2b-card { grid-template-columns: 1fr !important; }
          .distribution-layout { grid-template-columns: 1fr; gap: 28px; }
          .distribution-copy {
            max-width: 100%;
            text-align: center;
            margin: 0 auto;
          }
          .distribution-copy > h2,
          .distribution-copy > p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .distribution-map {
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
          }
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
          .distribution-section { padding: 72px 0 !important; }
          .distribution-stats { gap: 0; }
          .distribution-stat { padding: 4px 12px; }
          .distribution-stat-value { font-size: clamp(2rem, 11vw, 3rem); }
          .distribution-stat-label { font-size: 0.7rem; }
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
        }
      `}</style>
    </>
  );
}
