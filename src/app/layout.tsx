import type { Metadata } from "next";
import { Spectral, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const serif = Spectral({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rhianna Gray — Healer, Intuitive, Astrologer",
  description:
    "Twenty-five years of intuitive guidance, evolutionary astrology, and Quanta Freedom Healing™. Sessions worldwide via Zoom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {"try{var t=localStorage.getItem('rg-theme');document.documentElement.dataset.theme=(t==='dark')?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}"}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
