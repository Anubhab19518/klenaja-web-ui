"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ShoppingBag, User, LogOut, Package, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

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
  const pathname = usePathname();
  const isCategoryHeroPage = [
    "/products/floor-cleaning",
    "/products/toilet-bathroom",
    "/products/hand-hygiene",
    "/products/dishwashing",
    "/products/glass-surface",
    "/products/phenyl-disinfectants",
  ].includes(pathname);

  const hasDarkHero = pathname === "/" || isCategoryHeroPage;
  const isLightPage = !hasDarkHero;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { totalItems, openCart, availableCoupons } = useCart();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsProductsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showWhiteBg = isHovered || isScrolled || isLightPage;
  const showDarkText = showWhiteBg;
  const linkColor = showDarkText ? "#0367A6" : "rgba(255, 255, 255, 0.95)";

  const topCoupon = availableCoupons && availableCoupons.length > 0 ? availableCoupons[0] : null;

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
          background: showWhiteBg ? "white" : "transparent",
          backdropFilter: "none",
          borderBottom: showWhiteBg
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
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
            padding: "0 12px",
            whiteSpace: "nowrap",
          }}
        >
          {topCoupon ? (
            <span className="announcement-desktop" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              🎉 Special Offer: Use code <strong style={{ textDecoration: "underline", letterSpacing: "0.04em" }}>{topCoupon.code}</strong> for {topCoupon.discountType === 'PERCENTAGE' ? `${topCoupon.discountValue}% OFF` : `₹${topCoupon.discountValue} OFF`} {topCoupon.description ? `(${topCoupon.description})` : ''}
            </span>
          ) : (
            <span className="announcement-desktop">
              Save on Kleanja Bulk Orders. Special B2B pricing active.
            </span>
          )}
          <span className="announcement-mobile">
            {topCoupon ? `Code ${topCoupon.code}: ${topCoupon.discountValue}% OFF` : "Contact us for bulk orders."}
          </span>
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
              <KleanjaLogo showDarkText={showDarkText} />
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
                      {/* Products label */}
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

            {/* CTA + Actions + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Cart Button */}
              <button
                onClick={openCart}
                aria-label="Shopping Cart"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: showDarkText ? "rgba(3, 103, 166, 0.08)" : "rgba(255, 255, 255, 0.15)",
                  color: showDarkText ? "#0367A6" : "white",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      background: "#278C0B",
                      color: "white",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Account / Sign In */}
              <div style={{ position: "relative" }} ref={userMenuRef}>
                {isAuthenticated && user ? (
                  <div>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 12px 6px 6px",
                        borderRadius: "50px",
                        background: showDarkText ? "rgba(3, 103, 166, 0.08)" : "rgba(255, 255, 255, 0.15)",
                        border: "none",
                        cursor: "pointer",
                        color: showDarkText ? "#0367A6" : "white",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "#0367A6",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          fontFamily: "var(--font-heading)",
                          flexShrink: 0,
                        }}
                      >
                        {user.name?.trim().charAt(0).toUpperCase() || "U"}
                      </div>
                      <span className="hidden-mobile" style={{ fontSize: "0.85rem", fontWeight: 600, fontFamily: "var(--font-heading)" }}>
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown size={14} />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          right: 0,
                          background: "white",
                          borderRadius: "16px",
                          boxShadow: "0 15px 40px rgba(3, 103, 166, 0.18)",
                          border: "1px solid rgba(3, 103, 166, 0.1)",
                          padding: "10px",
                          minWidth: "220px",
                          zIndex: 1010,
                          animation: "fadeIn 0.2s ease",
                        }}
                      >
                        <div style={{ padding: "8px 12px", borderBottom: "1px solid #E6E8EA", marginBottom: "6px" }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: "#1D2939" }}>{user.name}</p>
                          <p style={{ margin: 0, fontSize: "0.78rem", color: "#667085", textOverflow: "ellipsis", overflow: "hidden" }}>{user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            color: "#344054",
                            textDecoration: "none",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAF8")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <User size={16} color="#0367A6" />
                          My Profile & Addresses
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            color: "#344054",
                            textDecoration: "none",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAF8")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <Package size={16} color="#0367A6" />
                          My Orders & Tracking
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            color: "#E74C3C",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                            marginTop: "4px",
                            borderTop: "1px solid #E6E8EA",
                            paddingTop: "10px",
                          }}
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="hidden-mobile"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "50px",
                      background: showDarkText ? "rgba(3, 103, 166, 0.08)" : "rgba(255, 255, 255, 0.15)",
                      color: showDarkText ? "#0367A6" : "white",
                      border: "none",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <User size={16} />
                    Sign In
                  </button>
                )}
              </div>

              <TransitionLink
                href="/contact"
                className="hidden-mobile"
                style={{
                  fontSize: "0.9rem",
                  padding: "10px 24px",
                  background: showDarkText ? "var(--color-primary, #0367A6)" : "white",
                  color: showDarkText ? "white" : "var(--color-primary, #0367A6)",
                  border: showDarkText ? "1px solid var(--color-primary, #0367A6)" : "none",
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
                  background: showDarkText ? "rgba(3, 103, 166, 0.08)" : "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  color: showDarkText ? "#0367A6" : "white",
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

          {/* User Status on Mobile */}
          <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {isAuthenticated && user ? (
              <div style={{ color: "white" }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>Hello, {user.name}</p>
                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  <Link href="/orders" onClick={() => setIsMobileOpen(false)} style={{ color: "#b5f3be", fontSize: "0.9rem", fontWeight: 600 }}>
                    My Orders
                  </Link>
                  <Link href="/account" onClick={() => setIsMobileOpen(false)} style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                    Account
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  openAuthModal();
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "white",
                  color: "#0367A6",
                  border: "none",
                  borderRadius: "50px",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Sign In / Register
              </button>
            )}
          </div>

          {navLinks.map((link) => (
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
        
        .announcement-desktop {
          display: inline;
        }
        .announcement-mobile {
          display: none;
        }
        
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
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .announcement-desktop { display: none !important; }
          .announcement-mobile { display: inline !important; }
        }
      `}</style>
    </>
  );
}

function KleanjaLogo({ showDarkText }: { showDarkText: boolean }) {
  const textColor = showDarkText ? "#0367A6" : "white";
  const logoFilter = showDarkText ? "none" : "brightness(0) invert(1)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Image
        src="/klenja_logo_without_text_transparent.png"
        alt="Kleanja Logo"
        width={160}
        height={50}
        style={{
          width: "auto",
          height: "45px",
          objectFit: "contain",
          filter: logoFilter,
          transition: "filter 0.3s ease"
        }}
        priority
      />
      <span style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: "1.75rem",
        color: textColor,
        letterSpacing: "-0.02em",
        transition: "color 0.3s ease"
      }}>
        Kleanja
      </span>
    </div>
  );
}
