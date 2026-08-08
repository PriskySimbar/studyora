import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar, FileText, CheckCircle2, Clock, Inbox } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CourseDetailPageProps = {
  params: Promise<{
    courseID?: string;
    courseId?: string;
  }>;
};

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedParams = await params;
  const courseId = resolvedParams.courseID || resolvedParams.courseId;

  if (!courseId) {
    notFound();
  }

  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      userId: session.user.id,
    },
    include: {
      assignments: {
        orderBy: {
          dueDate: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <div>
        <Link
          href="/dashboard/courses"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2 -ml-2 text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
      </div>

      {/* Course Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {course.name}
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Created {course.createdAt.toLocaleDateString("id-ID")}
        </p>
      </div>

      {/* Assignments Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-foreground">
            Assignments ({course.assignments.length})
          </h2>

          <Link
            href="/dashboard/assignments"
            className={cn(buttonVariants(), "gap-1.5")}
          >
            <Plus className="h-4 w-4" />
            Add Assignment
          </Link>
        </div>

        {course.assignments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
              <Inbox className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">No assignments in this course</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first assignment to start tracking deadlines for {course.name}.
            </p>
            <Link
              href="/dashboard/assignments"
              className={cn(buttonVariants(), "mt-4 gap-2")}
            >
              <Plus className="h-4 w-4" />
              Add Assignment
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {course.assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-indigo-500/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-foreground">
                      {assignment.title}
                    </h3>

                    {assignment.description && (
                      <p className="text-sm text-muted-foreground flex items-start gap-1.5">
                        <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{assignment.description}</span>
                      </p>
                    )}

                    {assignment.dueDate && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                        <span>
                          Due: {new Date(assignment.dueDate).toLocaleDateString("id-ID")}
                        </span>
                      </p>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium shrink-0 ${
                      assignment.completed
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                    }`}
                  >
                    {assignment.completed ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock className="h-3.5 w-3.5" />
                        Pending
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
