import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Wednesday Club",
  description:
    "A cooperative escape room that teaches scam recognition to older adults.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
