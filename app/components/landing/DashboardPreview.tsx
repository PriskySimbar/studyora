import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckSquare, Clock, GraduationCap } from "lucide-react";

export default function DashboardPreview() {
  return (
    <Card className="w-full max-w-lg rounded-2xl border-border bg-card shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10">
      <div className="border-b border-border bg-muted/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <GraduationCap className="h-3.5 w-3.5 text-indigo-500" />
          <span>Studyora Workspace</span>
        </div>
      </div>

      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Dashboard</h3>
          <span className="text-xs rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 font-medium">
            Active Semester
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="border-border bg-background shadow-2xs">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Courses</span>
                <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
              </div>
              <h4 className="text-2xl font-bold text-foreground">6</h4>
            </CardContent>
          </Card>

          <Card className="border-border bg-background shadow-2xs">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Assignments</span>
                <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <h4 className="text-2xl font-bold text-foreground">12</h4>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Upcoming Deadlines
          </p>

          <div className="rounded-lg border border-border bg-background p-3 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">Database Project</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Tomorrow
            </span>
          </div>

          <div className="rounded-lg border border-border bg-background p-3 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">AI Presentation</span>
            <span className="text-xs text-muted-foreground">In 3 days</span>
          </div>

          <div className="rounded-lg border border-border bg-background p-3 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">Next.js Assignment</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400">Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
