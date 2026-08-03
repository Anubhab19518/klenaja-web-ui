import type { Transition, Variants } from "framer-motion";

const entranceEase = [0.16, 1, 0.3, 1] as const;
const smoothEase = [0.22, 1, 0.36, 1] as const;

export const motion = {
  fadeUp: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } satisfies Variants,
  fadeLeft: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } } satisfies Variants,
  fadeRight: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } } satisfies Variants,
  scaleIn: { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } } satisfies Variants,
  entrance: { duration: 0.7, ease: entranceEase } satisfies Transition,
  smooth: { duration: 0.3, ease: smoothEase } satisfies Transition,
  slowFloat: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } satisfies Transition,
  kenBurns: { duration: 6, ease: "ease" },
  cleanEverySurfaceReveal: { duration: 0.95, ease: entranceEase } satisfies Transition,
  cleanEverySurfaceCard: { duration: 0.7, delay: 0.4, ease: entranceEase } satisfies Transition,
} as const;
