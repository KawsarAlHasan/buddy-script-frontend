"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import MobileBottomNav from "./MobileBottomNav";
import MobileDrawer from "./MobileDrawer";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useTheme } from "@/lib/theme-provider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const drawer = useDisclosure();
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: "#3b6df4", borderRadius: 10 },
      }}
    >
      <Header />
      <MobileHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 pb-16 lg:pb-6 px-2 lg:px-0">
        {children}
      </main>

      <MobileBottomNav onMenuClick={drawer.open} />
      <MobileDrawer open={drawer.isOpen} onClose={drawer.close} />
    </ConfigProvider>
  );
}
