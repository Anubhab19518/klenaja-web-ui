"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

type Industry = {
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
};

interface Props {
  industries: Industry[];
}

export default function IndustryTicker({ industries }: Props) {
  const duplicated = [...industries, ...industries];

  const x = useMotionValue(0);

  const [hovered, setHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const speed = hovered ? 18 : 40;

    const move = (speed * delta) / 1000;

    let current = x.get() - move;

    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 2;

      if (Math.abs(current) >= width) {
        current = 0;
      }
    }

    x.set(current);
  });

  return (
    <section
      style={{
        padding: "90px 0",
        background: "var(--warm-white)",
        overflow: "hidden",
      }}
    >
      <div className="container">

        <div
          style={{
            textAlign: "center",
            marginBottom: "42px",
          }}
        >
          <span className="section-label">
            Trusted Across Industries
          </span>

          <h2
            className="heading-lg"
            style={{
              marginTop: "16px",
            }}
          >
            Built for Business Scale
          </h2>
        </div>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
                  {/* Left Fade */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "120px",
              zIndex: 5,
              pointerEvents: "none",
              background:
                "linear-gradient(to right, var(--warm-white), transparent)",
            }}
          />

          {/* Right Fade */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "120px",
              zIndex: 5,
              pointerEvents: "none",
              background:
                "linear-gradient(to left, var(--warm-white), transparent)",
            }}
          />

          <motion.div
            ref={containerRef}
            style={{
              display: "flex",
              gap: "24px",
              width: "max-content",
              x,
              padding: "10px 0",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {duplicated.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <div
                  key={`${industry.name}-${index}`}
                  style={{
                    width: "300px",
                    minHeight: "170px",

                    flexShrink: 0,

                    background: "rgba(255,255,255,.82)",

                    backdropFilter: "blur(18px)",

                    borderRadius: "24px",

                    border: "1px solid rgba(20,60,100,.08)",

                    padding: "26px",

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "space-between",

                    transition:
                      "transform .35s ease, box-shadow .35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";

                    e.currentTarget.style.boxShadow =
                      "0 24px 60px rgba(16,52,85,.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.boxShadow =
                      "none";
                  }}
                >
                  <div
                    style={{
                      width: "58px",
                      height: "58px",

                      borderRadius: "18px",

                      background: `${industry.color}15`,

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      marginBottom: "18px",
                    }}
                  >
                    <Icon
                      size={28}
                      color={industry.color}
                    />
                  </div>

                  <div>

                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",

                        fontSize: "1.05rem",

                        fontWeight: 700,

                        color: "var(--gray-800)",

                        marginBottom: "10px",
                      }}
                    >
                      {industry.name}
                    </h3>

                    <p
                      style={{
                        color: "var(--gray-600)",

                        lineHeight: 1.6,

                        fontSize: ".9rem",
                      }}
                    >
                      {industry.description}
                    </p>

                  </div>
                </div>
              );
            })}
          </motion.div>
          </div>
          </div>
          </section>
  );
}    
