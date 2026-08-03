import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Janus — AI Stress Testing for Strategic Decisions",
  description:
    "Challenge your strategies, plans, and decisions against a panel of brutal AI experts before reality does.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#070709] text-zinc-100 selection:bg-red-500/20 selection:text-red-200">
        {children}
      </body>
    </html>
  );
}
