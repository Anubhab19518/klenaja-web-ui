"use client";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

// Social icons as inline SVGs since lucide-react 1.28 lacks them
const SocialFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const SocialInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const SocialTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const SocialLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const productCategories = [
  { name: "Floor Cleaning Solutions", href: "/products/floor-cleaning" },
  { name: "Toilet & Bathroom Cleaners", href: "/products/toilet-bathroom" },
  { name: "Hand Hygiene Products", href: "/products/hand-hygiene" },
  { name: "Dishwashing Solutions", href: "/products/dishwashing" },
  { name: "Glass & Surface Cleaners", href: "/products/glass-surface" },
  { name: "Phenyl & Disinfectants", href: "/products/phenyl-disinfectants" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "B2B Solutions", href: "/b2b" },
  { name: "Our Products", href: "/products" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--gradient-hero)",
        color: "rgba(255,255,255,0.85)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,155,58,0.12), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,107,160,0.15), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* CTA Banner */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(26,107,160,0.3), rgba(61,155,58,0.3))",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "48px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                Ready to Partner with Kleanja?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
                Bulk supply, customized solutions, and competitive pricing for businesses.
              </p>
            </div>
            <TransitionLink href="/contact" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              Get a Quote <ArrowRight size={16} />
            </TransitionLink>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ padding: "60px 24px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr",
            gap: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ background: "white", padding: "8px", borderRadius: "12px", display: "inline-block" }}>
                <Image 
                  src="/logo.jpeg" 
                  alt="Kleanja Logo" 
                  width={300} 
                  height={300} 
                  style={{ width: "auto", height: "52px" }} 
                />
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", marginBottom: "24px", maxWidth: "280px" }}>
              Delivering high-performance cleaning and hygiene solutions for households, businesses, and institutions across India.
            </p>

            {/* Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {[
                { icon: Phone, text: "+91 98765 43210" },
                { icon: Mail, text: "info@kleanja.com" },
                { icon: MapPin, text: "India" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem" }}>
                  <Icon size={15} style={{ color: "var(--green-light)", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.65)" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[SocialFacebook, SocialInstagram, SocialTwitter, SocialLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,107,160,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "20px", letterSpacing: "0.05em" }}>
              Our Products
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {productCategories.map((cat) => (
                <li key={cat.name}>
                  <TransitionLink
                    href={cat.href}
                    className="footer-link"
                  >
                    <ArrowRight size={12} />
                    {cat.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "20px", letterSpacing: "0.05em" }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <TransitionLink
                    href={link.href}
                    className="footer-link"
                  >
                    <ArrowRight size={12} />
                    {link.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Mission */}
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "20px", letterSpacing: "0.05em" }}>
              Our Vision
            </h3>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "20px" }}>
              Establishing a strong presence in the cleaning and hygiene industry through innovative, affordable, and high-quality products.
            </p>

            {/* Trust Badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Quality Assured Products",
                "Eco-Friendly Variants",
                "Pan India Supply",
                "B2B Ready",
              ].map((badge) => (
                <div
                  key={badge}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.83rem",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Kleanja. All rights reserved. | Dirt Ka The End
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
