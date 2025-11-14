import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LayoutContainer from "@/components/LayoutContainer";
import FavoritesInitializer from "@/components/FavoritesInitializer";

export const metadata: Metadata = {
  title: "EcoRoute",
  description: "Plan greener routes for your daily trips.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <FavoritesInitializer />
        <Navbar />
        <LayoutContainer>{children}</LayoutContainer>
      </body>
    </html>
  );
}
