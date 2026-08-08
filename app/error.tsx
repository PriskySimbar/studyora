"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background text-foreground">
      <div className="rounded-full bg-destructive/10 p-4 text-destructive mb-4">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Studyora</h1>

      <h2 className="mt-4 text-xl font-semibold">An unexpected error occurred</h2>

      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        We couldn&apos;t load this page properly. Please refresh the page or click below to retry.
      </p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
