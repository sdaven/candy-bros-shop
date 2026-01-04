import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
