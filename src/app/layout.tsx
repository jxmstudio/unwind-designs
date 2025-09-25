import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartSidebar } from "@/components/cart/CartSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unwind Designs - Toyota Troopcarrier Flat Packs & Custom Fitouts",
  description: "Australia's leading Toyota Troopcarrier flat pack specialists. 15 kit configurations, professional installation, and Australia-wide shipping. Transform your troopy with Wander, Roam, or Premium flat packs.",
  keywords: [
    "toyota troopcarrier flat packs", 
    "troopy fitouts australia", 
    "wander kit", 
    "roam kit", 
    "premium kit",
    "troopcarrier storage solutions",
    "flat pack furniture",
    "van fitouts", 
    "4x4 fitouts", 
    "vehicle storage", 
    "campervan", 
    "adventure vehicle", 
    "custom fitouts", 
    "australia wide shipping"
  ],
  authors: [{ name: "Unwind Designs" }],
  openGraph: {
    title: "Unwind Designs - Toyota Troopcarrier Flat Packs & Custom Fitouts",
    description: "Australia's leading Toyota Troopcarrier flat pack specialists. 15 kit configurations, professional installation, and Australia-wide shipping.",
    type: "website",
    locale: "en_AU",
    siteName: "Unwind Designs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unwind Designs - Toyota Troopcarrier Flat Packs",
    description: "Australia's leading Toyota Troopcarrier flat pack specialists. 15 kit configurations, professional installation, and Australia-wide shipping.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
