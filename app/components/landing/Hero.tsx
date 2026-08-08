import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardPreview from "./DashboardPreview";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 sm:px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center w-full">
        <div className="space-y-6 text-left">
          <Badge
            variant="outline"
            className="border-indigo-500/30 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 py-1 px-3 text-xs sm:text-sm font-medium gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Built for University & High School Students
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Learn Smarter with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              Studyora
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
            Streamline your academic life. Manage courses, track assignments, and boost your productivity with a clean, focused learning workspace.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 text-base px-6")}
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "text-base px-6"
              )}
            >
              Sign In
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Course Management
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Assignment Tracking
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Dark Mode Support
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
