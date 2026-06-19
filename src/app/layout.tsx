import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Sütlü Çardak | Sütlü Tatlılar ve Kahve",
  description: "Sütlü tatlılar, kaliteli kahveler ve sıcak çardak atmosferiyle modern kafe deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
