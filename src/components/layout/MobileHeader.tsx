"use client";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { Image } from "antd";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-subtle bg-surface px-4 lg:hidden">
      {/* Logo */}
      <Image
        src="/images/logo.svg"
        className="cursor-pointer"
        alt="logo"
        preview={false}
      />

      <button
        aria-label="Search"
        className="grid h-9 w-9 place-items-center rounded-full text-secondary hover:bg-muted"
      >
        <HiMagnifyingGlass className="h-5 w-5" />
      </button>
    </header>
  );
}
