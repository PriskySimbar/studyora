"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCourse } from "@/app/actions/course";
import Link from "next/link";
import {
  BookOpen,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  CheckSquare,
  FolderOpen,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EditCourseForm from "./EditCourseForm";
import ConfirmModal from "../ui/confirm-modal";

type Course = {
  id: string;
  name: string;
  createdAt: Date;
  assignments: {
    id: string;
    title: string;
    dueDate: Date | null;
  }[];
};

type CourseListProps = {
  courses: Course[];
};

export default function CourseList({ courses }: CourseListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  async function handleConfirmDelete() {
    if (!deleteTargetId) return;

    setDeleteLoading(true);
    const result = await deleteCourse(deleteTargetId);
    setDeleteLoading(false);

    if (result.success) {
      setDeleteTargetId(null);
      router.refresh();
    } else {
      alert(result.message);
    }
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <FolderOpen className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-foreground text-base">No courses yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Create your first course above to start organizing your learning and assignments.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-indigo-500/40"
          >
            {editingId === course.id ? (
              <EditCourseForm
                courseId={course.id}
                initialName={course.name}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{course.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Created {new Date(course.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(course.id)}
                      className="gap-1.5"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteTargetId(course.id)}
                      className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>

                    <Link
                      href={`/dashboard/courses/${course.id}`}
                      className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
                    >
                      View
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Sub Assignment list preview */}
                <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <CheckSquare className="h-3.5 w-3.5 text-indigo-500" />
                    Assignments ({course.assignments.length})
                  </p>

                  {course.assignments.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">
                      No assignments added for this course yet.
                    </p>
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {course.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="rounded-md bg-card p-2.5 border border-border text-xs flex justify-between items-center"
                        >
                          <span className="font-medium text-foreground truncate pr-2">
                            {assignment.title}
                          </span>
                          {assignment.dueDate && (
                            <span className="text-muted-foreground shrink-0 text-[11px]">
                              {new Date(assignment.dueDate).toLocaleDateString("id-ID")}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Course?"
        description="Are you sure you want to delete this course? All associated assignments will also be deleted. This action cannot be undone."
        confirmText="Delete Course"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </>
  );
}
