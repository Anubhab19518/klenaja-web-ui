"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { colors, motion as motionTokens } from "@/design-system";
import TransitionLink from "./TransitionLink";

export default function CleanEverySurface() {
  return (
    <section className="relative flex min-h-[100svh] items-center py-24 sm:py-28" style={{ background: "var(--warm-white)" }}>

      {/* Single keyframe — bg pans across the ONE h2 element */}
      <style>{`
        @keyframes bgSlide {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-10">

        {/* ── Relative wrapper: anchors the absolute heart card ── */}
        <div className="relative">

          {/*
            ── Single <h2> = ONE element = ONE unified background ──
            Both "Clean Every" and "Surface." share the same background-image.
            <br/> creates the natural line break but the bg is a single image
            spanning the full element box — it pans via animation.
            paddingTop / paddingBottom prevent ascender (Y) and
            descender (.) from being clipped by the element's content box.
          */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={motionTokens.cleanEverySurfaceReveal}
            className="font-black text-center"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3.2rem, 10.5vw, 9rem)",
              lineHeight: 1.12,           /* spacing between the two lines */
              letterSpacing: "-0.04em",
              /* Prevent Y top and full-stop bottom from clipping */
              paddingTop: "0.08em",
              paddingBottom: "0.14em",
              /* — Unified animated background — */
              backgroundImage: "url('/banner-3.jpg')",
              backgroundSize: "200% auto",
              backgroundPosition: "0% 50%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              animation: "bgSlide 14s ease-in-out infinite alternate",
            }}
          >
            Clean Every
            <br />
            Surface.
          </motion.h2>

          {/*
            ── Heart card ──
            Absolutely positioned over the right side of the second line.
            "Surface." is centred, so its right edge sits at roughly 50%+.
            The card sits at bottom-[paddingBottom] right-0, floating in the
            white space to the right of "Surface." — exactly like the reference.
          */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={motionTokens.cleanEverySurfaceCard}
            className="mx-auto mt-8 flex max-w-[300px] items-center gap-3 sm:absolute sm:right-0 sm:bottom-[0.14em] sm:mt-0 sm:max-w-[260px]"
            style={{ maxWidth: "260px" }}
          >
            {/* Outlined heart — matches reference */}
            <Heart
              className="shrink-0"
              size={60}
              strokeWidth={1.3}
              style={{ color: colors.bluePrimary }}
            />

            {/* Description + CTA */}
            <div>
              <p
                className="text-[0.8rem] leading-relaxed text-gray-600"
                style={{ fontFamily: "var(--font-body)" }}
              >
                On every surface we clean, we are dedicated to delivering{" "}
                <strong>spotless results</strong> and giving your space a{" "}
                <strong>fresh start.</strong>
              </p>

              <TransitionLink
                href="/products"
                className="mt-3 inline-flex border border-[var(--ds-color-blue-primary)] px-4 py-[7px] text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--ds-color-blue-primary)] rounded-br-lg transition-all duration-300 hover:bg-[var(--ds-color-blue-primary)] hover:text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Our Products
              </TransitionLink>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
