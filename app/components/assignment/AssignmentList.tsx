"use client";

import EditAssignmentForm from "./EditAssignmentForm";
import { deleteAssignment } from "../../actions/assignment";
import { useState } from "react";
import {
  Clock,
  CheckCircle2,
  Calendar,
  Edit2,
  Trash2,
  BookOpen,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "../ui/confirm-modal";

type Assignment = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  completed: boolean;
  course: {
    name: string;
  };
};

type AssignmentListProps = {
  assignments: Assignment[];
};

export default function AssignmentList({ assignments }: AssignmentListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleConfirmDelete() {
    if (!deleteTargetId) return;

    setDeleteLoading(true);
    const result = await deleteAssignment(deleteTargetId);
    setDeleteLoading(false);

    if (result.success) {
      setDeleteTargetId(null);
    } else {
      alert(result.message);
    }
  }

  if (assignments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Inbox className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-foreground text-base">No assignments yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Create your first assignment above to start tracking your tasks and deadlines.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-indigo-500/40 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-foreground">
                    {assignment.title}
                  </h3>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      assignment.completed
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                    }`}
                  >
                    {assignment.completed ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3" />
                        Pending
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {assignment.course.name}
                </p>

                {assignment.description && (
                  <p className="text-sm text-muted-foreground">
                    {assignment.description}
                  </p>
                )}

                {assignment.dueDate && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                    <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                    Due Date: {new Date(assignment.dueDate).toLocaleDateString("id-ID")}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(assignment.id)}
                  className="gap-1.5"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteTargetId(assignment.id)}
                  className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </div>

            {editingId === assignment.id && (
              <EditAssignmentForm
                assignment={assignment}
                onCancel={() => setEditingId(null)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete Assignment?"
        description="Are you sure you want to delete this assignment? This action cannot be undone."
        confirmText="Delete Assignment"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </>
  );
}
