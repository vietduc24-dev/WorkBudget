import type { Metadata } from "next";
import { AuthProvider } from "@/stores";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work Budget",
  description: "Task management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
