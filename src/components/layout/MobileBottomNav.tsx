"use client";

import { HiBars3 } from "react-icons/hi2";
import { mobileNavLinks } from "@/lib/constants";

export default function MobileBottomNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t border-border-subtle bg-surface lg:hidden">
      {mobileNavLinks.map(({ label, icon: Icon, badge }, i) => (
        <button
          key={label}
          aria-label={label}
          className={`relative grid h-9 w-9 place-items-center rounded-full ${
            i === 0 ? "text-accent" : "text-secondary"
          }`}
        >
          <Icon className="h-7 w-7" />
          {badge && (
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-semibold text-white">
              {badge}
            </span>
          )}
        </button>
      ))}
      <button
        aria-label="Menu"
        onClick={onMenuClick}
        className="grid h-9 w-9 place-items-center rounded-full text-secondary"
      >
        <HiBars3 className="h-7 w-7" />
      </button>
    </nav>
  );
}
