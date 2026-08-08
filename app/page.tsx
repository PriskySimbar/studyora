import Navbar from "./components/layout/Navbar";
import Hero from "./components/landing/Hero";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Hero />
      </main>

      <footer className="border-t border-border bg-card py-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-medium">
            <GraduationCap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>Studyora Learning Workspace</span>
          </div>

          <p>© 2026 Studyora. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
