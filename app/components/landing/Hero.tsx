import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
      <div className="max-w-3xl">
        <Badge className="mb-6">Built for University Students</Badge>

        <h1 className="mb-6 text-6xl font-bold leading-tight">
          Learn Smarter with <span className="text-indigo-600">Studyora</span>
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          Manage your courses, assignments, notes, and boost your productivity
          with an AI-powered learning workspace.
        </p>

        <div className="flex gap-4">
          <Button size="lg">
            <Link href="/register">Get Started</Link>
          </Button>

          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
      <DashboardPreview />
    </section>
  );
}
