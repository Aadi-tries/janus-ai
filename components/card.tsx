import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-zinc-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
