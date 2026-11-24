import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RelationshipProvider } from "@/context/RelationshipContext";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "DUO · Premium AI Relationship Co-Pilot & Emotional Translator",
  description:
    "Therapy-grade emotional communication co-pilot for couples. Decode chat screenshots, soften angry messages before sending, and discover your Love DNA. 100% private & encrypted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-obsidian-950 text-zinc-100 min-h-screen flex flex-col selection:bg-gold-500/30 selection:text-gold-200">
        <RelationshipProvider>
          {/* Subtle ambient luxury mesh glow */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-gold-500/8 via-rose-500/5 to-transparent rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[140px]" />
          </div>

          <Header />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>
          <BottomNav />
        </RelationshipProvider>
      </body>
    </html>
  );
}
