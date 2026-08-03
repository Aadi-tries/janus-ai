import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

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
      <body className={`${spaceGrotesk.variable} ${plusJakarta.variable} antialiased bg-[#070709] text-zinc-100 selection:bg-red-500/20 selection:text-red-200`}>
        {children}
      </body>
    </html>
  );
}
