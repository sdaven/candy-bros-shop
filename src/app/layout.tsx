import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Candy Bros - Premium Candy Delivery",
  description: "Hand-delivered premium candy by Candy Bros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
