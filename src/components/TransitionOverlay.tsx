"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "./TransitionProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { gradients } from "@/design-system";

const desktopPanels = 8;
const mobilePanels = 6;

export default function TransitionOverlay() {
  const {
    isAnimating,
    nextRoute,
    finishTransition,
  } = useTransition();

  const router = useRouter();

  useEffect(() => {
    if (!isAnimating || !nextRoute) return;

    const timer = setTimeout(() => {
      router.push(nextRoute);
    }, 520);

    return () => clearTimeout(timer);
  }, [isAnimating, nextRoute, router]);

  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      finishTransition();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAnimating, finishTransition]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: .25
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            pointerEvents: "all",
            backdropFilter: "blur(8px)",
            overflow: "hidden",
          }}
        >
          <div
            className="blind-grid"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: `repeat(${desktopPanels},1fr)`,
            }}
          >
            {Array.from({ length: desktopPanels }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  scaleY: 0,
                  originY: 0,
                }}
                animate={{
                  scaleY: 1,
                }}
                exit={{
                  scaleY: 0,
                  originY: 1,
                }}
                transition={{
                  duration: .45,
                  delay: i * .05,
                  ease: [.83,0,.17,1],
                }}
                style={{
                  background:
                    i % 2 === 0
                      ? gradients.overlayBlue
                      : gradients.overlayGreen,

                  boxShadow:
                    "inset -5px 0 rgba(255,255,255,.12), inset 5px 0 rgba(0,0,0,.12)",
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{
              opacity:0,
              scale:.8
            }}
            animate={{
              opacity:1,
              scale:1
            }}
            exit={{
              opacity:0,
              scale:.9
            }}
            transition={{
              delay:.42,
              duration:.25
            }}
            style={{
              position:"absolute",
              inset:0,
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              pointerEvents:"none",
            }}
          >
            <Image
              src="/logo.jpeg"
              alt="logo"
              width={220}
              height={70}
              style={{
                borderRadius:14,
                background:"white",
                padding:12,
                boxShadow:"0 20px 60px rgba(0,0,0,.25)"
              }}
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
