import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  CheckSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  FolderOpen,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [
    courseCount,
    assignmentCount,
    completedCount,
    pendingCount,
    recentCourses,
  ] = await Promise.all([
    prisma.course.count({
      where: {
        userId,
      },
    }),

    prisma.assignment.count({
      where: {
        course: {
          userId,
        },
      },
    }),

    prisma.assignment.count({
      where: {
        completed: true,
        course: {
          userId,
        },
      },
    }),

    prisma.assignment.count({
      where: {
        completed: false,
        course: {
          userId,
        },
      },
    }),

    prisma.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const statItems = [
    {
      title: "Total Courses",
      value: courseCount,
      icon: BookOpen,
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Total Assignments",
      value: assignmentCount,
      icon: CheckSquare,
      color: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/50",
    },
    {
      title: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {session.user.name} 👋
        </h1>

        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          Here&apos;s your learning overview for today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className={`rounded-lg p-2.5 ${stat.bg} ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-3 text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Courses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Courses
          </h2>
          <Link
            href="/dashboard/courses"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1"
            )}
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentCourses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
                <FolderOpen className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">No courses yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first course to start organizing your learning.
              </p>
              <Link
                href="/dashboard/courses"
                className={cn(buttonVariants(), "mt-4 gap-2")}
              >
                <PlusCircle className="h-4 w-4" />
                Create Course
              </Link>
            </div>
          ) : (
            recentCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-border bg-card p-4 shadow-xs transition-colors hover:border-indigo-500/50 gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{course.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {course.createdAt.toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/courses/${course.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "shrink-0"
                  )}
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
