import { ThemeProvider } from "@/lib/theme-provider";
import AppShell from "@/components/layout/AppShell";
import { App } from "antd";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex flex-col bg-app text-primary font-sans">
      <App>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </App>
    </body>
  );
}
