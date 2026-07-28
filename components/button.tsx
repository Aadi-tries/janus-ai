import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    variant?: "primary" | "secondary";
  }
>;

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-black text-white shadow-[0_1px_1px_rgba(0,0,0,0.08),0_12px_30px_rgba(0,0,0,0.12)] hover:bg-zinc-800"
      : "border border-zinc-200 bg-white text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50";

  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
