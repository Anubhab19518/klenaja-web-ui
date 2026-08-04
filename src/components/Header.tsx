"use client";
import { useState, useEffect } from "react";
import TransitionLink from "@/components/TransitionLink";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const productCategories = [
  { name: "Floor Cleaning", href: "/products/floor-cleaning" },
  { name: "Toilet & Bathroom", href: "/products/toilet-bathroom" },
  { name: "Hand Hygiene", href: "/products/hand-hygiene" },
  { name: "Dishwashing", href: "/products/dishwashing" },
  { name: "Glass & Surface Cleaners", href: "/products/glass-surface" },
  { name: "Phenyl & Disinfectants", href: "/products/phenyl-disinfectants" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "B2B Solutions", href: "/b2b" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsProductsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showWhiteBg = isHovered;
  const linkColor = showWhiteBg ? "#0367A6" : "rgba(255, 255, 255, 0.95)";

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s ease",
          background: isHovered ? "white" : isScrolled ? "rgba(3, 67, 106, 0.98)" : "transparent",
          backdropFilter: isHovered ? "none" : isScrolled ? "blur(12px)" : "none",
          borderBottom: isHovered ? "1px solid rgba(0,0,0,0.08)" : isScrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          padding: 0,
        }}
      >
        {/* Announcement Bar */}
        <div
          style={{
            height: isScrolled ? "0" : "36px",
            overflow: "hidden",
            background: "#b5f3be",
            color: "#1e6b08",
            fontSize: "0.85rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "height 0.3s ease",
            fontFamily: "var(--font-heading)",
          }}
        >
          Save on Kleanja Bulk Orders. Special B2B pricing active.
        </div>
        <div className="container" style={{ padding: isScrolled ? "6px 24px" : "12px 24px", transition: "padding 0.3s ease" }}>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: isScrolled ? "60px" : "72px",
              transition: "height 0.35s ease",
            }}
          >
            {/* Logo */}
            <TransitionLink href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <KleanjaLogo scrolled={isScrolled} hovered={isHovered} />
            </TransitionLink>

            {/* Desktop Nav */}
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                gap: "4px",
              }}
              className="hidden-mobile"
            >
              {navLinks.map((link) => (
                <li key={link.name} style={{ position: "relative" }}>
                  {link.hasDropdown ? (
                    <div
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                      style={{
                        position: "relative",
                      }}
                    >
                      {/* Products label: plain Link — no transition system, just hover trigger + navigation */}
                      <Link
                        href={link.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          color: linkColor,
                          transition: "all 0.2s ease",
                          textDecoration: "none",
                          cursor: "default",
                        }}
                        onClick={(e) => e.preventDefault()}
                      >
                        {link.name}
                        <ChevronDown
                          size={15}
                          style={{
                            color: linkColor,
                            transform: isProductsOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                          }}
                        />
                      </Link>

                      {/* Invisible bridge that covers the gap between label and dropdown */}
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "260px",
                          height: "16px",
                          pointerEvents: isProductsOpen ? "auto" : "none",
                        }}
                      />

                      {/* Dropdown panel */}
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 12px)",
                          left: "50%",
                          transform: isProductsOpen
                            ? "translateX(-50%) translateY(0)"
                            : "translateX(-50%) translateY(-8px)",
                          opacity: isProductsOpen ? 1 : 0,
                          visibility: isProductsOpen ? "visible" : "hidden",
                          pointerEvents: isProductsOpen ? "auto" : "none",
                          transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease",
                          background: "white",
                          borderRadius: "16px",
                          boxShadow: "0 20px 60px rgba(3, 103, 166, 0.2)",
                          padding: "12px",
                          minWidth: "240px",
                          border: "1px solid rgba(3, 103, 166, 0.08)",
                        }}
                      >
                        {productCategories.map((cat) => (
                          <TransitionLink
                            key={cat.name}
                            href={cat.href}
                            className="header-dropdown-link"
                          >
                            {cat.name}
                          </TransitionLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <TransitionLink
                      href={link.href}
                      className="nav-link"
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        color: linkColor,
                        transition: "color 0.3s ease",
                        textDecoration: "none",
                      }}
                    >
                      {link.name}
                    </TransitionLink>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <TransitionLink
                href="/contact"
                className="hidden-mobile"
                style={{
                  fontSize: "0.9rem",
                  padding: "10px 24px",
                  background: isHovered ? "var(--color-primary, #0367A6)" : "white",
                  color: isHovered ? "white" : "var(--color-primary, #0367A6)",
                  border: isHovered ? "1px solid var(--color-primary, #0367A6)" : "none",
                  borderRadius: "50px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Contact us
              </TransitionLink>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="show-mobile"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  backdropFilter: "blur(4px)",
                }}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(3, 67, 106, 0.97)",
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "100px 24px 40px",
            animation: "fadeInUp 0.3s ease",
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setIsMobileOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "10px",
              padding: "8px",
            }}
          >
            <X size={24} />
          </button>
          {navLinks.map((link, i) => (
            <div key={link.name}>
              <TransitionLink
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "16px 0",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "white",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {link.name}
              </TransitionLink>
              {link.hasDropdown && (
                <div style={{ paddingLeft: "16px" }}>
                  {productCategories.map((cat) => (
                    <TransitionLink
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 0",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "none",
                      }}
                    >
                      → {cat.name}
                    </TransitionLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <TransitionLink
            href="/contact"
            className="btn-primary"
            onClick={() => setIsMobileOpen(false)}
            style={{ marginTop: "32px", justifyContent: "center" }}
          >
            Get a Quote
          </TransitionLink>
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        
        /* Premium nav link hover */
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 16px;
          right: 16px;
          height: 2px;
          background: var(--ds-color-accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link:hover {
          color: white !important;
        }
        
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}

function KleanjaLogo({ scrolled, hovered }: { scrolled: boolean; hovered: boolean }) {
  if (!scrolled && !hovered) {
    return (
      <span style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: "1.75rem",
        color: "white",
        letterSpacing: "-0.02em"
      }}>
        Kleanja
      </span>
    );
  }
  if (!scrolled && hovered) {
    return (
      <span style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: "1.75rem",
        color: "#0367A6",
        letterSpacing: "-0.02em"
      }}>
        Kleanja
      </span>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", background: "white", padding: "6px 12px", borderRadius: "8px" }}>
      <Image
        src="/logo.jpeg"
        alt="Kleanja Logo"
        width={160}
        height={50}
        style={{
          width: "auto",
          height: "45px",
          objectFit: "contain"
        }}
        priority
      />
    </div>
  );
}
