import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ThemeToggle from "../theme-toggle";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs dark:bg-indigo-500">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span>Studyora</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:inline-flex"
            )}
          >
            Login
          </Link>

          <Link href="/register" className={cn(buttonVariants())}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
