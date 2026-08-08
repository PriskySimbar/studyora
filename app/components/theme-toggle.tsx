"use client";

import { useTheme } from "./theme-provider";
import { Sun, Moon, Laptop } from "lucide-react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div className="h-9 w-9 rounded-md border border-input bg-background/50 p-2" />
    );
  }

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Toggle theme (Current: ${theme})`}
      title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {theme === "light" && <Sun className="h-4 w-4 text-amber-500 transition-transform dark:rotate-90 dark:scale-0" />}
      {theme === "dark" && <Moon className="h-4 w-4 text-indigo-400 transition-transform" />}
      {theme === "system" && <Laptop className="h-4 w-4 text-muted-foreground transition-transform" />}
    </button>
  );
}
