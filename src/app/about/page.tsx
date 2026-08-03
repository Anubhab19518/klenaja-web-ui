"use client";
import { useEffect } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { colors } from "@/design-system";
import { ArrowRight, Target, Lightbulb, Award, Leaf, CheckCircle } from "lucide-react";

const values = [
  { title: "Quality First", desc: "Every product formulated to consistent standards — no compromise on performance.", img: "/about/quality-first.jpg" },
  { title: "Continuous Innovation", desc: "Evolving our range to meet changing market demands and technology advances.", img: "/about/innovation.jpg" },
  { title: "Eco-Conscious", desc: "Herbal and eco-friendly variants that respect the environment.", img: "/about/ecofriendly.png" },
  { title: "Customer Focus", desc: "Delivering measurable value through effective, easy-to-use solutions.", img: "/about/customer_matter.jpg" },
];

export default function AboutPage() {
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
        <div className="hero-blob" style={{ width: "300px", height: "300px", bottom: "-100px", left: "10%", background: "var(--green-dark)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span className="section-label" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}>
            Our Story
          </span>
          <h1 className="heading-xl" style={{ color: "white", marginBottom: "20px" }}>
            About Kleanja
          </h1>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto" }}>
            Born from a belief that every home and business deserves powerful, affordable, and reliable hygiene solutions.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--off-white)" /></svg>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
            className="story-grid"
          >
            <div>
              <span className="section-label reveal">Who We Are</span>
              <h2 className="heading-lg reveal-left" style={{ marginBottom: "20px" }}>
                Kleanja — Dirt Ka The End
              </h2>
              <div className="divider" />
              <p className="body-md reveal-left" style={{ marginBottom: "20px" }}>
                At Kleanja, we provide a comprehensive range of hygiene and housekeeping solutions designed to meet the growing demands of modern households, commercial establishments, and industrial environments. Our focus is to deliver high-performance cleaning products that ensure superior hygiene, safety, and long-lasting freshness across all types of spaces.
              </p>
              <p className="body-md reveal-left" style={{ marginBottom: "20px" }}>
                In today's fast-paced world, maintaining cleanliness is not just a necessity but a critical factor in ensuring health, productivity, and overall well-being. Kleanja addresses this need by offering a wide portfolio of cleaning and sanitation products developed with a strong emphasis on quality, consistency, and effectiveness.
              </p>
              <p className="body-md reveal-left">
                From daily household cleaning requirements to large-scale institutional and industrial sanitation, our solutions are engineered to provide reliable results. We are committed to supporting our customers with products that simplify cleaning processes, reduce operational effort, and deliver measurable value.
              </p>
            </div>

            {/* Visual cards */}
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
            >
              {[
                { emoji: "🧹", label: "6+ Categories", sub: "Complete cleaning portfolio" },
                { emoji: "🏭", label: "B2B Ready", sub: "Bulk supply for every industry" },
                { emoji: "🌿", label: "Eco Variants", sub: "Herbal & eco-friendly options" },
                { emoji: "🚀", label: "PAN India", sub: "Reliable nationwide supply" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`card reveal reveal-delay-${i + 1}`}
                  style={{ padding: "28px", textAlign: "center", background: i % 2 === 0 ? "var(--blue-pale)" : "var(--green-pale)" }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{item.emoji}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "var(--gray-800)", marginBottom: "4px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--gray-600)" }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label section-label-blue reveal">Our Values</span>
            <h2 className="heading-lg reveal" style={{ color: "var(--gray-800)" }}>
              What Drives Us
            </h2>
          </div>
          <div className="values-grid">
            {values.map((val, i) => (
              <div
                key={val.title}
                className={`values-card values-card-${i} reveal reveal-delay-${(i % 2) + 1}`}
              >
                <Image
                  src={val.img}
                  alt={val.title}
                  fill
                  style={{ objectFit: "cover", zIndex: 0, transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  className="values-bg-img"
                />
                {/* Gradient overlay for readability */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)", zIndex: 1 }} />
                
                <div style={{ position: "relative", zIndex: 2, color: "white" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.5rem, 2vw, 1.8rem)", marginBottom: "12px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, maxWidth: "90%", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        style={{
          background: "var(--gradient-hero)",
          padding: "100px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="hero-blob" style={{ width: "400px", height: "400px", top: "-100px", right: "-100px", background: "var(--green-dark)" }} />
        <div className="hero-blob" style={{ width: "300px", height: "300px", bottom: "-100px", left: "10%", background: "var(--blue-light)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
            className="vision-grid"
          >
            <div>
              <span className="section-label" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}>
                Our Vision
              </span>
              <h2 className="heading-lg" style={{ color: "white", marginBottom: "20px" }}>
                Championing Cleanliness Across India
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: "32px" }}>
                To establish a strong presence in the cleaning and hygiene industry by delivering innovative, affordable, and high-quality products that enhance cleanliness and promote healthier living environments.
              </p>
              < TransitionLink href="/products" className="btn-primary">
                Explore Our Products <ArrowRight size={16} />
              </TransitionLink>
            </div>

            {/* Quality commitment card */}
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "24px",
                padding: "40px",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "white", marginBottom: "24px" }}>
                Quality & Performance Commitment
              </h3>
              {[
                "Effective cleaning performance across all surfaces",
                "Germ protection with proven formulations",
                "Long-lasting freshness with every use",
                "Safe usage across home and commercial environments",
                "Continuously improving formulations for better outcomes",
              ].map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <CheckCircle size={16} color={colors.greenLight} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .values-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }
        .values-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          cursor: default;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
        }
        .values-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.2) !important;
        }
        .values-card:hover .values-bg-img {
          transform: scale(1.08) !important;
        }
        .values-card-0 { grid-column: span 2; }
        .values-card-1 { grid-column: span 3; }
        .values-card-2 { grid-column: span 3; }
        .values-card-3 { grid-column: span 2; }

        @media (max-width: 1024px) {
          .story-grid, .vision-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-card-0, .values-card-1, .values-card-2, .values-card-3 { grid-column: span 1 !important; }
        }
        @media (max-width: 640px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
