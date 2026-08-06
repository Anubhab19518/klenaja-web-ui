"use client";
import { useEffect } from "react";
import TransitionLink from "@/components/TransitionLink";
import { colors } from "@/design-system";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Hourglass,
  CheckCircle,
  Building2,
  Hospital,
  GraduationCap,
  Hotel,
  Factory,
  Shield,
  Phone,
  Mail,
} from "lucide-react";

const industries = [
  { name: "Offices & Corporate Spaces", description: "Daily cleaning solutions for workspaces, meeting rooms, and common areas.", color: colors.bluePrimary, img: "/office.avif" },
  { name: "Hospitals & Healthcare", description: "Hospital-grade disinfectants and hygiene products for critical environments.", color: colors.error, img: "/hospitalandhealthcare.jpg" },
  { name: "Schools & Colleges", description: "Safe, effective cleaners for classrooms, washrooms, and campus facilities.", color: colors.warning, img: "/college-1.jpg" },
  { name: "Hotels & Restaurants", description: "Premium hygiene solutions for hospitality — from kitchens to guest rooms.", color: colors.purple, img: "/hotel.avif" },
  { name: "Facility Management", description: "Bulk supply and customized solutions for facility management companies.", color: colors.greenPrimary, img: "/facilitymanagement.avif" },
  { name: "Government & Public Sector", description: "Reliable large-scale supply for government buildings and public facilities.", color: colors.bluePrimary, img: "/government.avif" },
];

const capabilities = [
  { title: "Bulk Packaging & Supply", image: "/b2b/bulk.jpg" },
  { title: "Customized Solutions", image: "/b2b/Customized-Solution.jpg" },
  { title: "Competitive Pricing", image: "/b2b/competitive-pricing.jpg" },
  { title: "Reliable Logistics", image: "/b2b/logistics.jpg" },
];

const whyB2B = [
  "Long-term supply partnerships with assured availability",
  "Dedicated account management for institutional clients",
  "Flexible order quantities to match your usage",
  "Consistent product quality across every batch",
  "Technical support and product usage guidance",
  "Private labelling options available on request",
];

