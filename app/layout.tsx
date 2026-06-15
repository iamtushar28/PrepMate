import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepMate",
  description: "Your AI Interview Copilot :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body>{children}</body>
    </html>
  );
}
