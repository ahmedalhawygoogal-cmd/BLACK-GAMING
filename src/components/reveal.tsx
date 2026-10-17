import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Zero-overhead server component wrapper replacing framer-motion scroll listeners
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
