"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type TransitionContextType = {
  isAnimating: boolean;
  nextRoute: string | null;
  startTransition: (href: string) => void;
  finishTransition: () => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function useTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error(
      "useTransition must be used inside TransitionProvider"
    );
  }

  return context;
}

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAnimating, setAnimating] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);

  const startTransition = useCallback((href: string) => {
    if (isAnimating) return;

    setNextRoute(href);
    setAnimating(true);
  }, [isAnimating]);

  const finishTransition = useCallback(() => {
    setAnimating(false);
    setNextRoute(null);
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isAnimating,
        nextRoute,
        startTransition,
        finishTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
