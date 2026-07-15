import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuddyScript",
  description: "A social feed for people who build things together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      {children}
    </html>
  );
}
