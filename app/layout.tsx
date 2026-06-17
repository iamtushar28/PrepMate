import type { Metadata } from "next";
import "./globals.css";
import Toast from "./components/Toast";
import AuthProvider from "@/components/AuthProvider";

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
      <body>
        <AuthProvider>
          {children}
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
