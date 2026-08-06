"use client";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe, ChevronDown } from "lucide-react";

// Social icons matching screenshot layout
const SocialLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const SocialInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const SocialFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SocialYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const productCategories = [
  { name: "Floor Cleaning", href: "/products/floor-cleaning" },
  { name: "Toilet & Bathroom", href: "/products/toilet-bathroom" },
  { name: "Hand Hygiene", href: "/products/hand-hygiene" },
  { name: "Dishwashing Solutions", href: "/products/dishwashing" },
  { name: "Glass & Surface", href: "/products/glass-surface" },
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
        background: "#FFFFFF",
        color: "#4B5563",
        paddingTop: "32px",
        paddingBottom: "32px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Top Bar: Logo & Tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "28px",
            borderBottom: "1px solid #E5E7EB",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <Image
              src="/klenja_logo_without_text_transparent.png"
              alt="Kleanja Logo"
              width={140}
              height={40}
              style={{ width: "auto", height: "38px" }}
            />
          </div>
          <span style={{ fontSize: "0.95rem", color: "#6B7280", fontWeight: 400 }}>
            Delivering high-performance cleaning & hygiene solutions across India.
          </span>
        </div>

        {/* Middle Section: Columns & Socials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.2fr 1.5fr 1fr",
            gap: "40px",
            paddingTop: "36px",
            paddingBottom: "44px",
          }}
          className="footer-middle-grid"
        >
          {/* Column 1: Our Products */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Our Products
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {productCategories.map((item) => (
                <li key={item.name}>
                  <TransitionLink
                    href={item.href}
                    className="footer-text-link"
                  >
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <TransitionLink
                    href={item.href}
                    className="footer-text-link"
                  >
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#111827",
                marginBottom: "20px",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: Mail, text: "info@kleanja.com" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: MapPin, text: "New Delhi, India" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "10px",
                      border: "1px solid #E0F2FE",
                      background: "#F0F9FF",
                      color: "#0284C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#4B5563", fontWeight: 400 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Language Selector & Social Icons centered vertically */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "16px" }} className="footer-socials-col">
            {/* Language Selector (English only) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                background: "#FFFFFF",
                color: "#374151",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "default",
                userSelect: "none",
              }}
            >
              <Globe size={16} style={{ color: "#6B7280" }} />
              <span>English</span>
              <ChevronDown size={14} style={{ color: "#9CA3AF" }} />
            </div>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[SocialLinkedin, SocialInstagram, SocialFacebook, SocialYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#9CA3AF";
                    (e.currentTarget as HTMLAnchorElement).style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E5E7EB";
                    (e.currentTarget as HTMLAnchorElement).style.background = "#FFFFFF";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>
            © {new Date().getFullYear()} Kleanja. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Terms & Conditions", "Privacy Policy", "Cookies"].map((legal) => (
              <a
                key={legal}
                href="#"
                style={{
                  fontSize: "0.85rem",
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#111827"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"; }}
              >
                {legal}
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .footer-text-link {
          font-size: 0.8rem;
          color: #6B7280;
          text-decoration: none;
          transition: color 0.2s ease;
          font-weight: 400;
        }
        .footer-text-link:hover {
          color: #111827;
        }
        @media (max-width: 1024px) {
          .footer-middle-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-socials-col {
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
        }
        @media (max-width: 640px) {
          .footer-middle-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}


