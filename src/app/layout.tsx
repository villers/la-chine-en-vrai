import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/components/layout/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "中国之旅 - Voyages sur mesure en Chine",
  description: "Découvrez la Chine authentique avec nos voyages sur mesure. Spécialistes de l'Empire du Milieu depuis plus de 10 ans. Culture, gastronomie, nature et aventure.",
  keywords: "voyage Chine, circuit sur mesure Chine, agence voyage Chine, voyage organisé Chine, séjour Chine, guide Chine, culture chinoise, gastronomie chinoise, Grande Muraille, Pékin, Shanghai",
  authors: [{ name: "中国之旅" }],
  creator: "中国之旅",
  publisher: "中国之旅",
  openGraph: {
    title: "中国之旅 - Voyages sur mesure en Chine",
    description: "Découvrez la Chine authentique avec nos voyages sur mesure. Spécialistes de l'Empire du Milieu depuis plus de 10 ans.",
    url: "https://chine-en-vrai.fr",
    siteName: "中国之旅",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "中国之旅 - Voyages sur mesure en Chine",
    description: "Découvrez la Chine authentique avec nos voyages sur mesure. Spécialistes de l'Empire du Milieu depuis plus de 10 ans.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <StoreProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