export default function B2BPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        id="b2b-hero-section"
        style={{
          background: "var(--warm-white)",
          paddingTop: "140px",
          paddingBottom: "0px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Top Label */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "16px",
              fontFamily: "var(--font-heading)",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#52525b",
              letterSpacing: "-0.01em",
            }}
          >
            For Commercial & B2B Partners
          </div>

          {/* Main Headline with inline capsule pill */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              fontSize: "clamp(2.2rem, 5.2vw, 4rem)",
              color: "#0F172A",
              lineHeight: 1.25,
              letterSpacing: "-0.035em",
              textAlign: "center",
              maxWidth: "1000px",
              margin: "0 auto 36px",
            }}
          >
            Reduce facility cleaning costs by{" "}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#3b59e8",
                color: "#ffffff",
                padding: "4px 22px 4px 6px",
                borderRadius: "9999px",
                verticalAlign: "middle",
                margin: "0 6px 4px 6px",
                boxShadow: "0 6px 20px rgba(59, 89, 232, 0.25)",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3b59e8",
                  flexShrink: 0,
                }}
              >
                <Hourglass size={20} strokeWidth={2.5} />
              </span>
              <span
                style={{
                  fontSize: "0.95em",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                40%
              </span>
            </span>{" "}
            to scale your operations
          </h1>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <TransitionLink
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#111115",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "9999px",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              Become a Partner <ArrowUpRight size={18} />
            </TransitionLink>
            <TransitionLink
              href="#industries"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: "#18181b",
                border: "1px solid #e4e4e7",
                padding: "14px 28px",
                borderRadius: "9999px",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "all 0.2s ease-in-out",
              }}
              className="hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Learn more
            </TransitionLink>
          </div>

          {/* Trust Subtext */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "48px",
              color: "#52525b",
              fontSize: "0.9rem",
              fontWeight: 450,
            }}
          >
            <BadgeCheck size={18} className="text-[#18181b]" />
            <span>
              Helping <strong style={{ color: "#18181b", fontWeight: 700 }}>500+</strong> commercial clients & institutions scale operations
            </span>
          </div>

          {/* Hero Showcase Card */}
          <div
            style={{
              width: "100%",
              maxWidth: "1140px",
              margin: "0 auto",
              borderRadius: "28px 28px 0 0",
              overflow: "hidden",
              boxShadow: "0 -10px 40px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              background: "#e2e8f0",
              position: "relative",
              height: "280px",
              maxHeight: "280px",
            }}
          >
            <img
              src="/b2b-hero.png"
              alt="Kleanja B2B Commercial Operations"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* B2B Capabilities */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="heading-lg reveal" style={{ color: "var(--gray-800)", marginBottom: "20px" }}>
              Built for Business Scale
            </h2>
            <p
              className="reveal"
              style={{
                color: "#111827",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                lineHeight: 1.6,
                maxWidth: "680px",
                margin: "0 auto 32px",
                fontFamily: "var(--font-body)",
              }}
            >
              <strong>From hospitals to hotels — </strong>
              <span style={{ opacity: 0.45, color: "#111827" }}>
                Kleanja delivers hygiene solutions
              </span>
              <strong> purpose-built for each environment.</strong>
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "16px" }}
            className="capabilities-grid"
          >
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className={`capability-card capability-card-${i} reveal reveal-delay-${i + 1}`}
                style={{
                  position: "relative",
                  minHeight: "250px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "24px",
                  background: "var(--gray-800)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${cap.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="capability-card-image"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,15,25,0.9) 0%, rgba(5,15,25,0.42) 55%, rgba(5,15,25,0.08) 100%)" }} />
                <h3
                  style={{
                    position: "relative",
                    zIndex: 1,
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.45rem",
                    color: "white",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                    textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                    maxWidth: "12ch",
                  }}
                >
                  {cap.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — Curved 3D Gallery (Mockup Style) */}
      <section id="industries" style={{ background: "var(--warm-white)", padding: "100px 0 60px", scrollMarginTop: "80px", position: "relative", overflow: "hidden" }}>
        {/* Subtle pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(26,107,160,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(61,155,58,0.03) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <h2
              className="reveal"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5.5vw, 3rem)",
                color: "#111827",
                lineHeight: 1.15,
                letterSpacing: "-0.035em",
                marginTop: "16px",
                marginBottom: "20px"
              }}
            >
              Trusted Across Every Sector
            </h2>
            <p
              className="reveal"
              style={{
                color: "#111827",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                lineHeight: 1.6,
                maxWidth: "680px",
                margin: "0 auto 32px",
                fontFamily: "var(--font-body)",
              }}
            >
              <strong>From hospitals to hotels — </strong>
              <span style={{ opacity: 0.45, color: "#111827" }}>
                Kleanja delivers hygiene solutions
              </span>
              <strong> purpose-built for each environment.</strong>
            </p>
            <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
              <TransitionLink
                href="/contact"
                className="btn-primary b2b-sectors-btn"
                style={{
                  background: "#111827",
                  color: "white",
                  padding: "14px 36px",
                  borderRadius: "50px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  marginBottom: "48px"
                }}
              >
                Partner With Us
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* 3D curved gallery */}
        <div className="perspective-container reveal">
          <div className="gallery-track">
            {[
              industries[4], // Facility Management
              industries[0], // Offices & Corporate Spaces
              industries[1], // Hospitals & Healthcare
              industries[3], // Hotels & Restaurants (center)
              industries[2], // Schools & Colleges
              industries[5], // Government & Public Sector
              industries[4], // Facility Management (loop)
            ].map((ind, i) => (
              <div
                key={`${ind.name}-${i}`}
                className={`b2b-3d-card b2b-3d-card-${i}`}
              >
                <img
                  src={ind.img}
                  alt={ind.name}
                  className="b2b-3d-card-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concentrated Products Advantage */}
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
            className="concentrated-grid"
          >
            <div>
              <span className="section-label reveal">Cost Efficiency</span>
              <h2 className="heading-lg reveal-left" style={{ marginBottom: "16px" }}>
                Concentrated Solutions — More Value per Litre
              </h2>
              <p className="body-md reveal-left" style={{ marginBottom: "28px" }}>
                Our concentrated cleaning products are engineered for maximum yield — one litre can produce multiple litres of ready-to-use solution. This translates directly to lower cost per use for your business.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {whyB2B.map((point, i) => (
                  <div key={point} className={`reveal-left reveal-delay-${Math.min(i + 1, 6)}`} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <CheckCircle size={18} color="var(--green-primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.95rem", color: "var(--gray-600)" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages card */}
            <div
              className="reveal"
              style={{
                background: "var(--gradient-blue)",
                borderRadius: "32px",
                padding: "48px",
                color: "white",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem", marginBottom: "28px" }}>
                Advantages of Concentrated Products
              </h3>
              {[
                { title: "Reduced Logistics Cost", desc: "Smaller packaging means lower transport and handling costs." },
                { title: "Lower Storage Requirements", desc: "Save warehouse space with compact high-yield formats." },
                { title: "Higher Usage per Unit", desc: "Dilution ratios ensure maximum return on investment." },
                { title: "Improved Cost Efficiency", desc: "Better margins for distributors and reduced OpEx for institutions." },
              ].map((adv) => (
                <div key={adv.title} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px" }}>{adv.title}</p>
                    <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--gradient-hero)",
          padding: "100px 0",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="hero-blob" style={{ width: "400px", height: "400px", top: "-100px", right: "-100px", background: "var(--green-dark)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h2 className="heading-lg" style={{ color: "white", marginBottom: "16px" }}>
            Ready to Partner with Kleanja?
          </h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto 40px" }}>
            Join our network of distributors, wholesalers, and institutional buyers. Let's build a long-term partnership.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <TransitionLink href="/contact" className="btn-primary">
              <Phone size={16} /> Talk to Us
            </TransitionLink>
            <a
              href="mailto:info@kleanja.com"
              className="btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Mail size={16} /> Email Us
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .b2b-hero-grid { grid-template-columns: 1fr !important; }
          .capabilities-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .capability-card { grid-column: span 1 !important; min-height: 260px !important; }
          .concentrated-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .capabilities-grid { grid-template-columns: 1fr !important; }
          .capability-card { min-height: 230px !important; padding: 24px !important; }
        }
        .capability-card-0 { grid-column: span 5; }
        .capability-card-1 { grid-column: span 7; }
        .capability-card-2 { grid-column: span 7; }
        .capability-card-3 { grid-column: span 5; }

        /* 3D Curved Gallery for B2B Industries */
        .perspective-container {
          perspective: 1200px;
          overflow: hidden;
          width: 100%;
          padding: 20px 0 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 460px;
        }

        .gallery-track {
          position: relative;
          width: 100%;
          max-width: 1600px;
          height: 100%;
          transform-style: preserve-3d;
          margin: 0 auto;
          transition: transform 0.3s ease;
        }

        .b2b-3d-card {
          position: absolute;
          left: 50%;
          width: 210px;
          height: 300px;
          border-radius: 20px;
          overflow: hidden;
          transform: translateX(-50%) translate3d(var(--tx), 0, var(--tz)) rotateY(var(--ry));
          z-index: var(--z);
          background: #fff;
        }

        .b2b-3d-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .b2b-sectors-btn {
          transition: all 0.3s ease;
        }
        .b2b-sectors-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.22) !important;
          filter: brightness(1.1);
        }

        /* Desktop Perspective transforms (Equal visual gaps: 12px between each adjacent card) */
        @media (min-width: 1025px) {
          .b2b-3d-card-0 {
            --tx: -616px;
            --tz: 80px;
            --ry: 48deg;
            --z: 4;
          }
          .b2b-3d-card-1 {
            --tx: -425.3px;
            --tz: -10px;
            --ry: 32deg;
            --z: 3;
          }
          .b2b-3d-card-2 {
            --tx: -218.9px;
            --tz: -80px;
            --ry: 16deg;
            --z: 2;
          }
          .b2b-3d-card-3 {
            --tx: 0px;
            --tz: -110px;
            --ry: 0deg;
            --z: 1;
          }
          .b2b-3d-card-4 {
            --tx: 218.9px;
            --tz: -80px;
            --ry: -16deg;
            --z: 2;
          }
          .b2b-3d-card-5 {
            --tx: 425.3px;
            --tz: -10px;
            --ry: -32deg;
            --z: 3;
          }
          .b2b-3d-card-6 {
            --tx: 616px;
            --tz: 80px;
            --ry: -48deg;
            --z: 4;
          }
        }

        @media (min-width: 1025px) and (max-width: 1399px) {
          .gallery-track {
            transform: scale(0.82);
          }
        }
        @media (min-width: 1400px) and (max-width: 1599px) {
          .gallery-track {
            transform: scale(0.92);
          }
        }

        /* Mobile / Tablet Horizontal Scroll fallback */
        @media (max-width: 1024px) {
          .perspective-container {
            perspective: none;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 20px 0 40px;
            height: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .perspective-container::-webkit-scrollbar {
            display: none;
          }
          .gallery-track {
            display: flex;
            position: relative;
            width: auto;
            max-width: none;
            height: auto;
            padding: 0 24px;
            gap: 16px;
            justify-content: flex-start;
            transform-style: flat;
          }
          .b2b-3d-card {
            position: relative;
            left: 0;
            width: 200px;
            height: 280px;
            transform: none !important;
            margin: 0;
            opacity: 1 !important;
            flex-shrink: 0;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}
