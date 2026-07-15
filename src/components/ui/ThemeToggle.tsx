"use client";

import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { useTheme } from "@/lib/theme-provider";

export default function ThemeToggle({ ismobile }: { ismobile: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {ismobile ? (
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="relative flex h-8 w-14 items-center rounded-full border border-border-subtle bg-muted px-1 transition-colors"
        >
          <span
            className={`grid h-6 w-6 place-items-center rounded-full bg-accent text-white shadow transition-transform duration-200 ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <HiMiniMoon className="h-3.5 w-3.5" />
            ) : (
              <HiMiniSun className="h-3.5 w-3.5" />
            )}
          </span>
        </button>
      ) : (
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className={`cursor-pointer relative h-16 w-9 overflow-hidden rounded-full ${isDark ? "bg-[#0b1220]" : "bg-[#2f80ed]"} transition-colors border border-[#2f80ed]`}
        >
          {/* Icon - stays fixed, opposite side of knob */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
              isDark ? "bottom-2.5" : "top-2.5"
            }`}
          >
            {isDark ? (
              <HiMiniMoon className="h-5 w-5 text-white" />
            ) : (
              <HiMiniSun className="h-5 w-5 text-white" />
            )}
          </span>
        </button>
      )}
    </>
  );
}
