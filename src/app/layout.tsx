import type { Metadata } from "next";
import { Geist, Geist_Mono, Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/layout/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Setup Prompt font instead of Kanit
const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Here | Bestenic Performance Development",
  description: "Premium nutritional supplements for your health. Vit C + Selenium and more.",
};

// ... (Metadata export remains here)

import { FloatingContact } from '@/components/layout/FloatingContact';

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${prompt.className} antialiased`}>
        <Providers>
          {children}
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
