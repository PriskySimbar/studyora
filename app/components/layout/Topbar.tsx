"use client";

import ThemeToggle from "../theme-toggle";
import { Menu, User } from "lucide-react";

type TopbarProps = {
  onToggleMobileMenu?: () => void;
  userName?: string;
};

export default function Topbar({ onToggleMobileMenu, userName }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu hamburger toggle */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Open menu"
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-2 text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-foreground">
          Studyora Workspace
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* User Pill */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground shadow-2xs">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            <User className="h-3.5 w-3.5" />
          </div>
          <span className="max-w-[120px] truncate sm:max-w-[180px]">
            {userName || "Student"}
          </span>
        </div>
      </div>
    </header>
  );
}
