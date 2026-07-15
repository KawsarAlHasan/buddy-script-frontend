import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="min-h-full flex flex-col bg-app text-primary font-sans">
      {children}
    </body>
  );
}
