"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log sanitized error internally without exposing to user UI
    console.error("Dashboard error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-4 text-destructive mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>

      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        We encountered an error loading your dashboard content. Please try again or return to the main overview.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
