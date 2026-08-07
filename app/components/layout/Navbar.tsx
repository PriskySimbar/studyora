import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Studyora
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">Features</Link>

          <Link href="/">About</Link>

          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
