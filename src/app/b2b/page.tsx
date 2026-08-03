"use client";
import { useEffect } from "react";
import TransitionLink from "@/components/TransitionLink";
import { colors } from "@/design-system";

import {
  ArrowRight,
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
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-blob" style={{ width: "500px", height: "500px", top: "-150px", right: "-150px", background: "var(--blue-light)" }} />
        <div className="hero-blob" style={{ width: "350px", height: "350px", bottom: "-100px", left: "5%", background: "var(--green-dark)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}
            className="b2b-hero-grid"
          >
            <div>
              <span className="section-label" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}>
                B2B Solutions
              </span>
              <h1 className="heading-xl" style={{ color: "white", marginBottom: "20px" }}>
                Scale Your Cleaning Operations with Kleanja
              </h1>
              <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", marginBottom: "32px" }}>
                Bulk supply, customized formulations, and long-term partnerships designed for businesses, institutions, and distributors across India.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <TransitionLink href="/contact" className="btn-primary">
                  Become a Partner <ArrowRight size={16} />
                </TransitionLink>
                <TransitionLink href="#industries" className="btn-outline">
                  Industries We Serve
                </TransitionLink>
              </div>
            </div>

            {/* Stats panel */}
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "24px",
                padding: "40px",
              }}
            >
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "24px" }}>
                Our B2B Capabilities
              </p>
              {[
                { label: "Product Categories", value: "6+" },
                { label: "Pack Sizes Available", value: "5L – 200L" },
                { label: "Industries Served", value: "6+" },
                { label: "Supply Model", value: "Pan India" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heading)" }}>{item.label}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: colors.greenLight }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--off-white)" /></svg>
        </div>
      </section>

      {/* B2B Capabilities */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label reveal">Our Capabilities</span>
            <h2 className="heading-lg reveal" style={{ color: "var(--gray-800)" }}>
              Built for Business Scale
            </h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "20px" }}
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
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "30px",
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
                    fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
                    color: "white",
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    margin: 0,
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

      {/* Industries — Premium Photo Cards */}
      <section id="industries" style={{ background: "var(--gray-800)", padding: "96px 0", scrollMarginTop: "80px", position: "relative", overflow: "hidden" }}>
        {/* Subtle pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(26,107,160,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(61,155,58,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              className="section-label reveal"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Industries We Serve
            </span>
            <h2 className="heading-lg reveal" style={{ color: "white", marginBottom: "14px" }}>
              Trusted across every sector
            </h2>
            <p className="body-md reveal" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "500px", margin: "0 auto" }}>
              From hospitals to hotels — Kleanja delivers hygiene solutions purpose-built for each environment.
            </p>
          </div>

          {/* 3 × 2 Photo Card Grid */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
            className="industries-photo-grid"
          >
            {industries.map((ind, i) => (
              <div
                key={ind.name}
                className={`industry-photo-card reveal reveal-delay-${(i % 3) + 1}`}
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: "340px",
                  cursor: "default",
                  transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-8px) scale(1.02)";
                  el.style.boxShadow = `0 28px 56px rgba(0,0,0,0.5), 0 0 0 1px ${ind.color}60`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.35)";
                }}
              >
                {/* Background photo */}
                <img
                  src={ind.img}
                  alt={ind.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  className="industry-card-photo"
                />

                {/* Dark gradient overlay — heavier at bottom */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(5,15,25,0.92) 0%, rgba(5,15,25,0.45) 50%, rgba(5,15,25,0.08) 100%)",
                  }}
                />

                {/* Colour accent line at top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${ind.color}, ${ind.color}00)`,
                  }}
                />

                {/* Content at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px 28px 26px",
                  }}
                >
                  {/* Icon chip */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: `${ind.color}25`,
                      border: `1px solid ${ind.color}55`,
                      backdropFilter: "blur(8px)",
                      marginBottom: "12px",
                    }}
                  >
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "white",
                      marginBottom: "6px",
                      lineHeight: 1.2,
                    }}
                  >
                    {ind.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                    className="industry-card-desc"
                  >
                    {ind.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concentrated Products Advantage */}
      <section className="section" style={{ background: "var(--gray-50)" }}>
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
          .industries-photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .industries-photo-grid { grid-template-columns: 1fr !important; }
          .capabilities-grid { grid-template-columns: 1fr !important; }
          .capability-card { min-height: 230px !important; padding: 24px !important; }
          .industry-photo-card { height: 280px !important; }
        }
        .capability-card-0 { grid-column: span 5; }
        .capability-card-1 { grid-column: span 7; }
        .capability-card-2 { grid-column: span 7; }
        .capability-card-3 { grid-column: span 5; }
        .capability-card:hover .capability-card-image { transform: scale(1.06); }
        .industry-photo-card:hover .industry-card-photo {
          transform: scale(1.06);
        }
        .industry-card-desc {
          transition: opacity 0.3s ease;
          opacity: 0.75;
        }
        .industry-photo-card:hover .industry-card-desc {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
