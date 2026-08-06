"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";

const GAP = 16;
const CARD_RADIUS = "0 0 44px 0";

export type ProductCategory = {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgGrad: string;
  href: string;
  img: string | null;
};

function useVisibleCount() {
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1.5);
      else if (window.innerWidth < 900) setVisible(2);
      else if (window.innerWidth < 1200) setVisible(3);
      else setVisible(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

export default function ProductCategoriesCarousel({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, Math.ceil(categories.length - visible));

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const cardBasis = `calc((100% - ${(visible - 1) * GAP}px) / ${visible})`;
  const trackOffset = `calc(-${index} * ((100% - ${(visible - 1) * GAP}px) / ${visible} + ${GAP}px))`;

  return (
    <section className="products-carousel-section">
      <div className="container">

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
          <h2 className="products-carousel-heading reveal" style={{ marginBottom: 0 }}>
            Our Products at{" "}
            <span className="products-carousel-brand">Kleanja</span>
          </h2>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              className="products-carousel-arrow"
              aria-label="Previous products"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="products-carousel-arrow"
              aria-label="Next products"
              onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
              disabled={index >= maxIndex}
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="products-carousel-shell">
          <div className="products-carousel-viewport">
            <div
              className="products-carousel-track"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(${trackOffset})`,
              }}
            >
              {categories.map((cat) => (
                <TransitionLink
                  key={cat.title}
                  href={cat.href}
                  className="products-carousel-card"
                  style={{
                    flex: `0 0 ${cardBasis}`,
                    background: cat.bgGrad,
                    //@ts-ignore
                    "--cat-color": cat.color,
                  }}
                >
                  <div className="products-carousel-visual">
                    <div className="products-carousel-media">
                      {cat.img ? (
                        <Image
                          src={cat.img}
                          alt={cat.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="products-carousel-image"
                        />
                      ) : (
                        <cat.icon
                          size={140}
                          color={cat.color}
                          strokeWidth={1.1}
                        />
                      )}
                    </div>
                  </div>

                  <span className="products-carousel-cta">
                    View {cat.title} Range
                  </span>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .products-carousel-section {
          background: var(--warm-white);
          padding: 80px 0;
        }

        .products-carousel-heading {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 600;
          line-height: 1.15;
          color: var(--black);
          margin-bottom: 40px;
        }

        .products-carousel-brand {
          color: var(--blue-primary);
        }

        .products-carousel-shell {
          position: relative;
        }

        .products-carousel-viewport {
          overflow: hidden;
          width: 100%;
        }

        .products-carousel-track {
          display: flex;
          align-items: stretch;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .products-carousel-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          overflow: hidden;
          border-radius: ${CARD_RADIUS};
          aspect-ratio: 3 / 4.6;
          min-height: 460px;
          border: 1px solid rgba(3, 103, 166, 0.08);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .products-carousel-visual {
          position: relative;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
          padding: 0;
        }

        .products-carousel-media {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .products-carousel-image {
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .products-carousel-visual::after {
          content: "";
          position: absolute;
          inset: 45% 0 0;
          background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.36));
          pointer-events: none;
        }

        .products-carousel-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          z-index: 2;
          left: 18px;
          right: 18px;
          bottom: 18px;
          min-height: 44px;
          padding: 10px 14px;
          background: var(--warm-white);
          color: var(--gray-800);
          border-radius: 0 0 24px 0;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-align: center;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }

        .products-carousel-card:hover .products-carousel-cta {
          background: var(--warm-white);
          color: var(--cat-color, var(--blue-primary));
          transform: translateY(-2px);
        }

        .products-carousel-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid var(--gray-200);
          background: white;
          color: var(--gray-800);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
        }

        .products-carousel-arrow:hover:not(:disabled) {
          background: var(--blue-pale);
          border-color: rgba(26, 107, 160, 0.2);
          color: var(--blue-primary);
        }

        .products-carousel-arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .products-carousel-arrow--left {
          left: -22px;
        }

        .products-carousel-arrow--right {
          right: -22px;
        }

        @media (max-width: 1024px) {
          .products-carousel-section {
            padding: 64px 0;
          }

          .products-carousel-card {
            min-height: 420px;
          }

          .products-carousel-arrow--left {
            left: -8px;
          }

          .products-carousel-arrow--right {
            right: -8px;
          }
        }

        @media (max-width: 640px) {
          .products-carousel-section {
            padding: 56px 0;
          }

          .products-carousel-heading {
            margin-bottom: 28px;
          }

          .products-carousel-card {
            min-height: 360px;
            aspect-ratio: 3 / 4.2;
          }

          .products-carousel-arrow {
            width: 38px;
            height: 38px;
          }

          .products-carousel-arrow--left {
            left: 4px;
          }

          .products-carousel-arrow--right {
            right: 4px;
          }
        }
      `}</style>
    </section>
  );
}
