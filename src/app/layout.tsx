import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TechCursor } from "@/components/CursorGlow";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hariprasanth | AI & Full Stack Developer",
  description: "Premium developer portfolio featuring AI systems, scalable backends, and modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#020617] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 min-h-screen relative`}
      >
        <TechCursor />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}
