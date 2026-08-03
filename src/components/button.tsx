import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    variant?: "primary" | "secondary";
  }
>;

function mergeClasses(defaultClasses: string, customClasses: string): string {
  const customSet = customClasses.split(/\s+/).filter(Boolean);
  
  const hasBg = customSet.some(c => c.startsWith("bg-"));
  const hasText = customSet.some(c => c.startsWith("text-"));
  const hasBorder = customSet.some(c => c.startsWith("border-") || c === "border");
  
  const hasHoverBg = customSet.some(c => c.startsWith("hover:bg-"));
  const hasHoverText = customSet.some(c => c.startsWith("hover:text-"));
  const hasHoverBorder = customSet.some(c => c.startsWith("hover:border-"));

  const filteredDefaults = defaultClasses.split(/\s+/).filter(Boolean).filter(c => {
    if (hasBg && c.startsWith("bg-")) return false;
    if (hasText && c.startsWith("text-")) return false;
    if (hasBorder && (c.startsWith("border-") || c === "border")) return false;
    if (hasHoverBg && c.startsWith("hover:bg-")) return false;
    if (hasHoverText && c.startsWith("hover:text-")) return false;
    if (hasHoverBorder && c.startsWith("hover:border-")) return false;
    return true;
  });

  return [...filteredDefaults, ...customSet].join(" ");
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const defaultStyles =
    variant === "primary"
      ? "bg-black text-white shadow-[0_1px_1px_rgba(0,0,0,0.08),0_12px_30px_rgba(0,0,0,0.12)] hover:bg-zinc-800"
      : "border border-zinc-200 bg-white text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50";

  const combinedClasses = mergeClasses(defaultStyles, className);

  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition ${combinedClasses}`}
      {...props}
    >
      {children}
    </Link>
  );
}

