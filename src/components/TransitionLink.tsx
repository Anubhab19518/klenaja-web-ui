"use client";

import Link, { LinkProps } from "next/link";
import { MouseEvent, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "./TransitionProvider";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    startTransition,
    isAnimating,
  } = useTransition();

  const target =
    typeof href === "string" ? href : href.pathname ?? "";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    if (e.defaultPrevented) return;

    if (target === pathname) return;

    e.preventDefault();

    if (isAnimating) return;

    document.body.classList.add("transitioning");

    startTransition(target);

    window.setTimeout(() => {
      router.push(target);
    }, 520);

    window.setTimeout(() => {
      document.body.classList.remove("transitioning");
    }, 1100);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}