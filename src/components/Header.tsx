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

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s ease",
          background: isScrolled ? "rgba(6, 27, 37, 0.98)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          padding: isScrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="container">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: isScrolled ? "70px" : "84px",
              transition: "height 0.35s ease",
            }}
          >
            {/* Logo */}
            <TransitionLink href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <KleanjaLogo scrolled={isScrolled} />
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
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          color: "rgba(255,255,255,0.95)",
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
                          boxShadow: "0 20px 60px rgba(26, 107, 160, 0.2)",
                          padding: "12px",
                          minWidth: "240px",
                          border: "1px solid rgba(26, 107, 160, 0.08)",
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
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.95)",
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
                className="btn-primary hidden-mobile"
                style={{ fontSize: "0.9rem", padding: "10px 24px" }}
              >
                Get a Quote
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
            background: "rgba(9, 30, 46, 0.97)",
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
          background: var(--green-light);
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

function KleanjaLogo({ scrolled }: { scrolled: boolean }) {
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
