"use client";

import { Drawer } from "antd";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ExploreMenu from "./ExploreMenu";
import { currentUser } from "@/lib/data";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="left"
      size={300}
      closable={false}
      styles={{ body: { padding: 0, background: "var(--bg-app)" } }}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex items-center justify-between rounded-2xl border border-border-subtle bg-surface p-4">
          <div className="flex items-center gap-3">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={44} online />
            <div>
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-secondary">{currentUser.title}</p>
            </div>
          </div>
          <ThemeToggle ismobile />
        </div>
        <ExploreMenu />
      </div>
    </Drawer>
  );
}
