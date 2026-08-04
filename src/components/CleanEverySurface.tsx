"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { colors, motion as motionTokens } from "@/design-system";
import TransitionLink from "./TransitionLink";

export default function CleanEverySurface() {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-16 sm:py-24 overflow-hidden"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8 flex flex-col items-center">
        {/* SVG Container: Clips video strictly to center-aligned text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={motionTokens.cleanEverySurfaceReveal}
          className="w-full max-w-5xl mx-auto"
        >
          <svg
            viewBox="0 0 1000 340"
            className="w-full h-auto overflow-visible"
            aria-label="Clean Every Surface"
          >
            <defs>
              <clipPath id="clean-video-text-clip">
                {/* Line 1: Clean Every (Center Aligned) */}
                <text
                  x="500"
                  y="125"
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight="800"
                  fontSize="125"
                  letterSpacing="-0.04em"
                >
                  Clean Every
                </text>

                {/* Line 2: Surface. (Center Aligned) */}
                <text
                  x="500"
                  y="285"
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontWeight="800"
                  fontSize="125"
                  letterSpacing="-0.04em"
                >
                  Surface.
                </text>
              </clipPath>
            </defs>

            {/* Video element clipped strictly inside text paths */}
            <g clipPath="url(#clean-video-text-clip)">
              <foreignObject x="0" y="0" width="1000" height="340">
                <video
                  src="/clean_every_surface_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </foreignObject>
            </g>
          </svg>
        </motion.div>

        {/* Centered Heart Icon, Copy Paragraph, and Pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={motionTokens.cleanEverySurfaceCard}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 text-center sm:text-left max-w-xl mx-auto"
        >
          <Heart
            className="shrink-0"
            size={64}
            strokeWidth={1.4}
            style={{ color: "var(--ds-color-accent)" }}
          />

          <div className="flex flex-col items-center sm:items-start gap-3.5 max-w-[340px]">
            <p
              className="text-xs sm:text-sm text-[var(--ds-color-gray-600)] leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              In every business action, we are dedicated to reducing our{" "}
              <strong className="font-bold text-[var(--ds-color-black)]">
                environmental footprint
              </strong>{" "}
              and giving back to the{" "}
              <strong className="font-bold text-[var(--ds-color-black)]">
                community.
              </strong>
            </p>

            <TransitionLink
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-[var(--ds-color-accent)] px-7 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider text-[var(--ds-color-accent)] transition-all duration-300 hover:bg-[var(--ds-color-accent)] hover:text-white hover:shadow-md hover:scale-[1.02]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ABOUT US
            </TransitionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




